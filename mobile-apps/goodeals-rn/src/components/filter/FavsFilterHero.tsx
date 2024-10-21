/**
 * Renders the favourites filter hero content component.
 * This component displays the stores checkboxes.
 */
import React, { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Icon,
  CheckBox,
  Text,
  IconElement,
  IconProps,
} from '@ui-kitten/components';
import { Merchant } from '@/constants/Interfaces';

const FavsFilterHero = (
  stores: Merchant[],
  handleCheckBoxChange: (
    newCheckedValue: boolean,
    index: number,
    storeID: number,
  ) => void,
  activeStoreChecked: boolean[],
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
  /**
   * Icon component for the closed section icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const ClosedIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name="arrow-ios-downward-outline"
      fill="gray"
      width={20}
      height={20}
    />
  );

  /**
   * Icon component for the opened section icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const OpenedIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name="arrow-ios-upward-outline"
      fill="gray"
      width={20}
      height={20}
    />
  );

  return (
    <View className="flex">
      <View className="border-slate-300 px-5 border-b">
        <Text className="font-raleway-bold" style={styles.label}>
          Stores
        </Text>
        <View style={styles.container}>
          {stores.map((store, index) => (
            <CheckBox
              key={store.id}
              style={styles.checkbox}
              checked={activeStoreChecked[index]}
              onChange={(newCheckedValue) =>
                handleCheckBoxChange(newCheckedValue, index, store.id)
              }
            >
              {store.merchant_name}
            </CheckBox>
          ))}
        </View>
      </View>
      <View className="flex-row flex p-5">
        <TouchableOpacity
          className="flex-row justify-between flex-1"
          onPress={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Text className="font-raleway-bold" style={styles.label}>
            Product Categories
          </Text>
          {isOpen ? <OpenedIcon /> : <ClosedIcon />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#F1F9FF',
    marginBottom: 24,
  },

  boxBackground: {
    backgroundColor: '#F1F9FF',
    padding: 10,
  },

  rowItem: {
    flex: 1,
  },
  checkbox: {
    margin: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textEffect: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  inputContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FavsFilterHero;
