import Link from 'next/link';
import Spotify from '../common/frames/spotify';
import Youtube from '../common/frames/youtube';
import NextEvent from '../concerts/nextEvent';

type Props = {};

function News({}: Props) {
  const alterMannSpotify = 'https://open.spotify.com/embed/track/3KKyiiuwTMiaVu66E0WmMK?utm_source=generator&theme=0';

  return (
    <div className="text-white pt-40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col gap-10 items-center">
        <div className="p-6 text-center">
          <h2 className="lg:text-6xl md:text-5xl text-4xl font-bold mb-14 text-pk-green">Grosse Neuigkeiten!</h2>
          <p className="mb-4 lg:text-3xl md:text-xl text-lg">
            Ein neuer Videoclip zum kimmenden Album ist seit kurzem Online.
          </p>
          <p className="mb-4 lg:text-2xl md:text-lg">Bereits jetzt kann man das Album vorbestellen.</p>
          <p className="mb-4 lg:text-xl">Das Album wird ab dem 03.05.2024 erhältlich sein.</p>
          <p className="mb-4 lg:text-lg md:text-base text-sm">
            Zur Vorbestellung des neue Album “Aufbruch” klicke{' '}
            <Link
              className="text-primary hover:text-pk-green active:text-[rgb(11,222,110)] btn btn-link uppercase"
              href={'https://hypeddit.com/projektkrank/aufbruch'}
              target="_blank"
            >
              hier
            </Link>
            !
          </p>
        </div>
        <Youtube src="https://www.youtube.com/embed/l_4zcsg_pVg?si=eTEfe-_QE4_BX40e" title="Projekt Krank - Aufbruch" />
        <Spotify src={alterMannSpotify} width="100%" height="352" />
        <div className="flex flex-col border-t w-[90%] mt-10 pt-10 items-center gap-14">
          <h2 className="lg:text-4xl md:text-3xl text-xl font-bold text-pk-green">Unser nächstes Konzert</h2>

          <NextEvent />
          <p className="lg:text-3xl md:text-2xl text-lg font-bold mb-14 text-pk-green">bis bald...</p>
        </div>
      </div>
    </div>
  );
}

export default News;
