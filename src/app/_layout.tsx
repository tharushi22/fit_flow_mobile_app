import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View, Image, StyleSheet, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';

import AppTabs from '@/components/app-tabs';
import OnboardingFlow from '@/components/OnboardingFlow';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // Hide the native splash screen immediately so our branded splash with Android logo is displayed
    SplashScreen.hideAsync().catch(() => {});

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.logoCenter}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.splashLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.brandingBottom}>
          <Image
            source={require('../../assets/images/android_branding.png')}
            style={styles.androidBranding}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {showOnboarding ? (
        <OnboardingFlow onFinish={() => setShowOnboarding(false)} />
      ) : (
        <AppTabs />
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 220,
    height: 220,
  },
  brandingBottom: {
    alignItems: 'center',
    marginBottom: 20,
  },
  androidBranding: {
    width: 180,
    height: 60,
  },
});
