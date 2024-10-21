import React, { useState } from 'react';
import Slider from '@react-native-community/slider';

interface MySliderProps {
  initialValue?: number;
  minValue: number;
  maxValue: number;
  onValueChange: (value: number) => void;
}

const MySlider: React.FC<MySliderProps> = ({
  initialValue = 25,
  minValue,
  maxValue,
  onValueChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleSliderChange = (newValue: number) => {
    const roundedValue = Math.round(newValue); // Round the value to the nearest integer
    // setValue(roundedValue);
    onValueChange(roundedValue);
  };

  return (
    <Slider
      style={{ width: '100%', height: 40 }}
      step={1}
      minimumValue={minValue}
      maximumValue={maxValue}
      minimumTrackTintColor="#444444"
      maximumTrackTintColor="#E0E0E0"
      thumbTintColor="#000000"
      value={value}
      onValueChange={handleSliderChange}
    />
  );
};

export default MySlider;
