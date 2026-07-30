import Link from 'next/link';
import Spotify from '../common/frames/spotify';
import { Youtube } from '../common/frames/youtube';

type Props = {};

function News({}: Props) {
  const alterMannSpotify = 'https://open.spotify.com/embed/album/7imbnxWCW5vgs8C1mgWkf2?utm_source=generator';

  return (
    <div className="text-white pt-40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col gap-10 items-center text-pk-green">
        <Spotify src={alterMannSpotify} width="100%" height="352" />
        <div className="flex flex-col border-t w-[90%] mt-10 pt-10 items-center gap-14">
          <div className="flex flex-col items-center lg:text-4xl md:text-3xl text-xl font-bold">
            <span>We&apos;re working on new songs.</span>
            <span>We&apos;ll have more news about them in early 2027. </span>
          </div>
        </div>
        <Link href="/contact" className="text-xl md:text-2xl underline">
          Contact
        </Link>
        <div className="grid w-3/5 grid-cols-2 gap-2 p-2 text-white md:items-center md:p-0">
          <div className="min-w-0">
            <Youtube
              src="https://www.youtube.com/embed/l_4zcsg_pVg?si=eTEfe-_QE4_BX40e"
              title="Projekt Krank - Aufbruch"
            />
          </div>

          <div className="min-w-0">
            <Youtube
              src="https://www.youtube.com/embed/kdPTc8gFr7Y?si=bjhf-j4Pc3NmSX3X"
              title="Projekt Krank - Alter Mann"
            />
          </div>

          <div className="min-w-0">
            <Youtube src="https://www.youtube.com/embed/5JPghLhYohw" title="Projekt Krank - Sorg" />
          </div>

          <div className="min-w-0">
            <Youtube src="https://www.youtube.com/embed/5l975lskWAk?si=DHvaA1JIpYsFCiac" title="Projekt Krank video" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
