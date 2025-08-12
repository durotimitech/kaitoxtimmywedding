'use client';

import styled from 'styled-components';
import { MessageCircle, Gift, Heart } from 'lucide-react';

const FloatingNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  z-index: 100;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.sm}
      ${props => props.theme.spacing.md};
  }
`;

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.sm};
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.xs};
  }
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  min-height: 60px;
  justify-content: center;
  outline: none;

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.xs};
    font-size: 0.7rem;
    min-height: 50px;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.span`
  text-align: center;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.65rem;
  }
`;

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

interface FloatingNavigationProps {
  onSendMessage: () => void;
  onRSVP: () => void;
}

export function FloatingNavigation({
  onSendMessage,
  onRSVP,
}: FloatingNavigationProps) {
  return (
    <FloatingNav>
      <NavContainer>
        <NavButton onClick={onRSVP}>
          <ButtonIcon>
            <Heart size={18} />
          </ButtonIcon>
          <ButtonText>RSVP</ButtonText>
        </NavButton>

        <NavButton onClick={onSendMessage}>
          <ButtonIcon>
            <MessageCircle size={18} />
          </ButtonIcon>
          <ButtonText>Send Message</ButtonText>
        </NavButton>

        <NavButton onClick={() => smoothScrollTo('gifts')}>
          <ButtonIcon>
            <Gift size={18} />
          </ButtonIcon>
          <ButtonText>Give Cash Gifts</ButtonText>
        </NavButton>
      </NavContainer>
    </FloatingNav>
  );
}
