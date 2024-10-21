import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { SubcategoriesProps } from '@/constants/Interfaces';

const FavsFilterSubcategories: React.FC<SubcategoriesProps> = ({
  categoryId,
  subcategories,
  selectedSubcategory,
  onSelectSubcategory = () => {},
}) => {
  const ALL_SELECTION = categoryId * -1;

  const subcategoryBaseStyle = `flex-row justify-between flex-1 py-3 border-l-4 `;
  const subcategoryTextStyle = `pl-5 font-raleway-medium`;

  return (
    <View className="flex-1 px-5 bg-white">
      <TouchableOpacity
        className={`${subcategoryBaseStyle} 
        ${selectedSubcategory === ALL_SELECTION ? 'bg-cat-fill border-primary-500' : 'border-white'}`}
        onPress={() => {
          onSelectSubcategory(ALL_SELECTION, categoryId);
        }}
      >
        <Text className={subcategoryTextStyle}>All</Text>
      </TouchableOpacity>
      {subcategories &&
        subcategories.map((subcategory) => (
          <TouchableOpacity
            key={subcategory.id}
            className={`${subcategoryBaseStyle} 
          ${selectedSubcategory === subcategory.id ? 'bg-cat-fill border-primary-500' : 'border-white'}`}
            onPress={() => {
              onSelectSubcategory(subcategory.id, categoryId);
            }}
          >
            <Text className={subcategoryTextStyle}>{subcategory.name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default FavsFilterSubcategories;
