export const theme = {
  colors: {
    primary: '#6B5B73',
    secondary: '#F8F6F3',
    accent: '#D4AF37',
    background: '#f0afec',
    text: '#2D2D2D',
    textLight: '#8B7D6B',
    muted: '#B5A692',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    border: '#F3E8FF',
    cardBg: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.7)',
    cream: '#F5F2ED',
    darkBrown: '#4A3B2A',
    lightGold: '#F4E4BC',
  },
  spacing: {
    baseUnit: '8px',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
    section: '6rem',
    sectionHorizontal: '48px'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  fonts: {
    primary: 'Inter, sans-serif',
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif',
    script: 'Dancing Script, cursive',
  },
  fontSizes: {
    h1: {
      desktop: '48px',
      mobile: '32px'
    },
    h2: {
      desktop: '36px',
      mobile: '28px'
    },
    h3: {
      desktop: '24px',
      mobile: '20px'
    },
    h4: {
      desktop: '18px',
      mobile: '16px'
    },
    body: {
      desktop: '16px',
      mobile: '14px'
    }
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeights: {
    heading: 1.2,
    body: 1.6
  },
  button: {
    borderRadius: '12px',
    padding: {
      vertical: '12px',
      horizontal: '24px'
    },
    fontSize: '16px',
    fontWeight: 500
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F3E8FF',
    borderWidth: '1px',
    borderRadius: '12px',
    padding: '24px'
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: '1px',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px'
  }
} as const;

export type Theme = typeof theme; 