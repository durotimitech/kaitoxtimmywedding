'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Send } from 'lucide-react';

const GuestbookContainer = styled.section`
  padding: ${props => props.theme.spacing.section} ${props => props.theme.spacing.lg};
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
  margin-bottom: ${props => props.theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: ${props => props.theme.spacing.xxl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing.xl};
  }
`;

const FormContainer = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FormTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const FormField = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 0.95rem;
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
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const MessagesTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const MessageCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  
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

const MessageAuthor = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

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

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
}

interface GuestbookFormData {
  name: string;
  message: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    name: 'Emily & James',
    message: 'So excited to celebrate your special day with you both! Wishing you a lifetime of love and happiness together. ❤️',
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'The Williams Family',
    message: 'Congratulations on your engagement! We are thrilled to be part of your wedding celebration. See you soon!',
    date: '1 week ago'
  }
];

export function GuestbookSection() {
  const [formData, setFormData] = useState<GuestbookFormData>({
    name: '',
    message: '',
  });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add new message to the list
    const newMessage: Message = {
      id: messages.length + 1,
      name: formData.name,
      message: formData.message,
      date: 'Just now'
    };

    setMessages(prev => [newMessage, ...prev]);
    setFormData({ name: '', message: '' });
    setShowSuccess(true);
    setIsSubmitting(false);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <GuestbookContainer id="messages">
      <SectionTitle>Kind Messages</SectionTitle>
      <SectionSubtitle>
        Leave us a message! We'd love to hear your thoughts, wishes, and advice as we begin this new chapter together.
      </SectionSubtitle>
      
      <ContentContainer>
        <FormContainer>
          <FormTitle>
            <MessageCircle size={20} />
            Share Your Message
          </FormTitle>
          
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="guestbook-name">Your Name *</Label>
              <Input
                id="guestbook-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-white border-[#E5D5C8] focus:border-[#8B7355]"
                placeholder="Enter your name"
              />
            </FormField>

            <FormField>
              <Label htmlFor="guestbook-message">Your Message *</Label>
              <TextArea
                id="guestbook-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Share your thoughts, wishes, or advice for the happy couple..."
              />
            </FormField>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8B7355] hover:bg-[#7A6348] text-white py-3 text-lg"
            >
              <Send size={18} className="mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            {showSuccess && (
              <SuccessMessage>
                <Heart size={16} />
                Thank you for your beautiful message! It means the world to us.
              </SuccessMessage>
            )}
          </form>
        </FormContainer>

        <MessagesContainer>
          <MessagesTitle>
            <Heart size={20} />
            Messages from Our Loved Ones ({messages.length})
          </MessagesTitle>
          
          {messages.map((message) => (
            <MessageCard key={message.id}>
              <MessageAuthor>{message.name}</MessageAuthor>
              <MessageText>{message.message}</MessageText>
              <MessageDate>{message.date}</MessageDate>
            </MessageCard>
          ))}
        </MessagesContainer>
      </ContentContainer>
    </GuestbookContainer>
  );
} 