import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface CustomTabBarProps extends BottomTabBarProps {
  // Add any additional props you might need
}

export function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
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
        const label = typeof options.tabBarLabel === 'string' 
          ? options.tabBarLabel 
          : typeof options.title === 'string'
          ? options.title 
          : route.name;

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

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={(options as any).tabBarTestID}
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
              backgroundColor: isFocused ? '#E3F2FD' : 'transparent',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={getIconName(route.name)}
                size={22}
                color={isFocused ? '#1976D2' : '#666'}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: isFocused ? '600' : '500',
                  color: isFocused ? '#1976D2' : '#666',
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
