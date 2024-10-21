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
import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';

import {
  Input,
  Icon,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@ui-kitten/components';

import { router } from 'expo-router';

import { HomeHeaderProps } from '@/constants/Types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * The header component for the home screen.
 *
 * @param {HomeHeaderProps} props - The props for the HomeHeader component.
 * @returns {JSX.Element} The rendered HomeHeader component.
 */
export default function SearchHeader({ initialQuery }: HomeHeaderProps) {
  const SearchHeader = (props: TopNavigationActionProps) => {
    return (
      <TopNavigationAction
        {...props}
        icon={() => <Icon name="arrow-back" />}
        onPress={() => {
          router.back();
        }}
      />
    );
  };

  const os = Platform.OS;
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const [query, setQuery] = useState(searchQuery || '');

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    } else {
      setQuery('');
    }
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    router.navigate({ pathname: '/search', params: { query } });
  };

  return (
    <View
      className="bg-light z-10 py-5 px-3"
      style={{ paddingTop: os === 'ios' ? 20 : insets.top + 10 }}
    >
      <View className={'flex flex-row'}>
        <SearchHeader className="w-10 h-10 active:bg-slate-300" />
        <Input
          className="flex-1"
          value={query}
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
      </View>
    </View>
  );
}
