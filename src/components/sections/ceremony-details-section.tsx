'use client';

import styled from 'styled-components';
import { MapPin, Clock, Calendar, Shirt } from 'lucide-react';

const CeremonyContainer = styled.section`
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

const DetailsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const InfoSection = styled.div`
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

// Removed unused map components: MapContainer, MapPlaceholder, MapFrame

export function CeremonyDetailsSection() {
  return (
    <CeremonyContainer id="ceremony">
      <SectionTitle>Ceremony Details</SectionTitle>

      <DetailsContainer>
        <InfoCard>
          <EventTitle>The Ceremony</EventTitle>

          <InfoSection>
            <InfoHeader>
              <InfoIcon>
                <Calendar size={20} />
              </InfoIcon>
              <InfoTitle>Date</InfoTitle>
            </InfoHeader>
            <InfoContent>Monday, September 8, 2025</InfoContent>
          </InfoSection>

          <InfoSection>
            <InfoHeader>
              <InfoIcon>
                <Clock size={20} />
              </InfoIcon>
              <InfoTitle>Time</InfoTitle>
            </InfoHeader>
            <InfoContent>14:00 PM</InfoContent>
          </InfoSection>

          <InfoSection>
            <InfoHeader>
              <InfoIcon>
                <MapPin size={20} />
              </InfoIcon>
              <InfoTitle>Location</InfoTitle>
            </InfoHeader>
            <InfoContent>
              <strong>The Strand Hotel</strong>
              <br />
              Limerick City
              <br />
              Limerick, Ireland
              <br />
            </InfoContent>
          </InfoSection>

          <InfoSection>
            <InfoHeader>
              <InfoIcon>
                <Shirt size={20} />
              </InfoIcon>
              <InfoTitle>Dress Code</InfoTitle>
            </InfoHeader>
            <InfoContent>
              <em>Blush Pink & Navy Blue</em>
            </InfoContent>
          </InfoSection>
        </InfoCard>
      </DetailsContainer>
    </CeremonyContainer>
  );
}
