import Previews from '../components/concerts/previews';
import { prisma } from '../../../utils/db/prisma';

type Props = {};

async function Events({}: Props) {
  const postEvents = await prisma.event.findMany({
    where: {
      past: true,
    },
    orderBy: [{ date: 'desc' }],
  });
  const upcomingEvents = await prisma.event.findMany({
    where: {
      past: false,
    },
    orderBy: [{ date: 'asc' }],
  });
  return (
    <div className="flex flex-col gap-3 w-screen justify-center items-center mt-28">
      <h1 className="text-pk-green text-4xl uppercase underline mb-12">Upcoming</h1>
      <div className="w-screen flex flex-col items-center">
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
            address={event.address || undefined}
            link={event.link || undefined}
          />
        ))}
      </div>
      <h3 className="text-slate-400 uppercase italic mt-24 mb-8">Past</h3>
      <div className="w-screen flex flex-col items-center opacity-60">
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
            address={event.address || undefined}
            link={event.link || undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;
