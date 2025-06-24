'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

// Removed unused fadeIn animation

const AboutContainer = styled.section`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
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

// Removed unused SectionLabel

const ToggleContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 4px;
  margin-bottom: ${props => props.theme.spacing.lg};
  backdrop-filter: blur(10px);
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  background: ${props =>
    props.$isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => (props.$isActive ? 'white' : props.theme.colors.text)};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background: ${props =>
      props.$isActive
        ? props.theme.colors.primary
        : 'rgba(255, 255, 255, 0.1)'};
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const MessageContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: translateY(${props => (props.$isVisible ? '0' : '20px')});
  transition: all 0.5s ease;
  position: ${props => (props.$isVisible ? 'relative' : 'absolute')};
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.3;
`;

const MessageText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.md};
  max-width: 500px;
`;

const ViewMoreButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  padding: 8px 0;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  text-decoration: underline;
  margin-bottom: ${props => props.theme.spacing.md};
  outline: none;

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const Signature = styled.div`
  font-family: var(--font-playfair);
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.$progress}%;
  transition: width 0.1s linear;
  border-radius: 2px;
`;

const ImageSection = styled.div`
  position: relative;
  height: 500px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
    order: -1;
  }
`;

const MainImage = styled.div<{ $imageUrl: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 400px;
  background-image: url('${props => props.$imageUrl}');
  background-size: cover;
  background-position: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  z-index: 2;
  transition: all 0.5s ease;

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
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.05) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 0;
`;

// Modal Content Styles
const ModalContent = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 20px;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: 28px;
  color: #2d2d2d;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #6b7280;
  margin-bottom: 24px;
`;

const ModalSignature = styled.div`
  font-family: var(--font-playfair);
  font-size: 18px;
  color: #f8bbd9;
  font-style: italic;
  text-align: right;
  margin-top: 20px;
`;

interface Message {
  title: string;
  text: string;
  signature: string;
  image: string;
}

const messages: { groom: Message; bride: Message } = {
  groom: {
    title: 'Groom',
    text: "Where do I start…? The first time I saw Kaito was randomly at school, and for some reason, her face just stuck with me. A couple of months later, I saw her again, and once more, her image stayed in my mind. I couldn't shake it off. I even remember telling a close friend about this lady who kept popping up in my life, wondering if I was just imagining things. Then, a few months down the line, I saw her yet again at a school event. This time, I finally confirmed with a friend that he saw her too! Over time, it turned out we had a few mutual friends at church who kept introducing us to each other. We had simple conversations here and there on Sundays for the next year. The turning point came on her birthday when she invited me to attend. I felt truly honored to be considered important enough to be part of her special day. I brought a bowl of gizdodo as a gift, and for the very first time, we had a proper, extended conversation. After that day, we started talking more often, and I genuinely enjoyed every single one of our discussions. Eventually, we started dating and began to know each other on a deeper level. We hit it off with little to no friction—long conversations, plenty of laughter, learning new things, and being exposed to a different, brighter side of life. I knew she had to be someone special because I couldn't get her out of my head from the very first moment I saw her, and that feeling has never changed. I'm honored that I never have to shake her off—now and forever.",
    signature: 'With love, Timmy',
    image: '/7.jpg',
  },
  bride: {
    title: 'Bride',
    text: "To be honest, I think I've always known of Timmy. He was one of those people who was always around—familiar but not quite within reach. We met through mutual friends in church, and for the longest time, our conversations were strictly church conversations. You know, the polite 'How was your week?' and the occasional 'See you next Sunday!' Every now and then, he'd invite me to events, and every single time, I'd decline—not because I wasn't interested, but because I was juggling school, work, and the general chaos of life. So, Sunday after Sunday, we'd chat briefly, exchange a few words, and go about our day. It was a rhythm, a quiet, predictable part of my week. But then, my 2024 birthday happened, and everything changed. By this point, Timmy had upgraded from random church guy to someone I actually enjoyed talking to. So, I figured, why not? And I invited him. And when I say he showed up early, I mean early-early. Like, before everyone else arrived. And he didn't come empty-handed—he came with a bowl of Gizdodo. Now, if you know me, you know food is my love language. And let me just say, to this day, I believe that Gizdodo had a hand in this relationship. Because somehow, between spoonfuls of that delicious dish and effortless conversation, something clicked. We talked and laughed until more people started arriving, and for the first time, I saw Timmy not just as the friendly guy from church but as someone who could be more. The thing about Timmy is, he's always been a friend first. I think that's what makes this so special. I remember our first official date like it was yesterday. This man rented a car just so I could have the full baby girl treatment. Not because I asked, not because he had to, but because that's just who he is. He has this incredible way of making life easier, of turning the most ordinary moments into something memorable. From that first date to now, he's been consistent. He's been thoughtful. He's been home. And honestly? I think I've always known—long before I said yes, long before the Gizdodo. I've always known that Timmy was special. And now, I get to call him mine forever. (But just to be safe, I'm making sure there's Gizdodo at the wedding. You know, for good luck.)",
    signature: 'With all my love, Kaito',
    image: '/6.jpg',
  },
};

// Function to truncate text
const truncateText = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpaceIndex) + '...';
};

export function AboutSection() {
  const [activeMessage, setActiveMessage] = useState<'groom' | 'bride'>(
    'bride'
  );
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (message: 'groom' | 'bride') => {
    if (message !== activeMessage) {
      setActiveMessage(message);
      setProgress(0);
    }
  };

  const handleViewMore = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const currentMessage = messages[activeMessage];

  return (
    <>
      <AboutContainer id="about">
        <BackgroundDecoration />
        <ContentWrapper>
          <TextContent>
            <ToggleContainer>
              <ToggleButton
                $isActive={activeMessage === 'groom'}
                onClick={() => handleToggle('groom')}
              >
                Groom&apos;s Message
              </ToggleButton>
              <ToggleButton
                $isActive={activeMessage === 'bride'}
                onClick={() => handleToggle('bride')}
              >
                Bride&apos;s Message
              </ToggleButton>
            </ToggleContainer>

            <ProgressBar>
              <ProgressFill $progress={progress} />
            </ProgressBar>

            <MessageContainer $isVisible={true}>
              <SectionTitle>{currentMessage.title}</SectionTitle>
              <MessageText>{truncateText(currentMessage.text)}</MessageText>
              <ViewMoreButton onClick={handleViewMore}>
                View More
              </ViewMoreButton>
              <Signature>{currentMessage.signature}</Signature>
            </MessageContainer>
          </TextContent>

          <ImageSection>
            <MainImage $imageUrl={currentMessage.image} />
            <FloralDecorationLarge />
            <FloralDecorationSmall />
          </ImageSection>
        </ContentWrapper>
      </AboutContainer>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalTitle>From the {currentMessage.title}</ModalTitle>
          <ModalText>{currentMessage.text}</ModalText>
          <ModalSignature>{currentMessage.signature}</ModalSignature>
        </ModalContent>
      </Modal>
    </>
  );
}
