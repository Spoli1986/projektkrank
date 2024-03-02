import Elch from '../../../public/Flyer_ElchCl_Hochformat.png';
import Sedel from '../../../public/flyer_sedel_hochhochformat.png';
import Oxyl from '../../../public/flyer.jpg';
import Image from 'next/image';
import Previews from '../components/concerts/previews';

type Props = {};

function Events({}: Props) {
  const events = [
    {
      flyer: undefined,
      bands: ['Fueled by Fear'],
      date: '30.09.2023 19:30',
      place: 'Improvisorium',
      city: 'Huttwil',
    },
    {
      flyer: Sedel,
      bands: ['Morgenstern', 'BAK XIII'],
      date: '15.10.2022 19:30',
      place: 'Sedel',
      city: 'Luzern',
    },
    {
      flyer: Oxyl,
      bands: ['Ost+Front'],
      date: '23.04.2022 20:00',
      place: 'Oxil',
      city: 'Zofingen',
    },
    {
      flyer: Elch,
      bands: ['Unexpected Fall'],
      date: '15.01.2022 19:30',
      place: 'Elchclub',
      city: 'Ostermundigen',
      presale: '',
    },
  ];

  const upcoming = [
    {
      flyer: undefined,
      bands: ['Excelsis', 'Void Machine'],
      date: '05.04.2024 19:30',
      place: 'Soho',
      presale: '',
      city: 'Wangen an der Aare',
    },
    {
      flyer: undefined,
      bands: ['Dame tu Alma'],
      date: '25.05.2024 19:30',
      place: 'Kesselhaus',
      presale: '',
      city: 'Riedholz',
    },
  ];
  return (
    <div className="flex flex-col gap-3 w-screen justify-center items-center mt-28">
      <h1 className="text-pk-green text-4xl uppercase underline font-bold mb-12">Nächstes</h1>
      {upcoming.map((event, index) => (
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
      {events.map((event, index) => (
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
