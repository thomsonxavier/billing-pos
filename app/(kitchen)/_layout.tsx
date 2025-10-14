import { CustomTabBar } from '@/components/CustomTabBar';
import { useAuthStore } from '@/lib/authStore';
import { Redirect, Tabs } from 'expo-router';

export default function KitchenLayout() {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect to auth if not authenticated or not kitchen
  if (!isAuthenticated || user?.role !== 'kitchen') {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarLabel: 'Orders',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}
