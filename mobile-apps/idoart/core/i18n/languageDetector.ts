import * as Localization from 'expo-localization';
import { LanguageDetectorModule } from 'i18next';

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const locales = Localization.getLocales();

    if (locales[0] === undefined) {
      return 'en';
    }

    const firstLanguageCode = locales[0].languageCode ?? 'en';
    return firstLanguageCode;
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
