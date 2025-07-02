'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GalleryContainer = styled(motion.section)`
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

const PhotoCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.md};
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

const Lightbox = styled(motion.div)`
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
      <GalleryContainer
        id="gallery"
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
          <SectionTitle>Our Wedding Gallery</SectionTitle>
          <SectionSubtitle>
            A glimpse into our journey together and the moments that brought us
            here.
          </SectionSubtitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PhotoGrid>
            {previewPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                onClick={() => openLightbox(photo.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <PhotoImage src={photo.src} alt={photo.alt} />
                <PhotoOverlay>Click to view larger</PhotoOverlay>
              </PhotoCard>
            ))}
          </PhotoGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <ButtonContainer>
            <Link href="/photobook" passHref>
              <PhotobookButton>See full Photobook</PhotobookButton>
            </Link>
          </ButtonContainer>
        </motion.div>
      </GalleryContainer>

      <AnimatePresence>
        {selectedPhoto && selectedPhotoData && (
          <Lightbox
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <LightboxContent>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <CloseButton onClick={closeLightbox}>
                    <X size={24} />
                  </CloseButton>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PrevButton onClick={goToPrevious}>
                    <ChevronLeft size={24} />
                  </PrevButton>
                </motion.div>

                <motion.img
                  key={selectedPhotoData.src}
                  src={selectedPhotoData.src}
                  alt={selectedPhotoData.alt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <NextButton onClick={goToNext}>
                    <ChevronRight size={24} />
                  </NextButton>
                </motion.div>
              </LightboxContent>
            </motion.div>
          </Lightbox>
        )}
      </AnimatePresence>
    </>
  );
}
