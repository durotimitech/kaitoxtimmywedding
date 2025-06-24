'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const RSVPContainer = styled.section`
  padding: ${props => props.theme.spacing.section} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  max-width: 600px;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const FormField = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 0.95rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }
`;

const ConfirmationMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.success};
  font-weight: 500;
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background: rgba(16, 185, 129, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

interface RSVPFormData {
  fullName: string;
  email: string;
  guestCount: string;
  dietaryRestrictions: string;
}

export function RSVPSection() {
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    email: '',
    guestCount: '1',
    dietaryRestrictions: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <RSVPContainer id="rsvp">
      <SectionTitle>RSVP</SectionTitle>
      <SectionSubtitle>
        We can't wait to celebrate with you! Please let us know if you'll be joining us for our special day.
      </SectionSubtitle>
      
      <FormContainer>
        <Card className="bg-white/80 backdrop-blur-sm border-[#E5D5C8]">
          <CardHeader>
            <CardTitle className="text-center text-[#8B7355]">
              Kindly Respond by September 15, 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-[#E5D5C8] focus:border-[#8B7355]"
                    placeholder="Enter your full name"
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-[#E5D5C8] focus:border-[#8B7355]"
                    placeholder="Enter your email address"
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="guestCount">Number of Guests Attending *</Label>
                  <Select
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </Select>
                </FormField>

                <FormField>
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</Label>
                  <TextArea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    placeholder="Please let us know about any dietary restrictions or allergies..."
                  />
                </FormField>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8B7355] hover:bg-[#7A6348] text-white py-3 text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </Button>
              </form>
            ) : (
              <ConfirmationMessage>
                <CheckCircle size={24} />
                <span>Thank you! Your RSVP has been received successfully.</span>
              </ConfirmationMessage>
            )}
          </CardContent>
        </Card>
      </FormContainer>
    </RSVPContainer>
  );
} 