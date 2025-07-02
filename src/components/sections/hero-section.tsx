'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';
import { ReservationModal } from '@/components/ui/modal';
import { useState } from 'react';

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

const TextContent = styled(motion.div)`
  /* Removed CSS animation in favor of Motion animations */
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

const CTAButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ImageCollage = styled(motion.div)`
  position: relative;
  height: 500px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
  }
`;

const ImageFrame = styled(motion.div)<{ $position: string }>`
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};
  cursor: pointer;

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
      case 'extra1':
        return `
          bottom: 40px;
          left: 60px;
          width: 160px;
          height: 200px;
          z-index: 5;
        `;
      case 'extra2':
        return `
          top: 120px;
          left: 180px;
          width: 140px;
          height: 180px;
          z-index: 4;
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
        case 'extra1':
          return `
            width: 120px;
            height: 160px;
            bottom: 30px;
            left: 40px;
          `;
        case 'extra2':
          return `
            width: 100px;
            height: 130px;
            top: 100px;
            left: 140px;
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
          <TextContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Subtitle>#AGizdodoLoveStory</Subtitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MainTitle>Come celebrate this important day with us!</MainTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <CTAButton
                onClick={handleReserveClick}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                  boxShadow: '0 10px 25px rgba(212, 175, 55, 0.3)',
                }}
                whileTap={{
                  scale: 0.98,
                  y: -1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Reserve your special spot!
              </CTAButton>
            </motion.div>
          </TextContent>

          <ImageCollage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <ImageFrame
              $position="large"
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{
                y: -8,
                rotate: 2,
                scale: 1.02,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <Image src="/9.jpg" alt="Romantic wedding moment" />
            </ImageFrame>
            <ImageFrame
              $position="medium"
              initial={{ opacity: 0, y: 30, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{
                y: -8,
                rotate: -2,
                scale: 1.02,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <Image src="/1.jpg" alt="Wedding couple dancing" />
            </ImageFrame>
            <ImageFrame
              $position="small"
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{
                y: -8,
                rotate: 3,
                scale: 1.02,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <Image src="/5.jpg" alt="Wedding ceremony" />
            </ImageFrame>
            <ImageFrame
              $position="extra1"
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{
                y: -8,
                rotate: -4,
                scale: 1.02,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <Image src="/8.jpg" alt="Wedding celebration" />
            </ImageFrame>
            <ImageFrame
              $position="extra2"
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{
                y: -8,
                rotate: 5,
                scale: 1.02,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <Image src="/4.jpg" alt="Wedding portrait" />
            </ImageFrame>
            <DecorativeElement />
          </ImageCollage>
        </ContentWrapper>
      </HeroContainer>

      <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
