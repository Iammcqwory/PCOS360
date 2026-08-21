export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  background: string;
  surface: string;
  surfaceSubtle: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  badgeBg: string;
  badgeText: string;
  success: string;
  warning: string;
  error: string;
  cardShadow: string;
}

export const lightColors: ThemeColors = {
  primary: '#1D6FA3',
  primaryHover: '#165782',
  primaryLight: '#EAF3F7',
  secondary: '#10B981',
  secondaryLight: '#D1FAE5',
  accent: '#F59E0B',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  textPrimary: '#0F172A',
  textSecondary: '#334155',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  badgeBg: '#E0F2FE',
  badgeText: '#0369A1',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  cardShadow: 'rgba(0, 0, 0, 0.05)',
};

export const darkColors: ThemeColors = {
  primary: '#38BDF8',
  primaryHover: '#7DD3FC',
  primaryLight: '#082F49',
  secondary: '#34D399',
  secondaryLight: '#064E3B',
  accent: '#FBBF24',
  background: '#0B1120',
  surface: '#1E293B',
  surfaceSubtle: '#151F30',
  border: '#334155',
  borderStrong: '#475569',
  textPrimary: '#F8FAFC',
  textSecondary: '#E2E8F0',
  textMuted: '#94A3B8',
  textInverse: '#0B1120',
  badgeBg: '#1E3A5F',
  badgeText: '#7DD3FC',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  cardShadow: 'rgba(0, 0, 0, 0.4)',
};

// Legacy fallback for backward compatibility
export const colors = {
  oceanBlue: '#1D6FA3',
  mint: '#10B981',
  white: '#FFFFFF',
  lightGray: '#F8FAFC',
  darkText: '#0F172A',
  card: '#EAF3F7',
  warning: '#F59E0B',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 9999,
};
