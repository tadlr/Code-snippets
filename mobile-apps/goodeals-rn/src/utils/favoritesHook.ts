import { Dispatch, SetStateAction } from 'react';
import { setData, getData } from '@/data/provider/DataProvider';
import { DealFormatted } from '@/constants/Interfaces';
import { FavouritesType } from '@/constants/Types';

interface Favourite {
  date: string;
  deal: DealFormatted;
}
type FavouritesListType = Record<string, Favourite>;

/**
 * Adds a deal to the favourites list.
 * If the deal is already in the favourites list, it does nothing.
 *
 * @param deal - The deal to be added to the favourites list.
 * @param setContextFavs- A state setter function to update the favourites list.
 */
const addToFavourites = async (
  deal: DealFormatted,
  setContextFavs: Dispatch<SetStateAction<FavouritesType | null>> | undefined,
) => {
  if (await isFavourite(deal.id)) {
    return;
  }
  const rawFavourites = await getData('favorites');

  const favorites: FavouritesListType = rawFavourites
    ? (rawFavourites as FavouritesListType)
    : {};

  const favObject = {
    deal: deal,
    date: new Date().toISOString(),
  };

  const dealIdString = String(deal.id);
  favorites[dealIdString] = favObject;

  if (setContextFavs) {
    setContextFavs(favorites as FavouritesType); // this updates the interface
  }
  setData('favorites', favorites);
};

/**
 * Removes a deal from the favourites list.
 *
 * @param productId - The ID of the product to be removed from the favorites list.
 * @param setContextFavs- A state setter function to update the favourites list.
 */
async function removeFromFavourites(
  productId: string | number,
  setContextFavs: Dispatch<SetStateAction<FavouritesType | null>> | undefined,
) {
  const rawFavourites = await getData('favorites');

  const favorites: FavouritesListType = rawFavourites
    ? (rawFavourites as FavouritesListType)
    : {};

  const productIdString = String(productId);

  if (favorites[productIdString]) {
    delete favorites[productIdString];

    if (setContextFavs) {
      setContextFavs(favorites as FavouritesType); // this updates the interface
    }
    await setData('favorites', favorites);
  }
}

/**
 * Toggles the favourite status of a deal.
 *
 * @param deal - The deal to toggle the favorite status for.
 * @param isFavourite - The current favorite status of the deal.
 * @param setContextFavs- A state setter function to update the favourites list.
 * @returns A function that toggles the favorite status and updates the state.
 */
function toggleFavourite(
  deal: DealFormatted,
  isFavourite: boolean,
  setContextFavs: Dispatch<SetStateAction<FavouritesType | null>> | undefined,
) {
  return () => {
    if (isFavourite) {
      removeFromFavourites(deal.id, setContextFavs);
    } else {
      addToFavourites(deal, setContextFavs);
    }
  };
}

/**
 * Checks if a deal is in the favourites list.
 *
 * @param id - The ID of the deal to check.
 * @returns A boolean indicating whether the deal is in the favourites list.
 */
const isFavourite = async (id: string | number) => {
  const favorites = (await getData('favorites')) || ({} as Favourite);

  const idStr = String(id);

  const exists = Object.hasOwnProperty.call(favorites, idStr);

  return exists;
};

const getFavourites = async () => {
  const favorites = (await getData('favorites')) || ({} as Favourite);

  return favorites;
};

export {
  addToFavourites,
  isFavourite,
  removeFromFavourites,
  toggleFavourite,
  getFavourites,
};
