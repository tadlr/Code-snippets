function normalizeString(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Checks if a store name contains a significant part of a location name or vice versa.
 * @param storeName - The store name to check.
 * @param locationName - The location name to check.
 * @returns A boolean indicating whether the store name contains a significant part of the location name or vice versa.
 */
function containsSignificantPart(storeName: string, locationName: string) {
  const normalizedStoreName = normalizeString(storeName);
  const normalizedLocationName = normalizeString(locationName);
  return (
    normalizedLocationName.includes(normalizedStoreName) ||
    normalizedStoreName.includes(normalizedLocationName)
  );
}

export { normalizeString, containsSignificantPart };
