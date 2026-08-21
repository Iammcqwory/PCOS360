import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';

export default function WaterTrackerScreen() {
  const { colors } = useTheme();
  const [goal] = useState(8);
  const [current, setCurrent] = useState(5);

  const progress = Math.min(100, Math.round((current / goal) * 100));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>💧 Cellular Hydration</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Water Intake Tracker
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Drinking 2.5L+ daily helps flush metabolic byproducts, improves insulin signaling, and relieves abdominal water retention.
        </Text>
      </View>

      <View
        style={[
          styles.mainCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        <Text style={[styles.countDisplay, { color: colors.primary }]}>
          {current} <Text style={[styles.goalDisplay, { color: colors.textMuted }]}>/ {goal} glasses</Text>
        </Text>
        <Text style={[styles.percentageText, { color: colors.secondary }]}>
          {progress}% of daily target achieved ({current * 250} ml)
        </Text>

        {/* Progress Bar */}
        <View style={[styles.progressBarBackground, { backgroundColor: colors.surfaceSubtle }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.secondary, width: `${progress}%` }]} />
        </View>

        {/* Glass Indicators Grid */}
        <View style={styles.glassGrid}>
          {Array.from({ length: goal }).map((_, index) => {
            const isFilled = index < current;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrent(index + 1)}
                style={[
                  styles.glassCircle,
                  {
                    backgroundColor: isFilled ? colors.primary : colors.surfaceSubtle,
                    borderColor: isFilled ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ fontSize: 18 }}>{isFilled ? '💧' : '🥛'}</Text>
                <Text
                  style={[
                    styles.glassNum,
                    { color: isFilled ? colors.textInverse : colors.textMuted },
                  ]}
                >
                  {index + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              { backgroundColor: colors.surfaceSubtle, borderColor: colors.border },
            ]}
            onPress={() => setCurrent(prev => Math.max(0, prev - 1))}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
              − Remove Glass
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={() => setCurrent(prev => Math.min(goal + 4, prev + 1))}
          >
            <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}>
              + Drink 1 Glass (250ml)
            </Text>
          </TouchableOpacity>
        </View>

        {current >= goal && (
          <View style={[styles.goalAchievedBox, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}>
            <Text style={[styles.goalAchievedText, { color: colors.secondary }]}>
              🎉 Daily Hydration Goal Reached! Great job supporting your hormones!
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
        <Text style={[styles.infoTitle, { color: colors.textPrimary }]}>
          💡 Why Hydration Matters in PCOS
        </Text>
        <Text style={[styles.infoBody, { color: colors.textSecondary }]}>
          Higher insulin levels can cause kidneys to retain sodium. Staying consistently hydrated prevents false water bloat and supports liver clearance of excess androgens.
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
  mainCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  countDisplay: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1,
  },
  goalDisplay: {
    fontSize: 22,
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  progressBarBackground: {
    width: '100%',
    borderRadius: radius.full,
    height: 12,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  glassGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: spacing.lg,
  },
  glassCircle: {
    width: 54,
    height: 60,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  glassNum: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1.4,
    borderRadius: radius.sm,
    paddingVertical: 12,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '800',
  },
  goalAchievedBox: {
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    width: '100%',
  },
  goalAchievedText: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  infoCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  infoBody: {
    fontSize: 12,
    lineHeight: 18,
  },
});
