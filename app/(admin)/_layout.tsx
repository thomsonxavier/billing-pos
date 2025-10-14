import { CustomTabBar } from '@/components/CustomTabBar';
import { useAuthStore } from '@/lib/authStore';
import { Redirect, Tabs } from 'expo-router';

const renderTabBar = (props: any) => <CustomTabBar {...props} />;

export default function AdminLayout() {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect to auth if not authenticated or not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      tabBar={renderTabBar}
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
        name="billing"
        options={{
          title: 'Billing',
          tabBarLabel: 'Billing',
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
        }}
      />
      <Tabs.Screen
        name="staff"
        options={{
          title: 'Staff',
          tabBarLabel: 'Staff',
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarLabel: 'Reports',
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
