import React, { ReactElement } from 'react';

import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ScrollView } from 'react-native-gesture-handler';

import {
  Icon,
  IconElement,
  TopNavigation,
  TopNavigationAction,
  IconProps,
} from '@ui-kitten/components';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Represents the terms of use for the Goodeals platform.
 */
const terms = `
Welcome to Goodeals, your go-to platform for discovering exciting deals and discount products across Canada. Before embarking on your savings journey, please carefully read and understand our Terms of Use:

## Acceptance of Terms
By accessing and using Goodeals, you agree to comply with and be bound by these Terms of Use. If you disagree with any part of these terms, we kindly ask that you refrain from using our services.

## User Responsibilities
You are responsible for maintaining the confidentiality of your account information and ensuring its accuracy. Any activities conducted under your account are your sole responsibility. Please notify us immediately of any unauthorized use.

## Deal Information
While we strive to provide accurate and timely information about deals and discounts, we cannot guarantee the availability, accuracy, or completeness of the content displayed on our app. Users are encouraged to verify details directly with the respective merchants.
`;

export default function TermScreen() {
  function TermsHeader() {
    const BackIcon = (props: IconProps): IconElement => (
      <Icon {...props} name="arrow-back" />
    );

    const BackAction = (): ReactElement => {
      return (
        <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
      );
    };
    const insets = useSafeAreaInsets();

    return (
      <View style={{ paddingTop: insets.top }} className="bg-white shadow">
        <TopNavigation
          accessoryLeft={BackAction}
          title="Terms of Use"
          alignment="center"
        />
      </View>
    );
  }

  return (
    <View>
      <TermsHeader />
      <View className="p-5">
        <ScrollView>
          <Markdown>{terms}</Markdown>
        </ScrollView>
      </View>
    </View>
  );
}
