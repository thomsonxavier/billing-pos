import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { useColorModeStore } from '@/lib/colorModeStore';

// Dashboard Components
import { 
  OverviewStats, 
  WeeklySales, 
  PaymentMethods, 
  TopSellingItems, 
  GSTSummary,
  SalesTrend 
} from '@/components/View/dashboard';

export default function AdminDashboard() {
  const { colorMode, toggleColorMode } = useColorModeStore();

  return (
    <SafeAreaView className={`flex-1 ${colorMode === 'dark' ? 'dark' : ''} bg-background-0`} edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 pb-16 gap-6 flex flex-col">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1">
              <Heading size="2xl" className="font-bold text-typography-900">
                Dashboard
              </Heading>
              <Text className="text-typography-600 mt-1">
                Welcome back! Here's what's happening today.
              </Text>
            </View>
            
            {/* Theme Toggle */}
            <Fab onPress={toggleColorMode} className="bg-primary" size="sm">
              <FabIcon as={colorMode === "dark" ? SunIcon : MoonIcon} className="text-white" />
            </Fab>
          </View>

          {/* Overview Stats */}
          <View className="grid grid-cols-2 gap-3">
            <OverviewStats />
          </View>


          {/* Charts Row - CSS Grid */}
          <View className="grid grid-cols-2 gap-3">
            <WeeklySales />
            <PaymentMethods />
          </View>

          {/* Sales Trend - Full Width */}
          <SalesTrend />

          {/* Bottom Row - CSS Grid */}
          <View className="grid grid-cols-2 gap-3">
            <TopSellingItems />
            <GSTSummary />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
