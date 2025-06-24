'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/button';

const AboutContainer = styled.section`
  padding: ${props => props.theme.spacing.section} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.secondary};
  position: relative;
  overflow: hidden;
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
  }
`;

const TextContent = styled.div`
  position: relative;
  z-index: 2;
`;

const SectionLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 400;
  letter-spacing: 0.5px;
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

const ImageSection = styled.div`
  position: relative;
  height: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
    order: -1;
  }
`;

const MainImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 400px;
  background-image: url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&h=600&fit=crop&crop=faces');
  background-size: cover;
  background-position: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 300px;
    height: 350px;
  }
`;

const FloralDecorationLarge = styled.div`
  position: absolute;
  top: -30px;
  right: -50px;
  width: 120px;
  height: 120px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20 Q70 30 60 40 Q50 30 60 20" fill="#D4AF37" opacity="0.4"/>
      <path d="M60 40 Q70 50 60 60 Q50 50 60 40" fill="#E8C5A0" opacity="0.5"/>
      <path d="M60 60 Q70 70 60 80 Q50 70 60 60" fill="#D4AF37" opacity="0.4"/>
      <path d="M30 50 Q40 40 50 50 Q40 60 30 50" fill="#E8C5A0" opacity="0.5"/>
      <path d="M70 50 Q80 40 90 50 Q80 60 70 50" fill="#D4AF37" opacity="0.4"/>
      <circle cx="60" cy="50" r="3" fill="#D4AF37" opacity="0.6"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 80px;
    height: 80px;
    top: -20px;
    right: -30px;
  }
`;

const FloralDecorationSmall = styled.div`
  position: absolute;
  bottom: -20px;
  left: -30px;
  width: 80px;
  height: 80px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="6" fill="#E8C5A0" opacity="0.6"/>
      <circle cx="40" cy="20" r="4" fill="#D4AF37" opacity="0.5"/>
      <circle cx="55" cy="25" r="5" fill="#E8C5A0" opacity="0.6"/>
      <circle cx="30" cy="40" r="3" fill="#D4AF37" opacity="0.4"/>
      <circle cx="50" cy="40" r="4" fill="#E8C5A0" opacity="0.5"/>
      <path d="M15 55 Q25 45 35 55 Q45 65 55 55 Q65 45 75 55" stroke="#D4AF37" stroke-width="2" fill="none" opacity="0.4"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;
  z-index: 1;
  transform: rotate(-15deg);
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 60px;
    height: 60px;
    bottom: -15px;
    left: -20px;
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 20%;
  left: -100px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
`;

export function AboutSection() {
  return (
    <AboutContainer id="about">
      <BackgroundDecoration />
      <ContentWrapper>
        <TextContent>
          <SectionLabel>About Us</SectionLabel>
          <SectionTitle>
            Custom Wedding<br />
            Planning
          </SectionTitle>
          <Description>
            Wedding services encompass a wide range of offerings that help couples plan and execute their dream wedding. These services can include anything from full-service wedding planning and coordination, to individual vendor referrals, décor and design, and day-of coordination.
          </Description>
          <CTAButton onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}>
            See more
          </CTAButton>
        </TextContent>
        
        <ImageSection>
          <MainImage />
          <FloralDecorationLarge />
          <FloralDecorationSmall />
        </ImageSection>
      </ContentWrapper>
    </AboutContainer>
  );
} 