import { getCart } from '../../../../utils/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import NavItems from './navItems';
import Logo from '../../../../public/Logo ohne Hintergrund.png';
import Image from 'next/image';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Navbar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <header className="text-pk-green w-screen md:text-xl flex z-10 md:justify-center justify-between items-center fixed self-center font-semibold bg-black shadow-lg shadow-slate-600">
      <div className="sm:w-40 sm:h-20 w-32 h-16 p-5 relative">
        <Image src={Logo} alt="logo" fill sizes="full" style={{ position: 'absolute' }} />
      </div>
      <div className="flex md:flex-row-reverse flex-row items-center">
        {/* <UserMenuButton session={session} /> */}
        {/* <ShoppingCartButton cart={cart} /> */}
        <NavItems />
      </div>
    </header>
  );
}
