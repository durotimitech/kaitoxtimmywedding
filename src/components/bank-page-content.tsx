'use client';

import { Navigation } from '@/components/navigation';
import { BankDetailsSection } from '@/components/sections/bank-details-section';

export function BankPageContent() {
  return (
    <>
      <Navigation />
      <main>
        <BankDetailsSection />
      </main>
    </>
  );
}
