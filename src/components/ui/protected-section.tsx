'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { LoginModal } from '@/components/ui/login-modal';
import { LoginFailureModal } from '@/components/login-failure-modal';
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
  const [showLoginFailureModal, setShowLoginFailureModal] = useState(false);

  // Remove automatic modal opening - only show on user click

  const handleVerifyClick = () => {
    setShowLoginModal(true);
  };

  const handleAuthFailed = () => {
    setShowLoginModal(false);
    setShowLoginFailureModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleCloseLoginFailure = () => {
    setShowLoginFailureModal(false);
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
        <LoginFailureModal
          isOpen={showLoginFailureModal}
          onClose={handleCloseLoginFailure}
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

      <LoginFailureModal
        isOpen={showLoginFailureModal}
        onClose={handleCloseLoginFailure}
      />
    </>
  );
}
