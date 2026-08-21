import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../types';
import { login } from '../api/api';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const PCOS_GOALS = [
  { id: 'Regulate Cycle & Periods', label: '🩸 Regulate Cycle & Periods' },
  { id: 'Manage Insulin & Weight', label: '⚖️ Manage Insulin & Weight' },
  { id: 'Reduce Acne & Bloat', label: '🌿 Reduce Acne & Bloat' },
  { id: 'Fertility & Conception', label: '👶 Fertility & Conception' },
];

export default function SignUpScreen({ navigation }: Props) {
  const { colors, mode, toggleTheme } = useTheme();
  const { updateProfile } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('Manage Insulin & Weight');
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please accept the health data privacy policy to continue.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await login(email);
    } catch {
      // Continue gracefully even if offline
    }
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      primaryGoal: selectedGoal,
      isGuest: false,
    });
    setLoading(false);
    navigation.replace('Onboarding', { email: email.trim(), name: name.trim() });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Splash')}
          style={styles.backBtn}
        >
          <Text style={[styles.backBtnText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.themeBtnText, { color: colors.textPrimary }]}>
            {mode === 'dark' ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Header Title */}
      <View style={styles.header}>
        <Text style={styles.logoEmoji}>🌸</Text>
        <Text style={[styles.title, { color: colors.primary }]}>Create Your Profile</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Join thousands of African women taking control of PCOS through science, nutrition, and daily rhythm.
        </Text>
      </View>

      {/* Form Card */}
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
        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            Full Name <Text style={{ color: colors.error }}>*</Text>
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

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
              Password <Text style={{ color: colors.error }}>*</Text>
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
              placeholder="Min 6 characters"
              placeholderTextColor={colors.textMuted}
              value={password}
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
                setError('');
              }}
            />
          </View>

          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
              Confirm Password <Text style={{ color: colors.error }}>*</Text>
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
              placeholder="Re-enter password"
              placeholderTextColor={colors.textMuted}
              value={confirmPassword}
              secureTextEntry
              onChangeText={text => {
                setConfirmPassword(text);
                setError('');
              }}
            />
          </View>
        </View>

        {/* Primary PCOS Wellness Goal */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            What is your primary PCOS goal?
          </Text>
          <View style={styles.goalsGrid}>
            {PCOS_GOALS.map(goal => {
              const selected = selectedGoal === goal.id;
              return (
                <TouchableOpacity
                  key={goal.id}
                  onPress={() => setSelectedGoal(goal.id)}
                  style={[
                    styles.goalChip,
                    {
                      backgroundColor: selected ? colors.primary : colors.surfaceSubtle,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.goalChipText,
                      { color: selected ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    {selected ? `✓ ${goal.label}` : goal.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Privacy Checkbox */}
        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          style={styles.privacyAgreementRow}
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: agreed ? colors.secondary : 'transparent',
                borderColor: agreed ? colors.secondary : colors.borderStrong,
              },
            ]}
          >
            {agreed && <Text style={styles.checkIcon}>✓</Text>}
          </View>
          <Text style={[styles.privacyAgreementText, { color: colors.textSecondary }]}>
            I agree to the secure, encrypted storage of my health data.
          </Text>
        </TouchableOpacity>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: colors.error + '15', borderColor: colors.error }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {error}</Text>
          </View>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} size="small" />
          ) : (
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}>
              Create Account & Start Assessment →
            </Text>
          )}
        </TouchableOpacity>

        {/* Switch to Login */}
        <View style={styles.switchRow}>
          <Text style={[styles.switchText, { color: colors.textMuted }]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.switchLink, { color: colors.primary }]}>
              {' '}Sign In
            </Text>
          </TouchableOpacity>
        </View>
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
    maxWidth: 580,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: spacing.xxl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  themeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  themeBtnText: {
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  logoEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 460,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  halfField: {
    flex: 1,
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
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  goalChip: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  goalChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  privacyAgreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  privacyAgreementText: {
    fontSize: 12,
    flex: 1,
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
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  switchText: {
    fontSize: 13,
  },
  switchLink: {
    fontSize: 13,
    fontWeight: '800',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
});
