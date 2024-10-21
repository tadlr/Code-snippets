import '@/global.css';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Text,
  Button,
  Spinner,
} from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {
  DataProvider,
  setData,
  getData,
  DataContext,
} from '@/data/provider/DataProvider';

import InitStyles from '@/constants/cssInterop';
import { LoadFonts } from '@/constants/theme';

import { ThemeContext } from '@/data/context/ThemeContext';
import * as Network from 'expo-network';
import { useColorScheme } from 'nativewind';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { clearCache } from '@/utils/cache';
import { DataContextValue } from '@/data/context/DataContext';

export { ErrorBoundary } from 'expo-router';

InitStyles();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * The root component of the application.
 * @returns The rendered JSX element.
 */
/**
 * The main component of the application.
 * Renders the entire app UI and handles theme toggling and internet connection checking.
 */
export default function RootLayout() {
  const { fontsLoaded, fontError } = LoadFonts();
  InitStyles();
  // State variables
  const [theme, setTheme] = useState<string>('light');

  // Get color scheme from device settings
  const { setColorScheme } = useColorScheme();

  // Get saved display mode from local storage
  const savedDisplayMode = getData('theme');

  // Set theme based on saved display mode
  useEffect(() => {
    savedDisplayMode.then((value) => {
      if (value) {
        setTheme(String(value));
      }
    });
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const displayMode = theme === 'light' ? 'dark' : 'light';
    setTheme(displayMode);
    setData('theme', displayMode);
  };

  // Set Eva theme and color scheme based on current theme
  const EvaTheme = theme === 'light' ? eva.light : eva.dark;
  const displayMode = theme === 'light' ? 'light' : 'dark';
  setColorScheme(displayMode);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...EvaTheme }}>
        <DataProvider>
          <RootLayoutNav />
        </DataProvider>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}

function RootLayoutNav() {
  const [isConnected, setIsConnected] = useState<boolean | unknown>(false);

  const { checkConnection, setCheckConnection } = useContext(
    DataContext,
  ) as DataContextValue;

  // Check internet connection
  const CheckConnection = async () => {
    clearCache();
    setCheckConnection(true);
    const network = await Network.getNetworkStateAsync();
    setIsConnected(network.isConnected);
    setCheckConnection(false);
  };

  // Check connection status whenever `isConnected` changes
  useEffect(() => {
    CheckConnection();
  }, [isConnected]);

  return (
    <>
      {isConnected === true ? (
        <Navigation />
      ) : (
        <View className="container bg-primary-500 flex-1 flex justify-center content-center items-center">
          <Icon name="wifi-off-outline" fill="white" width={100} height={100} />
          <Text category="h4" className="text-white text-center">
            No Internet Connection
          </Text>
          <Button
            onPress={CheckConnection}
            className="absolute bottom-20 w-6/12 mx-5"
            status="control"
            size="large"
            disabled={checkConnection}
            accessoryLeft={() => {
              return checkConnection ? (
                <Spinner size="medium" status="control" />
              ) : (
                <></>
              );
            }}
          >
            <Text>{checkConnection ? 'Checking...' : 'Try again'}</Text>
          </Button>
        </View>
      )}
    </>
  );
}

function Navigation() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
