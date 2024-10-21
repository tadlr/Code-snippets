import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import DealCard from '@/components/cards/DealCard';
import { DealFormatted } from '@/constants/Interfaces';
import { StoreProductsScreenRouteProp } from '@/constants/Types';
import { getDeals } from '@/utils/apiConnect';
import { useRoute } from '@react-navigation/native';
import {
  Icon,
  IconElement,
  IconProps,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { Platform, View } from 'react-native';
import { preprocessDeal } from '@/utils/dataProcessor';
import Loader from '@/components/helpers/Loader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
const StoreProductsHeader = (props: {
  merchant: string | string[] | undefined;
}): ReactElement => {
  const { merchant } = props;
  const os = Platform.OS;
  const insets = useSafeAreaInsets();

  /**
   * Icon component for the back icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const BackIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="arrow-back" />
  );

  /**
   * Top navigation action component for the back action.
   *
   * @returns {ReactElement} - The rendered top navigation action component.
   */
  const BackAction = (): ReactElement => {
    return (
      <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
    );
  };

  return (
    <View>
      <TopNavigation
        style={{ paddingTop: os === 'ios' ? 22 : insets.top + 12 }}
        className="bg-light"
        accessoryLeft={BackAction}
        title={() => (
          <Text className="font-raleway-bold text-lg mx-3">
            {typeof merchant === 'string'
              ? `Deals from ${merchant}`
              : `Store deals`}
          </Text>
        )}
        alignment="start"
      />
    </View>
  );
};

/**
 * Renders the StoreProductsScreen component.
 * This component is responsible for displaying the store products screen.
 *
 * @returns The rendered StoreProductsScreen component.
 */

function StoreProductsScreen() {
  /**
   * Represents the state of the home data.
   */
  const route = useRoute<StoreProductsScreenRouteProp>();
  const { merchant, merchantID } = route.params;

  const [showcase, setShowcase] = useState<DealFormatted[]>([]);

  const [refreshing, setRefreshing] = useState(true);

  const insets = useSafeAreaInsets();

  const ref = useRef<List>(null);

  const RenderList = useCallback(({ item }: { item: DealFormatted }) => {
    return <DealCard item={item} />;
  }, []);

  useEffect(() => {
    /**
     * Fetches the deals from store
     */
    const fetchFilteredDeals = async () => {
      const allDeals = await getDeals();

      if (allDeals) {
        const merchantData = allDeals.filter(
          (deal) => deal.merchant_id === Number(merchantID),
        );
        const processedData = merchantData.map((deal) => preprocessDeal(deal));
        setShowcase(processedData);
        setRefreshing(false);

        setTimeout(() => {
          setShowcase(processedData);
          setRefreshing(false);
        }, 1500);
      } else {
        setShowcase([]);
        setRefreshing(false);
      }
    };

    if (merchant) {
      fetchFilteredDeals();

      // setIsSearch(true);
      setRefreshing(true);
    }
  }, [route.params]);

  /**
   * Renders the store products hero component.
   */
  const SearchHero = () => {
    return (
      <View className="content-start justify-center ps-5 py-3 pt-8">
        <Text className="title" category="h5">
          Deals
        </Text>
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
      {/* <SearchHeader /> */}
      <StoreProductsHeader merchant={merchant} />
      <View className="flex-1">
        {refreshing ? (
          <Loader />
        ) : (
          <List
            ref={ref}
            className="bg-light"
            contentContainerClassName="container bg-main flex gap-5 pb-8"
            columnWrapperClassName="flex justify-between gap-3 mx-6"
            ListHeaderComponent={SearchHero}
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

export default StoreProductsScreen;
