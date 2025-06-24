'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const ServicesContainer = styled.section`
  padding: ${props => props.theme.spacing.section} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${props => props.theme.spacing.xxxl};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
  }
`;

const ArtisticFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 400px;
  border: 8px solid ${props => props.theme.colors.lightGold};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  overflow: hidden;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 300px;
    height: 350px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid ${props => props.theme.colors.accent};
    border-radius: ${props => props.theme.borderRadius.lg};
    z-index: -1;
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FloralCorner = styled.div<{ $position: string }>`
  position: absolute;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10 Q20 5 30 10 Q25 20 10 30 Z" fill="#D4AF37" opacity="0.3"/>
      <path d="M20 30 Q30 25 40 30 Q35 40 20 50 Z" fill="#E8C5A0" opacity="0.4"/>
      <path d="M40 20 Q50 15 60 20 Q55 30 40 40 Z" fill="#D4AF37" opacity="0.3"/>
      <circle cx="50" cy="50" r="3" fill="#D4AF37" opacity="0.5"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;
  z-index: 3;
  
  ${props => {
    switch (props.$position) {
      case 'top-left':
        return `
          top: -20px;
          left: -20px;
        `;
      case 'bottom-right':
        return `
          bottom: -20px;
          right: -20px;
          transform: rotate(180deg);
        `;
      default:
        return '';
    }
  }}
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 70px;
    height: 70px;
    
    ${props => {
      switch (props.$position) {
        case 'top-left':
          return `
            top: -15px;
            left: -15px;
          `;
        case 'bottom-right':
          return `
            bottom: -15px;
            right: -15px;
          `;
        default:
          return '';
      }
    }}
  }
`;

const TextContent = styled.div`
  position: relative;
  z-index: 2;
`;

const ServiceIconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.cream};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.accent};
`;

const ServiceIcon = styled(Camera)`
  color: ${props => props.theme.colors.primary};
  width: 24px;
  height: 24px;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 500px;
`;

const CTAButton = styled(Button)`
  background: ${props => props.theme.colors.darkBrown};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 30%;
  right: -100px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(232, 197, 160, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
`;

export function ServicesSection() {
  return (
    <ServicesContainer id="services">
      <BackgroundDecoration />
      <ContentWrapper>
        <ImageSection>
          <ArtisticFrame>
            <ServiceImage 
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=500&h=600&fit=crop&crop=faces"
              alt="Wedding Photography"
            />
          </ArtisticFrame>
          <FloralCorner $position="top-left" />
          <FloralCorner $position="bottom-right" />
        </ImageSection>
        
        <TextContent>
          <ServiceIconContainer>
            <ServiceIcon />
          </ServiceIconContainer>
          <SectionTitle>
            Wedding<br />
            Photography
          </SectionTitle>
          <Description>
            A good wedding photographer will be able to tell the story of the day through their images, capturing the joy, excitement, and love shared by the couple and their guests. Our professional photographers ensure every precious moment is preserved forever.
          </Description>
          <CTAButton onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </CTAButton>
        </TextContent>
      </ContentWrapper>
    </ServicesContainer>
  );
} 