import React from "react";
import { formatPrice } from "../../../../utils/utils";

interface PriceTagProps {
  price: number;
  className?: string;
}

function PriceTag({ price, className }: PriceTagProps) {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
}

export default PriceTag;
