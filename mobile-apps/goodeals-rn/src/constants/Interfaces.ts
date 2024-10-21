import { CardProps } from '@ui-kitten/components';
import { ImageProps } from 'expo-image';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { prceRange } from './Types';

/**
 * Represents the props for the SearchBar component.
 */
export interface SearchBarProps {
  /**
   * The initial value of the search bar.
   */
  initialValue?: string;

  /**
   * The CSS class name for the search bar.
   */
  className?: string;
}

/**
 * Represents the props for the FavsSearchBar component.
 */
export interface FavsSearchBarProps {
  /**
   * The value of the search bar on Favourites screen.
   */
  query?: string;

  /**
   * A state setter function to update the value of the search bar on Favourites screen.
   */
  setQuery?: Dispatch<SetStateAction<string>>;

  /**
   * The CSS class name for the search bar on Favourites screen.
   */
  className?: string;
}

/**
 * Represents a category.
 */
export interface Category {
  id: number;
  name: string;
  short_name?: string;
  icon?: string | null;
  subcategories?: Category[] | null;
}

/**
 * Represents a merchant.
 */
export interface Merchant {
  id: number;

  external_identifier: string;
  is_active: boolean;
  created_at: string | Date;
  merchant_logo_url?: string;
  flipp_id?: number | string;
  merchant_name: string;
}

/**
 * Represents the props for the DataProvider component.
 */
export interface DataProviderProps {
  children: ReactNode;
}

/**
 * Represents a deal.
 */
export interface Deal {
  /**
   * The ID of the deal.
   */
  id: number;

  /**
   * The ID of the category the deal belongs to.
   */
  category_id: number | null;

  /**
   * The ID of the sub-category the deal belongs to.
   */
  sub_category_id: number | null;

  /**
   * The current price of the deal.
   */
  current_price: number | null;

  /**
   * The ID of the flyer item associated with the deal.
   */
  flyer_item_id: number | null;

  /**
   * The ID of the image associated with the deal.
   */
  image_id?: number | null;

  /**
   * The ID of the image associated with the deal.
   */
  image_url: string | null;

  /**
   * The ID of the merchant associated with the deal.
   */
  merchant_id: number | null;

  /**
   * The name of the deal.
   */
  name: string | null;

  /**
   * The original price of the deal.
   */
  original_price: number | null;

  /**
   * The provinces where the deal is valid.
   */
  provinces: string;

  /**
   * The start date of the deal's validity period.
   */
  valid_from: string | number | null;

  /**
   * The end date of the deal's validity period.
   */
  valid_to: string | number | Date | null;
}

export interface DealFormatted extends Deal {
  /**
   * Offer time left
   */
  timeLeft?: string;

  /**
   * Offer savings
   */
  amountSaved?: string | null;

  /**
   * Distance from user
   */
  distance?: number | null;

  /**
   * The placeholder of the deal image.
   */
  placeholder?: string;

  /**
   * The image URL of the deal.
   */
  image?: string | null;

  /**
   * The logo URL of the merchant.
   */
  merchant_logo?: string | ImageProps | null;

  /**
   * The name of the merchant.
   */
  merchant?: string;

  /**
   * Is the deal favorited?
   */
  favorited?: boolean;
}

/**
 * Represents the props for the Deals component.
 */
export interface DealsProps extends Omit<CardProps, 'children'> {
  item: DealFormatted;
}

export interface DealFilter {
  province?: string;
  merchants?: number;
  priceRange?: prceRange;
  category?: number | number[];
  subcategories?: number | number[];
  product_name?: string;
  expiration_id?: number;
}

export interface DealFetchParams {
  $data?: string;
  $url: string;
  $method?: string;
  $config?: object;
}

export interface CategoriesMenuProps {
  onSelectCategory: (category: Category | null) => void;
  selectedCategory?: Category | null;
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  // subcategories?: Subcategory[];
}

export interface SubcategoriesProps {
  categoryId: number;
  subcategories?: Subcategory[];
  selectedSubcategory?: number | null;
  onSelectSubcategory?: (
    selectedSubcategoryId?: number,
    categoryId?: number,
  ) => void;
}

export interface DealFilterParams {
  province?: string;
  merchants?: number[];
  priceRange?: { min: number; max: number };
  category?: number;
  subcategories?: number[];
  product_name?: string;
  expiration_id?: number;
}

export interface RequestBody {
  province: string;
  merchants?: number[];
  priceRange?: {
    min: number;
    max: number;
  };
  category?: number;
  subcategories?: number[];
  product_name?: string;
  expiration_id?: number;
}
