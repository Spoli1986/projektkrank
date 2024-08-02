import { prisma } from '../../../../utils/db/prisma';
import Previews from './previews';

type Props = {};

async function NextEvent({}: Props) {
  const nextEvent = await prisma.event.findMany({
    where: {
      past: false,
    },
    orderBy: [{ date: 'asc' }],
  });
  return (
    <div className="w-screen flex flex-col items-center">
      {nextEvent.length === 0 ? (
        <div>
          <p className="lg:text-3xl md:text-2xl text-lg font-bold mb-14 text-pk-green">folgt in Kürze</p>
        </div>
      ) : (
        <Previews
          flyer={nextEvent[0].flyer}
          bands={nextEvent[0].bands}
          date={nextEvent[0].date}
          place={nextEvent[0].place}
          presale={nextEvent[0].presale}
          city={nextEvent[0].city}
          index={0}
          address={nextEvent[0].address || undefined}
          link={nextEvent[0].link || undefined}
        />
      )}
    </div>
  );
}

export default NextEvent;
