'use client';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Music, User, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import {
  addSongRequest,
  getSongRequests,
  checkSongExists,
  SongRequest,
} from '@/lib/song-requests';

const SongRequestContainer = styled(motion.section)`
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
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const RequestCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(245, 51, 164, 0.1);
  }

  &:disabled {
    background: ${props => props.theme.colors.cream};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background: #7a6348;
  }

  &:disabled {
    background: ${props => props.theme.colors.muted};
    cursor: not-allowed;
  }
`;

const SongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  max-height: 400px;
  overflow-y: auto;
`;

const SongItem = styled(motion.div)`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.cream};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 3px solid ${props => props.theme.colors.secondary};
`;

const SongTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const SongArtist = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const SuccessMessage = styled(motion.div)`
  background: ${props => props.theme.colors.success};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: 0.9rem;
  font-weight: 500;
`;

const ErrorMessage = styled(motion.div)`
  background: ${props => props.theme.colors.error};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: 0.9rem;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
`;

export function SongRequestSection() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    song_title: '',
    artist_name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load song requests on component mount
  useEffect(() => {
    loadSongRequests();
  }, []);

  const loadSongRequests = async () => {
    setIsLoading(true);
    const result = await getSongRequests();
    if (result.success && result.data) {
      setSongRequests(result.data);
    }
    setIsLoading(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.song_title.trim() || !formData.artist_name.trim()) {
        throw new Error('Please fill in all fields.');
      }

      if (!user?.first_name || !user?.last_name) {
        throw new Error(
          'User information not available. Please try logging in again.'
        );
      }

      // Check if song already exists
      const songExists = await checkSongExists(
        formData.song_title,
        formData.artist_name
      );
      if (songExists) {
        throw new Error('This song has already been requested!');
      }

      // Submit song request
      const result = await addSongRequest({
        song_title: formData.song_title,
        artist_name: formData.artist_name,
        requested_by: `${user.first_name} ${user.last_name}`,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit song request');
      }

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        song_title: '',
        artist_name: '',
      });

      // Reload song requests
      await loadSongRequests();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Song request submission error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SongRequestContainer
      id="song-requests"
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
        <SectionTitle>Song Requests</SectionTitle>
      </motion.div>

      <ContentContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Request Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <RequestCard
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardTitle>
              <CardIcon>
                <Music size={20} />
              </CardIcon>
              Request a Song
            </CardTitle>

            <AnimatePresence mode="wait">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <SuccessMessage>
                    <CheckCircle size={16} />
                    Song request submitted! Thanks for the suggestion.
                  </SuccessMessage>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {error}
                  </ErrorMessage>
                </motion.div>
              )}
            </AnimatePresence>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="song_title">
                  <Music size={16} />
                  Song Title *
                </Label>
                <Input
                  id="song_title"
                  type="text"
                  value={formData.song_title}
                  onChange={e =>
                    handleInputChange('song_title', e.target.value)
                  }
                  placeholder="Enter the song title"
                  disabled={isSubmitting}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="artist_name">
                  <User size={16} />
                  Artist Name *
                </Label>
                <Input
                  id="artist_name"
                  type="text"
                  value={formData.artist_name}
                  onChange={e =>
                    handleInputChange('artist_name', e.target.value)
                  }
                  placeholder="Enter the artist name"
                  disabled={isSubmitting}
                  required
                />
              </InputGroup>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <SubmitButton
                  type="submit"
                  disabled={isSubmitting || showSuccess}
                >
                  <Send size={18} />
                  {isSubmitting ? 'Submitting...' : 'Request Song'}
                </SubmitButton>
              </motion.div>
            </Form>
          </RequestCard>
        </motion.div>

        {/* Song Requests List */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <RequestCard
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardTitle>
              <CardIcon>
                <Music size={20} />
              </CardIcon>
              Requested Songs
            </CardTitle>

            <SongList>
              {isLoading ? (
                <EmptyState>Loading song requests...</EmptyState>
              ) : songRequests.length === 0 ? (
                <EmptyState>No songs requested yet. Be the first!</EmptyState>
              ) : (
                songRequests.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SongItem
                      whileHover={{
                        scale: 1.02,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                    >
                      <SongTitle>{song.song_title}</SongTitle>
                      <SongArtist>by {song.artist_name}</SongArtist>
                    </SongItem>
                  </motion.div>
                ))
              )}
            </SongList>
          </RequestCard>
        </motion.div>
      </ContentContainer>
    </SongRequestContainer>
  );
}
