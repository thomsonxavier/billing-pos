import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { ArrowLeft, CreditCard, Smartphone, Banknote } from 'lucide-react-native';
import { useBillingStore } from '@/stores/billingStore';

interface PaymentProps {
  onBack: () => void;
  onSavePending: () => void;
  onMarkPaid: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ onBack, onSavePending, onMarkPaid }) => {
  const { 
    cart, 
    paymentDetails, 
    setPaymentDetails, 
    getCartSubtotal, 
    getCartTotal 
  } = useBillingStore();

  const subtotal = getCartSubtotal();
  const gst = subtotal * 0.18;
  const total = getCartTotal();

  return (
    <View className="flex-1 p-4 gap-3">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-1">
          <Heading size="xl" className="font-bold text-typography-900">
            Quick Billing
          </Heading>
          <Text className="text-typography-600 text-sm">
            Step 3: Payment
          </Text>
        </View>
        <Pressable onPress={onBack} className="w-8 h-8 rounded-full bg-background-100 items-center justify-center">
          <ArrowLeft size={18} color="#6b7280" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <Card className="p-3 mb-3">
          <Heading size="md" className="font-semibold text-typography-900 mb-3">
            Order Summary
          </Heading>
          
          {cart.map((item) => (
            <View key={item.id} className="flex-row justify-between py-1">
              <Text className="text-typography-700 text-sm">{item.name} x {item.quantity}</Text>
              <Text className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          
          <View className="border-t border-background-200 pt-2 mt-2">
            <View className="flex-row justify-between py-1">
              <Text className="text-typography-700 text-sm">Subtotal</Text>
              <Text className="font-medium text-sm">₹{subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between py-1">
              <Text className="text-typography-700 text-sm">GST (18%)</Text>
              <Text className="font-medium text-sm">₹{gst.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between py-1 border-t border-background-200 mt-2">
              <Text className="font-semibold text-typography-900">Total</Text>
              <Text className="font-bold text-primary-500">₹{total.toFixed(2)}</Text>
            </View>
          </View>
        </Card>

        {/* Payment Method */}
        <Card className="p-3 mb-3">
          <Heading size="md" className="font-semibold text-typography-900 mb-3">
            Payment Method
          </Heading>
          
          <RadioGroup 
            value={paymentDetails.method} 
            onChange={(value) => setPaymentDetails({ method: value as 'cash' | 'card' | 'upi' })}
          >
            <View className="gap-3">
              <Radio 
                value="cash"
                onPress={() => setPaymentDetails({ method: 'cash' })}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>
                  <View className="flex-row items-center gap-3">
                    <Banknote size={20} color="#6b7280" />
                    <Text className="font-medium text-typography-900">Cash</Text>
                  </View>
                </RadioLabel>
              </Radio>
              
              <Radio 
                value="card"
                onPress={() => setPaymentDetails({ method: 'card' })}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>
                  <View className="flex-row items-center gap-3">
                    <CreditCard size={20} color="#6b7280" />
                    <Text className="font-medium text-typography-900">Card</Text>
                  </View>
                </RadioLabel>
              </Radio>
              
              <Radio 
                value="upi"
                onPress={() => setPaymentDetails({ method: 'upi' })}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>
                  <View className="flex-row items-center gap-3">
                    <Smartphone size={20} color="#6b7280" />
                    <Text className="font-medium text-typography-900">UPI</Text>
                  </View>
                </RadioLabel>
              </Radio>
            </View>
          </RadioGroup>
        </Card>

        {/* Amount Received - Only show for Cash */}
        {paymentDetails.method === 'cash' && (
          <Card className="p-3 mb-3">
            <Text className="font-medium text-typography-900 mb-2 text-sm">Amount Received (₹)</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={paymentDetails.amountReceived.toString()}
                onChangeText={(value) => setPaymentDetails({ amountReceived: parseFloat(value) || 0 })}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </Input>
            {paymentDetails.amountReceived > 0 && (
              <View className="mt-3 p-3 bg-background-50 rounded-lg">
                <View className="flex-row justify-between">
                  <Text className="text-typography-700 text-sm">Change to return:</Text>
                  <Text className={`font-semibold text-sm ${
                    paymentDetails.amountReceived >= total ? 'text-green-600' : 'text-red-500'
                  }`}>
                    ₹{(paymentDetails.amountReceived - total).toFixed(2)}
                  </Text>
                </View>
                {paymentDetails.amountReceived < total && (
                  <Text className="text-red-500 text-xs mt-1">
                    Insufficient amount received
                  </Text>
                )}
              </View>
            )}
          </Card>
        )}

      </ScrollView>

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        <Button onPress={onSavePending} className="flex-1 bg-background-100 border border-primary-500">
          <Text className="text-primary-500 font-medium">Save as Pending</Text>
        </Button>
        <Button 
          onPress={onMarkPaid} 
          className={`flex-1 ${
            paymentDetails.method === 'cash' && paymentDetails.amountReceived < total 
              ? 'bg-gray-400' 
              : 'bg-primary-500'
          }`}
          disabled={paymentDetails.method === 'cash' && paymentDetails.amountReceived < total}
        >
          <Text className="text-white font-medium">
            {paymentDetails.method === 'cash' && paymentDetails.amountReceived < total 
              ? 'Insufficient Amount' 
              : 'Mark as Paid'
            }
          </Text>
        </Button>
      </View>
    </View>
  );
};
