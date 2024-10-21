import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SubcategoriesProps } from '@/constants/Interfaces';
import { router } from 'expo-router';

const Subcategories: React.FC<SubcategoriesProps> = ({
  categoryId,
  subcategories,
  onSelectSubcategory = () => {},
}) => {
  const ALL_SELECTION = -1;
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null,
  );

  const getButtonStyle = (id: number) => ({
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 12,
    marginRight: 8,
    backgroundColor: selectedSubcategory === id ? 'lightgray' : 'white',
  });

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="pl-5 bg-light"
    >
      <TouchableOpacity
        style={getButtonStyle(ALL_SELECTION)}
        onPress={() => {
          setSelectedSubcategory(ALL_SELECTION);
          onSelectSubcategory(0, categoryId);
          router.navigate({
            pathname: '/search',
            params: { query: '', categoryId },
          });
        }}
      >
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>
      {subcategories?.map((subcategory) => (
        <TouchableOpacity
          key={subcategory.id}
          style={getButtonStyle(subcategory.id)}
          onPress={() => {
            setSelectedSubcategory(subcategory.id);
            onSelectSubcategory(subcategory.id, categoryId);
            router.navigate({
              pathname: '/search',
              params: { query: '', categoryId, subcategoryId: subcategory.id },
            });
          }}
        >
          <Text style={styles.buttonText}>{subcategory.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 20,
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Subcategories;
