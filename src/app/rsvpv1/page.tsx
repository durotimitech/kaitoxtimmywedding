'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { RSVPModal } from '@/components/ui/rsvp-modal';
import { ArrowLeft, Heart } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.secondary} 0%,
    ${props => props.theme.colors.background} 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  position: relative;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  left: ${props => props.theme.spacing.lg};
  background: white;
  border: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.8rem;
    padding: ${props => props.theme.spacing.sm}
      ${props => props.theme.spacing.md};
  }
`;

const WelcomeContent = styled(motion.div)`
  text-align: center;
  max-width: 600px;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const WelcomeTitle = styled.h1`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HeartIcon = styled(motion.div)`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export default function RSVPPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Open modal on page load
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally navigate back to home page after closing
    // router.push('/');
  };

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <PageContainer>
      <BackButton
        onClick={handleBackClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <ArrowLeft size={16} />
        Back to Home
      </BackButton>

      <WelcomeContent
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeartIcon>
            <Heart size={48} fill="currentColor" />
          </HeartIcon>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <WelcomeTitle>RSVP for Our Special Day</WelcomeTitle>
          <WelcomeMessage>
            We&apos;re so excited to celebrate with you! Please fill out your
            details to reserve your spot at our wedding celebration.
          </WelcomeMessage>
        </motion.div>
      </WelcomeContent>

      <RSVPModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </PageContainer>
  );
}
