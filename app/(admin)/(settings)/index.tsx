import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { Switch } from '@/components/ui/switch';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { 
  Select, 
  SelectTrigger, 
  SelectInput, 
  SelectIcon, 
  SelectPortal, 
  SelectBackdrop, 
  SelectContent, 
  SelectDragIndicatorWrapper, 
  SelectDragIndicator, 
  SelectItem 
} from '@/components/ui/select';
import { 
  ChevronDownIcon, 
  Home, 
  Printer, 
  Moon, 
  Sun, 
  LogOut, 
  Settings as SettingsIcon,
  Bell,
  Volume2,
  Database
} from 'lucide-react-native';
import { useColorModeStore } from '@/lib/colorModeStore';
import { useAuthStore } from '@/lib/authStore';
import { useRouter } from 'expo-router';

export default function Settings() {
  const { colorMode, toggleColorMode } = useColorModeStore();
  const { logout } = useAuthStore();
  const router = useRouter();
  
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'My Restaurant',
    address: '123 MG Road, Bangalore - 560001',
    phone: '+91 9876543210',
    gstNumber: '29ABCDE1234F1',
  });

  const [printerSettings, setPrinterSettings] = useState({
    printerName: 'Default Printer',
    printerType: 'thermal',
    paperSize: '80mm',
    autoPrint: true,
    printLogo: true,
    printFooter: true,
  });

  const [appSettings, setAppSettings] = useState({
    notifications: true,
    soundEnabled: true,
    autoBackup: true,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
    logout();
    router.replace('/(auth)');
          }
        },
      ]
    );
  };

  const handleSaveRestaurant = () => {
    Alert.alert('Success', 'Restaurant information saved successfully!');
  };

  const handleSavePrinter = () => {
    Alert.alert('Success', 'Printer settings saved successfully!');
  };

  const handleSaveApp = () => {
    Alert.alert('Success', 'App settings saved successfully!');
  };

  return (
    <SafeAreaView className={`flex-1 ${colorMode === 'dark' ? 'dark' : ''} bg-background-0`} edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="p-6">
        {/* Header */}
          <VStack space="xs">
            <Heading size="2xl" className="text-typography-900 font-bold">Settings</Heading>
            <Text size="md" className="text-typography-600">Configure restaurant and system settings</Text>
          </VStack>

          {/* Restaurant Information */}
          <Card className="bg-background-50 rounded-xl border border-border-200 p-4">
            <VStack space="md">
              <HStack space="sm" className="items-center">
                <Home size={20} className="text-primary-600" />
                <Heading size="lg" className="text-typography-900 font-bold">Restaurant Information</Heading>
              </HStack>

              <VStack space="md">
                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-700">Restaurant Name</Text>
                  <Input className="border border-border-200 rounded-lg">
                    <InputField
                      placeholder="Enter restaurant name"
                      value={restaurantInfo.name}
                      onChangeText={(text) => setRestaurantInfo({ ...restaurantInfo, name: text })}
                      className="px-4 py-3"
                    />
                  </Input>
                </VStack>

                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-700">Address</Text>
                  <Input className="border border-border-200 rounded-lg">
                    <InputField
                      placeholder="Enter restaurant address"
                      value={restaurantInfo.address}
                      onChangeText={(text) => setRestaurantInfo({ ...restaurantInfo, address: text })}
                      className="px-4 py-3"
                    />
                  </Input>
                </VStack>

                <HStack space="md">
                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="font-semibold text-typography-700">Phone</Text>
                    <Input className="border border-border-200 rounded-lg">
                      <InputField
                        placeholder="Enter phone number"
                        value={restaurantInfo.phone}
                        onChangeText={(text) => setRestaurantInfo({ ...restaurantInfo, phone: text })}
                        className="px-4 py-3"
                      />
                    </Input>
                  </VStack>
                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="font-semibold text-typography-700">GST Number</Text>
                    <Input className="border border-border-200 rounded-lg">
                      <InputField
                        placeholder="Enter GST number"
                        value={restaurantInfo.gstNumber}
                        onChangeText={(text) => setRestaurantInfo({ ...restaurantInfo, gstNumber: text })}
                        className="px-4 py-3"
                      />
                    </Input>
                  </VStack>
                </HStack>

                <Button onPress={handleSaveRestaurant} className="bg-primary-600 rounded-lg py-2">
                  <ButtonText className="text-white font-semibold">Save Restaurant Info</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Card>

          {/* App Settings */}
          <Card className="bg-background-50 rounded-xl border border-border-200 p-4">
            <VStack space="md">
              <HStack space="sm" className="items-center">
                <SettingsIcon size={20} className="text-success-600" />
                <Heading size="lg" className="text-typography-900 font-bold">App Settings</Heading>
              </HStack>

              <VStack space="md">
                {/* Theme Toggle */}
                <HStack space="sm" className="items-center justify-between">
                  <HStack space="sm" className="items-center">
                    {colorMode === 'light' ? <Sun size={20} className="text-warning-600" /> : <Moon size={20} className="text-info-600" />}
                    <Text size="md" className="font-medium text-typography-700">Theme</Text>
                  </HStack>
                  <Pressable onPress={toggleColorMode} className="p-2 bg-background-100 rounded-lg">
                    <Text size="sm" className="font-medium text-typography-700 capitalize">{colorMode}</Text>
                  </Pressable>
                </HStack>

                {/* Notifications */}
                <HStack space="sm" className="items-center justify-between">
                  <HStack space="sm" className="items-center">
                    <Bell size={20} className="text-warning-600" />
                    <Text size="md" className="font-medium text-typography-700">Notifications</Text>
                  </HStack>
                  <Switch
                    value={appSettings.notifications}
                    onValueChange={(value) => setAppSettings({ ...appSettings, notifications: value })}
                  />
                </HStack>

                {/* Sound */}
                <HStack space="sm" className="items-center justify-between">
                  <HStack space="sm" className="items-center">
                    <Volume2 size={20} className="text-tertiary-600" />
                    <Text size="md" className="font-medium text-typography-700">Sound</Text>
                  </HStack>
                  <Switch
                    value={appSettings.soundEnabled}
                    onValueChange={(value) => setAppSettings({ ...appSettings, soundEnabled: value })}
                  />
                </HStack>

                {/* Auto Backup */}
                <HStack space="sm" className="items-center justify-between">
                  <HStack space="sm" className="items-center">
                    <Database size={20} className="text-success-600" />
                    <Text size="md" className="font-medium text-typography-700">Auto Backup</Text>
                  </HStack>
                  <Switch
                    value={appSettings.autoBackup}
                    onValueChange={(value) => setAppSettings({ ...appSettings, autoBackup: value })}
                  />
                </HStack>

                <Button onPress={handleSaveApp} className="bg-success-600 rounded-lg py-2">
                  <ButtonText className="text-white font-semibold">Save App Settings</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Card>

          {/* Printer Settings */}
          <Card className="bg-background-50 rounded-xl border border-border-200 p-4">
            <VStack space="md">
              <HStack space="sm" className="items-center">
                <Printer size={20} className="text-error-600" />
                <Heading size="lg" className="text-typography-900 font-bold">Printer Settings</Heading>
              </HStack>

              <VStack space="md">
                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-700">Printer Name</Text>
                  <Input className="border border-border-200 rounded-lg">
                    <InputField
                      placeholder="Enter printer name"
                      value={printerSettings.printerName}
                      onChangeText={(text) => setPrinterSettings({ ...printerSettings, printerName: text })}
                      className="px-4 py-3"
                    />
                  </Input>
                </VStack>

                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-700">Printer Type</Text>
                  <Select
                    selectedValue={printerSettings.printerType}
                    onValueChange={(value) => setPrinterSettings({ ...printerSettings, printerType: value })}
                  >
                    <SelectTrigger variant="outline" size="md" className="border border-border-200 rounded-lg">
                      <SelectInput placeholder="Select printer type" className="px-4 py-3" />
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
                        <SelectItem label="Thermal" value="thermal" />
                        <SelectItem label="Inkjet" value="inkjet" />
                        <SelectItem label="Laser" value="laser" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </VStack>

                <VStack space="xs">
                  <Text size="sm" className="font-semibold text-typography-700">Paper Size</Text>
                  <Select
                    selectedValue={printerSettings.paperSize}
                    onValueChange={(value) => setPrinterSettings({ ...printerSettings, paperSize: value })}
                  >
                    <SelectTrigger variant="outline" size="md" className="border border-border-200 rounded-lg">
                      <SelectInput placeholder="Select paper size" className="px-4 py-3" />
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
                        <SelectItem label="58mm" value="58mm" />
                        <SelectItem label="80mm" value="80mm" />
                        <SelectItem label="A4" value="A4" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </VStack>

                {/* Printer Options */}
                <VStack space="sm">
                  <HStack space="sm" className="items-center justify-between">
                    <Text size="md" className="font-medium text-typography-700">Auto Print</Text>
                    <Switch
                      value={printerSettings.autoPrint}
                      onValueChange={(value) => setPrinterSettings({ ...printerSettings, autoPrint: value })}
                    />
                  </HStack>

                  <HStack space="sm" className="items-center justify-between">
                    <Text size="md" className="font-medium text-typography-700">Print Logo</Text>
                    <Switch
                      value={printerSettings.printLogo}
                      onValueChange={(value) => setPrinterSettings({ ...printerSettings, printLogo: value })}
                    />
                  </HStack>

                  <HStack space="sm" className="items-center justify-between">
                    <Text size="md" className="font-medium text-typography-700">Print Footer</Text>
                    <Switch
                      value={printerSettings.printFooter}
                      onValueChange={(value) => setPrinterSettings({ ...printerSettings, printFooter: value })}
                    />
                  </HStack>
                </VStack>

                <Button onPress={handleSavePrinter} className="bg-error-600 rounded-lg py-2">
                  <ButtonText className="text-white font-semibold">Save Printer Settings</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Card>

          {/* Logout Section */}
          <Card className="bg-background-50 rounded-xl border border-border-200 p-4">
            <VStack space="md">
              <HStack space="sm" className="items-center">
                <LogOut size={20} className="text-error-600" />
                <Heading size="lg" className="text-typography-900 font-bold">Account</Heading>
              </HStack>

              <Button onPress={handleLogout} className="bg-error-600 rounded-lg py-3">
                <LogOut size={20} className="text-white mr-2" />
                <ButtonText className="text-white font-semibold">Logout</ButtonText>
              </Button>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
