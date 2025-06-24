'use client';

import { ThemeProvider } from 'styled-components';
import { theme } from '@/lib/styled-theme';

interface StyledProviderProps {
  children: React.ReactNode;
}

export function StyledProvider({ children }: StyledProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
} 