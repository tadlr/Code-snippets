import React, { ReactElement } from 'react';
import { Text } from '@ui-kitten/components';
import { Platform, View } from 'react-native';

import '@/constants/DealsCard.css';

import { DealFormatted } from '@/constants/Interfaces';

import {
  IconProps,
  IconElement,
  Icon,
  TopNavigationAction,
  TopNavigation,
} from '@ui-kitten/components';
import { router } from 'expo-router';
import AddToFavorites from '@/components/actions/AddToFavorites';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DealDetailsHeader = (props: { deal: DealFormatted }): ReactElement => {
  const { deal } = props;
  const product = deal.name ? String(deal.name) : '';

  const os = Platform.OS;
  const insets = useSafeAreaInsets();

  // const insets = useSafeAreaInsets();

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
        style={{ paddingTop: os === 'ios' ? 16 : insets.top + 10 }}
        accessoryLeft={BackAction}
        accessoryRight={() => (
          <AddToFavorites product={product} deal={deal} isDealDetails={true} />
        )}
        title={() => (
          <Text className="font-inter-bold text-lg mx-3">Product Details</Text>
        )}
        alignment="start"
      />
    </View>
  );
};

export default DealDetailsHeader;
