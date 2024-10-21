/**
 * Renders the favourites filter footer content component.
 * This component displays the distance slider and offer expiration select.
 */
import React, { Dispatch, SetStateAction, ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import MySlider from '@/components/filter/MySlider';

const offerExpirations = [
  'Any',
  'End in 3 days',
  'End in 1 week',
  'End in 2 weeks',
];

const FavsFilterFooter = (
  defaultDistanceRange: number,
  distanceRange: number,
  handleDistanceRangeChange: (value: number) => void,
  selectedExpirationIndex: IndexPath,
  setSelectedExpirationIndex: Dispatch<SetStateAction<IndexPath>>,
): ReactElement => {
  const displayValue = offerExpirations[selectedExpirationIndex.row];

  return (
    <View className="">
      <View className="border-slate-300 p-5 border-b border-t">
        <View style={styles.row}>
          <Text className="font-raleway-bold" style={styles.label}>
            Distance
          </Text>
        </View>
        <View style={styles.boxBackground}>
          <Text
            className="font-raleway-medium"
            style={{ color: 'grey', fontSize: 12, paddingBottom: 5 }}
          >
            Below
          </Text>
          <Text className="font-inter-bold" style={styles.textEffect}>
            {distanceRange} km
          </Text>
          <MySlider
            initialValue={defaultDistanceRange}
            minValue={0}
            maxValue={25}
            onValueChange={handleDistanceRangeChange}
          />
        </View>
      </View>
      <View className="p-5">
        <View className="flex gap-3" style={{ marginTop: 10 }}>
          <Text className="font-raleway-bold" style={styles.label}>
            Offer expiration
          </Text>
          <Layout level="1">
            <Select
              placeholder="Any"
              value={displayValue}
              selectedIndex={selectedExpirationIndex}
              onSelect={(index: IndexPath | IndexPath[]) =>
                setSelectedExpirationIndex(index as IndexPath)
              }
            >
              {offerExpirations.map((offerExpiration, index) => (
                <SelectItem title={offerExpiration} key={index} />
              ))}
            </Select>
          </Layout>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxBackground: {
    backgroundColor: '#F1F9FF',
    padding: 10,
    marginBottom: 10,
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
});

export default FavsFilterFooter;
