import globalStyles from '@/assets/styles/styles';
const styles = { ...globalStyles };

import { Tabs } from 'expo-router';

import { Text, View, Image, Platform } from 'react-native';

import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useTranslation } from 'react-i18next';
export default () => {
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView style={{ ...styles.droidSafeArea }}>
      <SafeAreaProvider>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: () => null,
            tabBarActiveTintColor: '#5dac30',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarLabel: ({ color, focused }) => {
              if (route.name === 'home') {
                if (focused) {
                  return (<>
                    <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 31, width: 62, height: 62, }}>
                      <Image source={require('@/assets/logo-square.png')} style={{ width: 54, height: 54, }} />
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <Text style={{ fontWeight: '600', color: '#5dac30', }}>GIGA</Text>
                      <Text style={{ fontWeight: '600', }}>CHARGER</Text>
                    </View>
                  </>);
                } else {
                  return (<>
                    <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 31, width: 62, height: 62, marginTop: -42, }}>
                      <Image source={require('@/assets/logo-square-black-white.png')} style={{ width: 54, height: 54, }} />
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <Text style={{ fontWeight: '600', color: '#5dac30', }}>GIGA</Text>
                      <Text style={{ fontWeight: '600', }}>CHARGER</Text>
                    </View>
                  </>);
                }
              } else if (route.name === 'account') {
                return (<View style={{ justifyContent: 'center', alignItems: 'center', }}>
                  <FontAwesome5 name={'user-circle'} solid size={18} color={color} style={{ paddingTop: 4, }} />
                  <Text style={{ color: color, fontWeight: '500', }}>{t('common.navLabels.Account')}</Text>
                </View>)
              } else if (route.name === 'more') {
                return (<View style={{ justifyContent: 'center', alignItems: 'center', }}>
                  <FontAwesome5 name={'ellipsis-h'} solid size={18} color={color} style={{ paddingTop: 4, }} />
                  <Text style={{ color: color, fontWeight: '500', }}>{t('common.navLabels.More')}</Text>
                </View>)
              } else {
                return <Text></Text>
              }
            },
            tabBarStyle: {
            },
          })}
          initialRouteName='home'
        >
          <Tabs.Screen name="account" />
          <Tabs.Screen name="home" />
          <Tabs.Screen name="more" />
        </Tabs>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}