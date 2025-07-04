'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { CountdownSection } from '@/components/sections/countdown-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProposalVideoSection } from '@/components/sections/proposal-video-section';
import { PhotoGallerySection } from '@/components/sections/photo-gallery-section';
import { CeremonyDetailsSection } from '@/components/sections/ceremony-details-section';
import { TravelAccommodationSection } from '@/components/sections/travel-accommodation-section';
import { FAQSection } from '@/components/sections/faq-section';
import { BankDetailsSection } from '@/components/sections/bank-details-section';
import { GuestbookSection } from '@/components/sections/guestbook-section';
import { FloatingNavigation } from '@/components/floating-navigation';
import { AuthProvider } from '@/contexts/auth-context';
import { ProtectedSection } from '@/components/ui/protected-section';

export default function Home() {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const openMessageModal = () => setIsMessageModalOpen(true);
  const closeMessageModal = () => setIsMessageModalOpen(false);

  return (
    <AuthProvider>
      <Navigation />
      <main>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <ProposalVideoSection />
        <PhotoGallerySection />
        <ProtectedSection sectionType="ceremony">
          <CeremonyDetailsSection />
        </ProtectedSection>
        <ProtectedSection sectionType="travel">
          <TravelAccommodationSection />
        </ProtectedSection>
        <FAQSection />
        <BankDetailsSection />
        <GuestbookSection
          isModalOpen={isMessageModalOpen}
          onOpenModal={openMessageModal}
          onCloseModal={closeMessageModal}
        />
      </main>
      <FloatingNavigation onSendMessage={openMessageModal} />
    </AuthProvider>
  );
}
