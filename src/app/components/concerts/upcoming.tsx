import Link from 'next/link';
import React from 'react';

type Props = {};

function Upcoming({}: Props) {
  return (
    <div className="text-white pt-40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-10 items-center">
        <div className="p-6 text-center">
          <h2 className="text-6xl font-bold mb-14 text-pk-green">Große Neuigkeiten!</h2>
          <p className="mb-4 text-2xl">
            Unser neuer Videoclip und unsere erste Single vom kommenden Album erblicken das Licht der Welt.
          </p>
          <p className="mb-4 text-2xl">Bereits jetzt kann man das Album vorbestellen.</p>
          <p className="mb-4 text-xl">Das Album wird ab dem 03.05.2024 erhältlich sein.</p>
          <p className="mb-4 text-lg">
            Zur Vorbestellunger des neue Album “Aufbruch” klicke{' '}
            <Link
              className="text-primary hover:text-pk-green active:text-[rgb(11,222,110)] underline uppercase"
              href={'https://hypeddit.com/projektkrank/aufbruch'}
              target="_blank"
            >
              hier
            </Link>
            !
          </p>
        </div>
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/track/3KKyiiuwTMiaVu66E0WmMK?utm_source=generator&theme=0"
          width="80%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Upcoming;
