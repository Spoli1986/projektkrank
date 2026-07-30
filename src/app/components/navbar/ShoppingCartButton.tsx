'use client';

import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import type { ShoppingCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';

interface ShoppingCartButtonProps {
  cart?: ShoppingCart | null;
}

function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropdown() {
    const element = document.activeElement as HTMLElement | null;
    element?.blur();
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        aria-label={`Warenkorb mit ${cart?.size ?? 0} Artikeln`}
        className="icon-button relative"
      >
        <FiShoppingBag className="h-5 w-5" aria-hidden />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pk-green px-1 text-[10px] font-black text-black">
          {cart?.size ?? 0}
        </span>
      </button>

      <div
        tabIndex={0}
        className="surface dropdown-content z-50 mt-3 w-64 p-4 text-white"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Warenkorb</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <span className="text-lg font-bold">{cart?.size ?? 0} Artikel</span>
          <span className="text-sm text-pk-green">{formatPrice(cart?.subtotal ?? 0)}</span>
        </div>
        <Link href="/shop/cart" className="pk-button mt-4 w-full" onClick={closeDropdown}>
          Warenkorb öffnen
        </Link>
      </div>
    </div>
  );
}

export default ShoppingCartButton;
