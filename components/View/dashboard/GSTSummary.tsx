import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Receipt } from 'lucide-react-native';

interface GSTSummaryProps {
  className?: string;
}

export const GSTSummary: React.FC<GSTSummaryProps> = ({ className = '' }) => {
  const gstData = {
    totalSales: 2324.6,
    gstRate: 18,
    gstAmount: 418.428,
    netAmount: 1906.172,
  };

  return (
    <Card className={`${className}`} padding="lg">
      <CardHeader
        title="GST Summary"
        subtitle="Tax collected today"
        action={
          <Box className="w-8 h-8 bg-accent/10 rounded-full items-center justify-center">
            <Receipt size={16} color="rgb(255,167,38)" />
          </Box>
        }
      />
      
      <CardContent>
        <VStack className="gap-4">
          <HStack className="items-center justify-between">
            <Text className="text-sm text-typography-600">Total Sales</Text>
            <Text className="text-lg font-bold text-typography-900">
              ₹{gstData.totalSales.toLocaleString()}
            </Text>
          </HStack>
          
          <HStack className="items-center justify-between">
            <Text className="text-sm text-typography-600">
              GST ({gstData.gstRate}%)
            </Text>
            <Text className="text-lg font-bold text-typography-900">
              ₹{gstData.gstAmount.toLocaleString()}
            </Text>
          </HStack>
          
          <Box className="h-px bg-outline-200 my-2" />
          
          <HStack className="items-center justify-between">
            <Text className="text-base font-semibold text-typography-900">Net Amount</Text>
            <Text className="text-xl font-bold text-primary">
              ₹{gstData.netAmount.toLocaleString()}
            </Text>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
};
