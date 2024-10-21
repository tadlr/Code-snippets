import React, { useContext, useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { Platform, View } from 'react-native';

import {
  Text,
  List,
  Button,
  IconProps,
  IconElement,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import { ThemeContext } from '@/data/context/ThemeContext';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Region } from 'react-native-maps';
import { StoreLogo, MerchantDetails } from '@/components/actions/MapMarkers';
import { BusinessInfo } from '@/constants/Types';
import { getLocation } from '@/utils/location';
import { getStoreLocation } from '@/utils/apiLocation';
import LocationPin from '@/assets/icons/pin.svg';

/**
 * Renders the StoresScreen component.
 * This component displays a map with markers representing nearby stores.
 * It also fetches and displays a list of stores.
 */
export default function StoreMapScreen() {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [markers, setMarkers] = useState<Array<BusinessInfo>>([]);
  const [statusMsg, setstatusMsg] = useState<string | undefined>('');
  const [fetchMarkers, setFetchMarkers] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);

  const { theme } = useContext(ThemeContext);

  const os = Platform.OS;

  const LocationIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="navigation-2-outline" />
  );

  useEffect(() => {
    const gps = getLocation();
    gps.then((loc) => {
      if (loc) {
        setLocation(loc);
      } else {
        setstatusMsg('Location not available');
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) {
        return;
      }
      const Markers = await getStoreLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setMarkers(Markers);
    };

    fetchData();
    setIsReady(true);
  }, [fetchMarkers]);

  useEffect(() => {
    if (location) {
      mapRef.current?.animateToRegion(location, 2000);
    }
    if (fetchMarkers) {
      setFetchMarkers(false);
      // setIsReady(true);
    }
  }, [location, markers]);

  return (
    <View className="container flex-1">
      <View className="h-50 flex-1">
        <MapView
          ref={mapRef}
          region={location}
          initialRegion={location}
          provider={os == 'android' ? PROVIDER_GOOGLE : undefined}
          userInterfaceStyle={theme === 'dark' ? 'dark' : 'light'}
          showsUserLocation={true}
          showsCompass={true}
          zoomControlEnabled={true}
          onMapReady={() => setFetchMarkers(true)}
          followsUserLocation={true}
          zoomEnabled={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          style={{ flex: 1 }}
        >
          {markers
            ? markers.map((store: BusinessInfo) => {
                return (
                  <Marker
                    // id={UUID}
                    key={store.placeId}
                    identifier={store.placeId}
                    onPress={() => {}}
                    tracksViewChanges={true}
                    coordinate={{
                      latitude: store.latitude,
                      longitude: store.longitude,
                    }}
                    title={store.name}
                    description={`Address: ${store.address}`}
                  >
                    <StoreLogo merchant_name={store.name} />
                  </Marker>
                );
              })
            : null}
        </MapView>
        {os == 'android' ? null : (
          <>
            {location ? (
              <Button
                accessoryLeft={LocationIcon}
                className="p-0 m-0 w-1 h-1 absolute bottom-5 right-5 rounded-full"
                appearance="filled"
                size="small"
                accessible={true}
                accessibilityLabel="Go to current location"
                status="primary"
                onPress={() => {
                  mapRef.current?.animateToRegion(location, 1000);
                }}
              />
            ) : null}
          </>
        )}
      </View>
      <View className="h-50 flex-1">
        {markers ? (
          <View className="bg-white flex-1">
            <View className="content-center justify-center px-5 pt-5 py-3">
              <Text className="title" category="h5">
                Stores Nearby
              </Text>
            </View>
            {!isReady ? (
              <View className="flex-1 items-center justify-center">
                <Spinner />
              </View>
            ) : (
              <>
                {!location ? (
                  <View className="flex-1 items-center justify-center px-5 py-3 gap-6">
                    <View className="self-center justify-center">
                      <LocationPin width={70} height={70} fill={'#06346C'} />
                    </View>
                    <View className="gap-3">
                      <Text className="text-center title" category="h5">
                        {statusMsg}
                      </Text>
                      <Text className="text-center text-lg">
                        To see closest stores, please go to settings to add your
                        Postal Code.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <List
                    className="bg-white"
                    contentContainerClassName="container bg-white px-5"
                    ListEmptyComponent={<Text>No items to show</Text>}
                    data={markers as BusinessInfo[]}
                    keyExtractor={(item) => item.placeId.toString()}
                    initialNumToRender={5}
                    renderItem={({ item }: { item: BusinessInfo }) => (
                      <MerchantDetails item={item} location={location} />
                    )}
                    numColumns={1}
                  />
                )}
              </>
            )}
          </View>
        ) : (
          <Text>No stores found</Text>
        )}
      </View>
    </View>
  );
}
