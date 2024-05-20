// AQUI COLOCA O STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCachedData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const setCachedData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};
