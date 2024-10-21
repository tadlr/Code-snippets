import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Image, ImageProps, ImageSource } from 'expo-image';
import { getMerchant, getMerchantLogo } from '@/utils/apiConnect';
import { Text } from '@ui-kitten/components';
import { BusinessInfo, Region } from '@/constants/Types';
import {
  calculateDistance,
  formatDistance,
  getLocation,
} from '@/utils/location';
import { getStoreMarkers, getNearestStoreInfo } from '@/utils/apiLocation';

import placeholder from '@/assets/images/placeholder.png';
import { Merchant } from '@/constants/Interfaces';
import Constants from 'expo-constants';
const blurHash = Constants ? Constants.expoConfig?.extra?.blurHash : '';

export default function FavsSectionTitle(props: {
  merchantID: number | string;
}) {
  const { merchantID } = props;
  const [logo, setLogo] = useState<string | ImageProps>(placeholder);
  const [merchantName, setMerchantName] = useState('');

  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [storeLocation, setStoreLocation] = useState<Region | undefined>(
    undefined,
  );
  const [distanceToStore, setDistanceToStore] = useState('');

  useEffect(() => {
    const gps = getLocation();
    gps.then((loc) => {
      if (loc) {
        setLocation(loc);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!location || !merchantName) return;
      let storeInfo: BusinessInfo | undefined;

      const fetchedMarkers = await getStoreMarkers(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        merchantName,
      );

      if (fetchedMarkers && fetchedMarkers.length > 0) {
        const firstMarker = fetchedMarkers[0];
        storeInfo = firstMarker;
      } else {
        storeInfo = await getNearestStoreInfo(location, merchantName);
      }

      if (storeInfo) {
        setStoreLocation({
          latitude: storeInfo.latitude,
          longitude: storeInfo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          storeInfo.latitude,
          storeInfo.longitude,
        );

        setDistanceToStore(formatDistance(distance));
      }
    };

    fetchData();
  }, [location, merchantName]);

  useEffect(() => {
    if (location && storeLocation) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        storeLocation.latitude,
        storeLocation.longitude,
      );
      setDistanceToStore(formatDistance(distance));
    }
  }, [location, storeLocation]);

  useEffect(() => {
    const fetchMerchant = async () => {
      if (merchantID) {
        const merchantObj: Merchant[] | Merchant | undefined =
          await getMerchant(merchantID);

        const merchantLogo = await getMerchantLogo(Number(merchantID));

        if (merchantObj) {
          const { merchant_name } = merchantObj as Merchant;

          setMerchantName(merchant_name);
          setLogo(merchantLogo);
        }
      }
    };

    fetchMerchant();
  }, [merchantID]);

  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center p-5 mb-1 bg-main gap-10">
        <View className="flex-row gap-3 items-center flex-1">
          <Image
            source={logo as ImageSource}
            placeholder={blurHash as string}
            className="store-logo"
            contentFit="contain"
          />
          <Text className="title flex-wrap shrink truncate" category="h6">
            {merchantName}
          </Text>
        </View>
        <Text>{distanceToStore}</Text>
      </View>
    </SafeAreaView>
  );
}
