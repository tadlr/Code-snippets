import { router } from 'expo-router';
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { cssInterop } from 'nativewind';

import Markdown from 'react-native-markdown-display';

cssInterop(Markdown, { className: 'style' });

export default function DisclaimerScreen() {
  const notice = `
### Goodeals helps you discover the best offers nearby.

To do this, we need access to your location.


**Why Allow Location Access?**

* **Find Deals**: Instantly locate exclusive offers and discounts near you.
* **Save Time & Money**: Get personalized suggestions that match your interests and location.


**Our Privacy Promise**

* **Your Control**: Location access is only used to show you relevant offers; you can disable it anytime.
* **No Data Storage**: Your location isn't stored on our servers.
* **No Sharing**: We never share your location with third parties.`;

  /**
   * Renders the location header component.
   * @returns The rendered location header component.
   */
  function DisclamerHeader() {
    const BackIcon = (props: IconProps): IconElement => (
      <Icon {...props} name="arrow-back" fill="white" />
    );

    const BackAction = (): ReactElement => {
      return (
        <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
      );
    };

    const Title = (): ReactElement => (
      <Text className="font-raleway600 text-white text-lg">
        Let's get started!
      </Text>
    );

    return (
      <View className="bg-transparent">
        <TopNavigation
          alignment="center"
          accessoryLeft={BackAction}
          className="bg-transparent"
          title={Title}
        />
      </View>
    );
  }

  return (
    <View className="container bg-primary-500 h-full relative">
      <DisclamerHeader />
      <View className="flex-1">
        <View className="flex-1 container px-5 h-screen">
          <Text className="text-3xl font-raleway-bold py-12 px-5 text-white mb-1 text-center">
            Welcome to Goodeals!
          </Text>
          <View className="flex justify-center content-center text-white">
            <View className="px-7">
              <Markdown mergeStyle={true} style={{ body: { color: 'white' } }}>
                {notice}
              </Markdown>
            </View>
          </View>
        </View>
        <View className="absolute bottom-0 w-full px-5">
          <Button
            onPress={() => {
              router.navigate('/location');
            }}
            appearance="filled"
            status="control"
            className="mt-4 w-full mb-3"
          >
            Get Started
          </Button>
        </View>
      </View>
    </View>
  );
}
