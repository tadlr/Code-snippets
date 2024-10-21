import axios from 'axios';
import Constants from 'expo-constants';
import { LatLng } from 'react-native-maps';
import { BusinessInfo } from '@/constants/Types';
// import { saveToCache, getCache } from '@/utils/cache';
import { processMerchant } from './dataProcessor';
const MAPS_API_KEY = Constants ? Constants.expoConfig?.extra?.mapsApiKey : '';

/**
 * Retrieves the postal code based on the given latitude and longitude coordinates.
 * @param lat - The latitude coordinate.
 * @param lng - The longitude coordinate.
 * @returns The postal code associated with the given coordinates, or undefined if not found.
 */
async function getLatLng(lat: number, lng: number) {
  const apiKey = MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const addressComponents = response.data.results[0].address_components;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postalCodeComponent = addressComponents.find((component: any) =>
        component.types.includes('postal_code'),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provinceComponent = addressComponents.find((component: any) =>
        component.types.includes('administrative_area_level_1'),
      );

      return {
        postalcode: postalCodeComponent
          ? postalCodeComponent.long_name
          : undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        province: provinceComponent ? provinceComponent.short_name : undefined,
      };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
}

async function getProvince(postalcode: string) {
  const apiKey = MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalcode}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const addressComponents = response.data.results[0].address_components;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provinceComponent = addressComponents.find((component: any) =>
        component.types.includes('administrative_area_level_1'),
      );

      return {
        province: provinceComponent ? provinceComponent.short_name : undefined,
      };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
}

/**
 * Retrieves nearby markers based on the provided latitude and longitude.
 * @param LatLng - The latitude and longitude coordinates.
 * @returns An array of stores with their details.
 */

async function getStoreMarkers(
  LatLng: LatLng,
  filterName?: string,
): Promise<BusinessInfo[] | undefined> {
  console.log(`FilterName: ${filterName}`);

  let stores = await getStoreLocation(LatLng);

  if (filterName) {
    stores = stores.filter((store: { name: string }) =>
      store.name.toLowerCase().includes(filterName.toLowerCase()),
    );
  }

  console.log(
    'Stores after the filtering:',
    stores.map(
      (store: BusinessInfo) =>
        `${store.name}: ${store.latitude},${store.longitude}`,
    ),
  );

  return stores;
}

/**
 * Retrieves nearby markers based on the provided latitude and longitude.
 * @param LatLng - The latitude and longitude coordinates.
 * @returns An array of stores with their details.
 */

async function getStoreLocation(LatLng: LatLng) {
  // const storeLocationCache = await getCache('storeLocation');

  // if (storeLocationCache) {
  //   console.log('Using cached stores');
  //   return storeLocationCache as BusinessInfo[];
  // }

  try {
    const Query = JSON.stringify({
      includedTypes: ['supermarket', 'grocery_store'],
      maxResultCount: 20,
      rankPreference: 'DISTANCE',
      locationRestriction: {
        circle: {
          center: LatLng,
          radius: 10000,
        },
      },
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://places.googleapis.com/v1/places:searchNearby',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': MAPS_API_KEY,
        'X-Goog-FieldMask':
          'places.formattedAddress,places.id,places.location,places.displayName,places.businessStatus',
      },
      data: Query,
    };

    const results = await axios
      .request(config)
      .then((response) => {
        return response.data.places;
      })
      .catch((error) => {
        console.warn(error);
      });

    const stores = await results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => {
        if (item.businessStatus !== 'OPERATIONAL') {
          return null;
        }

        const merchantInfo = processMerchant(item.displayName.text);

        if (merchantInfo) {
          return {
            placeId: item.id,
            latitude: item.location.latitude,
            longitude: item.location.longitude,
            name: item.displayName.text,
            address: item.formattedAddress,
          };
        }
      })
      .filter(Boolean);

    // await saveToCache('storeLocation', stores);

    return stores;
  } catch (error) {
    console.error('Error fetching marker data:', error);
  }
}

/**
 * Searches for the nearest store of a given name to the specified location.
 * @param currentLocation - The current latitude and longitude.
 * @param storeName - The name of the store to search for.
 * @returns Information about the nearest store, including address and lat/lon.
 */
async function getNearestStoreInfo(currentLocation: LatLng, storeName: string) {
  const apiKey = MAPS_API_KEY;
  // For this function we need to use encodeURIComponent
  // to handle store names with spaces or special characters
  const encodedStoreName = encodeURIComponent(storeName);
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=10000&keyword=${encodedStoreName}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const stores = response.data.results;
      if (stores.length > 0) {
        const nearestStore = stores[0];
        return {
          placeId: nearestStore.id,
          name: nearestStore.name,
          address: nearestStore.vicinity,
          latitude: nearestStore.geometry.location.lat,
          longitude: nearestStore.geometry.location.lng,
        };
      } else {
        console.log('No stores found within the specified radius.');
        return undefined;
      }
    } else {
      throw new Error(`Search failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error searching for store:', error);
    return undefined;
  }
}

export {
  getStoreLocation,
  getLatLng,
  getProvince,
  getStoreMarkers,
  getNearestStoreInfo,
};
