import React, { useCallback, useEffect, useRef, useState } from 'react';
import DealCard from '@/components/cards/DealCard';
import { DealFormatted } from '@/constants/Interfaces';
import { StoreDetailScreenRouteProp } from '@/constants/Types';
import { getDeals } from '@/utils/apiConnect';
import { useRoute } from '@react-navigation/native';
import { List, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { preprocessDeal } from '@/utils/dataProcessor';
import Loader from '@/components/helpers/Loader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StoreDetailsHeader from '@/components/header/StoreDetailsHeader';
import { router } from 'expo-router';
import { Image, ImageSource } from 'expo-image';
import Constants from 'expo-constants';

const blurHash = Constants ? Constants.expoConfig?.extra?.blurHash : '';
/**
 * Renders the SearchScreen component.
 * This component is responsible for displaying the store details screen.
 *
 * @returns The rendered SearchScreen component.
 */
function StoreDetails() {
  const route = useRoute<StoreDetailScreenRouteProp>();
  const { merchant, merchantID, distanceToStore, merchant_logo, address } =
    route.params;

  const [showcase, setShowcase] = useState<DealFormatted[]>([]);

  const [refreshing, setRefreshing] = useState(true);

  const insets = useSafeAreaInsets();

  const ref = useRef<List>(null);

  const RenderList = useCallback(({ item }: { item: DealFormatted }) => {
    return <DealCard item={item} />;
  }, []);

  useEffect(() => {
    console.log(merchant);
    /**
     * Fetches 10 deals from that store.
     */
    const fetchFilteredDeals = async () => {
      const allDeals = await getDeals();

      console.log(merchantID);
      if (allDeals) {
        const merchantData = allDeals.filter(
          (deal) => deal.merchant_id === Number(merchantID),
        );
        const processedData = merchantData.map((deal) => preprocessDeal(deal));
        const showcaseItems = processedData.slice(0, 10);
        setShowcase(showcaseItems);
        setRefreshing(false);

        setTimeout(() => {
          setShowcase(showcaseItems);
          setRefreshing(false);
        }, 1500);
      } else {
        setShowcase([]);
        setRefreshing(false);
      }
    };

    if (merchant) {
      fetchFilteredDeals();

      setRefreshing(true);
    }
  }, [route.params]);

  /**
   * Renders the store details hero component.
   */
  const StoreDetailsHero = () => {
    return (
      <View className="content-center justify-center px-5 pb-3">
        <View className="flex-row gap-3 items-center bg-light py-5">
          <Image
            source={merchant_logo as ImageSource}
            placeholder={blurHash as string}
            className="w-36 h-36"
            contentFit="contain"
          />
          <View className="flex-1">
            <Text className="title" category="h5">
              {merchant}
            </Text>

            {address && <Text className="text-lg my-2">{address}</Text>}
            {distanceToStore && (
              <Text className="text-lg my-2">{distanceToStore}</Text>
            )}
          </View>
        </View>
        <View className="flex-row justify-between items-center container pt-5">
          <Text className="title" category="h5">
            Latest Deals
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: '/(modal)/store-products',
                params: {
                  merchant: merchant,
                  merchantID: merchantID,
                },
              });
            }}
          >
            <Text className="text-primary-500">See All</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      className="flex-1"
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StoreDetailsHeader />

      <View className="flex-1">
        {refreshing ? (
          <Loader />
        ) : (
          <List
            ref={ref}
            className="bg-light"
            contentContainerClassName="container bg-main flex gap-5 pb-8"
            columnWrapperClassName="flex justify-between gap-3 mx-6"
            ListHeaderComponent={StoreDetailsHero}
            ListEmptyComponent={<Text>No items to show</Text>}
            data={showcase}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={5}
            renderItem={RenderList}
            numColumns={2}
          />
        )}
      </View>
    </View>
  );
}

export default StoreDetails;
