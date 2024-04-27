'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ImageCarouselProps = {
  imageUrl: string[];
};
function ImageCarousel({ imageUrl }: ImageCarouselProps) {
  const [current, setCurrent] = useState<number>(0);
  const max: number = imageUrl.length - 1;

  return (
    <div className="carousel">
      <div className="carousel-item relative">
        <Image src={imageUrl[current]} alt={imageUrl[0]} width={300} height={300} className="rounded-lg" priority />
        {max > 0 && (
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={() => (current === 0 ? setCurrent(max) : setCurrent(current - 1))}
              className="btn btn-circle "
            >
              ❮
            </button>
            <button
              onClick={() => (current === max ? setCurrent(0) : setCurrent(current + 1))}
              className="btn btn-circle"
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCarousel;
