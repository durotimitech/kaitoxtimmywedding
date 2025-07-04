'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { LoginModal } from '@/components/ui/login-modal';
import { ReservationModal } from '@/components/ui/modal';
import { LoadingFallback, SectionType } from '@/components/ui/loading-fallback';

interface ProtectedSectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionType?: SectionType;
}

export function ProtectedSection({
  children,
  fallback,
  sectionType = 'default',
}: ProtectedSectionProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // Remove automatic modal opening - only show on user click

  const handleVerifyClick = () => {
    setShowLoginModal(true);
  };

  const handleAuthFailed = () => {
    setShowLoginModal(false);
    setShowReservationModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleCloseReservation = () => {
    setShowReservationModal(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        {fallback || (
          <LoadingFallback
            onVerifyClick={handleVerifyClick}
            sectionType={sectionType}
          />
        )}
        <LoginModal
          isOpen={showLoginModal}
          onClose={handleCloseLogin}
          onAuthFailed={handleAuthFailed}
        />
        <ReservationModal
          isOpen={showReservationModal}
          onClose={handleCloseReservation}
        />
      </>
    );
  }

  // If authenticated, show the protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, show fallback and modals
  return (
    <>
      {fallback || (
        <LoadingFallback
          onVerifyClick={handleVerifyClick}
          sectionType={sectionType}
        />
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLogin}
        onAuthFailed={handleAuthFailed}
      />

      <ReservationModal
        isOpen={showReservationModal}
        onClose={handleCloseReservation}
      />
    </>
  );
}
