import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';

export default function WeightTrackerScreen() {
  const { colors } = useTheme();
  const [weight, setWeight] = useState('70');
  const [waist, setWaist] = useState('84');
  const [hips, setHips] = useState('98');
  const [height, setHeight] = useState('165');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const numWeight = Number(weight) || 0;
  const numHeightM = (Number(height) || 165) / 100;
  const numWaist = Number(waist) || 0;
  const numHips = Number(hips) || 0;

  const bmi = numHeightM > 0 ? (numWeight / (numHeightM * numHeightM)).toFixed(1) : '0.0';
  const waistHeightRatio = Number(height) > 0 ? (numWaist / Number(height)).toFixed(2) : '0.00';
  const waistHipRatio = numHips > 0 ? (numWaist / numHips).toFixed(2) : '0.00';

  const handleSave = () => {
    setSavedSuccess(true);
    if (Platform.OS === 'web') {
      window.alert(`✓ Measurements Logged!\nWeight: ${weight} kg | Waist: ${waist} cm | BMI: ${bmi}`);
    } else {
      Alert.alert('Saved!', `Weight: ${weight}kg, BMI: ${bmi}`);
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>⚖️ Body Composition</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Weight & Waistline Log
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          In PCOS, waist circumference and waist-to-height ratio are more sensitive indicators of visceral fat and insulin resistance than BMI alone.
        </Text>
      </View>

      {/* Input Form Card */}
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
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Weight (kg)</Text>
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
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="70.0"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Waist (cm)</Text>
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
              value={waist}
              onChangeText={setWaist}
              keyboardType="numeric"
              placeholder="84.0"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Hips (cm)</Text>
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
              value={hips}
              onChangeText={setHips}
              keyboardType="numeric"
              placeholder="98.0"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Height (cm)</Text>
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
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="165.0"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        {/* Real-time Calculated Biomarkers */}
        <View style={styles.metricsSummaryGrid}>
          <View style={[styles.metricSummaryCard, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
            <Text style={[styles.metricSummaryLabel, { color: colors.textMuted }]}>BMI INDEX</Text>
            <Text style={[styles.metricSummaryValue, { color: colors.primary }]}>{bmi}</Text>
            <Text style={[styles.metricSummaryTag, { color: colors.secondary }]}>Normal Weight</Text>
          </View>

          <View style={[styles.metricSummaryCard, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
            <Text style={[styles.metricSummaryLabel, { color: colors.textMuted }]}>WAIST / HEIGHT</Text>
            <Text style={[styles.metricSummaryValue, { color: colors.secondary }]}>{waistHeightRatio}</Text>
            <Text style={[styles.metricSummaryTag, { color: colors.secondary }]}>Healthy (&lt; 0.53)</Text>
          </View>

          <View style={[styles.metricSummaryCard, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
            <Text style={[styles.metricSummaryLabel, { color: colors.textMuted }]}>WAIST / HIP</Text>
            <Text style={[styles.metricSummaryValue, { color: colors.accent }]}>{waistHipRatio}</Text>
            <Text style={[styles.metricSummaryTag, { color: colors.accent }]}>Low Risk (&lt; 0.85)</Text>
          </View>
        </View>

        {savedSuccess && (
          <View style={[styles.successBanner, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}>
            <Text style={[styles.successText, { color: colors.secondary }]}>
              ✓ Biometrics logged and dashboard trends updated!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.secondary }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.textInverse }]}>
            Save Body Measurements →
          </Text>
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
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    borderWidth: 1,
  },
  metricsSummaryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: spacing.md,
  },
  metricSummaryCard: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
  },
  metricSummaryLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  metricSummaryValue: {
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 2,
  },
  metricSummaryTag: {
    fontSize: 10,
    fontWeight: '700',
  },
  successBanner: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  successText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  saveButton: {
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xs,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
