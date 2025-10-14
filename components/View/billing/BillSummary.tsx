import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Printer, FileText, Home } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { useBillingStore } from '@/stores/billingStore';
import { printerService, BillData } from '@/services/printerService';

interface BillSummaryProps {
  onPrintBill: () => void;
  onNewBill: () => void;
  onDashboard: () => void;
}

export const BillSummary: React.FC<BillSummaryProps> = ({ onPrintBill, onNewBill, onDashboard }) => {
  const { currentOrder, cart, paymentDetails, customerDetails, getCartSubtotal, getCartTotal } = useBillingStore();
  
  const subtotal = getCartSubtotal();
  const gst = subtotal * 0.18;
  const total = getCartTotal();
  
  // Generate order details
  const orderNumber = `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  const tokenNumber = `TKN${Math.floor(Math.random() * 900) + 100}`;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-IN');
  const formattedTime = currentDate.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });

  // Handle print bill
  const handlePrintBill = async () => {
    const billData: BillData = {
      orderNumber,
      tokenNumber,
      date: formattedDate,
      time: formattedTime,
      customerType: customerDetails.type,
      orderMode: customerDetails.mode,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      subtotal,
      gst,
      total,
      paymentMethod: paymentDetails.method,
      amountReceived: paymentDetails.amountReceived,
      change: paymentDetails.amountReceived > 0 ? paymentDetails.amountReceived - total : undefined
    };

    await printerService.printBill(billData);
  };

  return (
    <View className="flex-1 bg-background-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* Bill Summary Card */}
          <Card className="bg-white rounded-lg shadow-sm">
            {/* Bill Header */}
            <View className="p-4 border-b border-background-200">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-bold text-typography-900 text-lg">Bill #{orderNumber}</Text>
                  <Text className="text-typography-600 text-sm">{formattedDate}, {formattedTime}</Text>
                </View>
                <Box className="bg-success-500 px-3 py-1 rounded-full">
                  <Text className="text-white font-semibold text-sm">PAID</Text>
                </Box>
              </View>
            </View>

            {/* Order Details */}
            <View className="p-4 border-b border-background-200">
              <View className="flex-row justify-between mb-1">
                <Text className="text-typography-600 text-sm">Token:</Text>
                <Text className="font-medium text-sm">{tokenNumber}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-typography-600 text-sm">Type:</Text>
                <Text className="font-medium text-sm capitalize">
                  {customerDetails.type} - {customerDetails.mode}
                </Text>
              </View>
            </View>

            {/* Items */}
            <View className="p-4 border-b border-background-200">
              <Text className="font-semibold text-typography-900 mb-3">Items:</Text>
              {cart.map((item, index) => (
                <View key={index} className="flex-row justify-between py-1">
                  <Text className="text-typography-700 text-sm">{item.name} x {item.quantity}</Text>
                  <Text className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </View>

            {/* Summary */}
            <View className="p-4">
              <View className="flex-row justify-between py-1">
                <Text className="text-typography-700 text-sm">Subtotal</Text>
                <Text className="font-medium text-sm">₹{subtotal.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-1">
                <Text className="text-typography-700 text-sm">GST (18%)</Text>
                <Text className="font-medium text-sm">₹{gst.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-t border-background-200 mt-2">
                <Text className="font-bold text-typography-900">Grand Total</Text>
                <Text className="font-bold text-primary-500">₹{total.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-1 mt-2">
                <Text className="text-typography-700 text-sm">Payment Mode:</Text>
                <Text className="font-medium text-sm uppercase">{paymentDetails.method}</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="p-4 mb-2 bg-white border-t border-background-200">
        <View className="flex-row gap-3">
          <Button onPress={handlePrintBill} className="flex-1 bg-background-100 border border-primary-500 py-3">
            <Printer size={18} color="#3b82f6" />
            <Text className="text-primary-500 font-medium ml-2">Print Bill</Text>
          </Button>
          
          <Button onPress={onNewBill} className="flex-1 bg-background-100 border border-primary-500 py-3">
            <FileText size={18} color="#3b82f6" />
            <Text className="text-primary-500 font-medium ml-2">New Bill</Text>
          </Button>
          
          <Button onPress={onDashboard} className="flex-1 bg-primary-500 py-3">
            <Home size={18} color="white" />
            <Text className="text-white font-medium ml-2">Dashboard</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
