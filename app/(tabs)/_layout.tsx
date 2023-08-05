import { Tabs } from 'expo-router';

import { Text, View, Image } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default () => {
  return (
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
        tabBarStyle:{
          // backgroundColor: '#00000050',
        },
        tabBarItemStyle:{
        //   flex: 1,
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   alignContent: 'center',
        },
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
      <Tabs.Screen name="profile" options={{ }} />
      <Tabs.Screen name="home" options={{ }} />
      <Tabs.Screen name="more" options={{ }} />
      <Tabs.Screen name="(login)" options={{ href: null }} />
      <Tabs.Screen name="(loggedin)" options={{ href: null }} />
      <Tabs.Screen name="partials/(logout)" options={{ href: null }} />
    </Tabs>
  );
}