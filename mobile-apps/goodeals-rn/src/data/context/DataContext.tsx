import { Dispatch, SetStateAction, createContext } from 'react';
import { FavouritesType, StorageValue } from '@/constants/Types';

/**
 * Represents the value of the DataContext.
 */
interface DataContextValue {
  checkConnection: boolean;
  setCheckConnection: Dispatch<SetStateAction<boolean>>;
  merchantList: StorageValue;
  setMerchantList: StorageValue;
  currentLocation: StorageValue;
  setCurrentLocation: (location: StorageValue) => void;
  contextFavs: StorageValue;
  setContextFavs: Dispatch<SetStateAction<FavouritesType | null>>;
  filteredFavs: StorageValue;
  setFilteredFavs: Dispatch<SetStateAction<FavouritesType | null>>;
  isLoading: boolean;
  loadInitialData: () => Promise<void>;
  setData: (key: string, value: StorageValue) => Promise<void>;
  deleteData: (key: string) => Promise<void>;
  getData: (key: string) => Promise<StorageValue | null>;
  doOnboarding: boolean;
  setDoOnboarding: Dispatch<SetStateAction<boolean>>;
}

/**
 * The DataContext provides a context for sharing data across components.
 */
const DataContext = createContext<DataContextValue | undefined>(undefined);

export { DataContext, DataContextValue, StorageValue };
