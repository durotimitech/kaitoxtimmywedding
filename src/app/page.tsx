'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { CountdownSection } from '@/components/sections/countdown-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProposalVideoSection } from '@/components/sections/proposal-video-section';
import { PhotoGallerySection } from '@/components/sections/photo-gallery-section';
import { CeremonyDetailsSection } from '@/components/sections/ceremony-details-section';
import { BankDetailsSection } from '@/components/sections/bank-details-section';
import { GuestbookSection } from '@/components/sections/guestbook-section';
import { FloatingNavigation } from '@/components/floating-navigation';

export default function Home() {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const openMessageModal = () => setIsMessageModalOpen(true);
  const closeMessageModal = () => setIsMessageModalOpen(false);

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <ProposalVideoSection />
        <PhotoGallerySection />
        <CeremonyDetailsSection />
        <BankDetailsSection />
        <GuestbookSection
          isModalOpen={isMessageModalOpen}
          onOpenModal={openMessageModal}
          onCloseModal={closeMessageModal}
        />
      </main>
      <FloatingNavigation onSendMessage={openMessageModal} />
    </>
  );
}
