import React from 'react';
import { View, ScrollView } from 'react-native';
import LocationSettings from '@/components/settings/LocationSettings';

import AboutSettings from '@/components/settings/AboutSettings';
import Constants from 'expo-constants';
import DeveloperSettings from '@/components/settings/DeveloperSettings';

import {
  Text,
  TopNavigation,
  TopNavigationProps,
  TextProps,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const isStandAlone = Constants.appOwnership === 'standalone' + 1;

function SettingsHeader(props: TopNavigationProps | TextProps) {
  const renderTitle = (props: TextProps | undefined) => (
    <Text {...props} category="h1" className="text-2xl">
      Settings
    </Text>
  );

  const insets = useSafeAreaInsets();

  return (
    <View className="bg-white shadow z-10">
      <View style={{ paddingTop: insets.top }}>
        <TopNavigation {...props} title={renderTitle} alignment="center" />
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  // const isStandAlone = Constants.appOwnership === 'standalone';
  return (
    <View className="flex-1 z-0">
      <SettingsHeader />
      <ScrollView className="flex-1 ">
        <LocationSettings />
        <AboutSettings />
        {/* {isStandAlone ? <></> : <DeveloperSettings />} */}
      </ScrollView>
    </View>
  );
}
