'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaX } from 'react-icons/fa6';

function NavItems() {
  const [navbar, setNavbar] = useState<boolean>(false);
  const handleOnClickMenu = () => {
    setNavbar(!navbar);
  };

  return (
    <div>
      <nav className="navbar flex-row h-20 justify-between sm:mr-4">
        <ul className="hidden md:flex flex-row items-center justify-center p-4">
          <li className="mx-2">
            <Link href="/" title="Home">
              <span className="shadow-md hover:text-red-400">Home</span>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/band" title="Band">
              <span className="shadow-md hover:text-red-400">Band</span>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/events" title="Events">
              <span className="shadow-md hover:text-red-400">Events</span>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/media" title="Media">
              <span className="shadow-md hover:text-red-400">Media</span>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/shop" title="Shop">
              <span className="shadow-md hover:text-red-400">Shop</span>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/contact" title="Contact">
              <span className="shadow-md hover:text-red-400">Contact</span>
            </Link>
          </li>
        </ul>
        <Link href="/shoppingcart" title="Shopping Cart"></Link>
        <div className="flex md:hidden text-white text-3xl pr-5" onClick={handleOnClickMenu}>
          {navbar ? <FaX /> : <FaBars />}
        </div>
        <div
          className={
            navbar
              ? 'md:hidden absolute top-20 right-0 bottom-0 left-0 flex justify-center items-start pt-20 ease-in duration-300 w-full h-screen bg-transparent/90 z-10'
              : 'md:hidden absolute top-20 right-0 bottom-0 left-[-100%] flex justify-center items-start pt-20 ease-in duration-300 w-full h-screen bg-transparent/90 z-10'
          }
        >
          <ul className="flex flex-col text-3xl uppercase p-4 items-center gap-6">
            <li className="mx-4" onClick={handleOnClickMenu}>
              <Link href="/" title="Home">
                <span className="shadow-md">Home</span>
              </Link>
            </li>
            <li className="mx-4" onClick={handleOnClickMenu}>
              <Link href="/band" title="Band">
                <span className="shadow-md hover:text-red-400">Band</span>
              </Link>
            </li>
            <li className="mx-4" onClick={handleOnClickMenu}>
              <Link href="/events" title="Events">
                <span className="shadow-md hover:text-red-400">Events</span>
              </Link>
            </li>
            <li className="mx-4" onClick={handleOnClickMenu}>
              <Link href="/media" title="Media">
                <span className="shadow-md hover:text-red-400">Media</span>
              </Link>
            </li>
            <li className="mx-4" onClick={handleOnClickMenu}>
              <Link href="/shop" title="Shop">
                <span className="shadow-md hover:text-red-400">Shop</span>
              </Link>
            </li>
            <li className="mx-4" onClick={handleOnClickMenu}>
              <Link href="/contact" title="Contact">
                <span className="shadow-md hover:text-red-400">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavItems;
