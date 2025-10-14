import { useAuthStore } from '@/lib/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5 mt-5">
          <View>
            <Text className="text-3xl font-bold text-gray-800">Settings</Text>
            <Text className="text-base text-gray-600 mt-1">Manage your preferences</Text>
          </View>
        </View>

        {/* Settings Content */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-gray-800">Settings</Text>
          <Text className="text-gray-600 mt-2 mb-8">Coming Soon</Text>
          
          {/* Logout Button */}
          <TouchableOpacity 
            className="bg-red-500 px-6 py-3 rounded-lg flex-row items-center"
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
