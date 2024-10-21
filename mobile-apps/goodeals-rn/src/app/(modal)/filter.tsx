import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Button,
  Icon,
  IndexPath,
  Text,
  IconElement,
  IconProps,
  List,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FavsFilterHeader from '@/components/header/FavsFilterHeader';
import { FavouritesType } from '@/constants/Types';
import { getCategories, getMerchants } from '@/utils/apiConnect';
import { Category, Merchant } from '@/constants/Interfaces';
import { router } from 'expo-router';
import { DataContext } from '@/data/context/DataContext';
import {
  filterByCategory,
  filterByExpiration,
  filterByStore,
} from '@/utils/favouritesFilterHook';
import FavsFilterFooter from '@/components/filter/FavsFilterFooter';
import FavsFilterHero from '@/components/filter/FavsFilterHero';
import FavsFilterSubcategories from '@/components/filter/FavsFilterSubcategories';

function FavouritesFilterScreen(): ReactElement {
  const { setFilteredFavs, contextFavs } = useContext(DataContext) || {};

  // const os = Platform.OS;
  const insets = useSafeAreaInsets();
  const refList = useRef<List>(null);
  const listKeyExtractor = (item: Category) => item.id.toString();

  const [stores, setStores] = useState<Merchant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const defaultActiveStoreChecked = Array(stores.length).fill(false);
  const defaultDistanceRange = 25;
  const defaultSelectedIndex = new IndexPath(0);
  const defaultSelectedCategory = null;
  const defaultSelectedSubcategory = null;

  const [selectedStoresIDs, setSelectedStoresIDs] = useState<number[]>([]);
  const [activeStoreChecked, setActiveStoreChecked] = useState<boolean[]>(
    Array(stores.length).fill(false),
  );
  const [distanceRange, setDistanceRange] = useState<number>(25);
  const [selectedExpirationIndex, setSelectedExpirationIndex] =
    useState<IndexPath>(new IndexPath(0));

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null,
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleCheckBoxChange = (
    newCheckedValue: boolean,
    index: number,
    storeID: number,
  ) => {
    const newActiveStoreChecked = [...activeStoreChecked];
    newActiveStoreChecked[index] = newCheckedValue;
    setActiveStoreChecked(newActiveStoreChecked);

    if (newCheckedValue) {
      const newSelectedStoresIDs = [...selectedStoresIDs, storeID];
      setSelectedStoresIDs(newSelectedStoresIDs);
    } else {
      const newSelectedStoresIDs = selectedStoresIDs.filter(
        (selectedStoreID) => {
          return selectedStoreID !== storeID;
        },
      );
      setSelectedStoresIDs(newSelectedStoresIDs);
    }
  };

  const handleClear = () => {
    setActiveStoreChecked(defaultActiveStoreChecked);
    setDistanceRange(defaultDistanceRange);
    setSelectedExpirationIndex(defaultSelectedIndex);
    setSelectedCategory(defaultSelectedCategory);
    setSelectedSubcategory(defaultSelectedSubcategory);
    if (setFilteredFavs) {
      setFilteredFavs(contextFavs as FavouritesType | null);
    }
  };

  const handleDistanceRangeChange = (value: number) => {
    setDistanceRange(value);
  };

  const filterProducts = () => {
    const filteredByStore = filterByStore(
      contextFavs as FavouritesType | null,
      selectedStoresIDs,
    );
    const filteredByExpiration = filterByExpiration(
      filteredByStore,
      selectedExpirationIndex,
    );
    const filteredByCategory = filterByCategory(
      filteredByExpiration,
      selectedSubcategory,
    );
    if (setFilteredFavs) {
      setFilteredFavs(filteredByCategory as FavouritesType | null);
    }
    router.back();
  };

  /**
   * Icon component for the closed section icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const ClosedIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name="arrow-ios-downward-outline"
      fill="gray"
      width={20}
      height={20}
    />
  );

  /**
   * Icon component for the opened section icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const OpenedIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name="arrow-ios-upward-outline"
      fill="gray"
      width={20}
      height={20}
    />
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchCat = await getCategories();

      if (fetchCat) {
        setCategories(fetchCat);
      } else {
        setCategories([]);
      }
    };
    const fetchStores = getMerchants() ?? [];
    setStores(fetchStores);
    setActiveStoreChecked(defaultActiveStoreChecked);

    fetchCategories();

    if (
      distanceRange === defaultDistanceRange &&
      selectedExpirationIndex.row === 0 &&
      selectedCategory === defaultSelectedCategory &&
      selectedSubcategory === defaultSelectedSubcategory
    ) {
      if (setFilteredFavs) {
        setFilteredFavs(contextFavs as FavouritesType | null);
      }
    }
  }, []);

  const ListItem = ({ item }: { item: Category }) => {
    const onSelectCategory = () => {
      const newValue = selectedCategory === item ? null : item;
      setSelectedCategory(newValue);
    };

    const onSelectSubcategory = (
      subcategoryId: number | undefined,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categoryId: number | undefined,
    ) => {
      if (!subcategoryId) return;
      const newSelectedSubcategory =
        selectedSubcategory === subcategoryId ? null : subcategoryId;

      setSelectedSubcategory(newSelectedSubcategory);
    };

    return (
      <>
        <View className=" flex-row flex pt-5 px-5">
          <TouchableOpacity
            className="flex-row justify-between flex-1 border-slate-200 border-b-1"
            onPress={onSelectCategory}
          >
            <Text className="font-raleway-medium">{item.name}</Text>
            {selectedCategory === item ? <OpenedIcon /> : <ClosedIcon />}
          </TouchableOpacity>
        </View>
        {selectedCategory &&
          selectedCategory === item &&
          selectedCategory.subcategories && (
            <View className="flex-row justify-center content-center gap-5 py-3">
              <FavsFilterSubcategories
                categoryId={selectedCategory.id}
                subcategories={selectedCategory.subcategories}
                selectedSubcategory={selectedSubcategory}
                onSelectSubcategory={onSelectSubcategory}
              />
            </View>
          )}
      </>
    );
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <FavsFilterHeader handleClear={handleClear} />

      <View className="flex-1 bg-white">
        <List
          ref={refList}
          initialNumToRender={10}
          // maxToRenderPerBatch={6}
          keyExtractor={listKeyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName={isOpen ? 'bg-white' : 'bg-white flex-1'}
          ListFooterComponentClassName={isOpen ? 'pt-5' : ''}
          data={isOpen ? categories : []}
          renderItem={ListItem}
          ListHeaderComponent={FavsFilterHero(
            stores,
            handleCheckBoxChange,
            activeStoreChecked,
            isOpen,
            setIsOpen,
          )}
          ListFooterComponent={FavsFilterFooter(
            defaultDistanceRange,
            distanceRange,
            handleDistanceRangeChange,
            selectedExpirationIndex,
            setSelectedExpirationIndex,
          )}
        />
      </View>

      <View className="px-5 pt-5">
        <Button
          onPress={filterProducts}
          className="bg-primary-500 border-0 py-5"
          status="primary"
        >
          Apply
        </Button>
      </View>
    </View>
  );
}

export default FavouritesFilterScreen;
