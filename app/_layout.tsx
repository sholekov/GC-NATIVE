import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="news" />
      <Stack.Screen name="register" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="station" />
    </Stack>
  );
}

export default StackLayout;
