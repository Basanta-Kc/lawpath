import { Suspense } from 'react';
import AddressValidatorClient from './AddressValidatorClient';
import { Logo } from '@/components/Logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <h1 className="text-3xl font-bold text-center text-gray-800">Address Validator</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <AddressValidatorClient />
        </Suspense>
      </div>
    </main>
  );
}

