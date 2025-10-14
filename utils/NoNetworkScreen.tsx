import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface NoNetworkScreenProps {
  mode?: 'network' | 'server';
  onRetry?: () => Promise<boolean>;
}

export function NoNetworkScreen({ mode = 'network', onRetry }: NoNetworkScreenProps) {
  const handleRetry = async () => {
    if (onRetry) {
      await onRetry();
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center p-5">
      <View className="items-center">
        <Ionicons 
          name={mode === 'network' ? 'wifi' : 'server'} 
          size={80} 
          color="#EF4444" 
        />
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          {mode === 'network' ? 'No Internet Connection' : 'Server Error'}
        </Text>
        <Text className="text-gray-600 text-center mt-2 mb-8">
          {mode === 'network' 
            ? 'Please check your internet connection and try again.' 
            : 'Something went wrong with our servers. Please try again later.'
          }
        </Text>
        <TouchableOpacity 
          className="bg-primary-500 px-6 py-3 rounded-lg flex-row items-center"
          onPress={handleRetry}
        >
          <Ionicons name="refresh" size={20} color="#FFFFFF" />
          <Text className="text-white font-semibold ml-2">Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NoNetworkScreen;
