import { Stack } from "expo-router";

import { useTranslation } from 'react-i18next';
const StackLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }} />
  );
}

export default StackLayout;


{/* <Stack.Screen name="SplashScreen" options={{ headerShown: false }} /> */ }

{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ presentation: 'modal', headerShown: false, }} />
      <Stack.Screen name="station" options={{ headerShown: false, }} />

      <Stack.Screen name="account/details" options={{ title: t('account.tabLabels.details'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="account/favourites" options={{ title: t('account.tabLabels.favourites'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="account/wallet" options={{ title: t('account.tabLabels.wallet'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="account/office" options={{ presentation:'modal', headerShown: false, }} />
      <Stack.Screen name="account/paypal-checkout" options={{ presentation:'modal', headerShown: false, }} />
      <Stack.Screen name="account/revolut-pay" options={{ presentation:'modal', headerShown: false, }} />
      <Stack.Screen name="account/bank-card" options={{ presentation:'modal', headerShown: false, }} />
      <Stack.Screen name="account/transaction" options={{ presentation:'modal', headerShown: false, }} />
      <Stack.Screen name="account/payment-methods" options={{ title: t('account.tabLabels.payment-methods'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="account/transactions" options={{ title: t('account.tabLabels.transactions'), headerShown: true, headerTitleAlign: 'center', }} />

      <Stack.Screen name="news" options={{ title: t('more.news'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="faqs" options={{ title: t('more.faqs.page-title'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="how-work" options={{ title: t('more.guide.page-title'), headerShown: true, headerTitleAlign: 'center', }} />
      <Stack.Screen name="languages" options={{ title: t('more.language.page-title'), headerShown: true, headerTitleAlign: 'center', }} /> */}

    // </Stack>