import React from 'react';
import { router } from 'expo-router';
import { useState, useEffect, ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { LatLng } from 'react-native-maps';
import { Image, ImageProps } from 'expo-image';
import { Avatar, AvatarProps, ListItem, Text } from '@ui-kitten/components';
import { containsSignificantPart, normalizeString } from '@/utils/stringUtils';
import { Merchant } from '@/constants/Interfaces';
import { BusinessInfo } from '@/constants/Types';
import { getMerchant, getMerchantLogo } from '@/utils/apiConnect';
import getDistance from 'geolib/es/getDistance';
import { formatDistance } from '@/utils/location';
import Constants from 'expo-constants';
import { merchantData } from '@/data/merchants';

const blurHash = Constants ? Constants.expoConfig?.extra?.blurHash : '';

/**
 * Renders the details of a merchant.
 * @param item - The merchant's information.
 * @returns The rendered merchant details.
 */
function MerchantDetails({
  item,
  location,
}: {
  item: BusinessInfo;
  location: LatLng;
}) {
  const [merchantInfo, setMerchantInfo] = useState<Merchant | null>(null);
  const distance = getDistance(
    {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    {
      latitude: item.latitude,
      longitude: item.longitude,
    },
  );

  useEffect(() => {
    // console.log('Merchant name:', item.name);
    const foundMerchant = merchantData.find(
      (m) =>
        item.name.toLowerCase().includes(m.merchant_name.toLowerCase()) ||
        m.merchant_name.toLowerCase().includes(item.name.toLowerCase()),
    );
    setMerchantInfo((foundMerchant as Merchant) || null);
  }, [item.name]);

  const navigateToDeals = () => {
    if (!merchantInfo) {
      // console.log('Merchant info not available');
      return;
    }
    // console.log('Merchant:', merchantInfo.merchant_name);
    // console.log('merchantID:', merchantInfo.id);
    // console.log('merchant_logo:', merchantInfo.merchant_logo_url);
    // console.log('merchant_address:', item.address);

    router.push({
      pathname: '/(modal)/store-details',
      params: {
        merchant: merchantInfo.merchant_name,
        merchantID: merchantInfo.id,
        distanceToStore: formatDistance(distance),
        merchant_logo: merchantInfo.merchant_logo_url,
        address: item.address,
      },
    });
  };

  return (
    <ListItem
      className="flex-row items-center justify-between bg-white border font-raleway border-slate-400 rounded-lg mb-2"
      accessoryLeft={() => {
        return <StoreLogo merchant_name={item.name} />;
      }}
      description={() => {
        return (
          <TouchableOpacity onPress={navigateToDeals}>
            <View className="px-3">
              <Text className="font-raleway-bold">{item.name}</Text>
              <Text className="font-raleway text-sm">{item.address}</Text>
              {distance ? (
                <Text className="font-raleway text-xs mt-3">
                  {formatDistance(distance)}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

/**
 * Renders the logo of a store.
 * @param merchant_name - The name of the merchant.
 * @returns The rendered store logo.
 */
function StoreLogo({ merchant_name }: { merchant_name: string }) {
  const [logoUrl, setLogoUrl] = useState<ImageProps>();
  useEffect(() => {
    const processMerchant = async () => {
      let bestMatch = '';
      let longestMatchLength = 0;
      const merchants = await getMerchant();
      if (merchants) {
        const merchantArray = Array.isArray(merchants)
          ? merchants
          : [merchants];

        merchantArray.forEach((merchant: Merchant) => {
          // Assuming `containsSignificantPart` and `normalizeString` are defined elsewhere
          if (containsSignificantPart(merchant.merchant_name, merchant_name)) {
            const normalizedMerchantName = normalizeString(
              merchant.merchant_name,
            );
            if (normalizedMerchantName.length > longestMatchLength) {
              bestMatch = merchant.id.toString(); // Convert id to string
              longestMatchLength = normalizedMerchantName.length;
            }
          }
        });

        const matchedLogoUrl = await getMerchantLogo(Number(bestMatch));

        if (matchedLogoUrl) {
          setLogoUrl(matchedLogoUrl);
        }
      }
    };

    processMerchant();
  }, [merchant_name]);

  return logoUrl ? (
    <Avatar
      source={logoUrl as AvatarProps}
      style={{ width: 30, height: 30 }}
      shape="square"
      className="bg-white justify-center items-center rounded"
      ImageComponent={(media: ReactElement) => (
        <View
          className="bg-white justify-center items-center rounded"
          style={{ width: 30, height: 30 }}
        >
          <Image
            {...media}
            placeholder={blurHash as string}
            className="rounded"
            style={{ width: 30, height: 30 }}
            contentFit="contain"
          />
        </View>
      )}
    />
  ) : (
    <Avatar
      source={require('@/assets/icons/cart-shopping-solid.svg')}
      style={{ width: 30, height: 30 }}
      ImageComponent={(media: ReactElement) => (
        <View
          className="bg-white justify-center items-center rounded-full"
          style={{ width: 30, height: 30 }}
        >
          <Image
            {...media}
            placeholder={blurHash as string}
            style={{ width: 20, height: 20 }}
            contentFit="contain"
          />
        </View>
      )}
    />
  );
}

function StoreLogoPlaceholder() {
  return (
    <Avatar
      source={require('@/assets/icons/cart-shopping-solid.svg')}
      style={{ width: 30, height: 30 }}
      ImageComponent={(media: ReactElement) => (
        <View
          className="bg-white justify-center items-center rounded-full"
          style={{ width: 30, height: 30 }}
        >
          <Image
            {...media}
            placeholder={blurHash as string}
            style={{ width: 20, height: 20 }}
            contentFit="contain"
          />
        </View>
      )}
    />
  );
}

export { StoreLogo, StoreLogoPlaceholder, MerchantDetails };
