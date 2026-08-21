import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, radius } from '../constants/theme';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthScreen from '../screens/AuthScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import WeightTrackerScreen from '../screens/WeightTrackerScreen';
import PeriodTrackerScreen from '../screens/PeriodTrackerScreen';
import AfricanMealPlannerScreen from '../screens/AfricanMealPlannerScreen';
import WaterTrackerScreen from '../screens/WaterTrackerScreen';
import AICoachScreen from '../screens/AICoachScreen';

type ScreenName =
  | 'Splash'
  | 'Login'
  | 'SignUp'
  | 'Dashboard'
  | 'Auth'
  | 'Onboarding'
  | 'SymptomTracker'
  | 'WeightTracker'
  | 'PeriodTracker'
  | 'AfricanMealPlanner'
  | 'WaterTracker'
  | 'AICoach';

interface ScreenState {
  name: ScreenName;
  params?: any;
}

const SCREEN_TITLES: Record<ScreenName, string> = {
  Splash: 'PCOS360 Welcome',
  Login: 'Sign In',
  SignUp: 'Create Account',
  Dashboard: 'PCOS360 Dashboard',
  Auth: 'Sign In / Sign Up',
  Onboarding: 'Personal Profile Setup',
  SymptomTracker: 'Daily Symptom Tracker',
  WeightTracker: 'Weight & Waistline',
  PeriodTracker: 'Menstrual & Ovulation Cycle',
  AfricanMealPlanner: 'African Meal Planner',
  WaterTracker: 'Water Intake Tracker',
  AICoach: 'AI PCOS Lifestyle Coach',
};

export default function AppNavigator() {
  const { colors, mode, toggleTheme } = useTheme();
  const [history, setHistory] = useState<ScreenState[]>([{ name: 'Splash' }]);

  const current = history[history.length - 1] || { name: 'Splash' };

  const navigate = (name: ScreenName, params?: any) => {
    setHistory(prev => [...prev, { name, params }]);
  };

  const replace = (name: ScreenName, params?: any) => {
    setHistory(prev => [...prev.slice(0, -1), { name, params }]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const navigationProp = {
    navigate: (name: string, params?: any) => navigate(name as ScreenName, params),
    replace: (name: string, params?: any) => replace(name as ScreenName, params),
    goBack,
  };

  const routeProp = {
    params: current.params || {},
  };

  const isAuthOrLanding = current.name === 'Splash' || current.name === 'Login' || current.name === 'SignUp';

  const renderActiveScreen = () => {
    switch (current.name) {
      case 'Splash':
        return <SplashScreen navigation={navigationProp as any} route={routeProp as any} />;
      case 'Login':
        return <LoginScreen navigation={navigationProp as any} route={routeProp as any} />;
      case 'SignUp':
        return <SignUpScreen navigation={navigationProp as any} route={routeProp as any} />;
      case 'Auth':
        return <AuthScreen navigation={navigationProp as any} route={routeProp as any} />;
      case 'Onboarding':
        return <OnboardingScreen navigation={navigationProp as any} route={routeProp as any} />;
      case 'SymptomTracker':
        return <SymptomTrackerScreen />;
      case 'WeightTracker':
        return <WeightTrackerScreen />;
      case 'PeriodTracker':
        return <PeriodTrackerScreen />;
      case 'AfricanMealPlanner':
        return <AfricanMealPlannerScreen />;
      case 'WaterTracker':
        return <WaterTrackerScreen />;
      case 'AICoach':
        return <AICoachScreen />;
      case 'Dashboard':
      default:
        return <DashboardScreen navigation={navigationProp as any} route={routeProp as any} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🌸 Top Header (Only displayed when inside the app dashboard/trackers) */}
      {!isAuthOrLanding && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
              shadowColor: colors.cardShadow,
            },
          ]}
        >
          <View style={styles.headerContent}>
            {/* Logo */}
            <TouchableOpacity
              onPress={() => navigate('Dashboard')}
              style={styles.logoContainer}
            >
              <Text style={[styles.logoText, { color: colors.primary }]}>
                🌸 PCOS360
              </Text>
            </TouchableOpacity>

            {/* Navigation Links & Theme Switcher */}
            <View style={styles.navRightGroup}>
              <View style={styles.navLinks}>
                <TouchableOpacity
                  onPress={() => navigate('Dashboard')}
                  style={[
                    styles.navChip,
                    {
                      backgroundColor: current.name === 'Dashboard' ? colors.primary : colors.surfaceSubtle,
                      borderColor: current.name === 'Dashboard' ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.navChipText,
                      { color: current.name === 'Dashboard' ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    Dashboard
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigate('AfricanMealPlanner')}
                  style={[
                    styles.navChip,
                    {
                      backgroundColor: current.name === 'AfricanMealPlanner' ? colors.primary : colors.surfaceSubtle,
                      borderColor: current.name === 'AfricanMealPlanner' ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.navChipText,
                      { color: current.name === 'AfricanMealPlanner' ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    Meal Plan
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigate('AICoach')}
                  style={[
                    styles.navChip,
                    {
                      backgroundColor: current.name === 'AICoach' ? colors.primary : colors.surfaceSubtle,
                      borderColor: current.name === 'AICoach' ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.navChipText,
                      { color: current.name === 'AICoach' ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    AI Coach
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigate('SymptomTracker')}
                  style={[
                    styles.navChip,
                    {
                      backgroundColor: current.name === 'SymptomTracker' ? colors.primary : colors.surfaceSubtle,
                      borderColor: current.name === 'SymptomTracker' ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.navChipText,
                      { color: current.name === 'SymptomTracker' ? colors.textInverse : colors.textPrimary },
                    ]}
                  >
                    Symptoms
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 🌓 Dark/Light Mode Switcher */}
              <TouchableOpacity
                onPress={toggleTheme}
                style={[
                  styles.themeToggleBtn,
                  {
                    backgroundColor: colors.surfaceSubtle,
                    borderColor: colors.border,
                  },
                ]}
                accessibilityLabel="Toggle Dark Mode"
              >
                <Text style={[styles.themeToggleText, { color: colors.textPrimary }]}>
                  {mode === 'dark' ? '☀️' : '🌙'}
                </Text>
              </TouchableOpacity>

              {/* Account / Exit to Splash Button */}
              <TouchableOpacity
                onPress={() => navigate('Splash')}
                style={[
                  styles.accountBtn,
                  {
                    backgroundColor: colors.badgeBg,
                  },
                ]}
              >
                <Text style={[styles.accountBtnText, { color: colors.badgeText }]}>
                  👤 Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sub-header with back button when on sub-screens */}
          {current.name !== 'Dashboard' && (
            <View style={[styles.subHeader, { borderTopColor: colors.border }]}>
              <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={[styles.backButtonText, { color: colors.primary }]}>
                  ← Back to Dashboard
                </Text>
              </TouchableOpacity>
              <Text style={[styles.screenTitle, { color: colors.textSecondary }]}>
                {SCREEN_TITLES[current.name]}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Screen Body */}
      <View style={styles.screenWrapper}>
        {renderActiveScreen()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  header: {
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 20,
  },
  headerContent: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  logoContainer: {
    paddingVertical: spacing.xs,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  navRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  navChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  navChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  themeToggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  themeToggleText: {
    fontSize: 13,
  },
  accountBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.full,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  accountBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  subHeader: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  backButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    ...Platform.select({ web: { cursor: 'pointer' } }) as any,
  },
  backButtonText: {
    fontWeight: '800',
    fontSize: 13,
  },
  screenTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  screenWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
