import { Tabs } from 'expo-router';

import { Text, View, Image } from 'react-native';

import { GestureHandlerRootView, ScrollView, } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';

              if (route.name === 'home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'profile') {
                iconName = focused ? 'user-circle' : 'user-circle';
                // iconName = focused ? 'battery-charging' : 'battery-charging';
              } else if (route.name === 'more') {
                iconName = focused ? 'ellipsis-h' : 'ellipsis-h'; // Change the icon to something appropriate for a menu
              }

              if (iconName === 'home') {
                return (
                  <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 31, width: 62, height: 62, marginTop: -42, }}>
                    <Image source={require('@/assets/logo-square.png')} style={{ width: 54, height: 54, }} />
                  </View>
                );
              } else if (iconName === 'home-outline') {
                return (
                  <View style={{ borderWidth: 4, borderColor: 'white', borderRadius: 31, width: 62, height: 62, marginTop: -42, }}>
                    <Image source={require('@/assets/logo-square-black-white.png')} style={{ width: 54, height: 54, }} />
                  </View>
                );
              } else {
                return <FontAwesome5 name={iconName} solid size={size} color={color} style={{ paddingTop: 0, }} />;
              }
            },
            tabBarActiveTintColor: '#5dac30',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarLabel: ({ focused }) => {
              if (route.name === 'home') {
                return <Text>GIGACHARGER</Text>
              } else if (route.name === 'profile') {
                return <Text>Profile</Text>
              } else if (route.name === 'more') {
                return <Text>More</Text>
              } else {
                return <Text></Text>
              }
            },
          })}
          initialRouteName='home'
        >
          <Tabs.Screen name="profile" />
          <Tabs.Screen name="home" />
          <Tabs.Screen name="more" />
          <Tabs.Screen name="(login)" options={{ href: null }} />
          <Tabs.Screen name="(loggedin)" options={{ href: null }} />
          <Tabs.Screen name="partials/(logout)" options={{ href: null }} />
          <Tabs.Screen name="partials/(station_row)" options={{ href: null }} />
          <Tabs.Screen name="partials/(place)" options={{ href: null }} />
          <Tabs.Screen name="partials/(placeHeading)" options={{ href: null }} />
          <Tabs.Screen name="partials/(placeFavourite)" options={{ href: null }} />
          <Tabs.Screen name="partials/(placeAccessAndDirections)" options={{ href: null }} />
        </Tabs>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}