import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { CountdownSection } from '@/components/sections/countdown-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { PhotoGallerySection } from '@/components/sections/photo-gallery-section';
import { RSVPSection } from '@/components/sections/rsvp-section';
import { CeremonyDetailsSection } from '@/components/sections/ceremony-details-section';
import { BankDetailsSection } from '@/components/sections/bank-details-section';
import { GuestbookSection } from '@/components/sections/guestbook-section';
import { FloatingNavigation } from '@/components/floating-navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <ServicesSection />
        <PhotoGallerySection />
        <RSVPSection />
        <CeremonyDetailsSection />
        <BankDetailsSection />
        <GuestbookSection />
      </main>
      <FloatingNavigation />
    </>
  );
}
