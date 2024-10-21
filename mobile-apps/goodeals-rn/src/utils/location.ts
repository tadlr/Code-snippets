import * as ExpoLocation from 'expo-location';

function formatDistance(distanceInMeters: number) {
  if (distanceInMeters < 1000) {
    // If the distance is less than 1000 meters, display it in meters
    return `${Math.floor(distanceInMeters)} meters`;
  } else {
    // Otherwise, convert it to kilometers and display with one decimal place
    const distanceInKilometers = Math.floor(distanceInMeters / 1000);

    return `${distanceInKilometers.toFixed(1)} km`;
  }
}

/**
 * Retrieves the current location of the device.
 * @returns {Promise<void>} A promise that resolves when the location is retrieved.
 */
async function getLocation() {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // setstatusMsg('Permission to access location was denied');
    return false;
  }

  const geoLocation = await ExpoLocation.getCurrentPositionAsync({});

  return {
    latitude: geoLocation.coords.latitude,
    longitude: geoLocation.coords.longitude,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0221,
  };
}

/**
 * Calculates the distance between two geographic locations.
 * @param {number} lat1 Latitude of the first location
 * @param {number} lon1 Longitude of the first location
 * @param {number} lat2 Latitude of the second location
 * @param {number} lon2 Longitude of the second location
 * @returns {number} The distance in meters
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export { formatDistance, getLocation, calculateDistance };
