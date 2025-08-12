import { Metadata } from 'next';
import { StyledProvider } from '@/components/providers/styled-provider';

export const metadata: Metadata = {
  title: 'Dietary Restrictions - Kaito & Timmy Wedding',
  description: 'Let us know about your dietary restrictions and allergies',
};

export default function DietaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledProvider>{children}</StyledProvider>;
}
