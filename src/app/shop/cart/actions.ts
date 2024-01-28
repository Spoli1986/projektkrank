'use server';

import { revalidatePath } from 'next/cache';
import { createCart, getCart } from '../../../../utils/db/cart';
import { prisma } from '../../../../utils/db/prisma';

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: { where: { id: articleInCart.id }, data: { quantity: { increment: 1 } } },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity: 1,
            },
          },
        },
      });
    }
  }
  revalidatePath('/shop/cart');
}
