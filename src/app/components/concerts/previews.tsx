'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot, FaTicket } from 'react-icons/fa6';
import { FiExternalLink, FiImage, FiUsers } from 'react-icons/fi';
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
  const dialogId = `event-flyer-${index}`;

  function openFlyer() {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  return (
    <article className="surface surface-hover w-full overflow-hidden p-3 sm:p-5">
      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[8.5rem_1fr_auto] sm:items-center sm:gap-5">
        <time className="flex min-h-20 flex-col justify-center rounded-lg border border-pk-green/25 bg-pk-green/[0.08] px-2 py-2 text-center sm:min-h-24 sm:rounded-xl sm:px-4 sm:py-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-pk-green sm:text-xs">Live</span>

          <span className="mt-1 text-sm font-black leading-tight text-white sm:text-lg">{formatDate(date)}</span>
        </time>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.025em] text-white sm:text-2xl">
              {link ? (
                <LocationComponent link={link}>
                  <span className="inline-flex items-center gap-2 transition hover:text-pk-green">
                    {place} <FiExternalLink className="h-4 w-4" aria-hidden />
                  </span>
                </LocationComponent>
              ) : (
                place
              )}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-zinc-400">
              <FaLocationDot className="text-pk-gold" aria-hidden />
              {address ? (
                <AddressLink address={address}>
                  <span className="transition hover:text-white">{city}</span>
                </AddressLink>
              ) : (
                <span>{city}</span>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-start gap-2 text-xs text-zinc-400 sm:mt-4 sm:text-sm">
            <FiUsers className="mt-0.5 shrink-0 text-pk-green" aria-hidden />
            <p>
              {bands.map((band, bandIndex) => (
                <span key={`${band}-${bandIndex}`}>
                  <span className="font-semibold text-zinc-200">{band}</span>
                  {bandIndex < bands.length - 1 ? <span className="text-zinc-600"> · </span> : null}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="col-span-2 flex flex-wrap gap-2 sm:col-auto sm:justify-end">
          {presale && (
            <Link
              href={presale}
              target="_blank"
              rel="noreferrer"
              className="pk-button min-h-0 px-3 py-2 text-[0.65rem] sm:min-h-[2.75rem] sm:px-5 sm:py-3 sm:text-xs"
            >
              Tickets <FaTicket aria-hidden />
            </Link>
          )}
          {flyer && (
            <button
              type="button"
              onClick={openFlyer}
              className="pk-button-secondary min-h-0 px-3 py-2 text-[0.65rem] sm:min-h-[2.75rem] sm:px-5 sm:py-3 sm:text-xs"
              aria-label="Flyer öffnen"
            >
              Flyer <FiImage aria-hidden />
            </button>
          )}
        </div>
      </div>

      {flyer && (
        <dialog id={dialogId} className="modal bg-black/[0.85] p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl border border-white/[0.15] bg-black p-2 shadow-2xl">
            <Image
              src={flyer}
              alt={`Flyer für ${place}`}
              width={1100}
              height={1500}
              className="max-h-[82vh] w-auto rounded-xl object-contain"
            />
            <form method="dialog" className="absolute right-5 top-5">
              <button className="icon-button bg-black/80" aria-label="Flyer schliessen">
                ×
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button aria-label="Flyer schliessen">close</button>
          </form>
        </dialog>
      )}
    </article>
  );
}

export default Previews;
