'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryContainer = styled.section`
  padding: ${props => props.theme.spacing.section} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const PhotoCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  
  ${PhotoCard}:hover & {
    opacity: 1;
  }
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.lg};
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.md};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavButton)`
  left: -60px;
`;

const NextButton = styled(NavButton)`
  right: -60px;
`;

const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=faces',
    alt: 'Romantic wedding moment'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop&crop=faces',
    alt: 'Wedding couple dancing'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&crop=center',
    alt: 'Wedding ceremony'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop&crop=faces',
    alt: 'Wedding portrait'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop&crop=faces',
    alt: 'Wedding kiss'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop&crop=faces',
    alt: 'Wedding couple'
  }
];

export function PhotoGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedPhoto(photos[previousIndex].id);
  };

  const goToNext = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(photos[nextIndex].id);
  };

  const selectedPhotoData = photos.find(p => p.id === selectedPhoto);

  return (
    <>
      <GalleryContainer id="gallery">
        <SectionTitle>Our Wedding Gallery</SectionTitle>
        <SectionSubtitle>
          A glimpse into our journey together and the moments that brought us here.
        </SectionSubtitle>
        
        <PhotoGrid>
          {photos.map((photo) => (
            <PhotoCard key={photo.id} onClick={() => openLightbox(photo.id)}>
              <PhotoImage src={photo.src} alt={photo.alt} />
              <PhotoOverlay>
                Click to view larger
              </PhotoOverlay>
            </PhotoCard>
          ))}
        </PhotoGrid>
      </GalleryContainer>

      {selectedPhoto && selectedPhotoData && (
        <Lightbox onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeLightbox}>
              <X size={24} />
            </CloseButton>
            
            <PrevButton onClick={goToPrevious}>
              <ChevronLeft size={24} />
            </PrevButton>
            
            <LightboxImage src={selectedPhotoData.src} alt={selectedPhotoData.alt} />
            
            <NextButton onClick={goToNext}>
              <ChevronRight size={24} />
            </NextButton>
          </LightboxContent>
        </Lightbox>
      )}
    </>
  );
} 