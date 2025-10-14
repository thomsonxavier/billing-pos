import React from 'react';
import { View } from 'react-native';
import { StatCard } from '@/components/common/Card';
import { Heading } from '@/components/ui/heading';
import { DollarSign, ShoppingBag, TrendingUp, Clock } from 'lucide-react-native';
import { Box } from '@/components/ui/box';

interface OverviewStatsProps {
  className?: string;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ className = '' }) => {
  const stats = [
    {
      title: "Today's Sales",
      value: "₹2,324.6",
      icon: (
        <Box className="w-12 h-12 bg-primary-500 rounded-lg items-center justify-center">
          <DollarSign size={24} color="white" />
        </Box>
      ),
    },
    {
      title: "Total Orders",
      value: "3",
      icon: (
        <Box className="w-12 h-12 bg-primary-700 rounded-lg items-center justify-center">
          <ShoppingBag size={24} color="white" />
        </Box>
      ),
    },
    {
      title: "Completed",
      value: "0",
      icon: (
        <Box className="w-12 h-12 bg-success-500 rounded-lg items-center justify-center">
          <TrendingUp size={24} color="white" />
        </Box>
      ),
    },
    {
      title: "Pending",
      value: "2",
      icon: (
        <Box className="w-12 h-12 bg-warning-500 rounded-lg items-center justify-center">
          <Clock size={24} color="white" />
        </Box>
      ),
    },
  ];

  return (
    <View className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            className="w-full"
          />
        ))}
      </View>
  );
};
