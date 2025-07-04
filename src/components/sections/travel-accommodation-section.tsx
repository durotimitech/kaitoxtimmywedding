'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';
import {
  Plane,
  Train,
  Car,
  MapPin,
  Hotel,
  Clock,
  ExternalLink,
  Smartphone,
} from 'lucide-react';

const TravelContainer = styled(motion.section)`
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

const ContentContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  height: fit-content;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const CardIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const AirportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const AirportItem = styled.div`
  border-left: 3px solid ${props => props.theme.colors.primary};
  padding-left: ${props => props.theme.spacing.md};
`;

const AirportName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const AirportDetails = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
`;

const TransportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const TransportItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.cream};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const TransportIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-top: 2px;
`;

const TransportContent = styled.div`
  flex: 1;
`;

const TransportTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const TransportDetails = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
`;

const AccommodationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const AccommodationItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.cream};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 3px solid ${props => props.theme.colors.secondary};
`;

const AccommodationName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const AccommodationDetails = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
`;

const FullWidthCard = styled(InfoCard)`
  grid-column: 1 / -1;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.cream};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const TipIcon = styled.div`
  color: ${props => props.theme.colors.secondary};
  margin-top: 2px;
`;

const TipContent = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ServiceLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #7a6348;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

export function TravelAccommodationSection() {
  const airports = [
    {
      name: 'Dublin Airport (DUB)',
      details:
        "Ireland's largest airport with direct flights from most international destinations. About 2.5 hours to Limerick by bus or car.",
    },
    {
      name: 'Shannon Airport (SNN)',
      details:
        'Closest to the venue - only 45 minutes to Limerick! Great for US travelers with direct flights from major US cities.',
    },
    {
      name: 'Cork Airport (ORK)',
      details:
        'Second largest airport in Ireland. About 1.5 hours to Limerick by bus or car.',
    },
  ];

  const transportation = [
    {
      icon: Train,
      title: 'Train',
      details:
        'Irish Rail connects major cities. From Dublin to Limerick takes about 2.5 hours with beautiful countryside views.',
      links: [{ text: 'Irish Rail', url: 'https://www.irishrail.ie/' }],
    },
    {
      icon: Car,
      title: 'Car Rental',
      details:
        'Most flexible option for exploring Ireland. Drive on the left side! Major rental companies available at all airports.',
      links: [
        { text: 'Enterprise Rent-A-Car', url: 'https://www.enterprise.ie/' },
        { text: 'GoCar', url: 'https://www.gocar.ie/' },
      ],
    },
    {
      icon: Plane,
      title: 'Bus',
      details:
        'Bus Éireann and private companies offer regular services. From Dublin to Limerick takes about 3 hours.',
      links: [
        {
          text: 'Bus Éireann',
          url: 'https://ticketbooking.dublincoach.ie/BookTicket/TicketSelection',
        },
      ],
    },
    {
      icon: Smartphone,
      title: 'Ride-Sharing Apps',
      details:
        'Convenient door-to-door transportation available throughout Ireland. Perfect for short trips and getting around cities.',
      links: [
        { text: 'Uber', url: 'https://www.uber.com/ie/en/' },
        { text: 'FreeNow', url: 'https://www.free-now.com/ie/' },
      ],
    },
  ];

  const accommodations = [
    {
      name: 'The Strand Hotel',
      details:
        'Our wedding venue! Book early for the best rates and convenience. Contact us directly for special discount rates on the night before and the night of the wedding.',
      links: [{ text: 'Book Now', url: 'https://www.strandhotellimerick.ie/' }],
    },
    {
      name: 'Limerick City Hotel',
      details:
        'Modern hotel in the city center with excellent amenities and easy access to restaurants and attractions.',
      links: [{ text: 'Book Now', url: 'https://www.limerickcityhotel.ie/' }],
    },
    {
      name: 'Travelodge',
      details:
        'Hotel in the city center with excellent amenities and easy access to restaurants and attractions.',
      links: [{ text: 'Book Now', url: 'https://www.travelodge.ie' }],
    },
    {
      name: 'Absolute Hotel',
      details:
        'Contemporary 4-star hotel on the banks of the River Shannon with beautiful views.',
      links: [{ text: 'Book Now', url: 'https://www.absolutehotel.com/' }],
    },
    {
      name: 'Clayton Hotel Limerick',
      details:
        'Business hotel with great facilities, perfect for extended stays.',
      links: [
        { text: 'Book Now', url: 'https://www.claytonhotellimerick.com/' },
      ],
    },
  ];

  const tips = [
    'Book accommodations early - September is peak season in Ireland!',
    'Pack layers - Irish weather can be unpredictable.',
    'Consider arriving a few days early to explore Ireland and recover from jet lag.',
    'The Euro is the currency in Ireland. Credit cards are widely accepted.',
    'Download offline maps - mobile coverage can be spotty in rural areas.',
    'Irish plug sockets are Type G (3-pin) - bring an adapter!',
  ];

  return (
    <TravelContainer
      id="travel"
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
        <SectionTitle>Travel & Accommodation</SectionTitle>
      </motion.div>

      <ContentContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <InfoCard
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardTitle>
              <CardIcon>
                <Plane size={20} />
              </CardIcon>
              Airports
            </CardTitle>
            <AirportList>
              {airports.map((airport, index) => (
                <motion.div
                  key={airport.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <AirportItem>
                    <AirportName>{airport.name}</AirportName>
                    <AirportDetails>{airport.details}</AirportDetails>
                  </AirportItem>
                </motion.div>
              ))}
            </AirportList>
          </InfoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <InfoCard
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardTitle>
              <CardIcon>
                <Car size={20} />
              </CardIcon>
              Transportation
            </CardTitle>
            <TransportList>
              {transportation.map((transport, index) => {
                const IconComponent = transport.icon;
                return (
                  <motion.div
                    key={transport.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  >
                    <TransportItem>
                      <TransportIcon>
                        <IconComponent size={18} />
                      </TransportIcon>
                      <TransportContent>
                        <TransportTitle>{transport.title}</TransportTitle>
                        <TransportDetails>{transport.details}</TransportDetails>
                        {transport.links && (
                          <LinkContainer>
                            {transport.links.map(link => (
                              <ServiceLink
                                key={link.text}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 400,
                                  damping: 17,
                                }}
                              >
                                {link.text}
                                <ExternalLink size={12} />
                              </ServiceLink>
                            ))}
                          </LinkContainer>
                        )}
                      </TransportContent>
                    </TransportItem>
                  </motion.div>
                );
              })}
            </TransportList>
          </InfoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <InfoCard
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardTitle>
              <CardIcon>
                <Hotel size={20} />
              </CardIcon>
              Accommodation
            </CardTitle>
            <AccommodationList>
              {accommodations.map((hotel, index) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <AccommodationItem>
                    <AccommodationName>{hotel.name}</AccommodationName>
                    <AccommodationDetails>{hotel.details}</AccommodationDetails>
                    {hotel.links && (
                      <LinkContainer>
                        {hotel.links.map(link => (
                          <ServiceLink
                            key={link.text}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            {link.text}
                            <ExternalLink size={12} />
                          </ServiceLink>
                        ))}
                      </LinkContainer>
                    )}
                  </AccommodationItem>
                </motion.div>
              ))}
            </AccommodationList>
          </InfoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <FullWidthCard
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardTitle>
              <CardIcon>
                <MapPin size={20} />
              </CardIcon>
              Travel Tips
            </CardTitle>
            <TipsList>
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                >
                  <TipItem>
                    <TipIcon>
                      <Clock size={16} />
                    </TipIcon>
                    <TipContent>{tip}</TipContent>
                  </TipItem>
                </motion.div>
              ))}
            </TipsList>
          </FullWidthCard>
        </motion.div>
      </ContentContainer>
    </TravelContainer>
  );
}
