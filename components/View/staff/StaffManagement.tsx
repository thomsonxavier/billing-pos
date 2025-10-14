import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { Switch } from '@/components/ui/switch';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { 
  Modal, 
  ModalBackdrop, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon, UserPlus, Edit, Trash2, CheckCircle } from 'lucide-react-native';
import { useStaffStore } from '@/lib/staffStore';
import { useColorModeStore } from '@/lib/colorModeStore';
import { User, UserRole } from '@/types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: Omit<User, 'id'>) => void;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUser: (id: string, userData: Partial<User>) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'waiter' as UserRole,
    isActive: true,
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.username || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    onAddUser(formData);
    setFormData({
      name: '',
      username: '',
      password: '',
      role: 'waiter',
      isActive: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="bg-white rounded-2xl mx-4">
        <ModalHeader className="p-4 pb-2">
          <HStack space="md" className="items-center justify-between">
            <VStack space="xs">
              <Heading size="lg" className="text-gray-900 font-bold">Create New User</Heading>
              <Text size="sm" className="text-gray-600">Add a new staff member to the system</Text>
            </VStack>
            <ModalCloseButton className="p-1">
              <Edit size={20} className="text-gray-500" />
            </ModalCloseButton>
          </HStack>
        </ModalHeader>
        <ModalBody className="px-4">
          <VStack space="md">
            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Full Name</Text>
              <Input className="border border-gray-200 rounded-lg">
                <InputField
                  placeholder="Enter full name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  className="px-4 py-3"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Username</Text>
              <Input className="border border-gray-200 rounded-lg">
                <InputField
                  placeholder="Enter username"
                  value={formData.username}
                  onChangeText={(text) => setFormData({ ...formData, username: text })}
                  className="px-4 py-3"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Password</Text>
              <Input className="border border-gray-200 rounded-lg">
                <InputField
                  placeholder="Enter password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  className="px-4 py-3"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Role</Text>
              <Select
                selectedValue={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
              >
                <SelectTrigger variant="outline" size="md" className="border border-gray-200 rounded-lg">
                  <SelectInput placeholder="Select role" className="px-4 py-3" />
                  <SelectIcon>
                    <ChevronDownIcon size={16} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Admin" value="admin" />
                    <SelectItem label="Waiter/Cashier" value="waiter" />
                    <SelectItem label="Kitchen Staff" value="kitchen" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>

            <HStack space="sm" className="items-center justify-between">
              <Text size="sm" className="font-semibold text-gray-700">Active Account</Text>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => setFormData({ ...formData, isActive: value })}
              />
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter className="p-4 pt-2">
          <Button onPress={handleSubmit} className="flex-1 bg-blue-600 rounded-lg py-2">
            <ButtonText className="text-white font-semibold">Create User</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'waiter' as UserRole,
    isActive: true,
  });

  // Update form data when user changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username || '',
        password: '', // Don't show existing password
        role: user.role,
        isActive: user.isActive,
      });
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user || !formData.name || !formData.username) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const updateData: Partial<User> = {
      name: formData.name,
      username: formData.username,
      role: formData.role,
      isActive: formData.isActive,
    };

    // Only include password if it's provided
    if (formData.password) {
      updateData.password = formData.password;
    }

    onUpdateUser(user.id, updateData);
    setFormData({
      name: '',
      username: '',
      password: '',
      role: 'waiter',
      isActive: true,
    });
    onClose();
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="bg-white rounded-2xl mx-4">
        <ModalHeader className="p-4 pb-2">
          <HStack space="md" className="items-center justify-between">
            <VStack space="xs">
              <Heading size="lg" className="text-gray-900 font-bold">Edit User</Heading>
              <Text size="sm" className="text-gray-600">Update staff member information</Text>
            </VStack>
            <ModalCloseButton className="p-1">
              <Edit size={20} className="text-gray-500" />
            </ModalCloseButton>
          </HStack>
        </ModalHeader>
        <ModalBody className="px-4">
          <VStack space="md">
            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Full Name</Text>
              <Input className="border border-gray-200 rounded-lg">
                <InputField
                  placeholder="Enter full name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  className="px-4 py-3"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Username</Text>
              <Input className="border border-gray-200 rounded-lg">
                <InputField
                  placeholder="Enter username"
                  value={formData.username}
                  onChangeText={(text) => setFormData({ ...formData, username: text })}
                  className="px-4 py-3"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Password (leave blank to keep current)</Text>
              <Input className="border border-gray-200 rounded-lg">
                <InputField
                  placeholder="Enter new password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  className="px-4 py-3"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="font-semibold text-gray-700">Role</Text>
              <Select
                selectedValue={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
              >
                <SelectTrigger variant="outline" size="md" className="border border-gray-200 rounded-lg">
                  <SelectInput placeholder="Select role" className="px-4 py-3" />
                  <SelectIcon>
                    <ChevronDownIcon size={16} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Admin" value="admin" />
                    <SelectItem label="Waiter/Cashier" value="waiter" />
                    <SelectItem label="Kitchen Staff" value="kitchen" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>

            <HStack space="sm" className="items-center justify-between">
              <Text size="sm" className="font-semibold text-gray-700">Active Account</Text>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => setFormData({ ...formData, isActive: value })}
              />
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter className="p-4 pt-2">
          <Button onPress={handleSubmit} className="flex-1 bg-blue-600 rounded-lg py-2">
            <ButtonText className="text-white font-semibold">Update User</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const StaffManagement: React.FC = () => {
  const { staff, addStaff, updateStaff, deleteStaff, toggleStaffStatus } = useStaffStore();
  const { colorMode } = useColorModeStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDeleteStaff = (id: string, name: string) => {
    Alert.alert(
      'Delete Staff Member',
      `Are you sure you want to delete ${name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteStaff(id) },
      ]
    );
  };

  const handleEditStaff = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleUpdateStaff = (id: string, userData: Partial<User>) => {
    updateStaff(id, userData);
    setShowEditModal(false);
    setEditingUser(null);
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100';
      case 'waiter':
        return 'bg-green-100';
      case 'kitchen':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'waiter':
        return 'Waiter';
      case 'kitchen':
        return 'Kitchen';
      default:
        return role;
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${colorMode === 'dark' ? 'dark' : ''} bg-background-0`} edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="p-6">
          {/* Header */}
          <HStack space="md" className="items-start justify-between">
            <VStack space="xs" className="flex-1">
              <Heading size="2xl" className="text-typography-900 font-bold">User Management</Heading>
              <Text size="md" className="text-typography-600">Manage staff accounts and permissions.</Text>
            </VStack>
            <Button 
              onPress={() => setShowAddModal(true)}
              className="bg-blue-600 rounded-lg px-4 py-2"
            >
              <UserPlus size={18} className="text-white mr-2" />
              <ButtonText className="text-white font-medium">Add User</ButtonText>
            </Button>
          </HStack>

          {/* Staff List */}
          <VStack space="sm">
            {staff.map((member) => (
              <Card key={member.id} className="bg-background-50 rounded-xl border border-border-200 p-4">
                <HStack space="md" className="items-center justify-between">
                  <HStack space="sm" className="items-center flex-1">
                    <CheckCircle size={20} className="text-green-500" />
                    <VStack space="xs" className="flex-1">
                      <Text size="lg" className="font-bold text-typography-900">{member.name}</Text>
                      <HStack space="sm" className="items-center">
                        <Badge className={`${getRoleColor(member.role)} rounded-full px-3 py-1`}>
                          <BadgeText className="text-xs font-semibold uppercase">{getRoleLabel(member.role)}</BadgeText>
                        </Badge>
                        <Text size="sm" className="text-typography-500">@{member.username}</Text>
                      </HStack>
                      <HStack space="sm" className="items-center">
                        <Text size="sm" className="text-typography-500">Active</Text>
                        <Switch
                          value={member.isActive}
                          onValueChange={() => toggleStaffStatus(member.id)}
                        />
                      </HStack>
                    </VStack>
                  </HStack>
                  
                  <HStack space="xs">
                    <Pressable 
                      className="p-2 bg-gray-50 rounded-lg"
                      onPress={() => handleEditStaff(member)}
                    >
                      <Edit size={16} className="text-gray-500" />
                    </Pressable>
                    <Pressable 
                      className="p-2 bg-red-50 rounded-lg"
                      onPress={() => handleDeleteStaff(member.id, member.name)}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Pressable>
                  </HStack>
                </HStack>
              </Card>
            ))}
          </VStack>
        </VStack>
      </ScrollView>

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddUser={addStaff}
      />

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onUpdateUser={handleUpdateStaff}
      />
    </SafeAreaView>
  );
};

export default StaffManagement;
