/**
 * Represents the header component for the home screen.
 *
 * @component
 * @example
 * return (
 *   <HomeHeader
 *     initialQuery="initial search query"
 *     showBackButton={true}
 *   />
 * );
 */
import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Text, Icon, Input } from '@ui-kitten/components';
import LocationPin from '@/assets/icons/pin.svg';
import { DataContext } from '@/data/context/DataContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { router } from 'expo-router';

/**
 * The header component for the home screen.
 *
 * @returns {JSX.Element} The rendered HomeHeader component.
 */
export default function HomeHeader() {
  const insets = useSafeAreaInsets();
  const { currentLocation } = useContext(DataContext) || {};

  const [query, setQuery] = useState('');

  const handleSearchSubmit = () => {
    router.navigate({ pathname: '/search', params: { query } });
  };

  const navigateToSettings = () => {
    router.navigate({ pathname: '/settings' });
  };

  return (
    <View style={[{ paddingTop: insets.top + 10 }]} className="bg-light z-10">
      <View className="px-5">
        <Input
          inputMode="search"
          spellCheck={false}
          clearButtonMode="always"
          enablesReturnKeyAutomatically={true}
          enterKeyHint="search"
          onChangeText={setQuery}
          onEndEditing={handleSearchSubmit}
          returnKeyType="search"
          accessibilityLabel="Search"
          accessible={true}
          placeholder="Search"
          accessoryLeft={(props) => <Icon {...props} name="search" />}
        />
        <View className="flex" style={{ height: 40, justifyContent: 'center' }}>
          {currentLocation !== null && currentLocation !== undefined ? (
            <TouchableOpacity onPress={navigateToSettings}>
              <View className="flex-row gap-2 items-center">
                <LocationPin
                  style={{ width: 9, height: 15 }}
                  fill={'#06346C'}
                />
                <Text className="text-sm">
                  {currentLocation !== null && currentLocation !== undefined
                    ? `Recomendations near: ${String(currentLocation)}`
                    : `Go to settings to add your Postal Code`}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
