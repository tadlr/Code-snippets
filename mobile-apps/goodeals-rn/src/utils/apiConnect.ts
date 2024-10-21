import axios from 'axios';
import {
  Deal,
  Merchant,
  DealFetchParams,
  Category,
} from '@/constants/Interfaces';

import { ImageProps } from 'expo-image';
import { getData, setData, deleteData } from '@/data/provider/DataProvider';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { merchantData } from '@/data/merchants';
// import { saveToCache, getCache } from '@/utils/cache';
import Constants from 'expo-constants';
import { DealFilterParams, RequestBody } from '@/constants/Interfaces';
import { Province } from '@/constants/Types';

const API_URL = Constants ? Constants.expoConfig?.extra?.apiUrl : '';

const getDeals = async (filters?: DealFilterParams): Promise<Deal[] | null> => {
  // Disabling cache for now
  // const dealCache = await getCache('dealCache');
  // if (dealCache) {
  //   console.log('Using cached deals');
  //   return dealCache as Deal[];
  // }

  let province = (await getData('province')) as string | Province | undefined;

  if (province && typeof province === 'object') {
    province = (province as { province: string }).province;
    setData('province', province);
  }

  if (province && province.length > 2) {
    deleteData('province');
    deleteData('postalcode');
    return null;
  }

  // const province = false;

  if (!province) {
    Alert.alert(
      'Location Required',
      'We need your postal code to find the best deals we near you.',
      [
        {
          text: 'Add it now',
          style: 'default',
          onPress: () => {
            router.replace('(tabs)/settings');
          },
        },
      ],
    );
    return null;
  }

  // Prepare the request body based on provided filters
  const requestBody: RequestBody = { province };
  if (filters?.merchants) requestBody.merchants = filters.merchants;
  if (filters?.priceRange) requestBody.priceRange = filters.priceRange;
  if (filters?.category) requestBody.category = filters.category;
  if (filters?.subcategories) requestBody.subcategories = filters.subcategories;
  if (filters?.product_name) requestBody.product_name = filters.product_name;
  if (filters?.expiration_id) requestBody.expiration_id = filters.expiration_id;

  console.log('Request Body:', requestBody);
  try {
    const response = await axios.post(
      `${API_URL}/getProductOffers`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (
      response.data.message &&
      response.data.message === 'No data available for the specified parameters'
    ) {
      console.log('No data available for the specified parameters');
      return null;
    }

    if (!response || !response.data) return null;

    const results = response.data as Deal[];

    // Disabling cache for now
    // await saveToCache('dealCache', results);

    return results;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return null;
  }
};

const getCategories = async () => {
  // const categoriesCache = await getCache('categoriesCache');

  // if (categoriesCache) {
  //   console.log('Using cached categories');
  //   return categoriesCache as Category[];
  // }

  const response = await axiosFetch({ $url: `${API_URL}/getCategories` });

  if (!response) return null;

  const results = response.data as Category[];

  // await saveToCache('categoriesCache', results);

  return results as Category[];
};

const getMerchants = (): Merchant[] | undefined => {
  const merchants = merchantData as Array<Merchant>;

  return merchants as Merchant[];
};

const getMerchant = (
  id?: string | number,
): Merchant | Merchant[] | undefined => {
  const merchants = merchantData as Array<Merchant>;

  if (!id) return merchants;
  const numericId = Number(id);
  const matchingMerchant = merchants.find(
    (merchant: Merchant) => merchant.id === numericId,
  );

  return matchingMerchant;
};

const getImage = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  return data;
};

const getMerchantLogo = async (
  merchant_id: number | null,
): Promise<ImageProps> => {
  const merchant = await getMerchant(String(merchant_id));

  if (merchant && !Array.isArray(merchant)) {
    const merchantLogo = { uri: merchant.merchant_logo_url } as ImageProps;
    return merchantLogo;
  }

  return require('@/assets/icons/default.svg');
};

const getCategoryName = async (
  categoryId: number | string,
): Promise<string | null> => {
  const categories = await getCategories();
  if (!categories) return null;

  const numericCategoryId = Number(categoryId);
  const category = categories.find((c) => c.id === numericCategoryId);
  return category ? category.name : null;
};

const getSubcategoryName = async (
  subcategoryId: number,
): Promise<string | null> => {
  const categories = await getCategories();
  if (!categories) return null;

  const numericSubcategoryId = Number(subcategoryId);
  for (const category of categories) {
    if (category.subcategories) {
      const subcategory = category.subcategories.find(
        (sc) => sc.id === numericSubcategoryId,
      );
      if (subcategory) return subcategory.name;
    }
  }

  return null;
};

async function axiosFetch(params: DealFetchParams) {
  const { $data = undefined, $url, $method = 'get', $config = {} } = params;

  try {
    const defaultConfig = {
      method: $method,
      maxBodyLength: Infinity,
      url: $url,
      data: $data,
      timeout: 10000,
    };

    const config = { ...defaultConfig, ...$config };

    const response = await axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });

    return response;
  } catch (error) {
    console.error('Error fetching offers:', error);
    return null;
  }
}

export {
  getDeals,
  getCategories,
  getImage,
  getMerchants,
  getMerchant,
  getMerchantLogo,
  axiosFetch,
  getCategoryName,
  getSubcategoryName,
};
