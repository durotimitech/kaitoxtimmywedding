'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';
import { Lock, Heart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoadingContainer = styled(motion.div)`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
`;

const LoadingIcon = styled(motion.div)`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const LoadingTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const LoadingMessage = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1rem;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const VerifyButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background: #7a6348;
  }
`;

export type SectionType = 'ceremony' | 'travel' | 'songs' | 'default';

interface LoadingFallbackProps {
  onVerifyClick: () => void;
  sectionType?: SectionType;
}

const getSectionContent = (sectionType: SectionType) => {
  switch (sectionType) {
    case 'ceremony':
      return {
        title: 'Ceremony Details',
        message:
          'View exclusive ceremony details including venue location, timing, and special instructions for our wedding day.',
      };
    case 'travel':
      return {
        title: 'Travel & Accommodation',
        message:
          'Access detailed travel information including the best airports to fly into Ireland, transportation options, and recommended hotels.',
      };
    case 'songs':
      return {
        title: 'Song Requests',
        message:
          'Request songs for our wedding celebration and see what others have requested.',
      };
    default:
      return {
        title: 'Exclusive Content',
        message:
          'This content is exclusively available to verified wedding guests. Please authenticate to view the details.',
      };
  }
};

export function LoadingFallback({
  onVerifyClick,
  sectionType = 'default',
}: LoadingFallbackProps) {
  const content = getSectionContent(sectionType);

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <LoadingIcon
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Lock size={32} />
        <Heart size={24} fill="currentColor" />
      </LoadingIcon>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <LoadingTitle>{content.title}</LoadingTitle>
        <LoadingMessage>{content.message}</LoadingMessage>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <VerifyButton onClick={onVerifyClick}>
            <LogIn size={18} />
            View Details
          </VerifyButton>
        </motion.div>
      </motion.div>
    </LoadingContainer>
  );
}
