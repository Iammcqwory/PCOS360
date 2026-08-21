import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileSettings'>;

const PCOS_GOALS = [
  { id: 'Regulate Cycle & Periods', label: '🩸 Regulate Cycle & Periods' },
  { id: 'Manage Insulin & Weight', label: '⚖️ Manage Insulin & Weight' },
  { id: 'Reduce Acne & Bloat', label: '🌿 Reduce Acne & Bloat' },
  { id: 'Fertility & Conception', label: '👶 Fertility & Conception' },
];

const DIET_OPTIONS = [
  'African Low-GI',
  'Mediterranean',
  'High-Protein',
  'Plant-Based',
  'Custom'
];

const WATER_TARGETS = [6, 8, 10, 12];
const EXERCISE_TARGETS = [15, 25, 35, 45];

export default function ProfileSettingsScreen({ navigation }: Props) {
  const { colors, mode, toggleTheme } = useTheme();
  const { user, updateProfile, logoutUser, resetToDemo } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age.toString());
  const [heightCm, setHeightCm] = useState(user.heightCm.toString());
  const [weightKg, setWeightKg] = useState(user.weightKg.toString());
  const [waistCm, setWaistCm] = useState(user.waistCm.toString());
  const [diagnosedPCOS, setDiagnosedPCOS] = useState<'Yes' | 'No'>(user.diagnosedPCOS);
  const [trying, setTrying] = useState<'Yes' | 'No'>(user.tryingToConceive);
  const [dietStyle, setDietStyle] = useState(user.dietStyle);
  const [primaryGoal, setPrimaryGoal] = useState(user.primaryGoal);
  const [waterGoal, setWaterGoal] = useState(user.waterGoalGlasses);
  const [exerciseGoal, setExerciseGoal] = useState(user.exerciseGoalMins);
  const [notifications, setNotifications] = useState(user.notificationsEnabled);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'AB';

  const handleSave = () => {
    setSaving(true);
    updateProfile({
      name: name.trim() || 'Amina Bello',
      email: email.trim() || 'user@pcos360.app',
      age: Number(age) || 26,
      heightCm: Number(heightCm) || 165,
      weightKg: Number(weightKg) || 70,
      waistCm: Number(waistCm) || 84,
      diagnosedPCOS,
      tryingToConceive: trying,
      dietStyle,
      primaryGoal,
      waterGoalGlasses: waterGoal,
      exerciseGoalMins: exerciseGoal,
      notificationsEnabled: notifications,
    });
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleLogout = () => {
    logoutUser();
    navigation.replace('Splash');
  };

  const handleExportData = () => {
    const summary = `PCOS360 Health Report for ${name}:\nEmail: ${email}\nWeight: ${weightKg}kg | Waist: ${waistCm}cm | Height: ${heightCm}cm\nPCOS Diagnosis: ${diagnosedPCOS} | Trying to Conceive: ${trying}\nDiet: ${dietStyle} | Primary Goal: ${primaryGoal}\nDaily Goals: ${waterGoal} glasses water, ${exerciseGoal} mins movement.`;
    if (Platform.OS === 'web') {
      window.alert(`📋 Health Data Summary Exported:\n\n${summary}`);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* 👤 1. Profile Header Card */}
      <View
        style={[
          styles.profileHeaderCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.cardShadow,
          },
        ]}
      >
        <View style={styles.avatarRow}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>{name}</Text>
            <Text style={[styles.userEmail, { color: colors.textMuted }]}>{email}</Text>
            <View style={styles.badgeRow}>
              <View style={[styles.memberBadge, { backgroundColor: colors.secondaryLight }]}>
                <Text style={[styles.memberBadgeText, { color: colors.secondary }]}>
                  {user.isGuest ? '⚡ Guest Session' : '✨ Active PCOS Member'}
                </Text>
              </View>
              <View style={[styles.goalBadge, { backgroundColor: colors.badgeBg }]}>
                <Text style={[styles.goalBadgeText, { color: colors.badgeText }]}>
                  {primaryGoal}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 📝 2. Personal & Biometric Baselines */}
      <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
        Personal & Biometric Baselines
      </Text>
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
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Full Name</Text>
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
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Email Address</Text>
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Your email"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Biometrics 2x2 Grid */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Age</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>years</Text>
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
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Height</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>cm</Text>
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
              value={heightCm}
              onChangeText={setHeightCm}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Weight</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>kg</Text>
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
              value={weightKg}
              onChangeText={setWeightKg}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.halfField}>
            <View style={styles.labelRow}>
              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Waist</Text>
              <Text style={[styles.unitBadge, { backgroundColor: colors.surfaceSubtle, color: colors.textMuted }]}>cm</Text>
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
              value={waistCm}
              onChangeText={setWaistCm}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </View>

      {/* 🎯 3. PCOS Management Focus & Diet */}
      <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
        PCOS Wellness Focus & Lifestyle
      </Text>
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
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Primary Health Goal</Text>
          <View style={styles.chipGrid}>
            {PCOS_GOALS.map(g => {
              const selected = primaryGoal === g.id;
              return (
                <TouchableOpacity
                  key={g.id}
                  onPress={() => setPrimaryGoal(g.id)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected ? colors.primary : colors.surfaceSubtle,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: selected ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    {selected ? `✓ ${g.label}` : g.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Diagnosed & Conceiving */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Diagnosed PCOS?</Text>
            <View style={styles.toggleRow}>
              {(['Yes', 'No'] as const).map(opt => {
                const sel = diagnosedPCOS === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => setDiagnosedPCOS(opt)}
                    style={[
                      styles.toggleBtn,
                      {
                        backgroundColor: sel ? colors.primary : colors.surfaceSubtle,
                        borderColor: sel ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.toggleBtnText, { color: sel ? colors.textInverse : colors.textPrimary }]}>
                      {sel ? `✓ ${opt}` : opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.halfField}>
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Trying to Conceive?</Text>
            <View style={styles.toggleRow}>
              {(['Yes', 'No'] as const).map(opt => {
                const sel = trying === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => setTrying(opt)}
                    style={[
                      styles.toggleBtn,
                      {
                        backgroundColor: sel ? colors.primary : colors.surfaceSubtle,
                        borderColor: sel ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.toggleBtnText, { color: sel ? colors.textInverse : colors.textPrimary }]}>
                      {sel ? `✓ ${opt}` : opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Diet Style */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Preferred Nutrition Pattern</Text>
          <View style={styles.dietPillsRow}>
            {DIET_OPTIONS.map(d => {
              const selected = dietStyle === d;
              return (
                <TouchableOpacity
                  key={d}
                  onPress={() => setDietStyle(d)}
                  style={[
                    styles.dietPill,
                    {
                      backgroundColor: selected ? colors.secondary : colors.surfaceSubtle,
                      borderColor: selected ? colors.secondary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dietPillText,
                      { color: selected ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    {selected ? `✓ ${d}` : d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* 💧 4. Daily Habits & Target Settings */}
      <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
        Daily Target Calibration
      </Text>
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
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Daily Hydration Target</Text>
          <View style={styles.targetRow}>
            {WATER_TARGETS.map(w => {
              const selected = waterGoal === w;
              return (
                <TouchableOpacity
                  key={w}
                  onPress={() => setWaterGoal(w)}
                  style={[
                    styles.targetBox,
                    {
                      backgroundColor: selected ? colors.primary : colors.surfaceSubtle,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 16 }}>💧</Text>
                  <Text style={[styles.targetBoxText, { color: selected ? colors.textInverse : colors.textPrimary }]}>
                    {w} Glasses
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Daily Movement / Low-Impact Exercise</Text>
          <View style={styles.targetRow}>
            {EXERCISE_TARGETS.map(e => {
              const selected = exerciseGoal === e;
              return (
                <TouchableOpacity
                  key={e}
                  onPress={() => setExerciseGoal(e)}
                  style={[
                    styles.targetBox,
                    {
                      backgroundColor: selected ? colors.secondary : colors.surfaceSubtle,
                      borderColor: selected ? colors.secondary : colors.border,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 16 }}>🏃🏽‍♀️</Text>
                  <Text style={[styles.targetBoxText, { color: selected ? colors.textInverse : colors.textPrimary }]}>
                    {e} Mins
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* ⚙️ 5. App Preferences & Privacy */}
      <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
        App Preferences & Health Data Privacy
      </Text>
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
        <View style={styles.settingItemRow}>
          <View>
            <Text style={[styles.settingItemTitle, { color: colors.textPrimary }]}>
              Theme Mode
            </Text>
            <Text style={[styles.settingItemSubtitle, { color: colors.textMuted }]}>
              Current: {mode === 'dark' ? 'Dark Obsidian' : 'Clean Light'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.themePillBtn, { backgroundColor: colors.badgeBg }]}
          >
            <Text style={[styles.themePillBtnText, { color: colors.badgeText }]}>
              {mode === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.settingItemRow}>
          <View>
            <Text style={[styles.settingItemTitle, { color: colors.textPrimary }]}>
              Daily Health Check-in Reminders
            </Text>
            <Text style={[styles.settingItemSubtitle, { color: colors.textMuted }]}>
              Receive symptom & hydration reminders
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setNotifications(!notifications)}
            style={[
              styles.switchBtn,
              {
                backgroundColor: notifications ? colors.secondary : colors.surfaceSubtle,
                borderColor: notifications ? colors.secondary : colors.border,
              },
            ]}
          >
            <Text style={[styles.switchBtnText, { color: notifications ? colors.textInverse : colors.textMuted }]}>
              {notifications ? 'Enabled ✓' : 'Disabled'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.settingItemRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.settingItemTitle, { color: colors.textPrimary }]}>
              🔒 Encrypted Health Data Storage
            </Text>
            <Text style={[styles.settingItemSubtitle, { color: colors.textMuted }]}>
              Your health logs are encrypted and never sold to third parties.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleExportData}
            style={[styles.exportBtn, { borderColor: colors.border }]}
          >
            <Text style={[styles.exportBtnText, { color: colors.primary }]}>
              Export Summary 📋
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Notification */}
      {savedSuccess && (
        <View style={[styles.successBanner, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}>
          <Text style={[styles.successText, { color: colors.secondary }]}>
            ✓ Profile & settings updated successfully across your dashboard!
          </Text>
        </View>
      )}

      {/* Primary Save Changes Button */}
      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: colors.secondary }, saving && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color={colors.textInverse} size="small" />
        ) : (
          <Text style={[styles.saveBtnText, { color: colors.textInverse }]}>
            Save All Profile Settings →
          </Text>
        )}
      </TouchableOpacity>

      {/* Session Actions: Logout / Switch User & Reset */}
      <View style={styles.sessionActionRow}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={[styles.logoutBtnText, { color: colors.error }]}>
            🚪 Sign Out / Switch Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetToDemo} style={styles.resetBtn}>
          <Text style={[styles.resetBtnText, { color: colors.textMuted }]}>
            ↺ Reset Demo Profile
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
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: spacing.xxl,
  },
  profileHeaderCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  memberBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  memberBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  goalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  goalBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
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
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  halfField: {
    flex: 1,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  toggleBtnText: {
    fontSize: 13,
    fontWeight: '800',
  },
  dietPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  dietPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
    borderWidth: 1.5,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  dietPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  targetRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  targetBox: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    gap: 2,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  targetBoxText: {
    fontSize: 11,
    fontWeight: '800',
  },
  settingItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingItemTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  settingItemSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  themePillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  themePillBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  switchBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  switchBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  exportBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  exportBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  successBanner: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginVertical: spacing.sm,
  },
  successText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  saveBtn: {
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.md,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '800',
  },
  sessionActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  logoutBtn: {
    paddingVertical: 6,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  resetBtn: {
    paddingVertical: 6,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  resetBtnText: {
    fontSize: 13,
  },
});
