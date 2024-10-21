/**
 * Renders the hero content component.
 * This component displays a list of deals and a menu for categories.
 */
import React, { useEffect, useState, memo } from 'react';
import { View } from 'react-native';

import { Text, List } from '@ui-kitten/components';
import {
  DealShowcase,
  ShowCasePlaceholder,
} from '@/components/cards/DealShowcase';

import CategoriesMenu from '@/components/cards/CategoriesMenu';
import { DealFormatted, Category } from '@/constants/Interfaces';

import Subcategories from '@/components/helpers/Subcategories';
import { shuffleArray } from '@/utils/dataProcessor';

function DealsForYou({ dealShowcase }: { dealShowcase: DealFormatted[] }) {
  const [showcase, setShowcase] = useState<DealFormatted[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [dealData, setDealData] = useState<DealFormatted[]>([]);
  const [ready, setReady] = useState(false);

  // const toggleModal = () => {
  //   setIsModalVisible(!isModalVisible);
  // };

  useEffect(() => {
    setDealData(dealShowcase);
  }, [dealShowcase]);

  useEffect(() => {
    if (dealData.length === 0 || ready) {
      return;
    }
    const shuffledData = shuffleArray([...dealData]);
    const showcaseItems = shuffledData.slice(0, 10);
    setShowcase(showcaseItems);
  }, [dealData]);

  useEffect(() => {
    if (dealData.length > 0) {
      setReady(true);
    }
  }, [dealData]);

  return (
    <View className="bg-main">
      <View className="content-center justify-center ps-0 py-0">
        <CategoriesMenu
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        {selectedCategory && selectedCategory.subcategories && (
          <View className="flex-row justify-center content-center gap-5 py-3 bg-main">
            <Subcategories
              categoryId={selectedCategory.id}
              subcategories={selectedCategory.subcategories}
              onSelectSubcategory={(subcategoryId, categoryId) => {
                console.log(
                  'Selected subcategoryId:',
                  subcategoryId,
                  'for categoryId:',
                  categoryId,
                );
              }}
            />
          </View>
        )}
      </View>
      <View className="content-center justify-center ps-5 py-3">
        <Text className="title" category="h5">
          Just for you
        </Text>
      </View>
      {!ready ? (
        <ShowCasePlaceholder />
      ) : (
        <List
          data={showcase as DealFormatted[]}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          renderItem={({ item }: { item: DealFormatted }) => (
            <DealShowcase item={item} />
          )}
          snapToAlignment="center"
          decelerationRate={'fast'}
          contentContainerClassName="flex m-5 gap-5 pr-10"
          horizontal={true}
        />
      )}
      <View className="content-center justify-center ps-5 py-3">
        <Text className="title" category="h5">
          Explore All
        </Text>
      </View>
    </View>
  );
}

export default memo(DealsForYou);
