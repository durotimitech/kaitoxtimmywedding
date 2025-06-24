import 'styled-components';
import { Theme } from '@/lib/styled-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    // This interface extends Theme to provide typed theme support for styled-components
  }
}
