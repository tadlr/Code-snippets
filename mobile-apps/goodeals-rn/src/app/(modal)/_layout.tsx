import React from 'react';
import { Slot } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const os = Platform.OS;

export default function HomeLayout() {
  if (os !== 'ios') {
    return (
      <SafeAreaView className="flex-1">
        <Slot />
      </SafeAreaView>
    );
  } else {
    return <Slot />;
  }
}
