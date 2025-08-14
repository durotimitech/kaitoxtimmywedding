'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

interface LoginFailureModalProps {
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
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const AlertIcon = styled.div`
  background: #fee2e2;
  color: #dc2626;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #4b5563;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const ContactInfo = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const ContactTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
  text-align: center;
`;

const ContactDetails = styled.div`
  text-align: center;
  color: #6b7280;
  line-height: 1.6;

  strong {
    color: #374151;
    font-weight: 600;
  }
`;

const DismissButton = styled(motion.button)`
  width: 100%;
  padding: 12px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #7a6348;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 115, 85, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export function LoginFailureModal({ isOpen, onClose }: LoginFailureModalProps) {
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
              onClose();
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
              onClick={onClose}
            >
              <X size={24} />
            </CloseButton>

            <IconWrapper>
              <AlertIcon>
                <AlertCircle size={32} />
              </AlertIcon>
            </IconWrapper>

            <Title>Details Not Found</Title>

            <Message>
              We couldn&apos;t verify your details. This might be because:
            </Message>

            <ContactInfo>
              <ul
                style={{
                  textAlign: 'left',
                  margin: '0 auto',
                  maxWidth: '300px',
                  color: '#6b7280',
                }}
              >
                <li>Your RSVP hasn&apos;t been processed yet</li>
                <li>There might be a typo in your information</li>
              </ul>
            </ContactInfo>

            <ContactTitle>Please Contact the Couple</ContactTitle>
            <ContactDetails>
              If you&apos;re having trouble accessing the protected areas,
              please reach out to <strong>Kaito</strong> or{' '}
              <strong>Timmy</strong> directly for assistance. They&apos;ll be
              happy to help you out!.
            </ContactDetails>

            <div style={{ marginTop: '24px' }}>
              <DismissButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
              >
                Understood
              </DismissButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
