import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { spacing, radius } from '../constants/theme';
import StatCard from '../components/StatCard';
import { RootStackParamList } from '../types';
import { fetchDashboard } from '../api/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

interface GoalItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'water' | 'exercise' | 'meal' | 'symptom';
}

const INITIAL_GOALS: GoalItem[] = [
  { id: '1', text: 'Hydration: Drink 8 glasses of water', completed: true, category: 'water' },
  { id: '2', text: 'Movement: 25 mins low-impact walk or yoga', completed: false, category: 'exercise' },
  { id: '3', text: 'Nutrition: Balanced African Low-GI lunch', completed: true, category: 'meal' },
  { id: '4', text: 'Check-in: Daily symptom & mood log', completed: false, category: 'symptom' },
];

export default function DashboardScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user } = useUser();

  const [weight, setWeight] = useState(`${user.weightKg} kg`);
  const [waist, setWaist] = useState(`${user.waistCm} cm`);
  const [bmi, setBmi] = useState(
    user.heightCm > 0 ? (user.weightKg / ((user.heightCm / 100) * (user.heightCm / 100))).toFixed(1) : '24.1'
  );
  const [cycleDay, setCycleDay] = useState('12');
  const [wellnessScore, setWellnessScore] = useState(78);
  const [goals, setGoals] = useState<GoalItem[]>(INITIAL_GOALS);
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  useEffect(() => {
    setWeight(`${user.weightKg} kg`);
    setWaist(`${user.waistCm} cm`);
    if (user.heightCm > 0 && user.weightKg > 0) {
      setBmi((user.weightKg / ((user.heightCm / 100) * (user.heightCm / 100))).toFixed(1));
    }
  }, [user.weightKg, user.waistCm, user.heightCm]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const result = await fetchDashboard();
        if (result && isMounted) {
          if (result.daysSinceLastPeriod || result.daysSincePeriod) {
            setCycleDay((result.daysSinceLastPeriod || result.daysSincePeriod).toString());
          }
          if (result.wellnessScore) setWellnessScore(result.wellnessScore);
        }
      } catch {
        // Fallback gracefully
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleGoal = (id: string) => {
    setGoals(prev =>
      prev.map(g => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const completedCount = goals.filter(g => g.completed).length;
  const goalPercentage = Math.round((completedCount / goals.length) * 100);

  const firstName = user.name.split(' ')[0] || 'Friend';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* 🌸 User Greeting Bar */}
      <View style={styles.userGreetingRow}>
        <View>
          <Text style={[styles.greetingTitle, { color: colors.textPrimary }]}>
            Hello, {firstName} 👋
          </Text>
          <Text style={[styles.greetingSubtitle, { color: colors.textMuted }]}>
            Focus: <Text style={{ color: colors.primary, fontWeight: '700' }}>{user.primaryGoal}</Text> • {user.dietStyle}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileSettings')}
          style={[styles.profilePill, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.profilePillText, { color: colors.primary }]}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      {/* 🌟 1. HERO: Promoted Daily Action Card */}
      <View
        style={[
          styles.heroActionCard,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
          },
        ]}
      >
        <View style={styles.heroActionHeader}>
          <Text style={[styles.heroBadge, { backgroundColor: colors.surface + '30', color: colors.textInverse }]}>
            ✨ Today's Priority
          </Text>
          <Text style={[styles.heroDate, { color: colors.textInverse + 'CC' }]}>
            Day {cycleDay} of Cycle
          </Text>
        </View>

        <Text style={[styles.heroTitle, { color: colors.textInverse }]}>
          Log Today's Symptoms & Hydration
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.textInverse + 'E6' }]}>
          Consistent check-ins improve cycle predictability and help tailor your Low-GI African meal recommendations.
        </Text>

        <View style={styles.heroButtonRow}>
          <TouchableOpacity
            style={[styles.heroPrimaryBtn, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('SymptomTracker')}
          >
            <Text style={[styles.heroPrimaryBtnText, { color: colors.primary }]}>
              Log Symptoms Now →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.heroSecondaryBtn, { borderColor: colors.surface + '80' }]}
            onPress={() => navigation.navigate('WaterTracker')}
          >
            <Text style={[styles.heroSecondaryBtnText, { color: colors.textInverse }]}>
              💧 + Water
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 📋 2. Interactive Checkable Goals */}
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
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Today's Health Goals
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
              {completedCount} of {goals.length} completed ({goalPercentage}%)
            </Text>
          </View>
          <View style={[styles.progressPill, { backgroundColor: colors.badgeBg }]}>
            <Text style={[styles.progressPillText, { color: colors.badgeText }]}>
              {goalPercentage}% Done
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={[styles.goalProgressBarBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.goalProgressBarFill,
              { backgroundColor: colors.secondary, width: `${goalPercentage}%` },
            ]}
          />
        </View>

        {/* Interactive Goal List */}
        <View style={styles.goalList}>
          {goals.map(goal => (
            <TouchableOpacity
              key={goal.id}
              onPress={() => toggleGoal(goal.id)}
              style={[
                styles.goalItem,
                {
                  backgroundColor: goal.completed ? colors.surfaceSubtle : colors.background,
                  borderColor: goal.completed ? colors.secondary + '60' : colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: goal.completed ? colors.secondary : 'transparent',
                    borderColor: goal.completed ? colors.secondary : colors.borderStrong,
                  },
                ]}
              >
                {goal.completed && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.goalText,
                  {
                    color: goal.completed ? colors.textMuted : colors.textPrimary,
                    textDecorationLine: goal.completed ? 'line-through' : 'none',
                  },
                ]}
              >
                {goal.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 📊 3. Health Summary Metric Cards */}
      <Text style={[styles.heading, { color: colors.textPrimary }]}>
        Health Baseline & Biometrics
      </Text>
      <View style={styles.row}>
        <StatCard
          label="Weight"
          value={weight}
          note="Baseline: 72.0 kg (-2.0 kg)"
          badge="Tracking"
        />
        <StatCard
          label="Waistline"
          value={waist}
          note="Ratio: 0.51 (Optimal)"
          badge="Healthy"
        />
      </View>
      <View style={styles.row}>
        <StatCard
          label="BMI Status"
          value={bmi}
          note="Normal BMI Range"
          badge="Healthy"
        />
        <StatCard
          label="Cycle Day"
          value={`Day ${cycleDay}`}
          note="Next cycle est: 16 days"
          badge="Follicular"
        />
      </View>

      {/* ℹ️ 4. PCOS Wellness Score with Context Disclosure */}
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
        <View style={styles.scoreHeaderRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              PCOS Wellness Score
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
              7-Day Rolling Lifestyle Index
            </Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: colors.secondaryLight }]}>
            <Text style={[styles.scoreBadgeText, { color: colors.secondary }]}>
              ↗ +3 pts this week
            </Text>
          </View>
        </View>

        <View style={styles.scoreDisplayRow}>
          <Text style={[styles.bigScore, { color: colors.secondary }]}>
            {wellnessScore}
          </Text>
          <Text style={[styles.scoreOutOf, { color: colors.textMuted }]}>
            / 100
          </Text>
        </View>

        <Text style={[styles.scoreSummary, { color: colors.textSecondary }]}>
          Your wellness score is calculated from logged hydration (85%), balanced nutrition (80%), sleep rhythm (75%), and symptom severity.
        </Text>

        <TouchableOpacity
          onPress={() => setShowScoreInfo(!showScoreInfo)}
          style={styles.disclosureToggle}
        >
          <Text style={[styles.disclosureToggleText, { color: colors.primary }]}>
            {showScoreInfo ? '▲ Hide calculation details' : 'ℹ️ How this score is calculated & medical disclaimer'}
          </Text>
        </TouchableOpacity>

        {showScoreInfo && (
          <View style={[styles.scoreDetailsBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
            <Text style={[styles.scoreDetailItem, { color: colors.textSecondary }]}>
              • <Text style={{ fontWeight: '700' }}>Hydration (25%)</Text>: Daily target of 8 glasses logged.
            </Text>
            <Text style={[styles.scoreDetailItem, { color: colors.textSecondary }]}>
              • <Text style={{ fontWeight: '700' }}>Nutrition (25%)</Text>: Adherence to Low-GI, anti-inflammatory African meals.
            </Text>
            <Text style={[styles.scoreDetailItem, { color: colors.textSecondary }]}>
              • <Text style={{ fontWeight: '700' }}>Movement (25%)</Text>: 25+ minutes of low-impact exercise.
            </Text>
            <Text style={[styles.scoreDetailItem, { color: colors.textSecondary }]}>
              • <Text style={{ fontWeight: '700' }}>Symptom Severity (25%)</Text>: Frequency of cramps, acne, or fatigue.
            </Text>
            <Text style={[styles.disclaimerText, { color: colors.textMuted }]}>
              * Disclaimer: The PCOS Wellness Score is an educational lifestyle metric and does not constitute medical diagnosis or replace physician consultation.
            </Text>
          </View>
        )}
      </View>

      {/* 🗂️ 5. Supporting Tools & Action Grid */}
      <Text style={[styles.heading, { color: colors.textPrimary }]}>
        Daily Trackers & Tools
      </Text>

      {/* Group A: Daily Trackers */}
      <View style={styles.actionGrid}>
        {[
          { label: 'Track Symptoms', icon: '📋', subtitle: 'Log mood & cramps', screen: 'SymptomTracker' },
          { label: 'Water Tracker', icon: '💧', subtitle: 'Log hydration', screen: 'WaterTracker' },
          { label: 'Period Diary', icon: '🩸', subtitle: 'Cycle & flow log', screen: 'PeriodTracker' },
          { label: 'Weight & Waist', icon: '⚖️', subtitle: 'Body measurements', screen: 'WeightTracker' },
        ].map(action => (
          <TouchableOpacity
            key={action.label}
            style={[
              styles.actionCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.cardShadow,
              },
            ]}
            onPress={() => navigation.navigate(action.screen as any)}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={[styles.actionTitle, { color: colors.textPrimary }]}>{action.label}</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textMuted }]}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Group B: Lifestyle & AI Companions */}
      <Text style={[styles.subheading, { color: colors.textMuted }]}>
        Lifestyle Planning & AI Guidance
      </Text>
      <View style={styles.actionGrid}>
        {[
          {
            label: 'African Meal Planner',
            icon: '🍲',
            subtitle: 'Local Low-GI healthy recipes (Sukuma wiki, Tilapia, Brown Ugali)',
            screen: 'AfricanMealPlanner',
            fullWidth: true,
          },
          {
            label: 'AI PCOS Lifestyle Coach',
            icon: '🤖',
            subtitle: 'Ask personalized questions on nutrition, insulin sensitivity, and cycle health',
            screen: 'AICoach',
            fullWidth: true,
          },
        ].map(action => (
          <TouchableOpacity
            key={action.label}
            style={[
              styles.actionCardLarge,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.cardShadow,
              },
            ]}
            onPress={() => navigation.navigate(action.screen as any)}
          >
            <Text style={styles.actionIconLarge}>{action.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.actionTitleLarge, { color: colors.textPrimary }]}>{action.label}</Text>
              <Text style={[styles.actionSubtitleLarge, { color: colors.textMuted }]}>{action.subtitle}</Text>
            </View>
            <Text style={[styles.actionArrow, { color: colors.primary }]}>→</Text>
          </TouchableOpacity>
        ))}
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
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: spacing.xxl,
  },
  userGreetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  greetingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  profilePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  profilePillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  heroActionCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  heroActionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  heroBadge: {
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    textTransform: 'uppercase',
  },
  heroDate: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  heroButtonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  heroPrimaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.sm,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  heroPrimaryBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
  heroSecondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  heroSecondaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  progressPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  progressPillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  goalProgressBarBg: {
    height: 8,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  goalProgressBarFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  goalList: {
    gap: spacing.xs,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  goalText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: spacing.sm,
  },
  subheading: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  scoreDisplayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: spacing.xs,
  },
  bigScore: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 6,
  },
  scoreSummary: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.xs,
  },
  disclosureToggle: {
    marginTop: spacing.xs,
    paddingVertical: 4,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  disclosureToggleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scoreDetailsBox: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    gap: 6,
  },
  scoreDetailItem: {
    fontSize: 13,
    lineHeight: 18,
  },
  disclaimerText: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 6,
    lineHeight: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  actionCard: {
    width: '48%',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
  },
  actionCardLarge: {
    width: '100%',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  actionIconLarge: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  actionTitleLarge: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  actionSubtitleLarge: {
    fontSize: 12,
    lineHeight: 16,
  },
  actionArrow: {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: spacing.sm,
  },
});
