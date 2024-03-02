'use client';

import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';

type Props = {
  flyer?: StaticImageData;
  date: string;
  bands: string[];
  place: string;
  presale?: string;
  city: string;
  index: number;
};

function Previews({ flyer, date, bands, place, presale, city, index }: Props) {
  return (
    <div className="border-b-2 pb-1 w-[80%] lg:w-[760px]">
      <div className="text-slate-300 flex flex-col sm:flex-row rounded-md p-2 gap-3 bg-transparent/20">
        <div className="flex flex-row sm:gap-3 items-center justify-between sm:w-1/2">
          <div className="p-1 bg-slate-700 sm:w-max rounded w-min">
            <h2 className="text-lg sm:w-24">{date}</h2>
          </div>
          <div className="sm:w-48 w-1/2">
            <div className="text-xl text-secondary">{place}</div>
            <div className="flex gap-1 items-center">
              <FaLocationDot className="text-red-400" /> {city}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center sm:w-1/2">
          <div className="flex flex-col text-info sm:w-1/3">
            Bands:
            {bands.map((band, index) => (
              <span key={band} className="italic text-white">
                {band}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {presale && (
              <div className="flex justify-center items-center">
                <Link href={presale} target="_blank" className="underline uppercase text-primary hover:text-pk-green">
                  VVK
                </Link>
              </div>
            )}
            {flyer && (
              <>
                <button
                  className=""
                  onClick={() => {
                    if (document) {
                      (document.getElementById('my_modal_' + index) as HTMLFormElement).showModal();
                    }
                  }}
                >
                  <Image src={flyer} alt="flyer" className="w-10" />
                </button>
                <dialog id={`my_modal_${index}`} className="modal bg-pk-green/30">
                  <div className="flex flex-col h-full justify-center items-center">
                    <div className="modal-action shadow-md w-[90%] sm:w-[560px]">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="">
                          <Image src={flyer} alt="flyer" />
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Previews;
