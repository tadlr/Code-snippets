import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { Text, List } from '@ui-kitten/components';
import { ScrollView, View } from 'react-native';
import { Image, ImageSource } from 'expo-image';

import { DealFormatted } from '@/constants/Interfaces';
import { calculateExpireTimeLeft, preprocessDeal } from '@/utils/dataProcessor';

import { getDeals } from '@/utils/apiConnect';

import { DealShowcase } from '@/components/cards/DealShowcase';

import { useGlobalSearchParams } from 'expo-router';

import DealDetailsHeader from '@/components/header/DealDetailsHeader';
import Constants from 'expo-constants';
const blurHash = Constants ? Constants.expoConfig?.extra?.blurHash : '';
import { shuffleArray } from '@/utils/dataProcessor';
import DealMap from '@/components/deal/DealMap';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function DealDetails(): ReactElement {
  const [distanceToStore, setDistanceToStore] = useState('');

  const [showcase, setShowcase] = useState<DealFormatted[]>([]);

  const deal = useGlobalSearchParams();
  const insets = useSafeAreaInsets();

  const {
    name,
    current_price,
    merchant,
    merchant_id,
    original_price,
    image,
    merchant_logo,
    placeholder,
    valid_from,
    valid_to,
    amountSaved,
  } = deal;

  const product = name ? name : '';
  const salePrice = current_price ? String(current_price) : '';
  const regularPrice = original_price ? String(original_price) : '';
  const savedAmount = amountSaved != 'null' ? String(amountSaved) : '';

  const validStartDate = valid_from ? new Date(valid_from.toString()) : '';
  const validStart = validStartDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const validEndDate = valid_to ? new Date(valid_to.toString()) : '';
  const validEnd = validEndDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const timePeriod = calculateExpireTimeLeft(validStartDate, validEndDate);

  useEffect(() => {
    const fetchDeals = async () => {
      const data = await getDeals();

      if (data) {
        const shuffledData = shuffleArray([...data]);
        const showcaseItems = shuffledData.slice(0, 10);

        const processedData = showcaseItems.map((deal) => preprocessDeal(deal));
        setShowcase(processedData);
      } else {
        setShowcase([]);
      }
    };
    fetchDeals();
  }, []);
  const scrollViewRef = useRef(null);
  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <DealDetailsHeader deal={deal as unknown as DealFormatted} />
      <ScrollView contentContainerClassName="py-5" ref={scrollViewRef}>
        <View className="content-center justify-center ps-0 py-0 bg-white">
          <View className="border-slate-400 pb-5 px-3 mx-5 border-b-2">
            <View className="mb-5 justify-center items-center">
              <Text className="title font-raleway-bold" category="h6">
                {product}
              </Text>
              <Image
                source={image}
                placeholder={placeholder}
                contentFit="contain"
                className="bg-white w-52 h-52 mt-5"
              />
            </View>
            <View className="gap-3">
              <View className="flex-row gap-3 items-center">
                <Image
                  source={merchant_logo as ImageSource}
                  placeholder={blurHash as string}
                  className="w-10 h-10"
                  contentFit="contain"
                />

                <View className="flex-row items-center justify-center gap-10">
                  <Text className="font-inter-bold text-2xl">${salePrice}</Text>
                  {regularPrice ? (
                    <Text className="font-inter-regular line-through text-gray-500 align-bottom">
                      ${regularPrice}
                    </Text>
                  ) : null}
                </View>
              </View>
              {savedAmount ? (
                <View>
                  <Text className="font-inter-medium">
                    Save: ${savedAmount}
                  </Text>
                </View>
              ) : null}
            </View>
            <View className="pt-3 flex-row gap-5">
              <Text className="font-raleway">
                Valid {validStart} to {validEnd}
              </Text>
              {timePeriod ? (
                <Text className="uppercase font-raleway-extra-bold text-slate-400">
                  {timePeriod}
                </Text>
              ) : (
                <Text className="text-red-700	uppercase font-raleway-extra-bold">
                  Expired
                </Text>
              )}
            </View>
            <View>
              {distanceToStore && (
                <Text className="font-raleway">
                  Distance to store: {distanceToStore}
                </Text>
              )}
            </View>
          </View>
          <DealMap
            merchant={merchant}
            merchantID={merchant_id}
            setDistanceToStore={setDistanceToStore}
            merchant_logo={merchant_logo}
          />
          <View className="content-center justify-center py-3">
            <Text className="title ps-5" category="h6">
              Similar Products
            </Text>

            <List
              className="bg-white"
              renderItem={({ item }) => (
                <DealShowcase item={item} scrollViewRef={scrollViewRef} />
              )}
              // data={showcase as DealFormatted[]}
              data={showcase}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={5}
              snapToAlignment="center"
              decelerationRate={'fast'}
              contentContainerClassName="flex m-5 gap-5 pr-10"
              horizontal={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DealDetails;
