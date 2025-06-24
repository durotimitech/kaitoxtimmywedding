'use client';

import styled, { keyframes } from 'styled-components';
import { Button } from '@/components/ui/button';
import { ReservationModal } from '@/components/ui/modal';
import { useState } from 'react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  padding: 120px ${props => props.theme.spacing.lg}
    ${props => props.theme.spacing.section};
  background: ${props => props.theme.colors.secondary};
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(212, 175, 55, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${props => props.theme.spacing.xxxl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    text-align: center;
  }
`;

const TextContent = styled.div`
  animation: ${fadeIn} 1.5s ease-out;
`;

const Subtitle = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const MainTitle = styled.h1`
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  line-height: 1.2;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

// Removed unused Description component

const CTAButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background: ${props => props.theme.colors.primary};
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

const ImageCollage = styled.div`
  position: relative;
  height: 500px;
  animation: ${fadeIn} 1.8s ease-out 0.3s both;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
  }
`;

const ImageFrame = styled.div<{ $position: string }>`
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  ${props => {
    switch (props.$position) {
      case 'large':
        return `
          top: 0;
          left: 0;
          width: 250px;
          height: 350px;
          z-index: 3;
        `;
      case 'medium':
        return `
          top: 80px;
          right: 50px;
          width: 200px;
          height: 280px;
          z-index: 2;
        `;
      case 'small':
        return `
          bottom: 0;
          right: 0;
          width: 180px;
          height: 240px;
          z-index: 1;
        `;
      default:
        return '';
    }
  }}

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    ${props => {
      switch (props.$position) {
        case 'large':
          return `
            width: 200px;
            height: 280px;
          `;
        case 'medium':
          return `
            width: 160px;
            height: 220px;
            top: 60px;
            right: 40px;
          `;
        case 'small':
          return `
            width: 140px;
            height: 180px;
          `;
        default:
          return '';
      }
    }}
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DecorativeElement = styled.div`
  position: absolute;
  top: 50px;
  right: -20px;
  width: 80px;
  height: 80px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 Q60 30 50 40 Q40 30 50 20" fill="#D4AF37" opacity="0.3"/>
      <path d="M50 40 Q60 50 50 60 Q40 50 50 40" fill="#D4AF37" opacity="0.3"/>
      <path d="M50 60 Q60 70 50 80 Q40 70 50 60" fill="#D4AF37" opacity="0.3"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;
  z-index: 4;
`;

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserveClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <HeroContainer id="hero">
        <ContentWrapper>
          <TextContent>
            <Subtitle>#AGizdodoLoveStory</Subtitle>
            <MainTitle>Come celebrate this important day with us!</MainTitle>
            <CTAButton onClick={handleReserveClick}>
              Reserve your special spot!
            </CTAButton>
          </TextContent>

          <ImageCollage>
            <ImageFrame $position="large">
              <Image src="/1.jpg" alt="Romantic wedding moment" />
            </ImageFrame>
            <ImageFrame $position="medium">
              <Image src="/4.jpg" alt="Wedding couple dancing" />
            </ImageFrame>
            <ImageFrame $position="small">
              <Image src="/5.jpg" alt="Wedding ceremony" />
            </ImageFrame>
            <DecorativeElement />
          </ImageCollage>
        </ContentWrapper>
      </HeroContainer>

      <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
