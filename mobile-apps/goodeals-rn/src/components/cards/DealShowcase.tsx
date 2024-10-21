import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import { Text, CardElement, ListItem } from '@ui-kitten/components';
import { router } from 'expo-router';
import '@/constants/DealsCard.css';
import { DealFormatted, DealsProps } from '@/constants/Interfaces';
import AddToFavorites from '@/components/actions/AddToFavorites';
import { StoreLogo, StoreLogoPlaceholder } from '../actions/MapMarkers';

/**
 * Renders a card component for displaying a deal.
 *
 * @param {DealsProps} props - The props for the component.
 * @returns {CardElement} The rendered card component.
 */

export const DealShowcase = ({
  item,
  scrollViewRef,
}: DealsProps & {
  scrollViewRef?: React.RefObject<ScrollView>;
}): CardElement => {
  const { name, current_price, original_price, image, placeholder } = item;

  const product = name ? name : '';
  const salePrice = current_price ? String(current_price) : '';
  const regularPrice = original_price ? String(original_price) : '';

  const [dealInfo, setDeal] = useState<DealFormatted>(item);

  return (
    <ListItem
      className="featured-row bg-white relative active:bg-light shadow"
      accessible={true}
      accessibilityLabel={`Product: ${product}`}
      onPress={() => {
        setDeal(item);
        router.navigate({
          pathname: '/(modal)/deal-details',
          params: dealInfo,
        });
        if (scrollViewRef?.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
      }}
    >
      <AddToFavorites product={product} deal={item} />
      <Image
        source={image}
        placeholder={placeholder}
        contentFit="contain"
        className="featured-card-image"
      />
      <View className="featured-card">
        <View className="pe-3">
          <Text
            className="font-inter-bold"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product}
          </Text>
        </View>
        <View className="top-container justify-between">
          <StoreLogo merchant_name={item.merchant as string} />
          <View className="flex flex-row gap-2 aligng-end">
            <Text className="font-inter-bold text-red-800">${salePrice}</Text>
            {regularPrice ? (
              <Text className="font-inter-regular line-through text-gray-500 text-sm">
                ${regularPrice}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </ListItem>
  );
};

export const ShowCasePlaceholder = () => {
  return (
    <ListItem
      className="featured-row bg-white relative active:bg-light shadow ml-10 mr-5"
      accessible={true}
    >
      <Image
        // source={blurHash as string}
        placeholder={require('@/assets/images/placeholder.png')}
        contentFit="contain"
        className="featured-card-image"
      />
      <View className="featured-card">
        <View className="pe-3 mb-5">
          <Text
            className="font-inter-bold"
            numberOfLines={2}
            ellipsizeMode="tail"
          ></Text>
        </View>
        <View className="top-container justify-between">
          <StoreLogoPlaceholder />
          <View className="flex flex-row gap-2 aligng-end">
            <Text className="font-inter-bold text-red-800"></Text>
          </View>
        </View>
      </View>
    </ListItem>
  );
};
