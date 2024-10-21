/**
 * Renders the empty favourites component for the Favourites screen.
 *
 * @component
 * @returns The rendered empty favourites component.
 */

import React, { useContext } from 'react';
import { View } from 'react-native';
import { Icon, IconElement, IconProps, Text } from '@ui-kitten/components';
import { DataContext } from '@/data/context/DataContext';

const EmptyFavourites = () => {
  const { contextFavs } = useContext(DataContext) || {};

  let isFavouritesEmpty: boolean = true;

  if (contextFavs) {
    isFavouritesEmpty = Object.values(contextFavs).length === 0;
  }

  /**
   * Icon component for the favourites icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const FavouritesIcon = (props: IconProps): IconElement => {
    return <Icon name="heart-outline" {...props} fill="gray" />;
  };

  /**
   * Icon component for the search icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const SearchIcon = (props: IconProps): IconElement => {
    return <Icon name="search" {...props} fill="gray" />;
  };

  const title: string = isFavouritesEmpty ? `No favourites yet` : `No results`;
  const subtitle: string = isFavouritesEmpty
    ? `Deals you mark as favourites will be shown here.`
    : `Please try using another keyword or selecting other filter options.`;

  return (
    <View className="flex-1 items-center justify-center px-5 py-3 gap-6">
      <View className="w-24 h-24 self-center justify-center">
        {isFavouritesEmpty ? <FavouritesIcon /> : <SearchIcon />}
      </View>
      <View className="gap-3">
        <Text className="text-center title" category="h5">
          {title}
        </Text>
        <Text className="text-center text-lg">{subtitle}</Text>
      </View>
    </View>
  );
};

export default EmptyFavourites;
