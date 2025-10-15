import { CustomTabBar } from '@/components/CustomTabBar';
import { useAuthStore } from '@/lib/authStore';
import { Redirect, Tabs, usePathname, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Fab, FabIcon } from '@/components/ui/fab';
import { 
  Actionsheet, 
  ActionsheetBackdrop, 
  ActionsheetContent, 
  ActionsheetDragIndicator, 
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetScrollView
} from '@/components/ui/actionsheet';
import { useState } from 'react';
import { Users, Package, Settings, BarChart3, Receipt, ChefHat, Menu } from 'lucide-react-native';

const renderTabBar = (props: unknown) => <CustomTabBar {...(props as any)} />;

export default function AdminLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const pathname = usePathname();
  // Redirect to auth if not authenticated or not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Redirect href="/(auth)" />;
  }

  const handleActionPress = (action: string) => {
    setShowActionsheet(false);
    switch (action) {
      case 'staff':
        // router.push('/(admin)/staff-modal');
        break;
      case 'inventory':
        // router.push('/(admin)/inventory-modal');
        break;
      case 'quick-bill':
        router.push('/(tabs)/(admin)/billing');
        break;
      case 'add-menu':
        router.push('/(tabs)/(admin)/menu');
        break;
      case 'reports':
        router.push('/(tabs)/(admin)/reports');
        break;
      case 'settings':
        router.push('/(tabs)/(admin)/settings');
        break;
      default:
        break;
    }
  };

  return (
    <Box className="flex-1">
      <Tabs
        tabBar={renderTabBar}
        screenOptions={{
          headerShown: false,
          lazy: true,
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

      {/* Floating Action Button */}
    { pathname !== '/(admin)/billing' &&   <Fab
        size="lg"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => setShowActionsheet(true)}
        className="mb-[80px]"
      >
        <FabIcon as={Menu} className="text-white" />
      </Fab>}

      {/* Action Sheet */}
 <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          
          <ActionsheetScrollView>
            <ActionsheetItem onPress={() => handleActionPress('staff')}>
              <Users size={24} color="#3b82f6" />
              <ActionsheetItemText>Staff Management</ActionsheetItemText>
            </ActionsheetItem>
            
            <ActionsheetItem onPress={() => handleActionPress('inventory')}>
              <Package size={24} color="#10b981" />
              <ActionsheetItemText>Inventory</ActionsheetItemText>
            </ActionsheetItem>
            
            <ActionsheetItem onPress={() => handleActionPress('quick-bill')}>
              <Receipt size={24} color="#f59e0b" />
              <ActionsheetItemText>Quick Bill</ActionsheetItemText>
            </ActionsheetItem>
            
            <ActionsheetItem onPress={() => handleActionPress('add-menu')}>
              <ChefHat size={24} color="#ef4444" />
              <ActionsheetItemText>Add Menu Item</ActionsheetItemText>
            </ActionsheetItem>
            
            <ActionsheetItem onPress={() => handleActionPress('reports')}>
              <BarChart3 size={24} color="#8b5cf6" />
              <ActionsheetItemText>View Reports</ActionsheetItemText>
            </ActionsheetItem>
            
            <ActionsheetItem onPress={() => handleActionPress('settings')}>
              <Settings size={24} color="#6b7280" />
              <ActionsheetItemText>Settings</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
