import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Box } from '@/components/ui/box';
import { TrendingUp } from 'lucide-react-native';
import { LineChart } from 'react-native-gifted-charts';

interface SalesTrendProps {
  className?: string;
}

export const SalesTrend: React.FC<SalesTrendProps> = ({ className = '' }) => {
  const trendData = [
    { value: 15000, label: 'Mon' },
    { value: 18000, label: 'Tue' },
    { value: 22000, label: 'Wed' },
    { value: 19000, label: 'Thu' },
    { value: 25000, label: 'Fri' },
    { value: 28000, label: 'Sat' },
    { value: 32000, label: 'Sun' },
  ];

  return (
    <Card className={`${className}`} padding="lg">
      <CardHeader
        title="Sales Trend"
        subtitle="Daily revenue over the past week"
        action={
          <Box className="w-8 h-8 bg-success/10 rounded-full items-center justify-center">
            <TrendingUp size={16} color="rgb(52,131,82)" />
          </Box>
        }
      />
      
      <CardContent>
        <Box className="h-48 items-center justify-center">
          <LineChart
            data={trendData}
            height={160}
            width={280}
            color="#1976D2"
            thickness={3}
            startFillColor="#1976D2"
            endFillColor="#1976D2"
            startOpacity={0.3}
            endOpacity={0.1}
            areaChart
            hideDataPoints={false}
            dataPointsColor="#1976D2"
            dataPointsRadius={4}
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: '#64748b', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10 }}
            noOfSections={4}
            maxValue={35000}
            isAnimated
            animationDuration={1200}
            curved
            stripColor="#1976D2"
            stripWidth={2}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
