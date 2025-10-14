import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage utility functions using AsyncStorage
export const storage = {
  // Auth storage
  setUser: async (user: any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },
  removeUser: async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },
  setAuthToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  },
  getAuthToken: async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },
  removeAuthToken: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  },

  // App settings storage
  setTheme: async (theme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
  getTheme: async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      return (theme as 'light' | 'dark') || 'light';
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'light';
    }
  },
  setLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('language', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
  getLanguage: async () => {
    try {
      const language = await AsyncStorage.getItem('language');
      return language || 'en';
    } catch (error) {
      console.error('Error getting language:', error);
      return 'en';
    }
  },

  // Order storage
  setOrders: async (orders: any[]) => {
    try {
      await AsyncStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  },
  getOrders: async () => {
    try {
      const orders = await AsyncStorage.getItem('orders');
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  },
  addOrder: async (order: any) => {
    try {
      const orders = await storage.getOrders();
      orders.push(order);
      await storage.setOrders(orders);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  },
  updateOrder: async (orderId: string, updatedOrder: any) => {
    try {
      const orders = await storage.getOrders();
      const index = orders.findIndex((order: any) => order.id === orderId);
      if (index !== -1) {
        orders[index] = { ...orders[index], ...updatedOrder };
        await storage.setOrders(orders);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  },
  removeOrder: async (orderId: string) => {
    try {
      const orders = await storage.getOrders();
      const filteredOrders = orders.filter((order: any) => order.id !== orderId);
      await storage.setOrders(filteredOrders);
    } catch (error) {
      console.error('Error removing order:', error);
    }
  },

  // Clear all storage
  clearAll: async () => {
    try {
      await AsyncStorage.multiRemove([
        'user',
        'authToken',
        'theme',
        'language',
        'orders',
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};