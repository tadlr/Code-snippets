import React, { useState } from 'react';
import { View } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { Text, CardElement, ListItem } from '@ui-kitten/components';
import { router } from 'expo-router';
import '@/constants/DealsCard.css';
import { DealsProps } from '@/constants/Interfaces';
import AddToFavorites from '../actions/AddToFavorites';
import { calculateExpireTimeLeft } from '@/utils/dataProcessor';
import { DealFormatted } from '@/constants/Interfaces';

import Constants from 'expo-constants';
const blurHash = Constants ? Constants.expoConfig?.extra?.blurHash : '';

const FavouritesCard = ({ item }: DealsProps): CardElement => {
  const {
    name,
    current_price,
    original_price,
    image,
    merchant_logo,
    placeholder,
    valid_from,
    valid_to,
  } = item;

  const [dealInfo, setDeal] = useState<DealFormatted>(item);

  const product = name ? String(name) : '';
  const salePrice = current_price ? String(current_price) : '';
  const regularPrice = original_price ? String(original_price) : '';

  const validStartDate = valid_from ? new Date(valid_from) : '';
  const validStart = validStartDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const validEndDate = valid_to ? new Date(valid_to) : '';
  const validEnd = validEndDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const timePeriod = calculateExpireTimeLeft(validStartDate, validEndDate);

  return (
    <ListItem
      className="featured-row bg-white relative active:bg-light shadow mx-5 mb-5"
      accessible={true}
      accessibilityLabel={`Product: ${product}`}
      onPress={() => {
        setDeal(item);
        router.navigate({
          pathname: '/(modal)/deal-details',
          params: dealInfo,
        });
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
        <View className="pe">
          <Text
            className="font-inter-bold text-md"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product}
          </Text>
        </View>
        <View className="top-container justify-start gap-1 items-center">
          <Image
            source={merchant_logo as ImageSource}
            placeholder={blurHash as string}
            className="store-logo"
            contentFit="contain"
          />
          <View className="flex flex-row gap-2 align-start">
            <Text className="font-inter-bold">${salePrice}</Text>
            {regularPrice ? (
              <Text className="font-inter-regular line-through text-gray-500 text-sm">
                ${regularPrice}
              </Text>
            ) : null}
          </View>
        </View>
        {regularPrice ? <View className="pt-3"></View> : null}

        <View className="pt-3">
          <Text className="font-raleway text-sm">
            Valid {validStart} to {validEnd}
          </Text>
        </View>
      </View>
      <View className="pt-3 absolute right-3 bottom-3">
        {timePeriod ? (
          <Text className="uppercase font-raleway-extra-bold text-slate-400 text-sm">
            {timePeriod}
          </Text>
        ) : (
          <Text className="text-red-700	uppercase font-raleway-extra-bold text-sm">
            Expired
          </Text>
        )}
      </View>
    </ListItem>
  );
};

export default React.memo(FavouritesCard);
