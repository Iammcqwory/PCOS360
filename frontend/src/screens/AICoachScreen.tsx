import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';
import { askCoach } from '../api/api';

const QUICK_PROMPTS = [
  'Best African breakfast for insulin sensitivity?',
  'How can I naturally manage cortisol & stress?',
  'Foods to reduce PCOS acne & inflammation?',
  'What exercises support cycle regularity?'
];

export default function AICoachScreen() {
  const { colors } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(
    'Hello! I am your PCOS360 AI Health Coach. Ask me anything about managing symptoms, nutrition, hormone balance, or cycle health with local African foods.'
  );
  const [loading, setLoading] = useState(false);

  const handleAsk = async (queryText?: string) => {
    const messageToSend = queryText || prompt;
    if (!messageToSend.trim()) return;
    setLoading(true);
    try {
      const result = await askCoach(messageToSend);
      setResponse(result.answer || result.reply || 'Here is what research recommends: Focus on high-fiber leafy greens, consistent hydration, and steady protein intake to reduce insulin resistance.');
    } catch {
      setResponse('Based on PCOS nutrition principles: Prioritize low-GI foods like sukuma wiki, boiled eggs, sweet potatoes, and avocado. Avoid refined sugars on an empty stomach to prevent insulin spikes.');
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>🤖 Evidence-Based Guidance</Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          AI PCOS Lifestyle Coach
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Personalized answers on nutrition, insulin management, cycle tracking, and stress reduction.
        </Text>
      </View>

      {/* Suggested Quick Questions */}
      <Text style={[styles.suggestionHeading, { color: colors.textMuted }]}>
        Suggested Questions:
      </Text>
      <View style={styles.promptChipsRow}>
        {QUICK_PROMPTS.map(q => (
          <TouchableOpacity
            key={q}
            onPress={() => handleAsk(q)}
            style={[
              styles.promptChip,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.promptChipText, { color: colors.primary }]}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Response Display Bubble */}
      <View
        style={[
          styles.responseCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        <View style={styles.coachHeaderRow}>
          <Text style={styles.coachAvatar}>🌸</Text>
          <View>
            <Text style={[styles.coachName, { color: colors.textPrimary }]}>PCOS360 AI Coach</Text>
            <Text style={[styles.coachTag, { color: colors.secondary }]}>• Lifestyle Assistant</Text>
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={[styles.loadingText, { color: colors.textMuted }]}>Generating personalized advice...</Text>
          </View>
        ) : (
          <Text style={[styles.responseText, { color: colors.textPrimary }]}>{response}</Text>
        )}
      </View>

      {/* User Input Area */}
      <View
        style={[
          styles.inputCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
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
          placeholder="Ask about foods, symptoms, remedies, or exercise..."
          placeholderTextColor={colors.textMuted}
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.askButton,
            { backgroundColor: colors.primary },
            loading && { opacity: 0.7 },
          ]}
          onPress={() => handleAsk()}
          disabled={loading}
        >
          <Text style={[styles.askButtonText, { color: colors.textInverse }]}>
            {loading ? 'Consulting Coach...' : 'Send Question →'}
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
    marginBottom: spacing.sm,
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
    marginBottom: spacing.sm,
  },
  suggestionHeading: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  promptChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.md,
  },
  promptChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  promptChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  responseCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  coachHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  coachAvatar: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  coachName: {
    fontSize: 15,
    fontWeight: '800',
  },
  coachTag: {
    fontSize: 12,
    fontWeight: '700',
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: spacing.sm,
  },
  loadingText: {
    fontSize: 14,
  },
  responseText: {
    fontSize: 15,
    lineHeight: 23,
  },
  inputCard: {
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    borderRadius: radius.sm,
    padding: spacing.md,
    minHeight: 80,
    fontSize: 15,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  askButton: {
    borderRadius: radius.sm,
    paddingVertical: 12,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  askButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
