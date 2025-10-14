import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { BarChart3 } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';

interface WeeklySalesProps {
  className?: string;
}

export const WeeklySales: React.FC<WeeklySalesProps> = ({ className = '' }) => {
  const salesData = [
    { value: 26800, label: 'Mon', frontColor: '#1976D2' },
    { value: 15000, label: 'Sun', frontColor: '#1976D2' },
    { value: 22000, label: 'Sat', frontColor: '#1976D2' },
    { value: 18000, label: 'Fri', frontColor: '#D3D3D3' }, // Current day in gray
    { value: 25000, label: 'Thu', frontColor: '#1976D2' },
    { value: 20000, label: 'Wed', frontColor: '#1976D2' },
    { value: 30000, label: 'Tue', frontColor: '#1976D2' },
  ];

  return (
    <Card className={`${className}`} padding="lg">
      <CardHeader
        title="Weekly Sales"
        subtitle="Revenue trends for the past week"
        action={
          <Box className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
            <BarChart3 size={16} color="rgb(25,118,210)" />
          </Box>
        }
      />
      
      <CardContent>
        <Box className="h-48 items-center justify-center">
          <BarChart
            data={salesData}
            height={160}
            width={280}
            barWidth={25}
            spacing={15}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: '#64748b', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10 }}
            noOfSections={4}
            maxValue={34000}
            formatYLabel={(value) => `₹${(value as any / 1000).toFixed(0)}K`}
            isAnimated
            animationDuration={1000}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
