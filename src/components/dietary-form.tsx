'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Check, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import {
  saveDietaryRestrictions,
  COMMON_DIETARY_RESTRICTIONS,
} from '@/lib/dietary';

const FormContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FormTitle = styled.h2`
  font-family: var(--font-playfair);
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const FormDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.theme.colors.cream};
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${props => props.theme.colors.primary};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.muted};
    opacity: 0.7;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: #b8941f;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)<{ type: 'success' | 'error' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => (props.type === 'success' ? '#f0fdf4' : '#fef2f2')};
  color: ${props => (props.type === 'success' ? '#15803d' : '#dc2626')};
`;

export function DietaryForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleCheckboxChange = (restriction: string) => {
    setSelectedRestrictions(prev =>
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage({
        type: 'error',
        text: 'Please log in to save your dietary restrictions.',
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await saveDietaryRestrictions(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        {
          restrictions: selectedRestrictions,
          additional_notes: additionalNotes.trim() || undefined,
        }
      );

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Your dietary restrictions have been saved!',
        });
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to save dietary restrictions.',
        });
      }
    } catch (error) {
      console.error('Error submitting dietary form:', error);
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FormTitle>
        <Utensils size={32} />
        Dietary Restrictions
      </FormTitle>

      <FormDescription>
        Please let us know about any dietary restrictions or allergies so we can
        ensure you have a wonderful dining experience at our wedding.
      </FormDescription>

      <AnimatePresence>
        {message && (
          <Message
            type={message.type}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {message.type === 'success' ? (
              <Check size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {message.text}
          </Message>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Select all that apply:</Label>
          <CheckboxContainer>
            {COMMON_DIETARY_RESTRICTIONS.map(restriction => (
              <CheckboxLabel key={restriction}>
                <Checkbox
                  checked={selectedRestrictions.includes(restriction)}
                  onChange={() => handleCheckboxChange(restriction)}
                  disabled={isSubmitting}
                />
                {restriction}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
        </FormGroup>

        <FormGroup>
          <Label>Additional notes or specific allergies:</Label>
          <TextArea
            value={additionalNotes}
            onChange={e => setAdditionalNotes(e.target.value)}
            placeholder="Please share any other dietary requirements or allergies we should know about..."
            disabled={isSubmitting}
          />
        </FormGroup>

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <Loader size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            'Save Dietary Restrictions'
          )}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
