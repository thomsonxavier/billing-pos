import React from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { X } from 'lucide-react-native';
import { useBillingStore } from '@/stores/billingStore';
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';

interface CustomerDetailsProps {
  onNext: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({ onNext, onSkip, onClose }) => {
  const { customerDetails, setCustomerDetails } = useBillingStore();

  return (
    <View className="flex-1 p-4 gap-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Heading size="2xl" className="font-bold text-typography-900">
            Quick Billing
          </Heading>
          <Text className="text-typography-600">
            Step 1: Customer Details
          </Text>
        </View>
        <Pressable onPress={onClose} className="w-10 h-10 rounded-full bg-background-100 items-center justify-center">
          <X size={20} color="#6b7280" />
        </Pressable>
      </View>

      {/* Customer Type */}
      <Card className="p-4">
        <Heading size="lg" className="font-semibold text-typography-900 mb-4">
          Customer Type
        </Heading>
        <RadioGroup 
          value={customerDetails.type} 
          onChange={(value) => setCustomerDetails({ type: value as 'walk-in' | 'regular' | 'new' })}
        >
          <View className="gap-3">
            <Radio 
              value="walk-in"
              onPress={() => setCustomerDetails({ type: 'walk-in' })}
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>
                <View className="flex-1">
                  <Text className="font-medium text-typography-900">Walk-in Customer</Text>
                  <Text className="text-typography-600 text-sm">Anonymous / Quick checkout</Text>
                </View>
              </RadioLabel>
            </Radio>
            
            <Radio 
              value="regular"
              onPress={() => setCustomerDetails({ type: 'regular' })}
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>
                <View className="flex-1">
                  <Text className="font-medium text-typography-900">Regular Customer</Text>
                  <Text className="text-typography-600 text-sm">Existing customer</Text>
                </View>
              </RadioLabel>
            </Radio>
            
            <Radio 
              value="new"
              onPress={() => setCustomerDetails({ type: 'new' })}
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>
                <View className="flex-1">
                  <Text className="font-medium text-typography-900">New Customer</Text>
                  <Text className="text-typography-600 text-sm">First-time visitor</Text>
                </View>
              </RadioLabel>
            </Radio>
          </View>
        </RadioGroup>
      </Card>

      {/* Order Mode */}
      <Card className="p-4">
        <Heading size="lg" className="font-semibold text-typography-900 mb-4">
          Order Mode
        </Heading>
        <RadioGroup 
          value={customerDetails.mode} 
          onChange={(value) => setCustomerDetails({ mode: value as 'takeaway' | 'parcel' | 'delivery' })}
        >
          <View className="gap-3">
            <Radio 
              value="takeaway"
              onPress={() => setCustomerDetails({ mode: 'takeaway' })}
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>
                <Text className="font-medium text-typography-900">Takeaway</Text>
              </RadioLabel>
            </Radio>
            
            <Radio 
              value="parcel"
              onPress={() => setCustomerDetails({ mode: 'parcel' })}
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>
                <Text className="font-medium text-typography-900">Parcel</Text>
              </RadioLabel>
            </Radio>
            
            <Radio 
              value="delivery"
              onPress={() => setCustomerDetails({ mode: 'delivery' })}
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>
                <Text className="font-medium text-typography-900">Delivery</Text>
              </RadioLabel>
            </Radio>
          </View>
        </RadioGroup>
      </Card>

      {/* Action Buttons */}
      <View className="flex-row gap-3 mt-auto">
        <Button onPress={onSkip} className="flex-1 bg-background-100">
          <Text className="text-typography-700 font-medium">Skip (Walk-in)</Text>
        </Button>
        <Button onPress={onNext} className="flex-1 bg-primary-500">
          <Text className="text-white font-medium">Next: Add Items</Text>
        </Button>
      </View>
    </View>
  );
};
