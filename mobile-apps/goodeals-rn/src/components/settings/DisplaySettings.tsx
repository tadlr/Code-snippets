/**
 * Component for displaying and controlling display settings.
 */
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '@/data/context/ThemeContext';
import { Text, Toggle } from '@ui-kitten/components';

export default function DisplaySettings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [activeChecked, setActiveChecked] = useState(false);

  const onActiveCheckedChange = (): void => {
    toggleTheme(theme);
  };

  useEffect(() => {
    const checked = theme === 'dark' ? true : false;
    setActiveChecked(checked);
  }, [theme]);

  return (
    <View className="bg-white ">
      <View className="p-5 bg-sky-200 ">
        <Text category="h5">Display</Text>
      </View>
      <View className="p-5 w-full">
        <View className="flex flex-row gap-3 pt-5">
          <Text className="flex-1 ">Dark Mode</Text>
          <View className="rounded-3xl bg-gray-300">
            <Toggle
              accessible={true}
              accessibilityLabel="Toggle Dark Mode"
              checked={activeChecked}
              status="primary"
              onChange={onActiveCheckedChange}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
