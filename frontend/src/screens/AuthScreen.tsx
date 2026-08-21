import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../types';
import { login } from '../api/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
  const { colors, mode } = useTheme();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!email.trim() || (!name.trim() && isSignUp)) {
      setError('Please fill in all required fields to continue.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email);
      navigation.replace('Onboarding', { email, name: name || 'Friend' });
    } catch {
      // Allow progression even if backend offline
      navigation.replace('Onboarding', { email, name: name || 'Friend' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <Text style={[styles.brandBadge, { backgroundColor: colors.badgeBg, color: colors.badgeText }]}>
          🌸 Holistic Women's Health
        </Text>
        <Text style={[styles.title, { color: colors.primary }]}>PCOS360</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your personalized companion for managing insulin, cycle regularity, nutrition, and daily wellness.
        </Text>
      </View>

      {/* Auth Mode Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => setIsSignUp(true)}
          style={[styles.tab, isSignUp && { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.tabText, { color: isSignUp ? colors.primary : colors.textMuted }]}>
            Create Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSignUp(false)}
          style={[styles.tab, !isSignUp && { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.tabText, { color: !isSignUp ? colors.primary : colors.textMuted }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Form */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        {isSignUp && (
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
              Your Full Name <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  ...Platform.select({ web: { outlineColor: colors.primary } }) as any,
                },
              ]}
              placeholder="e.g. Amina Bello"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={text => {
                setName(text);
                setError('');
              }}
            />
          </View>
        )}

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            Email Address <Text style={{ color: colors.error }}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.textPrimary,
                ...Platform.select({ web: { outlineColor: colors.primary } }) as any,
              },
            ]}
            placeholder="e.g. amina@pcos360.app"
            placeholderTextColor={colors.textMuted}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => {
              setEmail(text);
              setError('');
            }}
          />
        </View>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: colors.error + '15', borderColor: colors.error }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {error}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}>
            {loading ? 'Processing...' : isSignUp ? 'Continue to Health Profile →' : 'Sign In to Dashboard →'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Dashboard')}
        >
          <Text style={[styles.skipText, { color: colors.primary }]}>
            Skip Authentication → Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      {/* Privacy & Trust Badge */}
      <View style={[styles.privacyCard, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
        <Text style={[styles.privacyTitle, { color: colors.textPrimary }]}>
          🔒 Private & Confidential Health Companion
        </Text>
        <Text style={[styles.privacyBody, { color: colors.textMuted }]}>
          Your health metrics are stored securely. We only use your data to tailor local African nutrition plans and cycle tracking.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  brandBadge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: radius.md,
    padding: 4,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: spacing.md,
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    borderWidth: 1,
  },
  errorBox: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
  },
  primaryButton: {
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xs,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  skipButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: 6,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  privacyCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
  },
  privacyTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  privacyBody: {
    fontSize: 12,
    lineHeight: 18,
  },
});
