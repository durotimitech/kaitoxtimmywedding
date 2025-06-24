'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GalleryContainer = styled.section`
  padding: ${props => props.theme.spacing.section}
    ${props => props.theme.spacing.lg};
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
  margin-bottom: ${props => props.theme.spacing.xl};

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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const PhotobookButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
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
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
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
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

const PrevButton = styled(NavButton)`
  left: -60px;
`;

const NextButton = styled(NavButton)`
  right: -60px;
`;

// Only show first 6 photos in the preview
const previewPhotos = [
  {
    id: 1,
    src: '/1.jpg',
    alt: 'Romantic wedding moment',
  },
  {
    id: 4,
    src: '/4.jpg',
    alt: 'Wedding portrait',
  },
  {
    id: 2,
    src: '/2.jpg',
    alt: 'Wedding couple dancing',
  },
  {
    id: 5,
    src: '/5.jpg',
    alt: 'Wedding kiss',
  },
  {
    id: 6,
    src: '/6.jpg',
    alt: 'Wedding couple',
  },
  {
    id: 3,
    src: '/3.jpg',
    alt: 'Wedding ceremony',
  },
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
    const currentIndex = previewPhotos.findIndex(p => p.id === selectedPhoto);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : previewPhotos.length - 1;
    setSelectedPhoto(previewPhotos[previousIndex].id);
  };

  const goToNext = () => {
    if (selectedPhoto === null) return;
    const currentIndex = previewPhotos.findIndex(p => p.id === selectedPhoto);
    const nextIndex =
      currentIndex < previewPhotos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(previewPhotos[nextIndex].id);
  };

  const selectedPhotoData = previewPhotos.find(p => p.id === selectedPhoto);

  return (
    <>
      <GalleryContainer id="gallery">
        <SectionTitle>Our Wedding Gallery</SectionTitle>
        <SectionSubtitle>
          A glimpse into our journey together and the moments that brought us
          here.
        </SectionSubtitle>

        <PhotoGrid>
          {previewPhotos.map(photo => (
            <PhotoCard key={photo.id} onClick={() => openLightbox(photo.id)}>
              <PhotoImage src={photo.src} alt={photo.alt} />
              <PhotoOverlay>Click to view larger</PhotoOverlay>
            </PhotoCard>
          ))}
        </PhotoGrid>

        <ButtonContainer>
          <Link href="/photobook" passHref>
            <PhotobookButton>See full Photobook</PhotobookButton>
          </Link>
        </ButtonContainer>
      </GalleryContainer>

      {selectedPhoto && selectedPhotoData && (
        <Lightbox onClick={closeLightbox}>
          <LightboxContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeLightbox}>
              <X size={24} />
            </CloseButton>

            <PrevButton onClick={goToPrevious}>
              <ChevronLeft size={24} />
            </PrevButton>

            <LightboxImage
              src={selectedPhotoData.src}
              alt={selectedPhotoData.alt}
            />

            <NextButton onClick={goToNext}>
              <ChevronRight size={24} />
            </NextButton>
          </LightboxContent>
        </Lightbox>
      )}
    </>
  );
}
