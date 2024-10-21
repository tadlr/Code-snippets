import { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  DealsProps,
  DealFormatted,
  Merchant,
  Deal,
  Category,
} from '@/constants/Interfaces';
import { useStyleSheet } from '@ui-kitten/components';
import { RouteProp } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';

/**
 * Represents information about a business.
 */
export type BusinessInfo = {
  /**
   * The unique identifier of the place.
   */
  placeId: string;
  /**
   * The latitude coordinate of the place.
   */
  latitude: number;
  /**
   * The longitude coordinate of the place.
   */
  longitude: number;
  /**
   * The name of the business.
   */
  name: string;
  /**
   * The address of the business.
   */
  address: string;
  /**
   * Indicates whether the business is currently open.
   */
  businessStatus?: boolean | string;

  /**
   * Merchant Object
   */
  merchant?: Merchant;
};

/**
 * Represents a geographic region defined by latitude, longitude, and delta values.
 */
export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

/**
 * Represents the type of a StyleSheet, which is the return type of the `useStyleSheet` function.
 */
export type StyleSheetType = ReturnType<typeof useStyleSheet>;

/**
 * Represents a value that can be stored in storage.
 * It can be a string, number, boolean, object, null, or undefined.
 */
export type StorageValue =
  | string
  | number
  | boolean
  | object
  | null
  | undefined;

/**
 * Represents the route parameters for the SearchScreen.
 */
export type SearchScreenRouteParams = {
  query?: string;
  categoryId?: number;
  subcategoryId?: number;
};

/**
 * Represents the route prop for the Search screen.
 */
export type SearchScreenRouteProp = RouteProp<
  { Search: SearchScreenRouteParams },
  'Search'
>;

/**
 * Represents the route parameters for the StoreDetailScreen.
 */
export type StoreDetailScreenRouteParams = {
  merchant?: string;
  merchantID?: number;
  distanceToStore?: string;
  merchant_logo?: string;
  address?: string;
};

/**
 * Represents the route prop for the Store Details screen.
 */
export type StoreDetailScreenRouteProp = RouteProp<
  { StoreDetails: StoreDetailScreenRouteParams },
  'StoreDetails'
>;

/**
 * Represents the route parameters for the StoreProductsScreen.
 */
export type StoreProductsScreenRouteParams = {
  merchant?: string;
  merchantID?: number;
};

/**
 * Represents the route prop for the Store Products screen.
 */
export type StoreProductsScreenRouteProp = RouteProp<
  { StoreProducts: StoreProductsScreenRouteParams },
  'StoreProducts'
>;

/**
 * Represents a React element with DealsProps.
 */
export type DealCard = ReactElement<DealsProps>;

/**
 * Represents the root stack parameter list for navigation.
 */
export type DealsScreenParamList = {
  DealDetails: { deal: DealFormatted };
};

/**
 * Represents the props for the DealDetails component.
 */
export type DealDetailsProps = {
  route: RouteProp<DealsScreenParamList, 'DealDetails'>;
};

/**
 * Represents the type for grouped favorites.
 */
export type GroupedFavsType = {
  merchantID: number;
  data: { id: number; deal: DealFormatted; date: string }[];
};

/**
 * Represents the type for individual favorites.
 */
export type FavouritesType = Record<
  string,
  { id: number; deal: DealFormatted; date: string }
>;

/**
 * Represents the name of an icon.
 */
export type IconName = string;

/**
 * Represents the root stack parameter list for navigation.
 */
export type RootStackParamList = {
  DealDetails: { deal: DealFormatted };
  Welcome: undefined;
  DisclaimerScreen: undefined;
  LocationSetup: undefined;
  TabNavigator: undefined;
  SearchScreen: undefined;
  TermsScreen: undefined;
  PrivacyScreen: undefined;
  FavouritesFilterScreen: undefined;
};

export type prceRange = {
  min: number;
  max: number;
};

export type CahceData = {
  timestamp: number | null;
  data: Deal[] | Merchant[] | Category[] | object | null;
};

export type MapsLocation = {
  id: string | number;
  location: LatLng;
  displayName: {
    text: string;
  };
  formattedAddress: string;
};

export type HomeHeaderProps = {
  /**
   * The initial search query.
   */
  initialQuery?: string;
  /**
   * Determines whether to show the back button.
   */
  showBackButton?: boolean;
};

export type FavouritesHeaderProps = {
  /**
   * A state setter function to update the value of the search bar on Favourites screen.
   */
  setQuery: Dispatch<SetStateAction<string>>;
};

export type Province = {
  province: string;
};
