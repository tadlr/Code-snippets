import { FavouritesType } from '@/constants/Types';
import { IndexPath } from '@ui-kitten/components';

/**
 * Filters favourites by store.
 *
 * @param favourites - The list of favourites
 * @param selectedStoresIDs - The ids of the selected stores to filter from.
 * @returns A filtered favourites list.
 */
const filterByStore = (
  favourites: FavouritesType | null,
  selectedStoresIDs: number[],
): FavouritesType | null => {
  if (selectedStoresIDs.length === 0) {
    // If no store is selected
    return favourites;
  } else {
    const filteredDeals: FavouritesType = Object.fromEntries(
      Object.entries(favourites as FavouritesType).filter(([, value]) => {
        if (!value.deal.merchant_id) return;
        return selectedStoresIDs.includes(value.deal.merchant_id);
      }),
    );
    return filteredDeals as FavouritesType | null;
  }
};

/**
 * Filters favourites by offer expiration.
 *
 * @param favourites - The list of favourites
 * @param selectedExpirationIndex - The index of the selected offer expiration
 * @returns A filtered favourites list.
 */
const filterByExpiration = (
  favourites: FavouritesType | null,
  selectedExpirationIndex: IndexPath,
): FavouritesType | null => {
  if (selectedExpirationIndex.row !== undefined && favourites) {
    const currentDate = new Date();
    const filteredProducts = Object.fromEntries(
      Object.entries(favourites).filter(([, value]) => {
        //find the difference between currentDate & product.valid_to;
        if (!value.deal.valid_to) return;

        const productValidTo = new Date(value.deal.valid_to);

        const timeDifferenceMs =
          productValidTo.getTime() - currentDate.getTime();

        const timeDifferenceDays = Math.ceil(
          timeDifferenceMs / (1000 * 3600 * 24),
        ); // Convert milliseconds to days

        // Check selectedExpirationIndex.row and filter accordingly
        switch (selectedExpirationIndex.row) {
          case 0:
            return true;
          case 1:
            return timeDifferenceDays <= 3;
          case 2:
            return timeDifferenceDays <= 7;
          case 3:
            return timeDifferenceDays <= 14;
          default:
            // Return false for other cases
            return false;
        }
      }),
    );
    return filteredProducts as FavouritesType | null;
  } else {
    return favourites;
  }
};

/**
 * Filters favourites by category.
 *
 * @param favourites - The list of favourites
 * @param selectedSubcategory - The id of the selected subcategory to filter from.
 * @returns A filtered favourites list.
 */
const filterByCategory = (
  favourites: FavouritesType | null,
  selectedSubcategory: number | null,
): FavouritesType | null => {
  if (selectedSubcategory) {
    const filteredDeals: FavouritesType = Object.fromEntries(
      Object.entries(favourites as FavouritesType).filter(([, value]) => {
        if (selectedSubcategory < 0) {
          return value.deal.category_id === selectedSubcategory * -1;
        } else {
          return value.deal.sub_category_id === selectedSubcategory;
        }
      }),
    );
    return filteredDeals as FavouritesType | null;
  } else {
    return favourites;
  }
};

export { filterByStore, filterByExpiration, filterByCategory };
