import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KitchenDashboard() {
  const statsData = [
    {
      title: "Pending Orders",
      value: "8",
      icon: "time",
      color: "bg-warning",
    },
    {
      title: "Completed Today",
      value: "24",
      icon: "checkmark-circle",
      color: "bg-success",
    },
  ];

  const pendingOrders = [
    { id: "#001", items: ["Chicken Biryani", "Naan"], time: "15 min", priority: "high" },
    { id: "#002", items: ["Masala Dosa", "Coffee"], time: "8 min", priority: "normal" },
    { id: "#003", items: ["Paneer Curry", "Rice"], time: "22 min", priority: "low" },
  ];

  const StatCard = ({ title, value, icon, color }: any) => (
    <View className={`${color} flex-1 mx-1 p-5 rounded-xl`}>
      <View className="flex-row justify-between mb-2">
        <Ionicons name={icon} size={24} color="#FFFFFF" />
        <Ionicons name="trending-up" size={20} color="#FFFFFF" />
      </View>
      <Text className="text-2xl font-bold text-white mb-1">{value}</Text>
      <Text className="text-sm text-white opacity-90">{title}</Text>
    </View>
  );

  const OrderItem = ({ id, items, time, priority }: any) => (
    <View className={`py-3 border-b border-gray-100 ${priority === 'high' ? 'bg-red-50' : ''}`}>
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-gray-800">{id}</Text>
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-500 mr-2">{time}</Text>
          <View className={`px-2 py-1 rounded ${
            priority === 'high' ? 'bg-red-100' : 
            priority === 'normal' ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            <Text className={`text-xs font-semibold ${
              priority === 'high' ? 'text-red-700' : 
              priority === 'normal' ? 'text-yellow-700' : 'text-green-700'
            }`}>
              {priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View className="mb-2">
        {items.map((item: string, index: number) => (
          <Text key={index} className="text-sm text-gray-600">• {item}</Text>
        ))}
      </View>
      <TouchableOpacity className="bg-primary-500 px-4 py-2 rounded-lg flex-row items-center self-start">
        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        <Text className="text-white font-semibold ml-1">Mark Ready</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <View>
            <Text className="text-3xl font-bold text-gray-800">Kitchen Dashboard</Text>
            <Text className="text-base text-gray-600 mt-1">Order Management</Text>
          </View>
          <TouchableOpacity className="bg-primary-500 px-4 py-2 rounded-lg flex-row items-center">
            <Ionicons name="refresh" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-1">Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mb-5">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>

        {/* Pending Orders */}
        <View className="bg-background-50 rounded-xl p-5 mb-5 border border-border-200">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Pending Orders</Text>
          {pendingOrders.map((order, index) => (
            <OrderItem key={index} {...order} />
          ))}
        </View>

        {/* Bottom spacing for tab navigation */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}