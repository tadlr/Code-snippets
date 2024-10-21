/**
 * Represents the header component for the favourites filter screen header screen.
 *
 * @component
 * @param {() => void} props.handlerClear - The function ti clear the filter options.
 * @returns {JSX.Element} - The rendered component.
 */
import React, { ReactElement } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const FavsFilterHeader = (props: { handleClear: () => void }): ReactElement => {
  const { handleClear } = props;
  const os = Platform.OS;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingRight: insets.right,
          paddingTop: os === 'ios' ? 20 : insets.top + 10,
        },
      ]}
      className="p-5"
    >
      <View
        style={{ paddingRight: insets.right }}
        className="flex-1 flex-row items-start"
      >
        <TouchableOpacity
          accessibilityLabel={'Go back to favourites screen'}
          className="m-0 "
          onPress={() => router.back()}
        >
          <Icon name="close-outline" width={28} height={28} fill="#0C5A96" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center">
        <Text className="font-raleway-bold title align-center" category="h6">
          Filters
        </Text>
      </View>

      <View className="flex-1 items-end pr-2">
        <TouchableOpacity
          accessibilityLabel={'Filter screen'}
          className="p-3"
          onPress={handleClear}
        >
          <Text className="font-raleway-bold text-primary-500">Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default FavsFilterHeader;
