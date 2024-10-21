import React from 'react';

import { View } from 'react-native';
import { router } from 'expo-router';

import {
  Icon,
  Text,
  IconElement,
  IconProps,
  MenuItem,
} from '@ui-kitten/components';

import Constants from 'expo-constants';

/**
 * Renders the app version.
 * @returns The app version as a Text component.
 */
const AppVersion = (): IconElement => (
  <Text>{Constants.expoConfig?.version}</Text>
);

/**
 * Renders the forward icon.
 * @param props - The icon props.
 * @returns The forward icon as an Icon component.
 */
const ForwardIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-ios-forward" />
);

/**
 * Renders the About Settings screen.
 * @returns The AboutSettings component.
 */
export default function AboutSettings() {
  return (
    <>
      <View className="m-5">
        <Text category="s1">About</Text>
      </View>

      <View className="flex-1">
        <MenuItem title="App version" accessoryRight={AppVersion} />
        <MenuItem
          title="Terms of Use"
          accessoryRight={ForwardIcon}
          onPress={() => router.navigate('/(pages)/terms')}
        />
        <MenuItem
          title="Privacy Policy"
          accessoryRight={ForwardIcon}
          onPress={() => router.navigate('/(pages)/privacy')}
        />
      </View>
    </>
  );
}
