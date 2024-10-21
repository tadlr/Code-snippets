import { Button, List, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Category, CategoriesMenuProps } from '@/constants/Interfaces';
import { getCategories } from '@/utils/apiConnect';
import { CatIcons } from '@/components/helpers/CategoryIcon';

/**
 * Component that renders a menu of categories.
 * @returns The CategoriesMenu component.
 */
export default function CategoriesMenu({
  onSelectCategory,
  selectedCategory,
}: CategoriesMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchCat = await getCategories();

      if (fetchCat) {
        setCategories(fetchCat);
      } else {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  /**
   * Renders a single category item in the menu.
   * @param item - The category item to render.
   * @returns The rendered category item.
   */
  const ListItem = ({ item }: { item: Category }) => {
    let TheIcon = CatIcons[item.id as keyof typeof CatIcons];

    const handlePress = () => {
      if (selectedCategory?.id === item.id) {
        onSelectCategory(null);
        return;
      }
      onSelectCategory(item);
    };

    if (!TheIcon) {
      TheIcon = CatIcons[0];
    }

    const isSelected = selectedCategory?.id === item.id ? true : false;
    const groupClass = isSelected
      ? 'bg-cat-active-fill border-cat-active-outline'
      : 'bg-cat-fill border-cat-outline';
    const iconClass = isSelected ? 'fill-white' : 'fill-cat-active-fill';

    return (
      <View className="text-center mr-5 justify-top items-center align-center content-center flex-grow-0 flex-col max-w-32 ml-3">
        <Button
          className={`justify-center items-center rounded-full p-3 border  ${groupClass}`}
          appearance="ghost"
          status="basic"
          size="tiny"
          style={{ width: 70, height: 70 }}
          onPress={handlePress}
        >
          <TheIcon
            style={{ width: 40, height: 40 }}
            className={`fill-cat-active-fill group-active:fill-white ${iconClass}`}
          />
        </Button>

        <Text category="label" className="text-center pt-2 shrink-0 mt-3">
          {item.name}
        </Text>
      </View>
    );
  };

  if (ListItem === undefined) {
    return <></>;
  }

  return (
    <View>
      <List
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="p-5 bg-light"
        data={categories}
        renderItem={ListItem}
        horizontal={true}
      />
    </View>
  );
}
