'use client';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Tshirt from '../../../../public/tshirt.jpeg';
import Image from 'next/image';

const TShirt = () => {
  const [selected, setSelected] = useState<string>('s');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  return (
    <div className="t-shirt flex flex-col text-pk-green w-[80%] md:w-[250px] lg:[350px] ml-2">
      <Image src={Tshirt} alt="Tshirt" className=" rounded-lg" />
      <div className="flex  gap-1">
        Grösse:
        <select
          className="bg-transparent cursor-pointer "
          onChange={(e) => {
            handleSelect(e);
          }}
          defaultValue={'s'}
        >
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
        </select>
      </div>
      <button className="flex flex-row items-center gap-1">
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default TShirt;
