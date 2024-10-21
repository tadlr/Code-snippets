/**
 * Represents the header component for the favourites screen.
 *
 * @component
 * @param {string} query - The value of the search bar on Favourites screen.
 * @param {Dispatch<SetStateAction<string>>} setQuery - A state setter function to update the value of the search bar on Favourites screen.
 * @param {()=> void } searchFavs - The function the search favourites.
 * @returns {JSX.Element} - The rendered component.
 */
import React, { useContext } from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  Input,
  Text,
} from '@ui-kitten/components';
import { router } from 'expo-router';

import LocationPin from '@/assets/icons/pin.svg';
import { DataContext } from '@/data/context/DataContext';
import { FavouritesHeaderProps } from '@/constants/Types';

export default function FavouritesHeader({ setQuery }: FavouritesHeaderProps) {
  const insets = useSafeAreaInsets();
  const { contextFavs, currentLocation } = useContext(DataContext) || {};
  const navigateToSettings = () => {
    router.navigate({ pathname: '/settings' });
  };

  let isFavouritesEmpty: boolean = false;

  if (contextFavs) {
    isFavouritesEmpty = Object.values(contextFavs).length === 0;
  }

  /**
   * Icon component for the filter icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const FilterIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name="funnel"
      fill="grey"
      style={{ width: 28, height: 28 }}
    />
  );

  const handleQueryEmpty = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (e.nativeEvent.text.length === 0) {
      setQuery('');
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-light z-10"
    >
      <View className="px-5 ">
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Input
              spellCheck={false}
              clearButtonMode="always"
              enablesReturnKeyAutomatically={true}
              onChange={handleQueryEmpty}
              enterKeyHint="search"
              returnKeyType="search"
              accessibilityLabel="Search"
              accessible={true}
              placeholder="Search"
              accessoryLeft={(props) => <Icon {...props} name="search" />}
              onEndEditing={(e) => setQuery(e.nativeEvent.text)}
            />
          </View>
          <Button
            accessibilityLabel={'Filter screen'}
            accessible={true}
            appearance="ghost"
            status="primary"
            className="p-0 m-0 w-1 h-1"
            accessoryLeft={(props) => {
              return <FilterIcon {...props} />;
            }}
            size="medium"
            onPress={() =>
              router.push({
                pathname: '/(modal)/filter',
              })
            }
            disabled={isFavouritesEmpty}
          />
        </View>
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
