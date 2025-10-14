import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';

interface TopSellingItemsProps {
  className?: string;
}

export const TopSellingItems: React.FC<TopSellingItemsProps> = ({ className = '' }) => {
  const items = [
    { name: 'Butter Naan', orders: 4, price: 180 },
    { name: 'Paneer Butter Masala', orders: 2, price: 560 },
    { name: 'Biryani (Chicken)', orders: 2, price: 640 },
    { name: 'Masala Dosa', orders: 2, price: 240 },
    { name: 'Lassi (Sweet)', orders: 2, price: 140 },
  ];

  return (
    <Card className={`${className}`} padding="lg">
      <CardHeader
        title="Top Selling Items"
        subtitle="Most popular dishes this week"
      />
      
      <CardContent>
        <VStack className="gap-3">
          {items.map((item, index) => (
            <HStack key={index} className="items-center gap-4">
              <Box className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
                <Text className="text-sm font-bold text-primary">
                  {index + 1}
                </Text>
              </Box>
              <VStack className="flex-1">
                <Text className="text-sm font-medium text-typography-900">
                  {item.name}
                </Text>
                <Text className="text-xs text-typography-600">
                  {item.orders} orders
                </Text>
              </VStack>
              <Text className="text-sm font-semibold text-typography-900">
                ₹{item.price}
              </Text>
            </HStack>
          ))}
        </VStack>
      </CardContent>
    </Card>
  );
};
