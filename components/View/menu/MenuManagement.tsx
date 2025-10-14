import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { 
  Modal, 
  ModalBackdrop, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, X } from 'lucide-react-native';
import { Box } from '@/components/ui/box';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  available: boolean;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

export const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Paneer Butter Masala',
      category: 'Main Course',
      price: 280,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '2',
      name: 'Chicken Tikka Masala',
      category: 'Main Course',
      price: 320,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '3',
      name: 'Dal Makhani',
      category: 'Main Course',
      price: 220,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '4',
      name: 'Butter Naan',
      category: 'Breads',
      price: 45,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '5',
      name: 'Garlic Naan',
      category: 'Breads',
      price: 55,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '6',
      name: 'Tandoori Roti',
      category: 'Breads',
      price: 35,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '7',
      name: 'Biryani (Veg)',
      category: 'Rice',
      price: 250,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    },
    {
      id: '8',
      name: 'Biryani (Chicken)',
      category: 'Rice',
      price: 300,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a64f?w=400',
      available: true
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Main Course', color: 'bg-blue-100' },
    { id: '2', name: 'Breads', color: 'bg-green-100' },
    { id: '3', name: 'Rice', color: 'bg-yellow-100' },
    { id: '4', name: 'Desserts', color: 'bg-pink-100' },
    { id: '5', name: 'Beverages', color: 'bg-purple-100' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newCategory, setNewCategory] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    available: true
  });

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleAddItem = () => {
    if (!formData.name || !formData.category || !formData.price) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || undefined,
      available: formData.available
    };

    setMenuItems([...menuItems, newItem]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditItem = () => {
    if (!editingItem || !formData.name || !formData.category || !formData.price) return;

    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...formData, price: parseFloat(formData.price) }
        : item
    ));
    setShowEditModal(false);
    setEditingItem(null);
    resetForm();
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleToggleAvailable = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const categoryExists = categories.some(cat => 
      cat.name.toLowerCase() === newCategory.toLowerCase()
    );

    if (!categoryExists) {
      const newCat: Category = {
        id: Date.now().toString(),
        name: newCategory,
        color: 'bg-gray-100'
      };
      setCategories([...categories, newCat]);
    }
    setNewCategory('');
    setShowCategoryModal(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      image: '',
      available: true
    });
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      image: item.image || '',
      available: item.available
    });
    setShowEditModal(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-background-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Heading size="lg" className="font-bold text-typography-900">
              Menu Management
            </Heading>
            <Text className="text-typography-600 text-sm mt-1">
              Add and manage your restaurant menu
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Button 
              onPress={() => setShowCategoryModal(true)}
              className="bg-background-100 border border-primary-500 px-3 py-2 rounded-md"
            >
              <Text className="text-primary-500 font-medium text-sm">Categories</Text>
            </Button>
            <Button onPress={() => setShowAddModal(true)} className="bg-primary-500 px-3 py-2 rounded-md">
              <Plus size={16} color="white" />
              <Text className="text-white font-medium ml-1 text-sm">Add Item</Text>
            </Button>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <View key={category} className="mb-4">
              <Heading size="md" className="font-bold text-typography-900 mb-3">
                {category}
              </Heading>
              <View className="gap-1">
                {items.map((item) => (
                  <Card key={item.id} className="p-2 bg-white rounded-md border border-background-200">
                    <View className="flex-row items-center gap-2">
                      {/* Image */}
                      <View className="w-10 h-10 bg-background-100 rounded-md overflow-hidden border border-background-200">
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
                      
                      {/* Content */}
                      <View className="flex-1">
                        <Text className="font-bold text-typography-900 text-sm mb-1">{item.name}</Text>
                        <View className="flex-row items-center gap-1 mb-1">
                          <Badge 
                            action="info"
                            variant="solid"
                            size="sm"
                            className="bg-primary-500 rounded-full px-1.5 py-0.5"
                          >
                            <BadgeText className="text-white text-xs font-medium uppercase">
                              {item.category}
                            </BadgeText>
                          </Badge>
                          <Badge 
                            action={item.available ? 'success' : 'error'}
                            variant="solid"
                            size="sm"
                            className={`rounded-full px-1.5 py-0.5 ${
                              item.available ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            <BadgeText className="text-white text-xs font-medium">
                              {item.available ? 'Available' : 'Unavailable'}
                            </BadgeText>
                          </Badge>
                        </View>
                        <Text className="text-primary-500 font-bold text-base">₹{item.price}</Text>
                      </View>
                      
                      {/* Actions */}
                      <View className="flex-row items-center gap-4 ">
                        {/* <Pressable 
                          onPress={() => handleToggleAvailable(item.id)}
                          className="w-6 h-6 p-1 bg-background-100 rounded items-center justify-center"
                        >
                          <Switch 
                            value={item.available}
                            onValueChange={() => handleToggleAvailable(item.id)}
                            size="sm"
                          />
                        </Pressable> */}
                        <Pressable 
                          onPress={() => openEditModal(item)}
                          className="w-6 h-6 bg-blue-50 rounded items-center justify-center border border-blue-200"
                        >
                          <Edit size={12} color="#3b82f6" />
                        </Pressable>
                        <Pressable 
                          onPress={() => handleDeleteItem(item.id)}
                          className="w-6 h-6 bg-red-50 rounded items-center justify-center border border-red-200"
                        >
                          <Trash2 size={12} color="#ef4444" />
                        </Pressable>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalBackdrop />
        <ModalContent className="bg-white rounded-lg mx-4">
          <ModalHeader>
            <Heading size="lg" className="font-bold text-typography-900">
              Add Menu Item
            </Heading>
            <Text className="text-typography-600 text-sm">
              Add a new dish to your menu
            </Text>
            <ModalCloseButton>
              <X size={20} color="#6b7280" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View className="gap-4">
              <View>
                <Text className="font-medium text-typography-900 mb-2">Item Name</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="e.g., Paneer Butter Masala"
                    value={formData.name}
                    onChangeText={(value) => setFormData({ ...formData, name: value })}
                  />
                </Input>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Category</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="Select or type new"
                    value={formData.category}
                    onChangeText={(value) => setFormData({ ...formData, category: value })}
                  />
                </Input>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Price (₹)</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="0"
                    value={formData.price}
                    onChangeText={(value) => setFormData({ ...formData, price: value })}
                    keyboardType="numeric"
                  />
                </Input>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Image URL (optional)</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChangeText={(value) => setFormData({ ...formData, image: value })}
                  />
                </Input>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-typography-900">Available</Text>
                <Switch
                  value={formData.available}
                  onValueChange={(value) => setFormData({ ...formData, available: value })}
                />
              </View>
            </View>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleAddItem} className="w-full bg-primary-500">
              <Text className="text-white font-medium">Add Item</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Item Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <ModalBackdrop />
        <ModalContent className="bg-white rounded-lg mx-4">
          <ModalHeader>
            <Heading size="lg" className="font-bold text-typography-900">
              Edit Menu Item
            </Heading>
            <Text className="text-typography-600 text-sm">
              Update menu item details
            </Text>
            <ModalCloseButton>
              <X size={20} color="#6b7280" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View className="gap-4">
              <View>
                <Text className="font-medium text-typography-900 mb-2">Item Name</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="e.g., Paneer Butter Masala"
                    value={formData.name}
                    onChangeText={(value) => setFormData({ ...formData, name: value })}
                  />
                </Input>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Category</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="Select or type new"
                    value={formData.category}
                    onChangeText={(value) => setFormData({ ...formData, category: value })}
                  />
                </Input>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Price (₹)</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="0"
                    value={formData.price}
                    onChangeText={(value) => setFormData({ ...formData, price: value })}
                    keyboardType="numeric"
                  />
                </Input>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Image URL (optional)</Text>
                <Input variant="outline" size="md">
                  <InputField
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChangeText={(value) => setFormData({ ...formData, image: value })}
                  />
                </Input>
                {formData.image && (
                  <View className="mt-2 w-16 h-16 bg-background-100 rounded-lg overflow-hidden">
                    <Image 
                      source={{ uri: formData.image }} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                )}
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-typography-900">Available</Text>
                <Switch
                  value={formData.available}
                  onValueChange={(value) => setFormData({ ...formData, available: value })}
                />
              </View>
            </View>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleEditItem} className="w-full bg-primary-500">
              <Text className="text-white font-medium">Update Item</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Category Management Modal */}
      <Modal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
        <ModalBackdrop />
        <ModalContent className="bg-white rounded-lg mx-4">
          <ModalHeader>
            <Heading size="lg" className="font-bold text-typography-900">
              Manage Categories
            </Heading>
            <Text className="text-typography-600 text-sm">
              Add and manage menu categories
            </Text>
            <ModalCloseButton>
              <X size={20} color="#6b7280" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View className="gap-4">
              <View>
                <Text className="font-medium text-typography-900 mb-2">Add New Category</Text>
                <View className="flex-row gap-2">
                  <Input variant="outline" size="md" className="flex-1">
                    <InputField
                      placeholder="e.g., Appetizers"
                      value={newCategory}
                      onChangeText={setNewCategory}
                    />
                  </Input>
                  <Button onPress={handleAddCategory} className="bg-primary-500">
                    <Plus size={18} color="white" />
                  </Button>
                </View>
              </View>

              <View>
                <Text className="font-medium text-typography-900 mb-2">Existing Categories</Text>
                <View className="gap-2">
                  {categories.map((category) => (
                    <View key={category.id} className="flex-row items-center justify-between p-3 bg-background-50 rounded-lg">
                      <Text className="font-medium text-typography-900">{category.name}</Text>
                      <Badge 
                        action="info"
                        variant="solid"
                        size="sm"
                        className="bg-primary-100 rounded-full px-2 py-1"
                      >
                        <BadgeText className="text-primary-700 text-xs">
                          {menuItems.filter(item => item.category === category.name).length} items
                        </BadgeText>
                      </Badge>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};
