/**
 * Renders the notification settings component.
 *
 * @returns The rendered notification settings component.
 */
import React, { useState } from 'react';

import { View } from 'react-native';

import { Text, Toggle } from '@ui-kitten/components';

export default function NotificationSettings() {
  const [activeChecked, setActiveChecked] = useState(false);

  const onActiveCheckedChange = (isChecked: boolean): void => {
    setActiveChecked(isChecked);
  };

  return (
    <>
      <View className="m-5">
        <Text category="s1">Notifications</Text>
      </View>
      <View className="p-5">
        <View>
          <Text category="s2">Allow offer notifications</Text>
          <Toggle
            accessible={true}
            accessibilityLabel="Toggle Notifications"
            checked={activeChecked}
            onChange={onActiveCheckedChange}
          />
        </View>
      </View>
    </>
  );
}
