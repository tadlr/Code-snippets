/**
 * DeveloperSettings component.
 * This component provides developer settings for clearing local storage.
 */
import React, { useContext } from 'react';

import { View, Alert } from 'react-native';

import { DataContext } from '@/data/context/DataContext';
import { Text, MenuItem } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  router } from 'expo-router';

export default function DeveloperSettings() {
  const { setCurrentLocation } = useContext(DataContext) || {};
  function clearStorage() {
    Alert.alert(
      'Clear local storage',
      'This will remove everything saved on the device storage. This cannot be undone. Are you sure?',
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        {
          text: 'Erase',
          style: 'destructive',
          onPress: () => {
            setCurrentLocation && setCurrentLocation(undefined);
            AsyncStorage.clear();
            router.navigate('/');
          },
        },
      ],
    );
  }
  return (
    <>
      <View className="m-5">
        <Text category="s1">DEVELOPER SETTINGS</Text>
      </View>
      <View className="flex-1">
        <MenuItem
          title={() => (
            <Text className="text-white font-raleway-extra-bold">
              Clear device local storage
            </Text>
          )}
          className="bg-red-700"
          onPress={() => clearStorage()}
        />
      </View>
    </>
  );
}
