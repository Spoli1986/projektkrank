import { Product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={'/shop/' + product.id}
      className="card w-[380px] md:w-[250px] lg:[350px] border border-gray-800 hover:blur-[2px] transition-shadow pt-2"
    >
      <figure>
        <Image
          src={product.imageUrl[0]}
          alt={product.name}
          width={400}
          height={800}
          className="h-auto w-56 object-cover border-b border-gray-600"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}

export default ProductCard;
