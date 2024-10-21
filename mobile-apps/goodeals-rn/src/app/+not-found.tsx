import React from 'react';
import { router } from 'expo-router';
import { Button, Icon, Text } from '@ui-kitten/components';
import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary-500">
      <View className="container bg-primary-500 h-full relative">
        <View className="flex-1">
          <View className="flex-1 container px-5 h-screen justify-center">
            <View className="px-7  bg-white rounded-md shadow p-5">
              <View className="flex items-center justify-center mb-5">
                <Icon
                  name="alert-circle-outline"
                  fill="#942A2A"
                  width={100}
                  height={100}
                />
              </View>
              <Text className="font-raleway-black pb-2">
                Something's not quite right.
              </Text>
              <Text className="font-inter">
                Looks like something got lost. {'\n'}Don't you worry! Tap the
                button bellow to get back on track.
              </Text>

              <Button
                onPress={() => {
                  router.navigate('(tabs)');
                }}
                appearance="filled"
                status="primary"
                className="mt-4"
              >
                Take me home
              </Button>
              <Text className="pt-2 text-xs">[error code: 404]</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
