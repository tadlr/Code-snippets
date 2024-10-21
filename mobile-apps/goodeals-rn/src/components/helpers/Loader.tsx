import { Text } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

export default function Loader() {
  const animation = useRef<LottieView>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadingMessages = [
    'Getting the best deals',
    'Just a few more seconds',
    'Finding the best deals',
    'Almost there',
    'Pro Tip: Tap the heart to save a deal',
    'Great deals come to those who wait...',
    'Did you know? You can filter deals by categories.',
    'Found a great deal!',
    'Our deal-finding hamsters are running as fast as they can!',
    'Just a moment...',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < loadingMessages.length ? nextIndex : 0;
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLoadingMessage(loadingMessages[currentIndex]);
  }, [currentIndex]);

  return (
    <View className="flex-1 flex justify-center items-center px-10 ">
      <View className="bg-white p-10 rounded-md shadow-sm justify-center flex w-72 h-72 relative">
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginBottom: 65,
          }}
          source={require('@/assets/animations/loading.json')}
        />
        <Text className="text-center mt-5 absolute bottom-10 left-0 right-0 px-8">
          {loadingMessage}
        </Text>
      </View>
    </View>
  );
}
