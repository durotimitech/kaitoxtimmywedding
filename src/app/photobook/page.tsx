'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  padding: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: #ccc;
  }
`;

const Title = styled.h1`
  font-family: var(--font-playfair);
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  flex: 1;
`;

const MasonryGrid = styled.div`
  columns: 4;
  column-gap: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    columns: 3;
  }

  @media (max-width: 768px) {
    columns: 2;
    column-gap: 15px;
  }

  @media (max-width: 480px) {
    columns: 1;
  }
`;

const PhotoItem = styled.div`
  break-inside: avoid;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
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
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:focus {
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
  padding: 16px;
  border-radius: 50%;
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
`;

const PrevButton = styled(NavButton)`
  left: -70px;

  @media (max-width: 768px) {
    left: 10px;
  }
`;

const NextButton = styled(NavButton)`
  right: -70px;

  @media (max-width: 768px) {
    right: 10px;
  }
`;

const PhotoCounter = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const allPhotos = [
  { id: 1, src: '/1.jpg', alt: 'Wedding moment 1' },
  { id: 4, src: '/4.jpg', alt: 'Wedding moment 4' },
  { id: 5, src: '/5.jpg', alt: 'Wedding moment 5' },
  { id: 2, src: '/2.jpg', alt: 'Wedding moment 2' },
  { id: 6, src: '/6.jpg', alt: 'Wedding moment 6' },
  { id: 7, src: '/7.jpg', alt: 'Wedding moment 7' },
  { id: 3, src: '/3.jpg', alt: 'Wedding moment 3' },
];

export default function PhotobookPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    if (selectedPhoto === null) return;
    const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
    setSelectedPhoto(allPhotos[previousIndex].id);
  };

  const goToNext = () => {
    if (selectedPhoto === null) return;
    const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto);
    const nextIndex =
      currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(allPhotos[nextIndex].id);
  };

  const selectedPhotoData = allPhotos.find(p => p.id === selectedPhoto);
  const currentPhotoIndex = selectedPhoto
    ? allPhotos.findIndex(p => p.id === selectedPhoto) + 1
    : 0;

  return (
    <>
      <PageContainer>
        <Header>
          <BackButton href="/">
            <ArrowLeft size={20} />
            Back to Wedding
          </BackButton>
          <Title>Our Wedding Photobook</Title>
          <div style={{ width: '120px' }}></div> {/* Spacer for centering */}
        </Header>

        <MasonryGrid>
          {allPhotos.map(photo => (
            <PhotoItem key={photo.id} onClick={() => openLightbox(photo.id)}>
              <PhotoImage
                src={photo.src}
                alt={photo.alt}
                onError={e => {
                  // Fallback to placeholder if image doesn't exist
                  e.currentTarget.src = `https://picsum.photos/400/600?random=${photo.id}`;
                }}
              />
            </PhotoItem>
          ))}
        </MasonryGrid>
      </PageContainer>

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
              onError={e => {
                e.currentTarget.src = `https://picsum.photos/800/1200?random=${selectedPhotoData.id}`;
              }}
            />

            <NextButton onClick={goToNext}>
              <ChevronRight size={24} />
            </NextButton>

            <PhotoCounter>
              {currentPhotoIndex} of {allPhotos.length}
            </PhotoCounter>
          </LightboxContent>
        </Lightbox>
      )}
    </>
  );
}
