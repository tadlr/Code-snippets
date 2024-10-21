import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Text, Button, Avatar } from '@ui-kitten/components';
import { Platform, View, Linking } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import '@/constants/DealsCard.css';
import { BusinessInfo } from '@/constants/Types';

import { ThemeContext } from '@/data/context/ThemeContext';
import Constants from 'expo-constants';

const blurHash = Constants ? Constants.expoConfig?.extra?.blurHash : '';
import { getStoreMarkers, getNearestStoreInfo } from '@/utils/apiLocation';

import {
  getLocation,
  formatDistance,
  calculateDistance,
} from '@/utils/location';

import { StoreLogo } from '@/components/actions/MapMarkers';
import { router } from 'expo-router';

export default function DealMap({
  merchant,
  merchantID,
  setDistanceToStore,
  merchant_logo,
}: {
  merchant: string | string[] | undefined;
  merchantID: string | string[] | undefined;
  setDistanceToStore: Dispatch<SetStateAction<string>>;
  merchant_logo: string | string[] | undefined;
}) {
  const mapRef = useRef<MapView>(null);
  let merchant_address = '';

  const { theme } = useContext(ThemeContext);
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [storeLocation, setStoreLocation] = useState<Region | undefined>(
    undefined,
  );
  const [distanceStore, setDistanceStore] = useState<string>('');

  const [markers, setMarkers] = useState<Array<BusinessInfo>>([]);

  const os = Platform.OS;

  useEffect(() => {
    const gps = getLocation();
    gps.then((loc) => {
      if (loc) {
        setLocation(loc);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!location || !merchant) return;
      const merchantName = Array.isArray(merchant) ? merchant[0] : merchant;
      let markersFormatted: BusinessInfo[] = [];

      try {
        const fetchedMarkers = await getStoreMarkers(
          {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          merchantName,
        );

        markersFormatted =
          fetchedMarkers?.map((marker) => ({
            ...marker,
            openNow: true,
          })) ?? [];

        console.log('Markers length:', markersFormatted.length);

        if (markersFormatted.length === 0) {
          const fetchedStoreLocation = await getNearestStoreInfo(
            location,
            merchantName,
          );
          if (fetchedStoreLocation) {
            markersFormatted.push({
              placeId: fetchedStoreLocation.placeId,
              name: fetchedStoreLocation.name,
              latitude: fetchedStoreLocation.latitude,
              longitude: fetchedStoreLocation.longitude,
              address: fetchedStoreLocation.address,
              businessStatus: 'OPERATIONAL',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching store information:', error);
      }

      if (markersFormatted.length > 0) {
        const firstMarker = markersFormatted[0];
        console.log(
          'Using marker latitude and longitude:',
          firstMarker.latitude,
          ',',
          firstMarker.longitude,
        );

        setStoreLocation({
          latitude: firstMarker.latitude,
          longitude: firstMarker.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        //const storeLocationLink = `https://www.google.com/maps?q=${firstMarker.latitude},${firstMarker.longitude}`;
        //console.log('Store Location Link:', storeLocationLink);
      }

      setMarkers(markersFormatted);
    };

    //const userLocationLink = `https://www.google.com/maps?q=${location?.latitude},${location?.longitude}`;
    //console.log('User Location Link:', userLocationLink);

    fetchData();
  }, [location, merchant]);

  useEffect(() => {
    if (location && storeLocation && mapRef.current) {
      const coordinates = [
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: storeLocation.latitude,
          longitude: storeLocation.longitude,
        },
      ];

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 20, right: 50, bottom: 20, left: 50 },
        animated: true,
      });

      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        storeLocation.latitude,
        storeLocation.longitude,
      );
      console.log(`Distance to the first store: ${formatDistance(distance)}`);
      setDistanceToStore(formatDistance(distance));
      setDistanceStore(formatDistance(distance));
    }
  }, [location, storeLocation]);

  const openMaps = (lat: number, lon: number) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lon}`;
    const label = 'Near Store';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };
  return (
    <>
      {location && (
        <View className="border-slate-400 pb-5 px-3 mx-5 border-b-2">
          <Text className="title font-raleway-bold my-5" category="h6">
            Nearest Product Store
          </Text>
          <View className="h-52">
            <MapView
              // scrollEnabled={false}
              ref={mapRef}
              provider={os == 'android' ? PROVIDER_GOOGLE : undefined}
              userInterfaceStyle={theme === 'dark' ? 'dark' : 'light'}
              showsUserLocation={true}
              showsCompass={false}
              zoomControlEnabled={true}
              zoomEnabled={true}
              loadingEnabled={true}
              style={{ flex: 1 }}
            >
              {markers.map(
                (store: BusinessInfo) => (
                  (merchant_address = store.address),
                  (
                    <Marker
                      key={store.placeId}
                      coordinate={{
                        latitude: store.latitude,
                        longitude: store.longitude,
                      }}
                      title={store.name}
                      description={store.address}
                    >
                      <StoreLogo merchant_name={store.name} />
                    </Marker>
                  )
                ),
              )}
            </MapView>
          </View>
          <View className="my-5">
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-3 items-center">
                <Image
                  source={merchant_logo as ImageSource}
                  placeholder={blurHash as string}
                  className="store-logo-details"
                  contentFit="contain"
                />
                <Text className="font-raleway-bold">{merchant}</Text>
              </View>
              {storeLocation && (
                <Text
                  onPress={() =>
                    openMaps(storeLocation.latitude, storeLocation.longitude)
                  }
                  className="text-blue-900 underline"
                >
                  Open in Maps
                </Text>
              )}
            </View>
            {merchant_address && (
              <View>
                <Text className="font-raleway  mt-5">{merchant_address}</Text>
              </View>
            )}
          </View>
          <Button
            accessibilityLabel={'Filter screen'}
            accessible={true}
            status="primary"
            size="large"
            className="bg-primary-500 border-0 py-5"
            accessoryLeft={() => {
              return (
                <Avatar
                  source={require('@/assets/icons/cart-shopping-solid-white.svg')}
                  style={{ width: 20, height: 20 }}
                  ImageComponent={(media: ReactElement) => (
                    <View
                      className="justify-center items-center"
                      style={{ width: 20, height: 20 }}
                    >
                      <Image
                        {...media}
                        style={{ width: 20, height: 20 }}
                        contentFit="contain"
                      />
                    </View>
                  )}
                />
              );
            }}
            onPress={() => {
              console.log('Merchant:', merchant);
              console.log('merchantID:', merchantID);
              console.log('distanceStore:', distanceStore);
              console.log('merchant_logo:', merchant_logo);
              console.log('merchant_address:', merchant_address);

              router.push({
                pathname: '/(modal)/store-details',
                params: {
                  merchant: merchant,
                  merchantID: merchantID,
                  distanceToStore: distanceStore,
                  merchant_logo: merchant_logo,
                  address: merchant_address,
                },
              });
            }}
          >
            Deals from this Store
          </Button>
        </View>
      )}
    </>
  );
}
