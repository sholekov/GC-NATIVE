import { Stack } from "expo-router";


import { useSnapshot } from 'valtio'
import { store } from '@/store'
const StackLayout = () => {
  const { station_location } = useSnapshot(store)

  return (
    <Stack
      screenOptions={{
        
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="news" />
      <Stack.Screen name="register" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="station" options={{ title: station_location?.name, }} />
    </Stack>
  );
}

export default StackLayout;
