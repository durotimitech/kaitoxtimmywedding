import 'styled-components';
import { Theme } from '@/lib/styled-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 