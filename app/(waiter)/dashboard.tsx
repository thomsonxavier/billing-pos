import { useAuthStore } from '@/lib/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WaiterDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  const billingModes = [
    {
      id: 'dine-in',
      title: 'Dine-In Mode',
      description: 'Table service & orders.',
      icon: 'restaurant',
      color: '#007AFF',
      features: [
        'Select table number',
        'Take customer orders',
        'Send to kitchen',
        'Generate bill & payment',
      ],
    },
    {
      id: 'quick',
      title: 'Quick Billing',
      description: 'Fast takeaway & counter.',
      icon: 'flash',
      color: '#FF9500',
      features: [
        'No table assignment',
        'Quick item selection',
        'Instant billing',
        'Perfect for takeaway',
      ],
    },
  ];

  const quickActions = [
    {
      title: 'Active Tables',
      value: '3',
      color: 'text-error',
    },
    {
      title: 'Pending Orders',
      value: '5',
      color: 'text-warning',
    },
  ];

  const BillingModeCard = ({ mode }: any) => (
    <TouchableOpacity className="bg-background-50 rounded-xl mb-4 border border-border-200">
      <View className="flex-row items-center p-5">
        <View 
          className="w-12 h-12 rounded-xl justify-center items-center mr-4"
          style={{ backgroundColor: mode.color }}
        >
          <Ionicons name={mode.icon} size={24} color="#FFFFFF" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800 mb-1">{mode.title}</Text>
          <Text className="text-sm text-gray-600">{mode.description}</Text>
        </View>
        <View 
          className="w-8 h-8 rounded-full justify-center items-center"
          style={{ backgroundColor: mode.color }}
        >
          <Ionicons name="trending-up" size={16} color="#FFFFFF" />
        </View>
      </View>
      <View 
        className="p-4 mx-5 mb-5 rounded-lg"
        style={{ backgroundColor: `${mode.color}20` }}
      >
        {mode.features.map((feature: string, index: number) => (
          <View key={index} className="flex-row items-center mb-2">
            <View 
              className="w-1.5 h-1.5 rounded-full mr-2.5"
              style={{ backgroundColor: mode.color }}
            />
            <Text className="text-sm text-gray-800 flex-1">{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const QuickActionCard = ({ action }: any) => (
    <View className="bg-background-50 rounded-xl p-5 flex-1 mx-1 items-center border border-border-200">
      <Text className="text-sm text-gray-600 mb-2">{action.title}</Text>
      <Text className={`text-2xl font-bold ${action.color}`}>
        {action.value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-5">
        {/* Header */}
        <View className="mb-5">
          <Text className="text-2xl font-bold text-gray-800 mb-1">
            Welcome, {user?.name || 'Raj Kumar'} (Waiter)
          </Text>
          <Text className="text-base text-gray-600">
            Choose billing mode to continue.
          </Text>
        </View>

        {/* Performance Stats */}
        <View className="bg-primary-500 rounded-xl p-5 mb-5">
          <Text className="text-lg font-semibold text-white mb-4">Today&apos;s Performance</Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-sm text-white opacity-90 mb-1">Orders</Text>
              <Text className="text-xl font-bold text-white">12</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-white opacity-90 mb-1">Sales</Text>
              <Text className="text-xl font-bold text-white">₹4,850.00</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-white opacity-90 mb-1">Tables</Text>
              <Text className="text-xl font-bold text-white">8</Text>
            </View>
          </View>
        </View>

        {/* Billing Modes */}
        <View className="mb-5">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Select Billing Mode</Text>
          {billingModes.map((mode) => (
            <BillingModeCard key={mode.id} mode={mode} />
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mb-5">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} action={action} />
            ))}
          </View>
        </View>
      </ScrollView>

    
    </SafeAreaView>
  );
}