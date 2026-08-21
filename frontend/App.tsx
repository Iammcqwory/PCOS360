import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

function MainApp() {
  const { mode } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
