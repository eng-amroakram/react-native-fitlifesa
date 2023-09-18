import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      throw error;
    }
  },

  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw error;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw error;
    }
  },

  getAllKeys: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      throw error;
    }
  },

  multiGet: async (keys) => {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values;
    } catch (error) {
      throw error;
    }
  },
};

export default storage;
