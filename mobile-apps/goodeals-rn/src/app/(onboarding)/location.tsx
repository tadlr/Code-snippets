import { router } from 'expo-router';
import LocationSettings from '@/components/settings/LocationSettings';

import {
  Button,
  Icon,
  IconElement,
  IconProps,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { View } from 'react-native';

import { cssInterop } from 'nativewind';

import Markdown from 'react-native-markdown-display';
import { DataContext, DataContextValue } from '@/data/context/DataContext';
cssInterop(Markdown, { className: 'style' });

/**
 * Renders the setup component.
 * @param props - The optional props for the setup component.
 * @returns The rendered setup component.
 */
function SetUp(props?: { setHideButton: Dispatch<SetStateAction<boolean>> }) {
  const { setHideButton } = props as {
    setHideButton: Dispatch<SetStateAction<boolean>>;
  };

  return (
    <View>
      <View className=" pt-5">
        <LocationSettings setHideButton={setHideButton} />
        {/* <DisplaySettings /> */}
      </View>
    </View>
  );
}

/**
 * Renders the ready to browse component.
 * @returns The rendered ready to browse component.
 */
function ReadyToBrowse() {
  return (
    <View className="items-center justify-center container px-5 text-center ">
      <Text className="text-white uppercase text-3xl font-raleway-bold pb-5">
        You're all set!
      </Text>
      <Text className="text-white text-center">
        We found some great deals near you. {'\n'}Ready to browse?
      </Text>
    </View>
  );
}

/**
 * Renders the location setup component.
 * @returns The rendered location setup component.
 */
export default function LocationSetup() {
  const [hideButton, setHideButton] = useState<boolean>(true);
  const { setDoOnboarding } = useContext(DataContext) as DataContextValue;

  /**
   * Renders the location header component.
   * @returns The rendered location header component.
   */
  function LocationHeader() {
    const BackIcon = (props: IconProps): IconElement => (
      <Icon {...props} name="arrow-back" fill="white" />
    );

    const BackAction = (): ReactElement => {
      return (
        <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />
      );
    };

    const Title = (): ReactElement => (
      <Text className="font-raleway600 text-white text-lg">Location</Text>
    );

    return (
      <View className="bg-transparent">
        <TopNavigation
          alignment="center"
          accessoryLeft={BackAction}
          className="bg-transparent"
          title={Title}
        />
      </View>
    );
  }

  return (
    <View className="container bg-primary-500 h-full relative">
      <LocationHeader />
      <View className="flex-1">
        <View className="flex flex-1 container px-5 h-screen justify-center mb-28">
          {!hideButton ? (
            <ReadyToBrowse />
          ) : (
            <View className="px-5 mt-24">
              <SetUp setHideButton={setHideButton} />
            </View>
          )}
        </View>
        <View className="absolute bottom-0 w-full px-5">
          <Button
            onPress={() => {
              setDoOnboarding(false);
              router.navigate('/');
            }}
            disabled={hideButton}
            status="control"
            className={
              (hideButton ? 'opacity-0' : 'opacity-1') + ` mt-4 w-full  mb-3`
            }
          >
            Browse deals!
          </Button>
        </View>
      </View>
    </View>
  );
}
