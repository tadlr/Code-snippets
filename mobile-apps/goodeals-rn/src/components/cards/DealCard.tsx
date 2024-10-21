/**
 * Renders a card component for exploring deals.
 *
 * @param props - The component props.
 * @returns The JSX element representing the DealCard component.
 */
import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Text, ListItem } from '@ui-kitten/components';
import { router } from 'expo-router';
import '@/constants/DealsCard.css';
import { DealFormatted } from '@/constants/Interfaces';
import AddToFavorites from '@/components/actions/AddToFavorites';
import { StoreLogo } from '../actions/MapMarkers';

function DealCard({ item }: { item: DealFormatted }) {
  const { name, current_price, original_price, image, placeholder } = item;

  const [dealInfo, setDeal] = useState<DealFormatted>(item);

  const product = name ? name : '';
  const salePrice = current_price ? String(current_price) : '';
  const regularPrice = original_price ? String(original_price) : '';

  return (
    <ListItem
      className="flex-1 deal-card flex-col justify-start content-start bg-white active:bg-light shadow basis-1/2 p-0 m-0"
      onPress={() => {
        setDeal(item);
        router.navigate({
          pathname: '/(modal)/deal-details',
          params: dealInfo,
        });
      }}
    >
      <Image
        source={image}
        placeholder={placeholder}
        contentFit="contain"
        className="product-image"
      />

      <AddToFavorites product={product} deal={item} />

      <Text
        className="font-inter-bold pt-3 w-full"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {product}
      </Text>

      <View className="top-container w-full">
        <StoreLogo merchant_name={item.merchant as string} />

        <View className="">
          <Text className="font-inter-bold text-red-800">${salePrice}</Text>
          {regularPrice ? (
            <Text className="font-inter-regular line-through text-gray-500 text-sm">
              ${regularPrice}
            </Text>
          ) : null}
        </View>
      </View>
    </ListItem>
  );
}

export default memo(DealCard);
