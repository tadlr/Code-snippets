import React, { useEffect, useRef, useState, useContext } from 'react';
import { SectionList, View } from 'react-native';
// import { FavouritesCard } from '@/components/cards/FavouritesCard';
import FavouritesCard from '@/components/cards/FavouritesCard';
import FavouritesHeader from '@/components/header/FavouritesHeader';
import FavsSectionTitle from '@/components/favourites/FavsSectionTitle';
import { FavouritesType, GroupedFavsType } from '@/constants/Types';
import { getFavourites } from '@/utils/favoritesHook';
import { Text } from '@ui-kitten/components';
import { DataContext } from '@/data/context/DataContext';
import EmptyFavourites from '@/components/favourites/EmptyFavourites';

/**
 * Represents the Favourites screen component.
 * This screen displays the user's favorite items.
 */
export default function FavouritesScreen() {
  const listRef = useRef<SectionList>(null);

  const { contextFavs, setContextFavs, filteredFavs } =
    useContext(DataContext) || {};

  const [query, setQuery] = useState<string>('');
  const [displayFavs, setDisplayFavs] = useState<FavouritesType | null>({});
  const [groupedFavourites, setGroupedFavourites] = useState<
    GroupedFavsType[] | null
  >(null);

  useEffect(() => {
    let isActive = true;
    const fetchFavs = async () => {
      if (isActive) {
        try {
          const favourites = await getFavourites();

          if (setContextFavs) {
            setContextFavs(favourites as FavouritesType | null);
          }
        } catch (e) {
          console.error('Failed to fetch favourites', e);
        }
      }
    };

    fetchFavs();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!contextFavs) return;
    if (!setDisplayFavs) return;

    setDisplayFavs(contextFavs as FavouritesType | null);
  }, [contextFavs]);

  useEffect(() => {
    if (!displayFavs) return;

    const groupFavourites = async () => {
      const dealsMap = new Map();

      if (dealsMap) {
        Object.entries(displayFavs).forEach(([id, data]) => {
          if (data.deal.merchant_id === null) return;

          const currentData = dealsMap.get(data.deal.merchant_id) || [];

          if (
            !currentData.some(
              (fav: FavouritesType) => fav.deal.id.toString() === id,
            )
          ) {
            currentData.push(data);
            dealsMap.set(data.deal.merchant_id, currentData);
          }
        });

        const updatedDeals = Array.from(dealsMap, ([merchantID, data]) => ({
          merchantID,
          data,
        }));

        setGroupedFavourites(updatedDeals);
      }
    };

    groupFavourites();
  }, [displayFavs]);

  // useEffect(() => {
  //   if (!displayFavs) return;

  //   const groupFavourites = async () => {
  //     const dealsMap = new Map();

  //     // Assuming displayFavs is an object where keys are IDs and values are deal objects
  //     Object.entries(displayFavs).forEach(([id, data]) => {
  //       if (!data.deal.merchant_id) return;

  //       const currentData = dealsMap.get(data.deal.merchant_id) || [];
  //       currentData.push(data); // Push the favorite deal data to the merchant's array
  //       dealsMap.set(data.deal.merchant_id, currentData); // Update the map
  //     });

  //     console.log('Grouped deals map:', Array.from(dealsMap));

  //     const updatedDeals = Array.from(dealsMap, ([merchantID, data]) => ({
  //       merchantID,
  //       data,
  //     }));

  //     setGroupedFavourites(updatedDeals);
  //   };

  //   groupFavourites();
  // }, [displayFavs]);

  useEffect(() => {
    const filteredSearchDeals: FavouritesType = Object.fromEntries(
      Object.entries(filteredFavs as FavouritesType).filter(([, value]) =>
        value.deal.name?.toLowerCase().includes(query.toLowerCase()),
      ),
    );

    if (setDisplayFavs) {
      setDisplayFavs(filteredSearchDeals as FavouritesType);
    }
  }, [query, filteredFavs]);

  if (!groupedFavourites) return null;

  return (
    <View className="flex-1 bg-main">
      <FavouritesHeader setQuery={setQuery} />
      <SectionList
        ref={listRef}
        contentContainerClassName="container bg-main flex pb-6 flex-1"
        sections={groupedFavourites as GroupedFavsType[]}
        initialNumToRender={5}
        keyExtractor={(item) => item.deal.id.toString()}
        renderItem={({ item }) => <FavouritesCard item={item.deal} />}
        ListHeaderComponent={() => (
          <View className="content-center justify-center ps-5 py-3">
            <Text className="title" category="h5">
              My Favourites Offers
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { merchantID } }) => (
          <FavsSectionTitle merchantID={merchantID} />
        )}
        ListEmptyComponent={() => {
          return (
            <View className="justify-center self-center flex-1">
              <EmptyFavourites />
            </View>
          );
        }}
      />
    </View>
  );
}
