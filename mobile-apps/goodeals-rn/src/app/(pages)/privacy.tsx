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
 * Represents the PrivacyScreen component.
 */
const privacy = `
At Goodeals, we are committed to safeguarding your privacy and ensuring the confidentiality of your personal information. This Privacy Policy outlines our practices regarding the collection, use, and protection of the data we gather through your use of our app.

## Information We Collect
We may collect personal information such as your name, email address, and location to provide you with a personalized and enhanced user experience. Additionally, non-personal information, including device information and usage statistics, may be collected for analytical purposes.

## How We Use Your Information
The information we collect is used to enhance your experience on Goodeals, personalize content, improve our services, and provide you with relevant deals and discounts. We may also use your information to communicate with you about updates, promotions, and new features.

## Sharing of Information
Your personal information will not be sold, rented, or shared with third parties without your explicit consent. However, we may share non-personal, aggregated data for analytical and marketing purposes.
`;

export default function PrivacyScreen() {
  function PrivacyHeader() {
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
          title="Privacy Policy"
          alignment="center"
        />
      </View>
    );
  }

  return (
    <View>
      <PrivacyHeader />
      <View className="p-5">
        <ScrollView>
          <Markdown>{privacy}</Markdown>
        </ScrollView>
      </View>
    </View>
  );
}
