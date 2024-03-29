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
      className="card w-[80%] md:w-[250px] lg:[350px] border border-gray-800 hover:blur-[2px] transition-shadow"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={800}
          className="h-48 object-cover border-b border-gray-600"
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
