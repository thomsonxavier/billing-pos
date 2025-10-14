import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useColorModeStore } from '@/lib/colorModeStore';

interface CustomTabBarProps extends BottomTabBarProps {
  // Add any additional props you might need
}

export function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const { colorMode } = useColorModeStore();
  const isDark = colorMode === 'dark';

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: isDark ? '#374151' : '#E5E5E5',
        paddingBottom: Platform.OS === 'ios' ? 25 : 8,
        paddingTop: 8,
        paddingHorizontal: 4,
        height: Platform.OS === 'ios' ? 85 : 65,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        let label = route.name;
        if (typeof options.tabBarLabel === 'string') {
          label = options.tabBarLabel;
        } else if (typeof options.title === 'string') {
          label = options.title;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get icon name based on route name
        const getIconName = (routeName: string) => {
          switch (routeName.toLowerCase()) {
            case 'dashboard':
              return 'home';
            case 'billing':
              return 'receipt';
            case 'orders':
              return 'receipt';
            case 'menu':
              return 'restaurant';
            case 'staff':
              return 'people';
            case 'reports':
              return 'bar-chart';
            case 'kitchen':
              return 'restaurant';
            case 'settings':
              return 'settings';
            default:
              return 'home';
          }
        };

        // Theme colors
        const focusedBg = isDark ? '#1E40AF' : '#E3F2FD';
        const backgroundColor = isFocused ? focusedBg : 'transparent';
        const activeColor = isDark ? '#60A5FA' : '#1976D2';
        const inactiveColor = isDark ? '#9CA3AF' : '#666';
        const iconColor = isFocused ? activeColor : inactiveColor;
        const textColor = isFocused ? activeColor : inactiveColor;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={(options as { tabBarTestID?: string }).tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 6,
              paddingHorizontal: 4,
              marginHorizontal: 2,
              borderRadius: 12,
              backgroundColor,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={getIconName(route.name)}
                size={22}
                color={iconColor}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: isFocused ? '600' : '500',
                  color: textColor,
                  textAlign: 'center',
                }}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;
