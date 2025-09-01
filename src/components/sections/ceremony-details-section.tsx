'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Shirt, ExternalLink } from 'lucide-react';

const CeremonyContainer = styled(motion.section)`
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

const DetailsContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const InfoSection = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InfoIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const InfoContent = styled.div`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const MapLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #7a6348;
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

// Removed unused map components: MapContainer, MapPlaceholder, MapFrame

export function CeremonyDetailsSection() {
  const infoSections = [
    {
      icon: Calendar,
      title: 'Date',
      content: 'Monday, September 8, 2025',
    },
    {
      icon: Clock,
      title: 'Time',
      content: '1:00 PM',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: (
        <>
          <strong>The Strand Hotel</strong>
          <br />
          Limerick City
          <br />
          Limerick, Ireland
          <br />
          <MapLink
            href="https://maps.google.com/?q=The+Strand+Hotel,+Limerick+City,+Ireland"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <MapPin size={16} />
            View on Google Maps
            <ExternalLink size={14} />
          </MapLink>
        </>
      ),
    },
    {
      icon: Shirt,
      title: 'Dress Code',
      content: <em>Blush Pink & Navy Blue</em>,
    },
  ];

  return (
    <CeremonyContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SectionTitle>Ceremony Details</SectionTitle>
      </motion.div>

      <DetailsContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <InfoCard
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{
            y: -5,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <EventTitle>The Ceremony</EventTitle>
          </motion.div>

          {infoSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <InfoSection
                key={section.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 1.0 + index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  x: 5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
              >
                <InfoHeader>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <InfoIcon>
                      <IconComponent size={20} />
                    </InfoIcon>
                  </motion.div>
                  <InfoTitle>{section.title}</InfoTitle>
                </InfoHeader>
                <InfoContent>{section.content}</InfoContent>
              </InfoSection>
            );
          })}
        </InfoCard>
      </DetailsContainer>
    </CeremonyContainer>
  );
}
