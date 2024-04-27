'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SuccessPayment() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="mt-24 flex flex-col mx-4 lg:mx-0">
      <p className="mb-6 text-3xl font-bold text-pk-green text-center">
        Danke für deine Unterstützung der Band mit deinem Kauf. Sobald wir eine Zahlungsbestätigung erhalten, bekommst
        du eine E-Mail mit den Details!
      </p>
    </div>
  );
}

export default SuccessPayment;
