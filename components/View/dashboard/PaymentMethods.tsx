import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { VStack } from '@/components/ui/vstack';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { CreditCard, Smartphone, Banknote } from 'lucide-react-native';
import { PieChart } from 'react-native-gifted-charts';

interface PaymentMethodsProps {
  className?: string;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ className = '' }) => {
  const paymentData = [
    { 
      value: 12000, 
      color: '#1976D2', 
      method: 'Cash',
      icon: Banknote 
    },
    { 
      value: 8500, 
      color: '#0D47A1', 
      method: 'Card',
      icon: CreditCard 
    },
    { 
      value: 8000, 
      color: '#FFA726', 
      method: 'UPI',
      icon: Smartphone 
    },
  ];

  const totalAmount = paymentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={`${className}`} padding="lg">
      <CardHeader
        title="Payment Methods"
        subtitle="Today's payment breakdown"
      />
      
      <CardContent>
        <View className="items-center gap-4 flex flex-row">
          {/* Pie Chart */}
          <Box className="w-28 h-28 items-center justify-center">
            <PieChart
              data={paymentData}
              radius={50}
              innerRadius={25}
              centerLabelComponent={() => (
                <VStack className="items-center">
                  <Text className="text-sm font-bold text-typography-900">
                    {Math.round((totalAmount / 1000))}K
                  </Text>
                  <Text className="text-xs text-typography-600">
                    Total
                  </Text>
                </VStack>
              )}

              textColor="#000000"

              textBackgroundRadius={8}
            />
          </Box>
          
          {/* Legend */}
          <VStack className="flex-1 gap-3">
            {paymentData.map((item, index) => {
              const IconComponent = item.icon;
              const percentage = Math.round((item.value / totalAmount) * 100);
              
              return (
                <View  key={index} className="items-center gap-3 flex flex-row">
                  <Box 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <IconComponent size={16} color="rgb(140,140,140)" />
                  <Text className="flex-1 text-sm text-typography-700">
                    {item.method}
                  </Text>
                  <Text className="text-sm font-semibold text-typography-900">
                    ₹{item.value.toLocaleString()}
                  </Text>
                </View>
              );
            })}
          </VStack>
        </View>
      </CardContent>
    </Card>
  );
};
