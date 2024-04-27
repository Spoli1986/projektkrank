'use client';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
type Props = {
  children: ReactElement;
};

export default function ProductPageWrapper({ children }: Props) {
  const router = useRouter();

  function backToShopButton() {
    router.push('/shop');
  }

  return (
    <div className="flex flex-col items-start gap-4 w-max">
      {children}
      <button className="btn btn-info" onClick={backToShopButton}>
        Back to the shop
      </button>
    </div>
  );
}
