import { Stack } from "expo-router";
import "@/global.css";
import { AppProviders } from "@/providers/AppProviders";
import { useColorModeStore } from "@/lib/colorModeStore";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useAuthStore } from "@/lib/authStore";

export default function RootLayout() {
  const { colorMode } = useColorModeStore();
  const { isAuthenticated, user } = useAuthStore();
  return (
    <GluestackUIProvider mode={colorMode}>
      <ThemeProvider value={colorMode === "dark" ? DarkTheme : DefaultTheme}>
        <AppProviders>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isAuthenticated && user ? true : false}>
              <Stack.Screen name="(routes)" />
            </Stack.Protected>
            <Stack.Screen name="(auth)" />
          </Stack>
        </AppProviders>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
