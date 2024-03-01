import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';

type Props = { flyer?: StaticImageData; date: string; bands: string[]; place: string; presale?: string; city: string };

function Previews({ flyer, date, bands, place, presale, city }: Props) {
  return (
    <div className="border-b-2 pb-1 w-[80%] lg:w-[760px]">
      <div className="text-slate-500 flex flex-col sm:flex-row rounded-md p-2 gap-3 bg-transparent/20">
        <div className="flex flex-row gap-3 items-center  w-1/2">
          <div className="p-1 sm:bg-white sm:w-max rounded">
            <h2 className="text-lg sm:w-24 text-end">{date}</h2>
          </div>
          <div className="w-48">
            <div className="text-xl text-secondary">{place}</div>
            <div className="flex gap-1 items-center">
              <FaLocationDot className="text-red-400" /> {city}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-1/2">
          <div className="flex flex-col text-info w-1/3">
            Bands:
            {bands.map((band, index) => (
              <span key={band} className="italic text-white">
                {band}
              </span>
            ))}
          </div>
          {presale && (
            <div className="flex w-1/5 items-center justify-end">
              <Link href={presale} target="_blank" className="underline uppercase text-primary hover:text-pk-green">
                VVK
              </Link>
            </div>
          )}
          {/* {flyer && <Image src={flyer} alt="flyer" width={300} />} */}
        </div>
      </div>
    </div>
  );
}

export default Previews;
