'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ImageCarousel({ imageUrl }: { imageUrl: string[] }) {
  const [current, setCurrent] = useState(0);
  const max = imageUrl.length - 1;

  return (
    <div className="space-y-3">
      <div className="surface relative aspect-square overflow-hidden bg-zinc-900 p-2">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image src={imageUrl[current]} alt="Produktansicht" fill priority sizes="(min-width:1024px) 50vw,100vw" className="object-cover" />
        </div>
        {max > 0 && <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between"><button type="button" onClick={() => setCurrent(current === 0 ? max : current - 1)} className="icon-button bg-black/70" aria-label="Vorheriges Bild"><FiChevronLeft /></button><button type="button" onClick={() => setCurrent(current === max ? 0 : current + 1)} className="icon-button bg-black/70" aria-label="Nächstes Bild"><FiChevronRight /></button></div>}
      </div>
      {imageUrl.length > 1 && <div className="flex gap-2 overflow-x-auto pb-1">{imageUrl.map((image, index) => <button key={image} type="button" onClick={() => setCurrent(index)} className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${current === index ? 'border-pk-green' : 'border-white/10 opacity-60 hover:opacity-100'}`} aria-label={`Bild ${index + 1} anzeigen`}><Image src={image} alt="" fill sizes="64px" className="object-cover" /></button>)}</div>}
    </div>
  );
}
