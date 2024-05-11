import Link from 'next/link';
import Spotify from '../common/frames/spotify';
import Youtube from '../common/frames/youtube';
import NextEvent from '../concerts/nextEvent';

type Props = {};

function News({}: Props) {
  const alterMannSpotify = 'https://open.spotify.com/embed/album/7imbnxWCW5vgs8C1mgWkf2?utm_source=generator';

  return (
    <div className="text-white pt-40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col gap-10 items-center">
        <div className="p-6 text-center">
          <h2 className="lg:text-6xl md:text-5xl text-4xl font-bold mb-14 text-pk-green">Grosse Neuigkeiten!</h2>
          <p className="mb-4 lg:text-3xl md:text-xl text-lg">
            Unser <Link href={'/shop'}>SHOP</Link> ist seit kurzem Online!
          </p>
        </div>
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
