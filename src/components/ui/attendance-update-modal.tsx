'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Calendar, X, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { updateAttendanceStatus } from '@/lib/rsvp';

interface AttendanceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ModalMessage = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
  line-height: 1.6;
`;

const WeddingInfo = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.md};
  background: rgba(212, 175, 55, 0.05);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid rgba(212, 175, 55, 0.1);
`;

const WeddingDate = styled.div`
  font-family: var(--font-playfair);
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const WeddingLocation = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight};
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const AttendanceButton = styled(Button)<{ variant: 'yes' | 'no' }>`
  background: ${props =>
    props.variant === 'yes'
      ? props.theme.colors.success
      : props.theme.colors.error};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  flex: 1;

  &:hover {
    background: ${props => (props.variant === 'yes' ? '#059669' : '#dc2626')};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const UserGreeting = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  font-weight: 500;
`;

export function AttendanceUpdateModal({
  isOpen,
  onClose,
}: AttendanceUpdateModalProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAttendanceUpdate = async (attending: boolean) => {
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await updateAttendanceStatus(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        attending
      );

      if (result.success) {
        setShowSuccess(true);
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
      } else {
        setError(result.error || 'Failed to update attendance status.');
      }
    } catch (err) {
      console.error('Attendance update error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setShowSuccess(false);
      setError(null);
      onClose();
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={e => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <CloseButton
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              <X size={20} />
            </CloseButton>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ModalTitle>
                <Calendar size={24} />
                Attendance Confirmation
              </ModalTitle>

              <UserGreeting>Welcome back, {user.first_name}!</UserGreeting>

              <ModalMessage>
                We hope you&apos;re still able to join us for our special day.
                Please let us know if you can still attend.
              </ModalMessage>

              <WeddingInfo>
                <WeddingDate>Monday, September 8th, 2025</WeddingDate>
                <WeddingLocation>Limerick, Ireland</WeddingLocation>
              </WeddingInfo>
            </motion.div>

            <AnimatePresence mode="wait">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <SuccessMessage>
                    <CheckCircle size={16} />
                    Thank you for updating your attendance status!
                  </SuccessMessage>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <ErrorMessage>{error}</ErrorMessage>
                </motion.div>
              )}
            </AnimatePresence>

            {!showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ButtonContainer>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{ flex: 1 }}
                  >
                    <AttendanceButton
                      variant="yes"
                      onClick={() => handleAttendanceUpdate(true)}
                      disabled={isSubmitting}
                    >
                      <CheckCircle size={18} />
                      {isSubmitting ? 'Updating...' : "Yes, I'll be there!"}
                    </AttendanceButton>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{ flex: 1 }}
                  >
                    <AttendanceButton
                      variant="no"
                      onClick={() => handleAttendanceUpdate(false)}
                      disabled={isSubmitting}
                    >
                      <XCircle size={18} />
                      {isSubmitting ? 'Updating...' : "Sorry, can't make it"}
                    </AttendanceButton>
                  </motion.div>
                </ButtonContainer>
              </motion.div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
