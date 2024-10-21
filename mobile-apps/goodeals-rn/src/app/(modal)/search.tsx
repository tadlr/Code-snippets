import React, { useCallback, useEffect, useRef, useState } from 'react';
import DealCard from '@/components/cards/DealCard';
import { DealFormatted } from '@/constants/Interfaces';
import { SearchScreenRouteProp } from '@/constants/Types';
import {
  getDeals,
  getCategoryName,
  getSubcategoryName,
} from '@/utils/apiConnect';
import { useRoute } from '@react-navigation/native';
import { List, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { preprocessDeal } from '@/utils/dataProcessor';
import SearchHeader from '@/components/header/SearchHeader';
import Loader from '@/components/helpers/Loader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Renders the SearchScreen component.
 * This component is responsible for displaying the search screen.
 *
 * @returns The rendered SearchScreen component.
 */
function SearchScreen() {
  /**
   * Represents the state of the home data.
   */
  const [searchData, setsearchData] = useState<DealFormatted[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [subcategoryTitle, setSubcategoryTitle] = useState('');

  const insets = useSafeAreaInsets();

  const ref = useRef<List>(null);
  const route = useRoute<SearchScreenRouteProp>();
  const { query } = route.params || { query: '' };

  const RenderList = useCallback(({ item }: { item: DealFormatted }) => {
    return <DealCard item={item} />;
  }, []);

  useEffect(() => {
    const { query, categoryId, subcategoryId } = route.params || {};

    const fetchTitles = async () => {
      if (categoryId !== undefined) {
        const name = await getCategoryName(categoryId);
        setCategoryTitle(name || '');
      }
      if (subcategoryId !== undefined) {
        const name = await getSubcategoryName(subcategoryId);
        setSubcategoryTitle(name || '');
      }
    };

    /**
     * Fetches the filtered deals based on the search query.
     */
    const fetchFilteredDeals = async () => {
      const allDeals = await getDeals({
        product_name: query,
        category: categoryId,
        subcategories: subcategoryId ? [subcategoryId] : undefined,
      });

      if (allDeals) {
        const processedData = allDeals.map((deal) => preprocessDeal(deal));
        setsearchData(processedData);

        setTimeout(() => {
          setsearchData(processedData);
          setRefreshing(false);
        }, 1500);
      } else {
        setsearchData([]);
        setRefreshing(false);
      }
    };

    if (query || categoryId || subcategoryId) {
      fetchFilteredDeals();

      setIsSearch(true);
      setRefreshing(true);
    }

    fetchTitles();
  }, [route.params]);

  /**
   * Renders the search hero component.
   */
  const SearchHero = () => {
    return (
      <View className="content-center justify-center ps-5 py-3 pt-8">
        <Text className="title" category="h5">
          Search Results for:
        </Text>
        <Text className="title my-2">
          {categoryTitle} / {subcategoryTitle}
        </Text>
        <Text className="title my-2" category="h6">
          {query}
        </Text>
        <View className="flex-row container">
          <Text className="text-gray-500 text-sm">
            {searchData.length} results found
          </Text>
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
      <SearchHeader initialQuery={query} showBackButton={isSearch} />
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
            ListEmptyComponent={<Text> No items to show </Text>}
            data={searchData}
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

export default SearchScreen;
