// Import necessary dependencies
import React, { useContext, useEffect, useState } from 'react';
import {
  Spinner,
  Layout,
  Text,
  Button,
  Input,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { DataContext } from '@/data/context/DataContext';
import { setData } from '@/data/provider/DataProvider';
import formatPostalCode from '@/utils/formatPostalCode';
import { getProvince } from '@/utils/apiLocation';
import { getLatLng } from '@/utils/apiLocation';
type LocationSettingsProps = {
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  triggerSave?: boolean;
  setHideButton?: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationSettings: React.FC<LocationSettingsProps> = ({
  setVisible,

  setHideButton,
}) => {
  const { currentLocation, setCurrentLocation } = useContext(DataContext) || {};
  const [disableBtn, setDisableBtn] = useState(false);
  const [postalCode, setPostalCode] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  const LocationIcon = () => <Icon name="navigation-2-outline" />;

  const [LocalButton, setLocalButton] = useState(LocationIcon);

  useEffect(() => {
    if (currentLocation) {
      setPostalCode(String(currentLocation));
    }

    console.log('currentLocation', currentLocation);

    if (setHideButton && currentLocation) {
      setIsSaved(true);
      setHideButton(false);
    }
  }, [currentLocation, setHideButton]);

  const SaveIcon = (props: IconProps) => (
    <Icon {...props} name="arrow-forward-outline" fill="white" />
  );

  const LoadingIndicator = () => (
    <View>
      <Spinner size="small" />
    </View>
  );

  const saveLocation = async () => {
    const { isValid, formatted } = formatPostalCode(postalCode);

    setIsSaved(false);
    setStatusMsg('');

    if (isValid && formatted) {
      setPostalCode(formatted);
      setData('postalcode', formatted);

      if (setCurrentLocation) {
        setCurrentLocation(formatted);
      }

      setIsSaved(true);
      if (setHideButton) {
        setHideButton(false);
      }

      const locationProvince = await getProvinceOrFetch(postalCode);
      if (locationProvince) {
        setData('province', locationProvince);
      }

      setTimeout(() => {
        setIsSaved(false);
        if (setVisible) {
          setVisible(false);
        }
      }, 2500);
    } else {
      setStatusMsg('Please enter a valid postal code.');
    }
  };

  const getProvinceOrFetch = async (
    code: string,
  ): Promise<string | undefined> => {
    if (province) return province;
    const fetchProvince = await getProvince(code);
    if (fetchProvince) {
      setProvince(fetchProvince.province);
      return fetchProvince.province;
    }
    return undefined;
  };

  /**
   * Retrieves the user's location and updates the state accordingly.
   */
  const getLocation = async () => {
    setDisableBtn(true);
    setLocalButton(LoadingIndicator);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setStatusMsg('Permission to access location was denied');
      setDisableBtn(false);
      setLocalButton(LocationIcon);
      return;
    }

    let geoLocation = await Location.getLastKnownPositionAsync({});
    if (!geoLocation) {
      geoLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
    }

    if (!geoLocation) {
      setStatusMsg('Unable to obtain geolocation.');
      setDisableBtn(false);
      setLocalButton(LocationIcon);
      return;
    }

    // Try to use reverse geocoding to find the postal code
    const GeoAddress = await Location.reverseGeocodeAsync({
      latitude: geoLocation.coords.latitude,
      longitude: geoLocation.coords.longitude,
    });

    let postalCodeFound = GeoAddress?.[0]?.postalCode;
    let provinceFound = GeoAddress?.[0]?.region;

    // If reverse geocoding does not return a postal code, use getLatLng
    if (!postalCodeFound || !provinceFound) {
      const { postalcode, province } =
        (await getLatLng(
          geoLocation.coords.latitude,
          geoLocation.coords.longitude,
        )) || {};

      postalCodeFound = postalcode;
      provinceFound = province;
    }

    if (provinceFound && provinceFound.length > 2) {
      const { postalcode, province } =
        (await getLatLng(
          geoLocation.coords.latitude,
          geoLocation.coords.longitude,
        )) || {};
      postalCodeFound = postalcode;
      provinceFound = province;
    }

    if (postalCodeFound && provinceFound) {
      setPostalCode(postalCodeFound);
      setProvince(provinceFound);
      setStatusMsg('');
    } else {
      setStatusMsg('Postal code or province could not be determined.');
    }

    setDisableBtn(false);
    setLocalButton(LocationIcon);
  };

  const handleChange = (newPostalCode: string) => {
    setPostalCode(newPostalCode);

    const { isValid, formatted } = formatPostalCode(newPostalCode);

    if (!isValid) {
      setStatusMsg('Invalid postal code format.');
    } else {
      setPostalCode(formatted);

      setStatusMsg('');
    }
  };

  return (
    <View className="bg-white w-max">
      {typeof setHideButton == 'function' ? (
        <View className="p-5 bg-sky-200">
          <Text category="h5">Location</Text>
        </View>
      ) : (
        <Layout level="2" className="p-5">
          <Text category="s1">Location</Text>
        </Layout>
      )}
      <View className="p-5 w-full">
        <Text>Enter your postal code to find the best offers near you.</Text>
        {province && (
          <Text className="font-raleway700">You are in: {province}</Text>
        )}
        <View className="flex  pt-5">
          {isSaved ? (
            <Text className="bg-lime-700 w-full p-3 text-white font-raleway-bold">
              Your postal code was saved.
            </Text>
          ) : (
            <View>
              <Input
                id="postalCode"
                placeholder="A0A 0A0"
                size="large"
                status={isSaved ? 'success' : 'info'}
                maxLength={7}
                value={postalCode}
                autoComplete="postal-code"
                dataDetectorTypes="address"
                autoCorrect={false}
                clearButtonMode="always"
                autoCapitalize="characters"
                accessoryLeft={() => {
                  return (
                    <Button
                      status={isSaved ? 'success' : 'info'}
                      appearance="outline"
                      accessoryLeft={LocalButton}
                      onPress={getLocation}
                      disabled={disableBtn}
                      className="p-0 m-0 w-1 h-1"
                      size="large"
                    />
                  );
                }}
                accessoryRight={() => {
                  return (
                    <Button
                      appearance="filled"
                      status={isSaved ? 'success' : 'primary'}
                      disabled={disableBtn}
                      onPress={() => {
                        saveLocation();
                      }}
                      accessoryRight={SaveIcon}
                      accessible={true}
                      accessibilityLabel="Save location"
                      className="p-0 m-0 w-1 h-1"
                      size="large"
                    />
                  );
                }}
                onChangeText={(postalCode) => handleChange(postalCode)}
                disabled={disableBtn}
              />
              <Text
                className="text-red-700 pt-3 font-raleway-regular-italic"
                appearance="hint"
              >
                {statusMsg ? statusMsg : ''}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LocationSettings;
