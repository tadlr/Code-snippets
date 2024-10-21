import { router } from 'expo-router';

import { Button } from '@ui-kitten/components';
import React from 'react';
import { ImageBackground, View } from 'react-native';

/**
 * Renders the welcome screen component.
 * @returns The rendered welcome screen component.
 */
export default function WelcomeScreen() {
  return (
    <View className="bg-primary-500 flex-1">
      <ImageBackground
        source={require('@/assets/splash/Frame.png')}
        resizeMode="contain"
        className="flex-1 z-0 top-0 left-0 right-1 bottom-0 absolute"
      >
        <View className="absolute bottom-0 w-full px-5">
          <Button
            onPress={() => {
              router.navigate('/disclaimer');
            }}
            appearance="filled"
            status="control"
            className="mt-4 w-full mb-3"
          >
            Get Started
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
