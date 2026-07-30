'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { FiMoreHorizontal } from 'react-icons/fi';
import Avatar from '../../../../public/avatar_ghost.png';
import { signIn, signOut } from 'next-auth/react';

export default function UserMenuButton({ session }: { session: Session | null }) {
  const user = session?.user;
  return <div className="dropdown dropdown-end"><button type="button" tabIndex={0} className="icon-button" aria-label="Benutzermenü">{user ? <Image src={user.image || Avatar} alt="Avatar" width={40} height={40} className="h-9 w-9 rounded-full object-cover" /> : <FiMoreHorizontal className="h-5 w-5" />}</button><ul tabIndex={0} className="surface dropdown-content z-50 mt-3 w-48 p-2 text-sm"><li>{user ? <button className="w-full rounded-xl px-3 py-2 text-left transition hover:bg-white/5 hover:text-pk-green" onClick={() => signOut({ callbackUrl: '/' })}>Abmelden</button> : <button className="w-full rounded-xl px-3 py-2 text-left transition hover:bg-white/5 hover:text-pk-green" onClick={() => signIn()}>Anmelden</button>}</li></ul></div>;
}
