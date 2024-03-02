import Previews from '../components/concerts/previews';
import { prisma } from '../../../utils/db/prisma';

type Props = {};

async function Events({}: Props) {
  const postEvents = await prisma.event.findMany({
    where: {
      past: true,
    },
  });
  const upcomingEvents = await prisma.event.findMany({
    where: {
      past: false,
    },
  });

  return (
    <div className="flex flex-col gap-3 w-screen justify-center items-center mt-28">
      <h1 className="text-pk-green text-4xl uppercase underline font-bold mb-12">Nächstes</h1>
      {upcomingEvents.map((event, index) => (
        <Previews
          key={index}
          flyer={event.flyer}
          bands={event.bands}
          date={event.date}
          place={event.place}
          presale={event.presale}
          city={event.city}
          index={index}
        />
      ))}
      <h3 className="text-slate-400 uppercase italic mt-24 mb-8">Vergangene</h3>
      {postEvents.map((event, index) => (
        <Previews
          index={index}
          key={index}
          flyer={event.flyer}
          bands={event.bands}
          date={event.date}
          place={event.place}
          presale={event.presale}
          city={event.city}
        />
      ))}
    </div>
  );
}

export default Events;
