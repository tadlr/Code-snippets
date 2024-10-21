import React, { useContext, useEffect, useState } from 'react';

import { router, Tabs } from 'expo-router';

/**
 * Renders the main navigation for the app.
 *
 * @returns The main navigation component.
 */

import {
  FavIcon,
  HomeIcon,
  SettingsIcon,
  StoresIcon,
} from '@/components/helpers/Icons';

import {
  NavigationHelpers,
  NavigationState,
  ParamListBase,
} from '@react-navigation/native';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataContext, getData } from '@/data/provider/DataProvider';
import { DataContextValue } from '@/data/context/DataContext';

/**
 * Renders the bottom tab bar for the main navigation.
 *
 * @param navigation - The navigation helpers.
 * @param state - The navigation state.
 * @returns The bottom tab bar component.
 */
const BottomTabBar = ({
  navigation,
  state,
}: {
  navigation: NavigationHelpers<ParamListBase>;
  state: NavigationState;
}) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ paddingBottom: insets.bottom }}
      className="bg-white shadow z-100"
    >
      <BottomNavigationTab title="Home" icon={HomeIcon} />
      <BottomNavigationTab title="Favourites" icon={FavIcon} />
      <BottomNavigationTab title="Stores" icon={StoresIcon} />
      <BottomNavigationTab title="Settings" icon={SettingsIcon} />
    </BottomNavigation>
  );
};

export default function TabNavigator() {
  const [appReady, setAppReady] = useState<boolean>(false);

  const { doOnboarding, setDoOnboarding } = useContext(
    DataContext,
  ) as DataContextValue;

  useEffect(() => {
    const initializeApp = async () => {
      const fetchedPostalCode = await getData('postalcode');
      if (!fetchedPostalCode) {
        setDoOnboarding(true);
      }

      setAppReady(true);
    };

    initializeApp();
  }, [doOnboarding]);

  useEffect(() => {
    setDoOnboarding(doOnboarding);
    if (doOnboarding) {
      router.replace('/(onboarding)/welcome');
    }
  }, [doOnboarding]);

  if (!appReady) {
    return null;
  }

  if (doOnboarding) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="favourites" />
      <Tabs.Screen name="stores" />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
