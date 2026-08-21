import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';

const MEALS = [
  {
    meal: 'Breakfast',
    icon: '🍳',
    title: 'Avocado, Boiled Eggs & Spiced Rooibos Tea',
    giRating: 'Very Low GI (15)',
    benefits: 'Healthy fats stabilize morning blood glucose and reduce insulin spikes.',
    ingredients: '2 eggs, 1/2 avocado, unsweetened cinnamon rooibos tea.',
  },
  {
    meal: 'Lunch',
    icon: '🥗',
    title: 'Grilled Free-Range Chicken, Sukuma Wiki & Brown Ugali',
    giRating: 'Low GI (35)',
    benefits: 'High dietary fiber and magnesium aid insulin sensitivity and reduce bloating.',
    ingredients: '150g grilled chicken, steamed sukuma wiki (collard greens), small portion brown ugali.',
  },
  {
    meal: 'Dinner',
    icon: '🐟',
    title: 'Baked Lake Tilapia with Kachumbari Salad & Steamed Cabbage',
    giRating: 'Low GI (25)',
    benefits: 'Rich in Omega-3 fatty acids to reduce chronic androgenic inflammation.',
    ingredients: 'Fresh tilapia fillet, diced tomato, onion, cilantro, lemon, cabbage.',
  },
  {
    meal: 'Snacks & Hydration',
    icon: '🥜',
    title: 'Roasted Groundnuts & Fresh Baobab / Hibiscus Drink',
    giRating: 'Very Low GI (10)',
    benefits: 'Antioxidants and zinc support ovarian health and skin clarity.',
    ingredients: '1 handful roasted groundnuts, chilled hibiscus infusion.',
  },
];

export default function AfricanMealPlannerScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>🌾 Local Nutrition Science</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          African PCOS Meal Planner
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Traditional African ingredients chosen specifically for low glycemic index, hormone balance, and sustained energy.
        </Text>
      </View>

      {MEALS.map(item => (
        <View
          key={item.meal}
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              shadowColor: colors.cardShadow,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.mealIcon}>{item.icon}</Text>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{item.meal}</Text>
            </View>
            <View style={[styles.giBadge, { backgroundColor: colors.secondaryLight }]}>
              <Text style={[styles.giBadgeText, { color: colors.secondary }]}>{item.giRating}</Text>
            </View>
          </View>

          <Text style={[styles.menuTitle, { color: colors.primary }]}>{item.title}</Text>
          <Text style={[styles.benefitText, { color: colors.textSecondary }]}>
            💡 <Text style={{ fontWeight: '700' }}>PCOS Benefit:</Text> {item.benefits}
          </Text>
          <View style={[styles.ingredientsBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
            <Text style={[styles.ingredientsText, { color: colors.textMuted }]}>
              🛒 <Text style={{ fontWeight: '700' }}>Ingredients:</Text> {item.ingredients}
            </Text>
          </View>
        </View>
      ))}

      <View style={[styles.tipCard, { backgroundColor: colors.badgeBg, borderColor: colors.border }]}>
        <Text style={[styles.tipTitle, { color: colors.badgeText }]}>
          💡 Dietary Pro-Tip for Insulin Resistance
        </Text>
        <Text style={[styles.tipBody, { color: colors.textSecondary }]}>
          Pair complex carbohydrates (like brown ugali or sweet potatoes) with leafy greens and protein first to blunt glucose spikes.
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  giBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  giBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  benefitText: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.sm,
  },
  ingredientsBox: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  ingredientsText: {
    fontSize: 12,
    lineHeight: 17,
  },
  tipCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    marginTop: spacing.xs,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  tipBody: {
    fontSize: 12,
    lineHeight: 18,
  },
});
