import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const PILLARS = [
  {
    icon: '🍲',
    title: 'African Low-GI Nutrition',
    desc: 'Local traditional recipes (Sukuma wiki, Tilapia, Brown Ugali) crafted to balance insulin spikes.',
  },
  {
    icon: '🤖',
    title: 'AI PCOS Health Coach',
    desc: 'Instant, evidence-grounded answers for symptoms, fatigue, cravings, and cycle harmony.',
  },
  {
    icon: '🩸',
    title: 'Cycle & Ovulation Diary',
    desc: 'Smart forecasts for follicular phases, fertile windows, and irregular period patterns.',
  },
  {
    icon: '⚖️',
    title: 'Biomarker Tracking',
    desc: 'Monitor waist-to-height ratio, visceral fat indicators, and daily cellular hydration.',
  },
];

export default function SplashScreen({ navigation }: Props) {
  const { colors, mode, toggleTheme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Top Bar with Theme Switcher */}
      <View style={styles.topBar}>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>
            🌸 Holistic Women’s Health
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.themeBtnText, { color: colors.textPrimary }]}>
            {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hero Header */}
      <View style={styles.heroSection}>
        <Text style={styles.heroEmoji}>🌸</Text>
        <Text style={[styles.heroTitle, { color: colors.primary }]}>PCOS360</Text>
        <Text style={[styles.heroTagline, { color: colors.textPrimary }]}>
          Your Personalized Companion for PCOS Wellness & Hormone Balance
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Designed specifically for African women. Understand your cycle, reverse insulin resistance with local foods, and take control of your vitality.
        </Text>
      </View>

      {/* Value Proposition Cards */}
      <View style={styles.pillarsGrid}>
        {PILLARS.map(pillar => (
          <View
            key={pillar.title}
            style={[
              styles.pillarCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.cardShadow,
              },
            ]}
          >
            <Text style={styles.pillarIcon}>{pillar.icon}</Text>
            <Text style={[styles.pillarTitle, { color: colors.textPrimary }]}>{pillar.title}</Text>
            <Text style={[styles.pillarDesc, { color: colors.textMuted }]}>{pillar.desc}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons Container */}
      <View
        style={[
          styles.actionCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}>
            Get Started — Create Free Account →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.textPrimary }]}>
            I Already Have an Account — Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.replace('Dashboard')}
        >
          <Text style={[styles.guestButtonText, { color: colors.secondary }]}>
            ⚡ Explore Dashboard as Guest (Skip Auth)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Trust Disclaimer */}
      <Text style={[styles.footerText, { color: colors.textMuted }]}>
        🔒 Your health data is strictly private and stored securely. Non-diagnostic wellness companion.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: spacing.xxl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  themeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  themeBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroSection: {
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 6,
  },
  heroTagline: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 520,
  },
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  pillarCard: {
    width: '48%',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pillarIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 3,
  },
  pillarDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  actionCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    gap: spacing.sm,
  },
  primaryButton: {
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  guestButton: {
    paddingVertical: 10,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  guestButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 16,
  },
});
