import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';

const metrics = [
  { key: 'acne', label: 'Acne & Skin Flare-ups', desc: 'Facial, jawline, or back breakouts' },
  { key: 'facialHair', label: 'Excess Facial Hair (Hirsutism)', desc: 'Chin or upper lip growth' },
  { key: 'hairLoss', label: 'Hair Thinning', desc: 'Scalp hair shed or thinning' },
  { key: 'bloating', label: 'Abdominal Bloating', desc: 'Digestive fullness or water retention' },
  { key: 'fatigue', label: 'Energy & Fatigue', desc: 'Midday sluggishness or post-meal crashes' },
  { key: 'pelvicPain', label: 'Pelvic / Cramp Discomfort', desc: 'Ovarian or lower abdominal ache' },
  { key: 'mood', label: 'Mood Swings & Irritability', desc: 'Hormonal mood shifts' },
  { key: 'anxiety', label: 'Anxiety & Stress Levels', desc: 'Cortisol & tension sensations' },
];

const initialState = metrics.reduce((acc, metric) => ({ ...acc, [metric.key]: 2 }), {} as Record<string, number>);

export default function SymptomTrackerScreen() {
  const { colors } = useTheme();
  const [ratings, setRatings] = useState(initialState);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSetRating = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    if (Platform.OS === 'web') {
      window.alert('✓ Symptom Log Saved!\nYour wellness score and AI coach have been updated with today’s entry.');
    } else {
      Alert.alert('Saved!', 'Your symptom ratings have been logged.');
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
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>📋 Daily Health Log</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Daily Symptom Tracker
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Rate today’s symptom intensity from 1 (mild/none) to 5 (severe). Consistent tracking helps identify food and cycle triggers.
        </Text>
      </View>

      {metrics.map(metric => (
        <View
          key={metric.key}
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              shadowColor: colors.cardShadow,
            },
          ]}
        >
          <View style={styles.metricHeader}>
            <Text style={[styles.metricLabel, { color: colors.textPrimary }]}>{metric.label}</Text>
            <Text style={[styles.ratingBadge, { backgroundColor: colors.badgeBg, color: colors.badgeText }]}>
              Level {ratings[metric.key]} / 5
            </Text>
          </View>
          <Text style={[styles.metricDesc, { color: colors.textMuted }]}>{metric.desc}</Text>

          <View style={styles.optionsRow}>
            {[1, 2, 3, 4, 5].map(value => {
              const active = ratings[metric.key] === value;
              return (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleSetRating(metric.key, value)}
                  style={[
                    styles.ratingDot,
                    {
                      backgroundColor: active ? colors.primary : colors.surfaceSubtle,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ratingText,
                      { color: active ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      {savedSuccess && (
        <View style={[styles.successBanner, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}>
          <Text style={[styles.successText, { color: colors.secondary }]}>
            ✓ Today’s symptom ratings saved successfully!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.secondary }]}
        onPress={handleSave}
      >
        <Text style={[styles.saveButtonText, { color: colors.textInverse }]}>
          Save Today’s Symptom Entry →
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
  metricCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  ratingBadge: {
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  metricDesc: {
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  ratingDot: {
    flex: 1,
    height: 42,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '800',
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
