import * as React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
`;

const ModalContent = styled.div`
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

const CloseButton = styled.button`
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
  transition: background-color 0.2s;
  outline: none;

  &:hover {
    background: #f3f4f6;
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const ModalTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: 24px;
  font-weight: 600;
  color: #2d2d2d;
  margin-bottom: 16px;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #6b7280;
  text-align: center;
  margin-bottom: 24px;
`;

// Removed unused ContactInfo, ContactLabel, and ContactDetail components

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve Your Spot">
      <ModalMessage>
        To reserve your special spot at our wedding celebration, please contact
        the couple directly. We can&apos;t wait to celebrate this important day
        with you!
      </ModalMessage>
    </Modal>
  );
}
