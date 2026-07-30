import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../../public/Logo ohne Hintergrund.png';
import { getCart } from '../../../../utils/db/cart';
import NavItems, { leftNavItems, rightNavItems } from './navItems';
import ShoppingCartButton from './ShoppingCartButton';

export default async function Navbar() {
  const cart = await getCart();
  const hasCartItems = (cart?.size ?? 0) > 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/[0.94] backdrop-blur-md">
      <div className="site-shell hidden h-24 grid-cols-[1fr_auto_1fr] items-center gap-7 lg:grid">
        <NavItems items={leftNavItems} className="justify-self-start" />

        <Link href="/#home" aria-label="Projekt Krank Startseite" className="relative block h-[76px] w-64 shrink-0">
          <Image
            src={Logo}
            alt="Projekt Krank"
            fill
            sizes="256px"
            className="object-contain drop-shadow-[0_0_16px_rgba(81,222,11,0.18)]"
            priority
          />
        </Link>

        <div className="flex min-w-0 items-center justify-self-end gap-5 xl:gap-7">
          <NavItems items={rightNavItems} />
          {hasCartItems ? <ShoppingCartButton cart={cart} /> : null}
        </div>
      </div>

      <div className="site-shell flex min-h-[118px] flex-col lg:hidden">
        <div className="relative flex h-[72px] shrink-0 items-center justify-center">
          <Link href="/#home" aria-label="Projekt Krank Startseite" className="relative block h-16 w-52">
            <Image
              src={Logo}
              alt="Projekt Krank"
              fill
              sizes="208px"
              className="object-contain drop-shadow-[0_0_14px_rgba(81,222,11,0.16)]"
              priority
            />
          </Link>

          {hasCartItems ? (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <ShoppingCartButton cart={cart} />
            </div>
          ) : null}
        </div>

        <div className="min-w-0 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <NavItems className="mx-auto w-max" />
        </div>
      </div>
    </header>
  );
}
