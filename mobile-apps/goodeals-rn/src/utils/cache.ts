/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appCache = new Cache({
  namespace: 'goodeals',
  policy: {
    maxEntries: 50000,
    stdTTL: 600,
  },
  backend: AsyncStorage,
});

const saveToCache = async (key: string, data: any) => {
  await appCache.set(key, data);
};

const getCache = async (
  key: string,
): Promise<object | string | null | undefined> => {
  return await appCache.get(key);
};

const clearCache = async () => {
  await appCache.clearAll();
};

const removeItem = async (key: string) => {
  await appCache.remove(key);
};

export { saveToCache, getCache, clearCache, removeItem };
