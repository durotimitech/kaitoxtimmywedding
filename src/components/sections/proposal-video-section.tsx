'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';
import { useState } from 'react';

const ProposalContainer = styled.section`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.3;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const InstagramWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InstagramEmbed = styled.div`
  width: 100%;
  max-width: 540px;
  min-height: 680px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 320px;
    min-height: 560px;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 680px;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary}20,
    ${props => props.theme.colors.secondary}40
  );
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 560px;
  }
`;

const InstagramIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PlaceholderText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const PlaceholderSubtext = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  opacity: 0.8;
  text-align: center;
`;

const DecorativeElement = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 Q60 20 50 30 Q40 20 50 10" fill="#D4AF37" opacity="0.3"/>
      <path d="M50 30 Q60 40 50 50 Q40 40 50 30" fill="#E8C5A0" opacity="0.4"/>
      <path d="M50 50 Q60 60 50 70 Q40 60 50 50" fill="#D4AF37" opacity="0.3"/>
      <path d="M50 70 Q60 80 50 90 Q40 80 50 70" fill="#E8C5A0" opacity="0.4"/>
      <circle cx="50" cy="50" r="2" fill="#D4AF37" opacity="0.6"/>
    </svg>
  `)}') no-repeat center;
  background-size: contain;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export function ProposalVideoSection() {
  const [isInstagramLoaded, setIsInstagramLoaded] = useState(false);

  // Replace this with your actual Instagram reel URL
  const instagramReelUrl = 'https://www.instagram.com/p/DGostoxoCGV/embed';

  return (
    <ProposalContainer id="proposal-video">
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle>Our Proposal Story</SectionTitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionSubtitle>
            Relive the magical moment when our love story took its most
            beautiful turn. Watch how it all began and see the joy that started
            our journey to forever.
          </SectionSubtitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <VideoContainer>
            <InstagramWrapper>
              <InstagramEmbed>
                {isInstagramLoaded ? (
                  <motion.iframe
                    src={instagramReelUrl}
                    width="540"
                    height="680"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    style={{
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      maxWidth: '100%',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <LoadingPlaceholder>
                    <InstagramIcon
                      onClick={() => setIsInstagramLoaded(true)}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: '0 8px 25px rgba(240, 148, 51, 0.4)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      📷
                    </InstagramIcon>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <PlaceholderText>Our Proposal Reel</PlaceholderText>
                      <PlaceholderSubtext>
                        Click to load Instagram reel
                      </PlaceholderSubtext>
                    </motion.div>
                  </LoadingPlaceholder>
                )}
              </InstagramEmbed>
            </InstagramWrapper>
          </VideoContainer>
        </motion.div>
      </ContentWrapper>
      <DecorativeElement />
    </ProposalContainer>
  );
}
