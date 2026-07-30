'use client';

import { useState, useTransition } from 'react';
import { FiCheck, FiShoppingBag } from 'react-icons/fi';

interface AddToCartButtonProps { productId: string; incrementProductQuantity: (productId: string) => Promise<void> }

export default function AddToCartButton({ productId, incrementProductQuantity }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return <div className="flex flex-wrap items-center gap-3"><button type="button" disabled={isPending} className="pk-button" onClick={() => { setSuccess(false); startTransition(async () => { await incrementProductQuantity(productId); setSuccess(true); }); }}>{isPending ? <span className="loading loading-spinner loading-sm" /> : <FiShoppingBag aria-hidden />} In den Warenkorb</button>{!isPending && success && <span className="inline-flex items-center gap-2 text-sm font-bold text-pk-green"><FiCheck aria-hidden /> Hinzugefügt</span>}</div>;
}
