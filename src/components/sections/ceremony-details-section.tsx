'use client';

import styled from 'styled-components';
import { MapPin, Clock, Calendar, Shirt } from 'lucide-react';

const CeremonyContainer = styled.section`
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

const DetailsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: start;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
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

const MapContainer = styled.div`
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
`;

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
            <InfoContent>
              Saturday, October 26, 2024
            </InfoContent>
          </InfoSection>

          <InfoSection>
            <InfoHeader>
              <InfoIcon>
                <Clock size={20} />
              </InfoIcon>
              <InfoTitle>Time</InfoTitle>
            </InfoHeader>
            <InfoContent>
              4:00 PM - 11:00 PM
            </InfoContent>
          </InfoSection>

          <InfoSection>
            <InfoHeader>
              <InfoIcon>
                <MapPin size={20} />
              </InfoIcon>
              <InfoTitle>Location</InfoTitle>
            </InfoHeader>
            <InfoContent>
              <strong>The Grand Ballroom</strong><br />
              123 Wedding Venue Road<br />
              Limerick, Ireland<br />
              V94 X8Y2
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
              Formal Attire<br />
              <em>Cocktail dresses and suits are encouraged</em>
            </InfoContent>
          </InfoSection>
        </InfoCard>

        <MapContainer>
          <MapPlaceholder>
            <div>
              <MapPin size={48} style={{ margin: '0 auto 16px', display: 'block' }} />
              <div>Interactive Map</div>
              <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                Map will be embedded here<br />
                (Google Maps integration placeholder)
              </div>
            </div>
          </MapPlaceholder>
          {/* Uncomment and replace with actual Google Maps embed when ready
          <MapFrame
            src="about:blank"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Location"
          />
          */}
        </MapContainer>
      </DetailsContainer>
    </CeremonyContainer>
  );
} 