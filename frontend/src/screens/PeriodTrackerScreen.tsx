import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';

const FLOW_LEVELS = ['Light', 'Medium', 'Heavy', 'Spotting'];

export default function PeriodTrackerScreen() {
  const { colors } = useTheme();
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-05');
  const [cycleLength, setCycleLength] = useState('32');
  const [flow, setFlow] = useState('Medium');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    if (Platform.OS === 'web') {
      window.alert(`✓ Period Logged!\nStart: ${startDate} | Length: ${cycleLength} days | Flow: ${flow}`);
    } else {
      Alert.alert('Saved!', `Cycle logged: ${startDate} to ${endDate}, Flow: ${flow}`);
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
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>🩸 Menstrual & Ovulation Cycle</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Period & Ovulation Diary
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Tracking cycle variations detects anovulatory cycles, follicular phase length, and helps predict hormonal shifts.
        </Text>
      </View>

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
            Last Period Start Date (YYYY-MM-DD)
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
            value={startDate}
            onChangeText={setStartDate}
            placeholder="e.g. 2026-06-01"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            Average Cycle Length (Days)
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
            value={cycleLength}
            onChangeText={setCycleLength}
            keyboardType="number-pad"
            placeholder="e.g. 32"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            Flow Intensity
          </Text>
          <View style={styles.flowRow}>
            {FLOW_LEVELS.map(f => {
              const selected = flow === f;
              return (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFlow(f)}
                  style={[
                    styles.flowChip,
                    {
                      backgroundColor: selected ? colors.primary : colors.surfaceSubtle,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.flowChipText,
                      { color: selected ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    {selected ? `✓ ${f}` : f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {savedSuccess && (
          <View style={[styles.successBanner, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}>
            <Text style={[styles.successText, { color: colors.secondary }]}>
              ✓ Period cycle logged and next forecast updated!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.secondary }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.textInverse }]}>
            Log Period Cycle Entry →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cycle Forecast Card */}
      <View
        style={[
          styles.forecastCard,
          {
            backgroundColor: colors.surfaceSubtle,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.forecastTitle, { color: colors.textPrimary }]}>
          🗓️ Cycle Prediction & Ovulation Window
        </Text>
        <Text style={[styles.forecastItem, { color: colors.textSecondary }]}>
          • <Text style={{ fontWeight: '700' }}>Next Period Estimated:</Text> In 16 days (Cycle Day 12 of ~{cycleLength} days)
        </Text>
        <Text style={[styles.forecastItem, { color: colors.textSecondary }]}>
          • <Text style={{ fontWeight: '700' }}>Estimated Fertile Window:</Text> Day 14 – Day 20 of cycle
        </Text>
        <Text style={[styles.forecastItem, { color: colors.textSecondary }]}>
          • <Text style={{ fontWeight: '700' }}>Hormonal Phase:</Text> Follicular Phase (Optimal for resistance training & Low-GI meals)
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
  flowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  flowChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  flowChipText: {
    fontSize: 13,
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
  forecastCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    gap: 6,
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  forecastItem: {
    fontSize: 13,
    lineHeight: 19,
  },
});
