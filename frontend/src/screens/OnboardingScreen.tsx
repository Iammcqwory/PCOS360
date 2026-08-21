import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../types';
import { submitOnboarding } from '../api/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const DIET_OPTIONS = [
  'African Low-GI',
  'Mediterranean',
  'High-Protein',
  'Plant-Based',
  'Custom'
];

export default function OnboardingScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { email, name } = route.params || { email: '', name: 'Friend' };

  const [age, setAge] = useState('26');
  const [heightCm, setHeightCm] = useState('165');
  const [weightKg, setWeightKg] = useState('70');
  const [waistCm, setWaistCm] = useState('84');
  const [diagnosedPCOS, setDiagnosedPCOS] = useState<'Yes' | 'No'>('Yes');
  const [trying, setTrying] = useState<'Yes' | 'No'>('No');
  const [dietStyle, setDietStyle] = useState('African Low-GI');
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitOnboarding({
        name,
        email,
        age: Number(age) || 26,
        heightCm: Number(heightCm) || 165,
        weightKg: Number(weightKg) || 70,
        waistCm: Number(waistCm) || 84,
        diagnosedPCOS,
        tryingToConceive: trying,
        dietStyle
      });
    } catch {
      // Allow progression even if backend offline
    }
    setSavedSuccess(true);
    setTimeout(() => {
      navigation.replace('Dashboard');
    }, 800);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Progress Header */}
      <View style={styles.progressHeader}>
        <View style={styles.stepBadge}>
          <Text style={[styles.stepText, { color: colors.primary }]}>Step 1 of 2</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Tell us about you, {name}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          These baseline health metrics calibrate your wellness score, cycle forecasts, and local African nutrition plans.
        </Text>
        {/* Progress Bar */}
        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.secondary, width: '50%' }]} />
        </View>
      </View>

      {/* Main Form Card */}
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
        {/* Metric Grid: Age & Height */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Age</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>years</Text>
            </View>
            <TextInput
              placeholder="e.g. 26"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  ...Platform.select({ web: { outlineColor: colors.primary } }) as any,
                },
              ]}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Height</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>cm</Text>
            </View>
            <TextInput
              placeholder="e.g. 165"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  ...Platform.select({ web: { outlineColor: colors.primary } }) as any,
                },
              ]}
              value={heightCm}
              onChangeText={setHeightCm}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Metric Grid: Weight & Waist */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Weight</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>kg</Text>
            </View>
            <TextInput
              placeholder="e.g. 70"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  ...Platform.select({ web: { outlineColor: colors.primary } }) as any,
                },
              ]}
              value={weightKg}
              onChangeText={setWeightKg}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Waist</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>cm</Text>
            </View>
            <TextInput
              placeholder="e.g. 84"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  ...Platform.select({ web: { outlineColor: colors.primary } }) as any,
                },
              ]}
              value={waistCm}
              onChangeText={setWaistCm}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Diagnosed with PCOS? */}
        <View style={styles.fieldBlock}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Diagnosed with PCOS by a physician?
          </Text>
          <View style={styles.radioGroup}>
            {(['Yes', 'No'] as const).map(option => {
              const selected = diagnosedPCOS === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setDiagnosedPCOS(option)}
                  style={[
                    styles.radioButton,
                    {
                      borderColor: selected ? colors.primary : colors.border,
                      backgroundColor: selected ? colors.primary : colors.background,
                    },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={[
                      styles.radioText,
                      { color: selected ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    {selected ? `✓ ${option}` : option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Trying to conceive? */}
        <View style={styles.fieldBlock}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Currently trying to conceive?
          </Text>
          <View style={styles.radioGroup}>
            {(['Yes', 'No'] as const).map(option => {
              const selected = trying === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setTrying(option)}
                  style={[
                    styles.radioButton,
                    {
                      borderColor: selected ? colors.primary : colors.border,
                      backgroundColor: selected ? colors.primary : colors.background,
                    },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={[
                      styles.radioText,
                      { color: selected ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    {selected ? `✓ ${option}` : option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Diet Style Pills */}
        <View style={styles.fieldBlock}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Preferred Diet Style
          </Text>
          <View style={styles.dietChipGroup}>
            {DIET_OPTIONS.map(diet => {
              const selected = dietStyle === diet;
              return (
                <TouchableOpacity
                  key={diet}
                  onPress={() => setDietStyle(diet)}
                  style={[
                    styles.dietChip,
                    {
                      borderColor: selected ? colors.secondary : colors.border,
                      backgroundColor: selected ? colors.secondary : colors.background,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dietChipText,
                      { color: selected ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    {selected ? `✓ ${diet}` : diet}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {savedSuccess ? (
          <View style={[styles.successBanner, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}>
            <Text style={[styles.successBannerText, { color: colors.secondary }]}>
              ✓ Profile saved successfully! Redirecting to Dashboard...
            </Text>
          </View>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: colors.secondary },
            loading && { opacity: 0.7 },
          ]}
          onPress={handleSubmit}
          disabled={loading || savedSuccess}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} size="small" />
          ) : (
            <Text style={[styles.submitButtonText, { color: colors.textInverse }]}>
              Save Profile & Enter Dashboard →
            </Text>
          )}
        </TouchableOpacity>
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
    maxWidth: 620,
    width: '100%',
    alignSelf: 'center',
  },
  progressHeader: {
    marginBottom: spacing.md,
  },
  stepBadge: {
    marginBottom: 4,
  },
  stepText: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  progressBarBg: {
    height: 6,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: radius.full,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  halfField: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  unitBadge: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  input: {
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    borderWidth: 1,
  },
  fieldBlock: {
    marginBottom: spacing.md,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 8,
  },
  radioButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  radioText: {
    fontSize: 15,
    fontWeight: '800',
  },
  dietChipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  dietChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  dietChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  successBanner: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  successBannerText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  submitButton: {
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xs,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
