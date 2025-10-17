import {  Stack, usePathname } from "expo-router";


export default function SettingsLayout() {
  const pathname = usePathname();
  return (
    <Stack screenOptions={{ headerShown: pathname === '/(admin)/(settings)/staff' ? true : false }}>
      <Stack.Screen name="staff" options={{ title: 'Staff', headerShown: pathname === '/(admin)/(settings)/staff' ? true : false }} />
    </Stack>
  );
}