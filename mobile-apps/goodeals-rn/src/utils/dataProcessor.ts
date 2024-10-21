import { Deal, DealFormatted, Merchant } from '@/constants/Interfaces';
import { formatDuration } from './formatDuration';
import { containsSignificantPart, normalizeString } from '@/utils/stringUtils';
import { getMerchant } from './apiConnect';
import placeholder from '@/assets/images/placeholder.png';

export const preprocessDeal = (deal: Deal): DealFormatted => {
  const validStartDate = deal.valid_from ? new Date(deal.valid_from) : null;
  const validEndDate = deal.valid_to ? new Date(deal.valid_to) : null;

  const expireTimeLeft = calculateExpireTimeLeft(validStartDate, validEndDate);
  const amountSaved = getAmountSaved(deal.current_price, deal.original_price);

  const processDealImage = (image_url: string | null) => {
    if (image_url) {
      const formatedImage = image_url.replace('http://', 'https://');
      return formatedImage;
    }
  };

  const fetchMerchant = (merchant_id: number | null) => {
    if (merchant_id) {
      const merchant = getMerchant(merchant_id);

      if (merchant) {
        const name = (merchant as Merchant).merchant_name ?? '';
        const logo =
          (Array.isArray(merchant)
            ? merchant[0].merchant_logo_url
            : merchant.merchant_logo_url) ?? '';

        return {
          name: name,
          logo: logo,
        };
      }
    }
    return {
      name: '',
      logo: '',
    };
  };

  const theMerchant = fetchMerchant(deal.merchant_id);

  const image = deal.image_url ? processDealImage(deal.image_url) : null;

  const merchantLogo = theMerchant.logo ? theMerchant.logo : '';
  const merchantName = theMerchant.name ? theMerchant.name : '';

  // const merchantName = '';

  return {
    ...deal,
    image: image,
    merchant_logo: merchantLogo,
    merchant: String(merchantName),
    placeholder: placeholder,
    timeLeft: expireTimeLeft,
    amountSaved: String(amountSaved),
    distance: 0,
  };
};

export const calculateExpireTimeLeft = (
  validStartDate: Date | string | undefined | null,
  validEndDate: Date | string | undefined | null,
) => {
  let expiredIn = 0;

  if (validEndDate instanceof Date && validStartDate instanceof Date) {
    expiredIn = validEndDate.valueOf() - new Date().valueOf();
  }

  return formatDuration(expiredIn);
};

export const getAmountSaved = (
  current_price: number | undefined | null,
  original_price: number | undefined | null,
) => {
  if (current_price && original_price) {
    return (original_price - current_price).toFixed(2);
  } else {
    return original_price;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const processMerchant = (merchant_name: string) => {
  let bestMatch = '';
  let longestMatchLength = 0;
  const merchants = getMerchant();
  if (merchants) {
    const merchantArray = Array.isArray(merchants) ? merchants : [merchants];

    merchantArray.forEach((merchant: Merchant) => {
      if (containsSignificantPart(merchant.merchant_name, merchant_name)) {
        const normalizedMerchantName = normalizeString(merchant.merchant_name);
        if (normalizedMerchantName.length > longestMatchLength) {
          bestMatch = merchant.id.toString();
          longestMatchLength = normalizedMerchantName.length;
        }
      }
    });

    if (bestMatch) {
      const merchant = getMerchant(Number(bestMatch));

      if (merchant) {
        return merchant;
      }
    }
  }
  return null;
};
