import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { 
  Download, 
  Calendar, 
  FileText, 
  CreditCard,
  Smartphone,
  Banknote
} from 'lucide-react-native';
import { useReportsStore } from '@/lib/reportsStore';
import { useColorModeStore } from '@/lib/colorModeStore';


const ReportsAnalytics: React.FC = () => {
  const { revenue, weeklyPerformance, paymentMethods } = useReportsStore();
  const { colorMode } = useColorModeStore();

  const handleDownloadReport = (reportType: string) => {
    Alert.alert(
      'Download Report',
      `Would you like to download the ${reportType}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => {
            // Simulate download process
            Alert.alert(
              'Download Started',
              `${reportType} is being prepared for download...`,
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <Banknote size={20} className="text-green-600" />;
      case 'card':
        return <CreditCard size={20} className="text-blue-600" />;
      case 'upi':
        return <Smartphone size={20} className="text-purple-600" />;
      default:
        return <Banknote size={20} className="text-gray-600" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash':
        return 'Cash';
      case 'card':
        return 'Card';
      case 'upi':
        return 'UPI';
      default:
        return method;
    }
  };

  const maxRevenue = Math.max(...weeklyPerformance.map(day => day.revenue));

  return (
    <SafeAreaView className={`flex-1 ${colorMode === 'dark' ? 'dark' : ''} bg-background-0`} edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="p-6">
          {/* Header */}
          <VStack space="xs">
            <Heading size="2xl" className="text-typography-900 font-bold">Reports & Analytics</Heading>
            <Text size="md" className="text-typography-600">View detailed sales and performance reports</Text>
          </VStack>

          {/* Revenue Metrics */}
          <HStack space="md">
            <Card className="flex-1 bg-background-50 rounded-2xl border border-border-200 p-4">
              <VStack space="xs">
                <Text size="sm" className="text-typography-600 font-medium">Today's Revenue</Text>
                <Text size="2xl" className="text-typography-900 font-bold">{formatCurrency(revenue.today)}</Text>
              </VStack>
            </Card>
            
            <Card className="flex-1 bg-background-50 rounded-2xl border border-border-200 p-4">
              <VStack space="xs">
                <Text size="sm" className="text-typography-600 font-medium">Weekly Revenue</Text>
                <Text size="2xl" className="text-typography-900 font-bold">{formatCurrency(revenue.weekly)}</Text>
              </VStack>
            </Card>
          </HStack>

          {/* Weekly Performance Chart */}
          <Card className="bg-background-50 rounded-2xl border border-border-200 p-4">
            <VStack space="md">
              <VStack space="xs">
                <Heading size="lg" className="text-typography-900 font-bold">Weekly Performance</Heading>
                <Text size="sm" className="text-typography-600">Revenue and orders for the past 7 days</Text>
              </VStack>

              {/* Chart Container */}
              <VStack space="sm">
                {/* Y-axis labels and chart area */}
                <HStack space="sm" className="items-end" style={{ height: 200 }}>
                  {/* Y-axis */}
                  <VStack space="xs" className="items-end pr-2">
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                      <Text key={ratio} size="xs" className="text-typography-500">
                        {Math.round(maxRevenue * ratio).toLocaleString()}
                      </Text>
                    ))}
                  </VStack>

                  {/* Chart bars */}
                  <VStack space="xs" className="flex-1">
                    <HStack space="xs" className="items-end flex-1">
                      {weeklyPerformance.map((day) => {
                        const height = (day.revenue / maxRevenue) * 150;
                        return (
                          <VStack key={day.day} space="xs" className="flex-1 items-center">
                            <VStack 
                              className="bg-blue-500 rounded-t-sm w-full"
                              style={{ height: Math.max(height, 4) }}
                            />
                            <Text size="xs" className="text-typography-600 font-medium">{day.day}</Text>
                          </VStack>
                        );
                      })}
                    </HStack>
                  </VStack>
                </HStack>

                {/* Legend */}
                <HStack space="sm" className="items-center justify-center">
                  <VStack className="w-3 h-3 bg-blue-500 rounded-sm" />
                  <Text size="sm" className="text-typography-600">Revenue</Text>
                </HStack>
              </VStack>
            </VStack>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-background-50 rounded-2xl border border-border-200 p-4">
            <VStack space="md">
              <VStack space="xs">
                <Heading size="lg" className="text-typography-900 font-bold">Payment Methods</Heading>
                <Text size="sm" className="text-typography-600">Breakdown by payment type</Text>
              </VStack>

              <VStack space="sm">
                {paymentMethods.map((method) => (
                  <HStack key={method.method} space="md" className="items-center justify-between p-3 bg-background-100 rounded-xl">
                    <HStack space="sm" className="items-center">
                      {getPaymentMethodIcon(method.method)}
                      <Text size="md" className="font-medium text-typography-700">
                        {getPaymentMethodLabel(method.method)}
                      </Text>
                    </HStack>
                    <Text size="lg" className="font-bold text-typography-900">
                      {formatCurrency(method.amount)}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Card>

          {/* Download Reports */}
          <Card className="bg-background-50 rounded-2xl border border-border-200 p-4">
            <VStack space="md">
              <VStack space="xs">
                <Heading size="lg" className="text-typography-900 font-bold">Download Reports</Heading>
                <Text size="sm" className="text-typography-600">Export detailed reports</Text>
              </VStack>

              <VStack space="sm">
                <Pressable 
                  className="p-3 bg-background-100 rounded-xl"
                  onPress={() => handleDownloadReport('Daily Sales Report')}
                >
                  <HStack space="sm" className="items-center">
                    <Calendar size={20} className="text-blue-600" />
                    <Text size="md" className="font-medium text-typography-700">Daily Sales Report</Text>
                  </HStack>
                </Pressable>

                <Pressable 
                  className="p-3 bg-background-100 rounded-xl"
                  onPress={() => handleDownloadReport('Weekly Sales Report')}
                >
                  <HStack space="sm" className="items-center">
                    <FileText size={20} className="text-green-600" />
                    <Text size="md" className="font-medium text-typography-700">Weekly Sales Report</Text>
                  </HStack>
                </Pressable>

                <Pressable 
                  className="p-3 bg-background-100 rounded-xl"
                  onPress={() => handleDownloadReport('GST Summary Report')}
                >
                  <HStack space="sm" className="items-center">
                    <Download size={20} className="text-purple-600" />
                    <Text size="md" className="font-medium text-typography-700">GST Summary Report</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportsAnalytics;
