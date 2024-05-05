'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
import { formatDate } from '../../../../utils/utils';
import AddressLink from '../common/AddressLink';
import LocationComponent from '../common/LocationLink';

type Props = {
  flyer?: string | null;
  date: Date;
  bands: string[];
  place: string;
  presale?: string | null;
  city: string;
  index: number;
  address?: string;
  link?: string;
};

function Previews({ flyer, date, bands, place, presale, city, address, link, index }: Props) {
  return (
    <div className="border-b-2 pb-1 w-[80%] lg:w-[760px]">
      <div className="text-slate-300 flex flex-col sm:flex-row rounded-md p-2 gap-3 bg-transparent/20">
        <div className="flex flex-row sm:gap-3 items-center justify-between sm:w-1/2">
          <div className="p-1 bg-slate-700 sm:w-max rounded w-min">
            <h2 className="text-lg w-24">{formatDate(date)}</h2>
          </div>
          <div className="sm:w-48 w-1/2">
            <div className="text-xl text-secondary">
              {link ? (
                <LocationComponent link={link}>
                  <span>{place}</span>
                </LocationComponent>
              ) : (
                <span>{place}</span>
              )}
            </div>
            <div className="flex gap-1 items-center">
              <FaLocationDot className="text-red-400" />
              {address ? (
                <AddressLink address={address}>
                  <span>{city}</span>
                </AddressLink>
              ) : (
                <span>{city}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center sm:w-1/2">
          <div className="flex flex-col text-info">
            Bands:
            {bands.map((band, index) => (
              <span key={index} className="italic text-white">
                {band}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {presale && (
              <div className="flex justify-center items-center">
                <Link
                  href={presale}
                  target="_blank"
                  className="btn btn-link uppercase text-primary hover:text-pk-green"
                >
                  Tickets
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
                  <Image src={flyer} alt="flyer" width={40} height={10} style={{ width: 'auto', height: 'auto' }} />
                </button>
                <dialog id={`my_modal_${index}`} className="modal bg-pk-green/30">
                  <div className="flex flex-col h-full justify-center items-center">
                    <div className="modal-action shadow-md w-[90%] sm:w-[560px]">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="">
                          <Image
                            src={flyer}
                            alt="flyer"
                            width={800}
                            height={200}
                            style={{ width: 'auto', height: 'auto' }}
                          />
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
