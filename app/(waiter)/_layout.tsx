import { CustomTabBar } from '@/components/CustomTabBar';
import { useAuthStore } from '@/lib/authStore';
import { Redirect, Tabs } from 'expo-router';

export default function WaiterLayout() {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect to auth if not authenticated or not waiter
  if (!isAuthenticated || user?.role !== 'waiter') {
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
        name="kitchen"
        options={{
          title: 'Kitchen',
          tabBarLabel: 'Kitchen',
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
