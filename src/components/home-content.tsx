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
import { SongRequestSection } from '@/components/sections/song-request-section';
import { BankDetailsSection } from '@/components/sections/bank-details-section';
import { GuestbookSection } from '@/components/sections/guestbook-section';
import { FloatingNavigation } from '@/components/floating-navigation';
import { ProtectedSection } from '@/components/ui/protected-section';
import { AttendanceModalHandler } from '@/components/attendance-modal-handler';
import { ReservationModal } from '@/components/ui/modal';
import { useAuth } from '@/contexts/auth-context';

export function HomeContent() {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const { isAuthenticated, openAttendanceModal } = useAuth();

  const openMessageModal = () => setIsMessageModalOpen(true);
  const closeMessageModal = () => setIsMessageModalOpen(false);
  const openReservationModal = () => setIsReservationModalOpen(true);
  const closeReservationModal = () => setIsReservationModalOpen(false);

  const handleRSVP = () => {
    if (isAuthenticated) {
      // If user is authenticated, show the attendance confirmation modal
      openAttendanceModal();
    } else {
      // If not authenticated, show the reservation modal (contact the couple)
      openReservationModal();
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <BankDetailsSection />
        <ProposalVideoSection />
        <PhotoGallerySection />
        <div id="ceremony">
          <ProtectedSection sectionType="ceremony">
            <CeremonyDetailsSection />
          </ProtectedSection>
        </div>
        <ProtectedSection sectionType="travel">
          <TravelAccommodationSection />
        </ProtectedSection>
        <FAQSection />
        <ProtectedSection sectionType="songs">
          <SongRequestSection />
        </ProtectedSection>
        <GuestbookSection
          isModalOpen={isMessageModalOpen}
          onOpenModal={openMessageModal}
          onCloseModal={closeMessageModal}
        />
      </main>
      <FloatingNavigation
        onSendMessage={openMessageModal}
        onRSVP={handleRSVP}
      />
      <AttendanceModalHandler />
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={closeReservationModal}
      />
    </>
  );
}
