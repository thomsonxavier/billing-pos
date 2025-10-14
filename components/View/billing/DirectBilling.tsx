import React from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { CreditCard, Utensils, Lightbulb } from 'lucide-react-native';
import { Box } from '@/components/ui/box';

interface DirectBillingProps {
  onQuickBilling: () => void;
  onDineIn: () => void;
}

export const DirectBilling: React.FC<DirectBillingProps> = ({ onQuickBilling, onDineIn }) => {
  return (
    <View className="flex-1 p-4 gap-6">
      <View className="mb-4">
        <Heading size="2xl" className="font-bold text-typography-900 mb-2">
          Direct Billing
        </Heading>
        <Text className="text-typography-600">
          Create bills for walk-in customers or quick orders
        </Text>
      </View>

      <View className="flex-row gap-4">
        <Pressable onPress={onQuickBilling} className="flex-1">
          <Card className="p-6 items-center border border-border-200">
            <Box className="w-16 h-16 bg-primary-500 rounded-lg items-center justify-center mb-4">
              <CreditCard size={32} color="white" />
            </Box>
            <Heading size="lg" className="font-bold text-typography-900 mb-2">
              Quick Billing
            </Heading>
            <Text className="text-typography-600 text-center">
              Fast checkout for takeaway orders
            </Text>
          </Card>
        </Pressable>

        <Pressable onPress={onDineIn} className="flex-1">
          <Card className="p-6 items-center border border-border-200">
            <Box className="w-16 h-16 bg-primary-500 rounded-lg items-center justify-center mb-4">
              <Utensils size={32} color="white" />
            </Box>
            <Heading size="lg" className="font-bold text-typography-900 mb-2">
              Dine-In Order
            </Heading>
            <Text className="text-typography-600 text-center">
              Create order for a table
            </Text>
          </Card>
        </Pressable>
      </View>

      <Card className="p-4 bg-background-50 border border-border-200">
        <View className="flex-row items-start gap-3">
          <Lightbulb size={20} color="#f59e0b" />
          <Text className="text-typography-700 flex-1">
            <Text className="font-semibold">Tip:</Text> Select Quick Billing for walk-in customers or Dine-In to assign an order to a specific table.
          </Text>
        </View>
      </Card>
    </View>
  );
};
