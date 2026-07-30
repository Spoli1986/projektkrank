import Image from 'next/image';
import Link from 'next/link';
import type { Event, Product } from '@prisma/client';
import { FiArrowRight, FiHeadphones, FiMail, FiPlay, FiShoppingBag } from 'react-icons/fi';
import Stefu from '../../public/band/stefu.jpg';
import Hene from '../../public/band/hene.jpg';
import Dave from '../../public/band/dave.jpg';
import { getTodayBoundary } from '../../utils/date';
import { prisma } from '../../utils/db/prisma';
import Spotify from './components/common/frames/spotify';
import Youtube from './components/common/frames/youtube';
import Previews from './components/concerts/previews';
import ContactForm from './components/home/ContactForm';
import PriceTag from './components/shop/PriceTag';

export const dynamic = 'force-dynamic';

const videos = [
  { src: 'https://www.youtube.com/embed/l_4zcsg_pVg?si=eTEfe-_QE4_BX40e', title: 'Projekt Krank – Aufbruch' },
  { src: 'https://www.youtube.com/embed/kdPTc8gFr7Y?si=bjhf-j4Pc3NmSX3X', title: 'Projekt Krank – Alter Mann' },
  { src: 'https://www.youtube.com/embed/5JPghLhYohw', title: 'Projekt Krank – Sorg' },
  { src: 'https://www.youtube.com/embed/5l975lskWAk?si=DHvaA1JIpYsFCiac', title: 'Projekt Krank – Video' },
];

const members = [
  { name: 'Stefan', role: 'Vocals, Gitarre & Samples', image: Stefu },
  { name: 'Heinz', role: 'Vocals & Gitarre', image: Hene },
  { name: 'Davill', role: 'Bass', image: Dave },
];

async function getHomepageData(): Promise<{ upcomingEvents: Event[]; pastEvents: Event[]; products: Product[] }> {
  try {
    const today = getTodayBoundary();
    const [upcomingEvents, pastEvents, productCandidates] = await Promise.all([
      prisma.event.findMany({ where: { date: { gte: today } }, orderBy: [{ date: 'asc' }], take: 4 }),
      prisma.event.findMany({ where: { date: { lt: today } }, orderBy: [{ date: 'desc' }], take: 3 }),
      prisma.product.findMany({ orderBy: [{ createdAt: 'desc' }], take: 16 }),
    ]);

    const seenProducts = new Set<string>();
    const products = productCandidates
      .filter((product) => {
        if (product.imageUrl.length === 0 || (product.size && product.size.toLowerCase() !== 'm')) return false;
        const key = `${product.name}-${product.description}`;
        if (seenProducts.has(key)) return false;
        seenProducts.add(key);
        return true;
      })
      .slice(0, 4);

    return { upcomingEvents, pastEvents, products };
  } catch (error) {
    console.error('Unable to load homepage database content:', error);
    return { upcomingEvents: [], pastEvents: [], products: [] };
  }
}

function SectionHeading({ label, title, copy }: { label?: string; title: string; copy?: string }) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      {label ? <p className="eyebrow">{label}</p> : null}
      <h2 className={`section-title ${label ? 'mt-2' : ''}`}>{title}</h2>
      {copy ? <p className="section-copy mt-3">{copy}</p> : null}
    </div>
  );
}

export default async function Home() {
  const { upcomingEvents, pastEvents, products } = await getHomepageData();
  const spotifyAlbum = 'https://open.spotify.com/embed/album/7imbnxWCW5vgs8C1mgWkf2?utm_source=generator';

  return (
    <main id="home">
      <section className="relative isolate min-h-[88vh] overflow-hidden pt-[118px] lg:pt-24">
        {/* Background image */}
        <div className="absolute inset-0 z-0 bg-aufbruch bg-cover bg-center bg-no-repeat" aria-hidden />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.68)_20%,rgba(0,0,0,.28)_100%)]"
          aria-hidden
        />

        {/* Content */}
        <div className="site-shell relative z-20 grid min-h-[calc(88vh-118px)] items-center gap-10 py-14 lg:min-h-[calc(88vh-96px)] lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">Mundart · Metal · Industrial</p>

            <h1 className="display-title mt-4">Mundart im Maschinenraum.</h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Wir sind Projekt Krank: drei Leute, zu viele Geräte und Songs zwischen schweren Gitarren und schrägen
              Samples.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/#events" className="pk-button">
                Nächste Show <FiArrowRight aria-hidden />
              </Link>

              <Link href="/#media" className="pk-button-quiet">
                <FiPlay aria-hidden />
                Videos
              </Link>
            </div>
          </div>

          <div className="lg:max-w-xl lg:justify-self-end">
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
              <FiHeadphones className="text-pk-green" aria-hidden />
              Aufbruch · Album
            </div>

            <Spotify src={spotifyAlbum} width="100%" height="352" />
          </div>
        </div>
      </section>

      <section id="band" className="section-shell section-divider">
        <div className="site-shell">
          <SectionHeading
            label="Band"
            title="Drei von vier."
            copy="Stefan, Heinz und Davill. Am Schlagzeug ist noch Platz."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {members.map((member, index) => (
              <article key={member.name} className="surface surface-hover group overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
                  <span className="absolute left-5 top-5 text-xs font-black tracking-[0.2em] text-white/50">
                    0{index + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-3xl font-black uppercase text-white">{member.name}</h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-pk-green">{member.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="surface-strong mt-6 grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Drummer wanted</p>
              <h3 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Schlagzeug gesucht.</h3>
              <p className="section-copy mt-3">Tight, laut und klickfest? Dann sollten wir uns kennenlernen.</p>
            </div>
            <Link href="/#contact" className="pk-button">
              Meld dich <FiMail aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section id="events" className="section-shell">
        <div className="site-shell">
          <SectionHeading label="Live" title="Nächste Shows." />
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Previews
                  key={event.id}
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
              ))
            ) : (
              <div className="surface p-8 sm:p-10">
                <p className="eyebrow">Termine folgen</p>
                <h3 className="mt-3 text-2xl font-black uppercase">Neue Shows sind in Planung.</h3>
                <p className="mt-3 text-zinc-400">
                  Booking-Anfragen nehmen wir gerne über das Kontaktformular entgegen.
                </p>
              </div>
            )}
          </div>
          {pastEvents.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-zinc-500">Vergangene Shows</h3>
              <div className="space-y-4 opacity-65 transition hover:opacity-100">
                {pastEvents.map((event, index) => (
                  <Previews
                    key={event.id}
                    flyer={event.flyer}
                    bands={event.bands}
                    date={event.date}
                    place={event.place}
                    presale={event.presale}
                    city={event.city}
                    index={index + 1000}
                    address={event.address || undefined}
                    link={event.link || undefined}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="media" className="section-shell section-divider">
        <div className="site-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading label="Ansehen" title="Videos." />
            <Link
              href="https://www.youtube.com/channel/UCkK24yYafCxzWbGVnOd68qw/videos"
              target="_blank"
              rel="noreferrer"
              className="pk-button-quiet mb-10"
            >
              Alle auf YouTube <FiArrowRight aria-hidden />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {videos.map((video) => (
              <Youtube key={video.src} src={video.src} title={video.title} />
            ))}
          </div>
        </div>
      </section>

      <section id="merch" className="section-shell">
        <div className="site-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading label="Direkt von uns" title="Merch." />
            <Link href="/shop" className="pk-button-secondary mb-10">
              <FiShoppingBag aria-hidden /> Shop
            </Link>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="surface surface-hover group overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-900">
                    <Image
                      src={product.imageUrl[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width:1024px) 25vw,(min-width:640px) 50vw,100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black uppercase text-white">{product.name}</h3>
                      <PriceTag price={product.price} />
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="surface p-8 text-zinc-400">Neue Merch-Artikel folgen.</div>
          )}
        </div>
      </section>

      <section id="contact" className="section-shell section-divider">
        <div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 className="section-title mt-2">Schreib uns.</h2>
            <p className="section-copy mt-3">Booking, Presse oder Schlagzeug?</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
