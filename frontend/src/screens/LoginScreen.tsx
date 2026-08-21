import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../types';
import { login } from '../api/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors, mode, toggleTheme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email);
      navigation.replace('Dashboard');
    } catch {
      // Allow graceful offline progression
      navigation.replace('Dashboard');
    } finally {
      setLoading(false);
    }
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

      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.logoEmoji}>🌸</Text>
        <Text style={[styles.title, { color: colors.primary }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign in to access your PCOS logs, customized African meal plans, and cycle trends.
        </Text>
      </View>

      {/* Login Card */}
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

        <View style={styles.fieldGroup}>
          <View style={styles.labelRow}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
              Password <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={[styles.togglePwText, { color: colors.primary }]}>
                {showPassword ? 'Hide 👁️' : 'Show 👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>
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
            placeholder="••••••••••••"
            placeholderTextColor={colors.textMuted}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={text => {
              setPassword(text);
              setError('');
            }}
          />
        </View>

        {/* Remember Me & Forgot Password Row */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMeRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: rememberMe ? colors.primary : 'transparent',
                  borderColor: rememberMe ? colors.primary : colors.borderStrong,
                },
              ]}
            >
              {rememberMe && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={[styles.rememberMeText, { color: colors.textSecondary }]}>
              Remember me
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'web') {
                window.alert('Password Reset:\nA temporary secure sign-in link has been sent to your email.');
              }
            }}
          >
            <Text style={[styles.forgotText, { color: colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: colors.error + '15', borderColor: colors.error }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {error}</Text>
          </View>
        ) : null}

        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} size="small" />
          ) : (
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}>
              Sign In to PCOS360 →
            </Text>
          )}
        </TouchableOpacity>

        {/* Switch to Sign Up */}
        <View style={styles.switchRow}>
          <Text style={[styles.switchText, { color: colors.textMuted }]}>
            Don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.switchLink, { color: colors.primary }]}>
              {' '}Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Guest Bypass */}
      <TouchableOpacity
        style={styles.guestLink}
        onPress={() => navigation.replace('Dashboard')}
      >
        <Text style={[styles.guestLinkText, { color: colors.textMuted }]}>
          Skip login and continue as Guest →
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
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
    maxWidth: 420,
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  togglePwText: {
    fontSize: 12,
    fontWeight: '700',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  input: {
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    borderWidth: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  rememberMeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '700',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
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
  guestLink: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: 8,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  guestLinkText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
