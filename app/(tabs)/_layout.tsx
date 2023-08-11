import global from '@/assets/styles/styles';
const styles = { ...global };

import { Tabs } from 'expo-router';

import { Text, View, Image, Platform } from 'react-native';

import { GestureHandlerRootView, ScrollView, } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default () => {
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
                    <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 31, width: 62, height: 62, marginTop: -42, }}>
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
                return (<>
                  <FontAwesome5 name={'user-circle'} solid size={18} color={color} style={{ paddingTop: 4, }} />
                  <Text style={{ color: color, fontWeight: '500', }}>Account</Text>
                </>)
              } else if (route.name === 'more') {
                return (<>
                  <FontAwesome5 name={'ellipsis-h'} solid size={18} color={color} style={{ paddingTop: 4, }} />
                  <Text style={{ color: color, fontWeight: '500', }}>More</Text>
                </>)
              } else {
                return <Text></Text>
              }
            },
            tabBarStyle: {
              paddingTop: 4,
              backgroundColor: 'white',
              paddingBottom: Platform.OS === 'android' ? 4 : 24,
            },

          })}
          initialRouteName='home'
        >
          <Tabs.Screen name="account" />
          <Tabs.Screen name="home" />
          <Tabs.Screen name="more" />
          <Tabs.Screen name="(login)" options={{ href: null }} />
          <Tabs.Screen name="(loggedin)" options={{ href: null }} />
        </Tabs>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}