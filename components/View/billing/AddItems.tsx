import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Badge, BadgeText } from '@/components/ui/badge';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerCloseButton,
} from '@/components/ui/drawer';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { ArrowLeft, Plus, Minus, Trash2, Search } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { useBillingStore, MenuItem } from '@/stores/billingStore';
import { menuItems, categories } from '@/data/menuItems';

interface AddItemsProps {
  onBack: () => void;
  onNext: () => void;
}

export const AddItems: React.FC<AddItemsProps> = ({ onBack, onNext }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  
  const { cart, addToCart, updateCartItem, removeFromCart, clearCart, getCartTotal, getCartSubtotal } = useBillingStore();

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    const currentItem = cart.find(item => item.id === id);
    if (currentItem) {
      const newQuantity = Math.max(0, currentItem.quantity + change);
      if (newQuantity === 0) {
        removeFromCart(id);
      } else {
        updateCartItem(id, newQuantity);
      }
    }
  };

  const subtotal = getCartSubtotal();
  const total = getCartTotal();

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="p-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Heading size="2xl" className="font-bold text-typography-900">
              Quick Billing
            </Heading>
            <Text className="text-typography-600">
              Step 2: Add Items
            </Text>
          </View>
          <Pressable onPress={onBack} className="w-10 h-10 rounded-full bg-background-100 items-center justify-center">
            <ArrowLeft size={20} color="#6b7280" />
          </Pressable>
        </View>
      </View>

      {/* Search */}
      <View className="px-4 pb-2">
        <View className="relative">
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="w-full"
          >
            <InputField 
              placeholder="Search items..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="pl-10"
            />
          </Input>
          <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Search size={18} color="#6b7280" />
          </View>
        </View>
      </View>

      {/* Categories */}
      <View className="px-4 pb-2">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="gap-2"
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
        <Pressable
          onPress={() => setSelectedCategory('All')}
          className="mr-2"
        >
          <Badge 
            action={selectedCategory === 'All' ? 'info' : 'muted'}
            variant="solid"
            size="md"
            className={`rounded-full px-4 py-2 ${
              selectedCategory === 'All' 
                ? 'bg-primary-500' 
                : 'bg-background-100'
            }`}
          >
            <BadgeText className={`font-medium text-sm ${
              selectedCategory === 'All' 
                ? 'text-white' 
                : 'text-typography-700'
            }`}>
              All
            </BadgeText>
          </Badge>
        </Pressable>
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => setSelectedCategory(category)}
            className="mr-2"
          >
            <Badge 
              action={selectedCategory === category ? 'info' : 'muted'}
              variant="solid"
              size="md"
              className={`rounded-full px-4 py-2 ${
                selectedCategory === category 
                  ? 'bg-primary-500' 
                  : 'bg-background-100'
              }`}
            >
              <BadgeText className={`font-medium text-sm ${
                selectedCategory === category 
                  ? 'text-white' 
                  : 'text-typography-700'
              }`}>
                {category}
              </BadgeText>
            </Badge>
          </Pressable>
        ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 gap-2">
          {filteredItems.map((item) => {
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            const quantity = cartItem?.quantity || 0;
            
            return (
              <Card key={item.id} className="p-3 border border-background-200 bg-white shadow-sm">
                <View className="flex-row items-center gap-3">
                  <View className="w-16 h-16 bg-background-100 rounded-lg overflow-hidden border border-background-200">
                    {item.image ? (
                      <Image 
                        source={{ uri: item.image }} 
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <Box className="w-full h-full bg-background-200 items-center justify-center">
                        <Text className="text-typography-400 text-xs">No Image</Text>
                      </Box>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-typography-900 text-base">{item.name}</Text>
                    <View className="flex-row items-center gap-2 mt-1">
                      <Badge 
                        action="info"
                        variant="solid"
                        size="sm"
                        className="bg-primary-100 rounded-full px-2 py-1"
                      >
                        <BadgeText className="text-primary-700 text-xs font-medium">
                          {item.category}
                        </BadgeText>
                      </Badge>
                    </View>
                    <Text className="text-primary-500 font-bold text-lg mt-1">₹{item.price}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    {quantity > 0 && (
                      <>
                        <Pressable 
                          onPress={() => handleUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 bg-background-200 rounded-full items-center justify-center"
                        >
                          <Minus size={14} color="#6b7280" />
                        </Pressable>
                        <Text className="font-bold text-base min-w-[25px] text-center">{quantity}</Text>
                      </>
                    )}
                    <Pressable 
                      onPress={() => handleAddToCart(item)}
                      className={`w-8 h-8 rounded-full items-center justify-center shadow-sm ${
                        quantity > 0 ? 'bg-green-500' : 'bg-primary-500'
                      }`}
                    >
                      <Plus size={16} color="white" />
                    </Pressable>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>

      {/* Cart Summary - Fixed at bottom */}
      {cart.length > 0 && (
        <View className="bg-white border-t border-background-200 p-2">
          <Pressable 
            onPress={() => setShowCartDrawer(true)}
            className="bg-primary-500 rounded-lg p-4"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white font-semibold text-lg">
                  Cart ({cart.length} items)
                </Text>
                <Text className="text-white/80 text-sm">
                  Total: ₹{total.toFixed(2)}
                </Text>
              </View>
              <Text className="text-white font-bold text-lg">
                View Cart →
              </Text>
            </View>
          </Pressable>
        </View>
      )}


      {/* Next Button - Only show if cart has items */}
      {cart.length > 0 && (
        <View className="p-4">
          <Button onPress={onNext} className="bg-primary-500">
            <Text className="text-white font-medium">
              Next: Payment ({cart.length} items - ₹{total.toFixed(2)})
            </Text>
          </Button>
        </View>
      )}

      {/* Drawer for Cart */}
      <Drawer
        isOpen={showCartDrawer}
        size="lg"
        anchor="right"
        onClose={() => setShowCartDrawer(false)}
      >
        <DrawerBackdrop />
        <DrawerContent className="bg-white rounded-t-3xl">
          <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="p-4 border-b border-background-100">
              <View className="flex-row items-center justify-between">
                <Text className="text-typography-900 font-bold text-lg">Your Cart</Text>
                <DrawerCloseButton>
                  <Icon as={CloseIcon} />
                </DrawerCloseButton>
              </View>
              {cart.length > 0 && (
                <Pressable onPress={clearCart} className="mt-2 self-start">
                  <Text className="text-red-500 font-medium text-xs">Clear All</Text>
                </Pressable>
              )}
            </View>
          
            {/* Cart Items */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="p-4">
                {cart.length === 0 ? (
                  <View className="items-center justify-center py-8">
                    <Text className="text-typography-400 text-sm">Your cart is empty</Text>
                    <Text className="text-typography-400 text-xs mt-1">Add some items to get started</Text>
                  </View>
                ) : (
                  <View className="gap-3">
                    {cart.map((item) => (
                      <View key={item.id} className="bg-background-50 border border-background-200 rounded-lg p-3">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-1">
                            <Text className="font-semibold text-typography-900 text-sm">{item.name}</Text>
                            <Text className="text-typography-600 text-xs mt-1">₹{item.price} each</Text>
                          </View>
                          <View className="flex-row items-center gap-2">
                            <Pressable 
                              onPress={() => handleUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 bg-background-200 rounded-full items-center justify-center"
                            >
                              <Minus size={12} color="#6b7280" />
                            </Pressable>
                            <Text className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</Text>
                            <Pressable 
                              onPress={() => handleUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center"
                            >
                              <Plus size={12} color="white" />
                            </Pressable>
                            <Pressable 
                              onPress={() => removeFromCart(item.id)}
                              className="w-6 h-6 bg-red-50 rounded-full items-center justify-center ml-1"
                            >
                              <Trash2 size={12} color="#ef4444" />
                            </Pressable>
                          </View>
                        </View>
                        <View className="flex-row justify-between mt-2">
                          <Text className="text-primary-500 font-semibold text-sm">
                            Total: ₹{(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
            
            {/* Footer */}
            {cart.length > 0 && (
              <View className="p-4 border-t border-background-100 bg-background-50">
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-typography-700 text-xs">Subtotal</Text>
                    <Text className="font-medium text-typography-900 text-xs">₹{subtotal.toFixed(2)}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-typography-700 text-xs">GST (18%)</Text>
                    <Text className="text-typography-700 text-xs">₹{(subtotal * 0.18).toFixed(2)}</Text>
                  </View>
                  <View className="flex-row justify-between pt-2 border-t border-background-200">
                    <Text className="font-bold text-typography-900 text-base">Total</Text>
                    <Text className="font-bold text-primary-500 text-base">₹{total.toFixed(2)}</Text>
                  </View>
                  
                  <Button 
                    onPress={() => { setShowCartDrawer(false); onNext(); }} 
                    className="mt-4 bg-primary-500 rounded-lg py-3"
                  >
                    <Text className="text-white font-semibold text-sm">Proceed to Payment</Text>
                  </Button>
                </View>
              </View>
            )}
          </SafeAreaView>
        </DrawerContent>
      </Drawer>
    </View>
  );
};
