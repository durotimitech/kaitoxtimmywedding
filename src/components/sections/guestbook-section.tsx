'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, X } from 'lucide-react';
import { getMessages, addMessage } from '@/lib/messages';
import { Message } from '@/lib/supabase';

const slideDown = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const GuestbookContainer = styled.section`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
`;

const SendMessageButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1.1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background: #d92384;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const MessagesContainer = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(
      to bottom,
      rgba(254, 252, 248, 1),
      rgba(254, 252, 248, 0)
    );
    z-index: 2;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(
      to top,
      rgba(254, 252, 248, 1),
      rgba(254, 252, 248, 0)
    );
    z-index: 2;
    pointer-events: none;
  }
`;

const MessagesTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-align: center;
  justify-content: center;
`;

const AnimatedMessagesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  animation: ${slideDown} 30s linear infinite;
  padding: ${props => props.theme.spacing.lg} 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const MessageCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  min-height: 120px;
  margin: 0 ${props => props.theme.spacing.md};

  &::before {
    content: '';
    position: absolute;
    top: ${props => props.theme.spacing.md};
    left: -8px;
    width: 16px;
    height: 16px;
    background: white;
    border: 1px solid ${props => props.theme.colors.border};
    border-right: none;
    border-bottom: none;
    transform: rotate(-45deg);
  }
`;

// Removed unused MessageAuthor

const MessageText = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const MessageDate = styled.div`
  color: ${props => props.theme.colors.muted};
  font-size: 0.85rem;
  margin-top: ${props => props.theme.spacing.sm};
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: 1rem;
  padding: ${props => props.theme.spacing.xl};
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  font-size: 1rem;
  padding: ${props => props.theme.spacing.xl};
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  margin: ${props => props.theme.spacing.lg} 0;
`;

// Modal Styles
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
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 16px;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: 24px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: border-color 0.2s;
  margin-bottom: ${props => props.theme.spacing.lg};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
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
`;

interface GuestbookSectionProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return date.toLocaleDateString();
};

export function GuestbookSection({
  isModalOpen,
  onOpenModal,
  onCloseModal,
}: GuestbookSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedMessages = await getMessages();
        setMessages(fetchedMessages);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Cleanup subscription on unmount
    return () => {
      // No cleanup needed
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Add message to Supabase
      await addMessage(messageText.trim());

      // Reset form and show success
      setMessageText('');
      setShowSuccess(true);

      // Hide success message and close modal after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onCloseModal();
      }, 3000);
    } catch (err) {
      console.error('Error submitting message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    onCloseModal();
    setMessageText('');
    setShowSuccess(false);
    setError(null);
  };

  // Duplicate messages for seamless infinite scroll
  const duplicatedMessages =
    messages.length > 0 ? [...messages, ...messages] : [];

  return (
    <GuestbookContainer id="messages">
      <SectionTitle>Kind Messages</SectionTitle>
      <SectionSubtitle>
        Leave us a message! We&apos;d love to hear your thoughts, wishes, and
        advice as we begin this new chapter together.
      </SectionSubtitle>

      <ContentContainer>
        <SendMessageButton onClick={onOpenModal}>
          <MessageCircle size={20} />
          Send Message
        </SendMessageButton>

        <MessagesTitle>
          <Heart size={20} />
        </MessagesTitle>

        <MessagesContainer>
          {isLoading ? (
            <LoadingMessage>Loading messages...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : messages.length === 0 ? (
            <LoadingMessage>
              No messages yet. Be the first to leave a message!
            </LoadingMessage>
          ) : (
            <AnimatedMessagesWrapper>
              {duplicatedMessages.map((message, index) => (
                <MessageCard key={`${message.id}-${index}`}>
                  <MessageText>{message.message}</MessageText>
                  <MessageDate>
                    {formatDate(message.created_at || '')}
                  </MessageDate>
                </MessageCard>
              ))}
            </AnimatedMessagesWrapper>
          )}
        </MessagesContainer>
      </ContentContainer>

      {/* Message Modal */}
      <ModalOverlay
        $isOpen={isModalOpen}
        onClick={e => {
          if (e.target === e.currentTarget) {
            handleModalClose();
          }
        }}
      >
        <ModalContent>
          <CloseButton onClick={handleModalClose}>
            <X size={20} />
          </CloseButton>
          <ModalTitle>Share Your Message</ModalTitle>
          <ModalMessage>
            Send us your thoughts, wishes, or advice as we begin this new
            chapter together.
          </ModalMessage>

          {showSuccess && (
            <SuccessMessage>
              <Heart size={16} />
              Thank you for your beautiful message! It means the world to us.
            </SuccessMessage>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <TextArea
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Share your thoughts, wishes, or advice for the happy couple..."
              required
              disabled={isSubmitting}
            />

            <SendMessageButton
              type="submit"
              disabled={isSubmitting || !messageText.trim()}
              className="w-full bg-[#8B7355] hover:bg-[#7A6348] text-white py-3 text-lg"
              style={{ outline: 'none' }}
            >
              <Send size={18} className="mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SendMessageButton>
          </form>
        </ModalContent>
      </ModalOverlay>
    </GuestbookContainer>
  );
}
