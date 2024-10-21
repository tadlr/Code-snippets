/**
 * @file DataProvider.tsx
 * @desc The DataProvider component provides data and functionality to its children components.
 */

import React, { useState, useEffect, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavouritesType, StorageValue } from '@/constants/Types';
import { DataContext } from '@/data/context/DataContext';
import { DataProviderProps } from '@/constants/Interfaces';

/**
 * Sets data in AsyncStorage for the given key.
 * @param key - The key to set the data for.
 * @param value - The value to be stored.
 * @returns A promise that resolves when the data is set successfully.
 */
const setData = async (key: string, value: StorageValue): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set data for key ${key}:`, error);
  }
};

/**
 * Retrieves data from AsyncStorage for the given key.
 * @param key - The key to retrieve the data for.
 * @returns A promise that resolves with the retrieved data, or null if the data is not found.
 */
const getData = async (key: string): Promise<StorageValue | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Failed to get data for key ${key}:`, error);
    return null;
  }
};

/**
 * Deletes data from AsyncStorage for the given key.
 * @param key - The key to retrieve the data for.
 * @returns A promise that resolves with the retrieved data, or null if the data is not found.
 */
const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to delete data for key ${key}:`, error);
  }
};

/**
 * DataProvider component that provides data and functionality to its children components.
 * @param children - The child components to render.
 * @returns The rendered DataProvider component.
 */
const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contextFavs, setContextFavs] = useState<FavouritesType | null>({});
  const [filteredFavs, setFilteredFavs] = useState<FavouritesType | null>({});
  const [merchantList, setMerchantList] = useState<StorageValue>(undefined);
  const [checkConnection, setCheckConnection] = useState<boolean>(true);
  const [doOnboarding, setDoOnboarding] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] =
    useState<StorageValue>(undefined);

  useEffect(() => {
    const getLocation = async () => {
      if (setCurrentLocation) {
        setCurrentLocation(await getData('postalcode'));
      }
    };

    getLocation();
  }, [currentLocation]);

  /**
   * Loads the initial data for the DataProvider.
   */
  const loadInitialData = async () => {
    try {
      const favourites = ((await getData('favorites')) || {}) as FavouritesType;
      setContextFavs(favourites);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const contextValue = {
    checkConnection,
    setCheckConnection,
    currentLocation,
    setCurrentLocation,
    contextFavs,
    setContextFavs,
    filteredFavs,
    setFilteredFavs,
    isLoading,
    loadInitialData,
    merchantList,
    setMerchantList,
    setData,
    deleteData,
    getData,
    doOnboarding,
    setDoOnboarding,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export { DataProvider, DataContext, deleteData, setData, getData };
