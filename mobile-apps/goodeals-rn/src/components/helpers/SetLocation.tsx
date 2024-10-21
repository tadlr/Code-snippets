/**
 * Renders a modal component for setting the user's location.
 * If the current location is not set, the modal will be visible.
 * The user can set their location using the LocationSettings component.
 */
import React, { useState, useEffect, useContext, ReactElement } from 'react';
import { View } from 'react-native';
import { getData, DataContext } from '@/data/provider/DataProvider';
import { Card, Modal, Text } from '@ui-kitten/components';
import LocationSettings from '@/components/settings/LocationSettings';

export const SetLocation = (): ReactElement => {
  const [visible, setVisible] = useState(false);

  const { currentLocation, setCurrentLocation } = useContext(DataContext) || {};

  useEffect(() => {
    const getLocation = async () => {
      if (setCurrentLocation) {
        setCurrentLocation(await getData('postalcode'));
      }
    };

    getLocation();
  });

  useEffect(() => {
    if (currentLocation === null || currentLocation === undefined) {
      setVisible(true);
    }

    if (typeof currentLocation == 'string') {
      setVisible(false);
    }
  }, [currentLocation]);

  return (
    <Modal
      visible={visible}
      // onBackdropPress={() => setVisible(false)}
      animationType="fade"
    >
      <Card disabled={true}>
        <Text category="h5" className="mb-2">
          Don't miss the best deals
        </Text>
        <Text category="s1" className="mb-2">
          Set your location to get the best deals near you
        </Text>
        <View>
          <LocationSettings setVisible={setVisible} />
        </View>
      </Card>
    </Modal>
  );
};
