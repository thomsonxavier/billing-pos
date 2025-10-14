import { useAuthStore } from "@/lib/authStore";
import { useColorModeStore } from "@/lib/colorModeStore";
import { UserRole } from "@/types";
import { Fab, FabIcon } from "@/components/ui/fab";
import { MoonIcon, SunIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Spinner } from "@/components/ui/spinner";
import { Button, ButtonText } from "@/components/ui/button";
import { UtensilsCrossed, User, ChefHat } from "lucide-react-native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Alert } from "react-native";

// Constants
const ROLE_CONFIG = {
  admin: { 
    title: "Admin", 
    icon: User, 
    color: "rgb(51,51,51)",
    bgColor: "bg-info-100",
    borderColor: "border-info-300"
  },
  waiter: { 
    title: "Waiter", 
    icon: User, 
    color: "rgb(52,131,82)",
    bgColor: "bg-success-100",
    borderColor: "border-success-300"
  },
  kitchen: { 
    title: "Kitchen", 
    icon: ChefHat, 
    color: "rgb(231,129,40)",
    bgColor: "bg-tertiary-100",
    borderColor: "border-tertiary-300"
  },
} as const;

const DEMO_CREDENTIALS = {
  admin: { username: "admin", password: "admin123" },
  waiter: { username: "waiter1", password: "waiter123" },
  kitchen: { username: "kitchen1", password: "kitchen123" },
};

const DEMO_USERS = {
  admin: {
    id: "1",
    name: "Admin User",
    role: "admin" as UserRole,
    username: "admin",
    password: "admin123",
    isActive: true,
  },
  waiter: {
    id: "2",
    name: "Raj Kumar",
    role: "waiter" as UserRole,
    username: "waiter1",
    password: "waiter123",
    isActive: true,
  },
  kitchen: {
    id: "3",
    name: "Kitchen Staff",
    role: "kitchen" as UserRole,
    username: "kitchen1",
    password: "kitchen123",
    isActive: true,
  },
};

export default function AuthScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();
  const { login } = useAuthStore();

  // Animation values
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(50), []);
  const shakeAnim = useMemo(() => new Animated.Value(0), []);

  // Animation effects
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Reset error state when credentials change
  useEffect(() => {
    if (showError) {
      setShowError(false);
    }
  }, [username, password, showError]);

  const handleQuickLogin = useCallback((role: UserRole) => {
    const credentials = DEMO_CREDENTIALS[role];
    setUsername(credentials.username);
    setPassword(credentials.password);
    setShowError(false);
  }, []);

  const clearCredentials = useCallback(() => {
    setUsername("");
    setPassword("");
  }, []);

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const { colorMode, toggleColorMode } = useColorModeStore();

  const handleSignIn = async () => {
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by credentials
    const user = Object.values(DEMO_USERS).find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user);

      // Navigate based on role
      if (user.role === "admin") {
        router.replace("/(admin)/dashboard");
      } else if (user.role === "waiter") {
        router.replace("/(waiter)/dashboard");
      } else {
        router.replace("/(kitchen)/dashboard");
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowError(true);
      shakeAnimation();

      if (newAttempts >= 3) {
        Alert.alert(
          "Too Many Attempts",
          "You have exceeded the maximum number of login attempts. Please contact your administrator.",
          [{ text: "OK", onPress: () => setAttempts(0) }]
        );
      } else {
        Alert.alert(
          "Invalid Credentials",
          `Please enter the correct username and password.\nAttempts remaining: ${
            3 - newAttempts
          }`,
          [{ text: "OK", onPress: clearCredentials }]
        );
      }
    }

    setIsLoading(false);
  };

  const renderQuickLoginButton = useCallback(
    (role: UserRole) => {
      const config = ROLE_CONFIG[role];
      const IconComponent = config.icon;

      return (
        <Pressable
          key={role}
          onPress={() => handleQuickLogin(role)}
          className={`px-4 py-3 rounded-xl items-center min-w-20 ${config.bgColor} border ${config.borderColor}`}
          style={{
            elevation: 2,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}
        >
          <IconComponent
            size={20}
            color={config.color}
          />
          <Text className="font-bold mt-1 text-xs text-typography-700">
            {config.title}
          </Text>
        </Pressable>
      );
    },
    [handleQuickLogin]
  );

  return (
    <SafeAreaView
      className={`flex-1 ${colorMode === "dark" ? "dark" : ""} bg-background-0`}
    >
      <Animated.View
        className="flex-1 px-6 justify-center"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Card Container */}
        <Box
          className="bg-background-0 rounded-3xl p-8 shadow-2xl border border-outline-200"
          style={{ elevation: 8 }}
        >
          {/* Theme Toggle - Top Right */}
          <Box className="absolute top-4 right-4 z-10">
            <Fab onPress={toggleColorMode} className="bg-primary" size="sm">
              <FabIcon as={colorMode === "dark" ? SunIcon : MoonIcon} className="text-white" />
            </Fab>
          </Box>

          {/* Header */}
          <VStack className="items-center mb-8 mt-4">
            <Box className="bg-primary p-4 rounded-2xl mb-4">
              <UtensilsCrossed size={32} color="#FFFFFF" />
            </Box>
            <Heading size="2xl" className="font-bold text-typography-900 mb-2">
              Restaurant POS
            </Heading>
            <Text className="text-sm text-typography-600 text-center">
              Sign in to access your dashboard
            </Text>
          </VStack>

          {/* Username Input */}
          <VStack className="mb-4">
            <Text className="text-base font-semibold text-typography-900 mb-2">
              Username
            </Text>
            <Input className="bg-background-0 border-outline-300" size="lg">
              <InputField
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                type="text"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Input>
          </VStack>

          {/* Password Input */}
          <VStack className="mb-6">
            <Text className="text-base font-semibold text-typography-900 mb-2">
              Password
            </Text>
            <Input className="bg-background-0 border-outline-300" size="lg">
              <InputField
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                type="password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Input>
          </VStack>

          {/* Error Message */}
          {showError && (
            <Animated.View
              className="mb-4 px-3 py-2 bg-error-100 border border-error-300 rounded-lg"
              style={{ opacity: fadeAnim }}
            >
              <Text className="text-error-700 font-medium text-center text-sm">
                Invalid credentials. Please try again.
              </Text>
            </Animated.View>
          )}

          {/* Sign In Button */}
          <Button
            onPress={handleSignIn}
            isDisabled={!username.trim() || !password.trim() || isLoading}
            className={`rounded-xl mb-6 ${
              username.trim() && password.trim() && !isLoading
                ? "bg-primary"
                : "bg-outline-300"
            }`}
            size="lg"
          >
            {isLoading ? (
              <HStack className="items-center gap-2">
                <Spinner color="white" size="small" />
                <ButtonText className="text-white">Signing In...</ButtonText>
              </HStack>
            ) : (
              <ButtonText className="text-white">Sign In</ButtonText>
            )}
          </Button>

          {/* Divider */}
          <HStack className="items-center mb-6">
            <Box className="flex-1 h-px bg-outline-300" />
            <Text className="mx-4 text-sm text-typography-600 font-medium">
              QUICK LOGIN
            </Text>
            <Box className="flex-1 h-px bg-outline-300" />
          </HStack>

          {/* Quick Login Buttons */}
          <HStack className="justify-around mb-6">
            {(Object.keys(ROLE_CONFIG) as UserRole[]).map(
              renderQuickLoginButton
            )}
          </HStack>

          {/* Demo Credentials */}
          <Box className="bg-background-muted rounded-xl p-4 border border-outline-200">
            <Text className="text-sm font-semibold text-typography-800 mb-3 text-center">
              Demo Credentials
            </Text>
            <VStack className="gap-2">
              <Text className="text-xs text-typography-600 text-center">
                Admin: admin / admin123
              </Text>
              <Text className="text-xs text-typography-600 text-center">
                Waiter: waiter1 / waiter123
              </Text>
              <Text className="text-xs text-typography-600 text-center">
                Kitchen: kitchen1 / kitchen123
              </Text>
            </VStack>
          </Box>
        </Box>
      </Animated.View>
    </SafeAreaView>
  );
}
