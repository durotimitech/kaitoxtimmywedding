'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { Navigation } from '@/components/navigation';
import { DietaryForm } from '@/components/dietary-form';
import { AuthProvider } from '@/contexts/auth-context';
import { AttendanceModalHandler } from '@/components/attendance-modal-handler';
import { useAuth } from '@/contexts/auth-context';
import { LoginModal } from '@/components/ui/login-modal';
import { LoginFailureModal } from '@/components/login-failure-modal';
import { Utensils } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  padding-top: 120px;
  padding-bottom: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing.lg};
  padding-right: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-left: ${props => props.theme.spacing.md};
    padding-right: ${props => props.theme.spacing.md};
  }
`;

const LockScreen = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const LockIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const LockTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const LockDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const VerifyButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #b8941f;
  }
`;

function DietaryContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginFailureModal, setShowLoginFailureModal] = useState(false);

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

  if (isLoading) {
    return (
      <MainContent>
        <LockScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LockIcon
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Utensils size={40} />
          </LockIcon>
          <LockTitle>Loading...</LockTitle>
        </LockScreen>
      </MainContent>
    );
  }

  if (!isAuthenticated) {
    return (
      <MainContent>
        <LockScreen
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LockIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Utensils size={40} />
          </LockIcon>
          <LockTitle>Dietary Restrictions</LockTitle>
          <LockDescription>
            Please verify your invitation details to access this page and let us
            know about any dietary restrictions or allergies you may have.
          </LockDescription>
          <VerifyButton
            onClick={handleVerifyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Verify Your Details
          </VerifyButton>
        </LockScreen>

        <LoginModal
          isOpen={showLoginModal}
          onClose={handleCloseLogin}
          onAuthFailed={handleAuthFailed}
        />

        <LoginFailureModal
          isOpen={showLoginFailureModal}
          onClose={handleCloseLoginFailure}
        />
      </MainContent>
    );
  }

  return (
    <MainContent>
      <DietaryForm />
    </MainContent>
  );
}

export default function DietaryPage() {
  return (
    <AuthProvider>
      <PageContainer>
        <Navigation />
        <DietaryContent />
        <AttendanceModalHandler />
      </PageContainer>
    </AuthProvider>
  );
}
