'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CountdownContainer = styled.section`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: ${props => props.theme.spacing.xxxl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    text-align: center;
  }
`;

const PhotoSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HexagonFrame = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 40px;
`;

const HexagonImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/3.jpg');
  background-size: cover;
  background-position: center;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  z-index: 2;
`;

const FloralDecoration = styled.div<{ $position: string }>`
  position: absolute;
  width: 80px;
  height: 80px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="8" fill="#E8C5A0" opacity="0.7"/>
      <circle cx="50" cy="20" r="6" fill="#D4AF37" opacity="0.6"/>
      <circle cx="70" cy="30" r="7" fill="#E8C5A0" opacity="0.7"/>
      <circle cx="40" cy="50" r="5" fill="#D4AF37" opacity="0.5"/>
      <circle cx="60" cy="50" r="6" fill="#E8C5A0" opacity="0.6"/>
      <path d="M20 70 Q30 60 40 70 Q50 80 60 70 Q70 60 80 70" stroke="#D4AF37" stroke-width="2" fill="none" opacity="0.5"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;
  z-index: 1;

  ${props => {
    switch (props.$position) {
      case 'top-left':
        return `
          top: -20px;
          left: -20px;
        `;
      case 'top-right':
        return `
          top: -10px;
          right: -30px;
          transform: rotate(45deg);
        `;
      case 'bottom-left':
        return `
          bottom: -20px;
          left: -10px;
          transform: rotate(-30deg);
        `;
      case 'bottom-right':
        return `
          bottom: -10px;
          right: -20px;
          transform: rotate(60deg);
        `;
      default:
        return '';
    }
  }}
`;

const CountdownContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    align-items: center;
  }
`;

const CoupleNames = styled.h2`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${props => props.theme.colors.accent};
  }
`;

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 500px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.md};
  }
`;

const TimeUnit = styled.div`
  text-align: center;
  position: relative;
`;

const TimeNumber = styled.div`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  text-transform: capitalize;
  font-weight: 500;
`;

const DecorativeIcon = styled.div<{ $index: number }>`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#D4AF37" opacity="0.6"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }

  ${props => props.$index === 3 && `display: none;`}
`;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-08-06T12:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <CountdownContainer id="countdown">
      <ContentWrapper>
        <PhotoSection>
          <HexagonFrame>
            <HexagonImage />
            <FloralDecoration $position="top-left" />
            <FloralDecoration $position="top-right" />
            <FloralDecoration $position="bottom-left" />
            <FloralDecoration $position="bottom-right" />
          </HexagonFrame>
        </PhotoSection>

        <CountdownContent>
          <CoupleNames>Kaito & Timmy</CoupleNames>

          <CountdownGrid>
            {timeUnits.map((unit, index) => (
              <TimeUnit key={unit.label}>
                <TimeNumber>
                  {unit.value.toString().padStart(2, '0')}
                </TimeNumber>
                <TimeLabel>{unit.label}</TimeLabel>
                <DecorativeIcon $index={index} />
              </TimeUnit>
            ))}
          </CountdownGrid>
        </CountdownContent>
      </ContentWrapper>
    </CountdownContainer>
  );
}
