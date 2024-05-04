'use client';
import { useSearchParams } from 'next/navigation';

function ErrorPayment({
  searchParams,
}: {
  searchParams?: {
    message?: string;
  };
}) {
  // const searchParams = useSearchParams();
  const message = searchParams?.message || '';
  return (
    <div className="mt-24 flex flex-col mx-4 lg:mx-0">
      {message ? (
        <p className="mb-6 text-3xl font-bold text-red-500 text-center">{message}</p>
      ) : (
        <p className="mb-6 text-3xl font-bold text-red-500 text-center">
          Es scheint, als würde unser Shop derzeit nicht richtig funktionieren. Bitte versuch es später noch einmal!
        </p>
      )}
    </div>
  );
}

export default ErrorPayment;
