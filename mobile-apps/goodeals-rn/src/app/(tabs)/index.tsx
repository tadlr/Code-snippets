/**
 * Represents the home screen component.
 */
import DealCard from '@/components/cards/DealCard';
import DealsForYou from '@/components/cards/DealsForYou';
import HomeHeader from '@/components/header/HomeHeader';
import { DealFormatted } from '@/constants/Interfaces';

import { getDeals } from '@/utils/apiConnect';

import { List, Text } from '@ui-kitten/components';

import Loader from '@/components/helpers/Loader';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { preprocessDeal } from '@/utils/dataProcessor';

/**
 * Represents the HomeScreen component.
 */
function HomeScreen() {
  /**
   * Represents the state of the home data.
   */
  const [homeData, setHomeData] = useState<DealFormatted[]>([]);

  const [refreshing, setRefreshing] = useState(true);

  const ref = useRef<List>(null);

  const RenderList = useCallback(({ item }: { item: DealFormatted }) => {
    return <DealCard item={item} />;
  }, []);

  useEffect(() => {
    /**
     * Fetches the home data.
     */
    const fetchHomeData = async () => {
      const data = await getDeals();

      // const showcaseItems = Object.values(data) as Deal[];
      if (data) {
        const processedData = data.map((deal) => preprocessDeal(deal));
        setHomeData(processedData);
      } else {
        setHomeData([]);
      }

      setTimeout(() => {
        setRefreshing(false);
      }, 1500);
    };

    fetchHomeData();
  }, [refreshing]);

  const DealShowcase = () => {
    return <DealsForYou dealShowcase={homeData} />;
  };

  /**
   * Handles the refresh action.
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <View className="flex-1">
      <HomeHeader />
      <View className="flex-1">
        {refreshing ? (
          <Loader />
        ) : (
          <List
            ref={ref}
            className="bg-light"
            contentContainerClassName="container bg-main flex gap-5 pb-8"
            columnWrapperClassName="flex justify-between gap-3 gap-y-0 mx-6"
            ListHeaderComponent={DealShowcase}
            ListEmptyComponent={<Text>No items to show</Text>}
            ListFooterComponent={
              <Text className="text-center text-gray-500 text-sm">
                You have reached the end.{' '}
                <Text
                  className="text-sm"
                  onPress={() => {
                    ref.current?.scrollToIndex({ index: 0 });
                    setRefreshing(true);
                  }}
                >
                  Tap here to refresh
                </Text>
              </Text>
            }
            data={homeData}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={5}
            refreshing={refreshing}
            renderItem={RenderList}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#0c5a96', '#492499', '#005766']}
                tintColor="#0c5a96"
              />
            }
          />
        )}
      </View>
    </View>
  );
}
export default HomeScreen;
