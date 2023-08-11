
import { Stack } from "expo-router";

const StackLayout = () => {

  return (
    <Stack
      screenOptions={{
        
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="news" />
      <Stack.Screen name="register" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="station" options={{ headerShown: false, }} />
      
      <Stack.Screen name="pages/account/details" options={{ title: 'Profile', headerShown: true, }} />
      <Stack.Screen name="pages/account/favourites" options={{ title: 'Favourites', headerShown: true, }} />
      <Stack.Screen name="pages/account/payment-methods" options={{ title: 'Payment methods', headerShown: true, }} />
      
      <Stack.Screen name="languages" options={{ title: 'Languages', headerShown: true, }} />
      <Stack.Screen name="faqs" options={{ title: 'FAQs', headerShown: true, }} />
      <Stack.Screen name="how-work" options={{ title: 'How work', headerShown: true, }} />
    </Stack>
  );
}

export default StackLayout;
