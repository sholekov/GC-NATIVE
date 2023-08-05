import global from '@/assets/styles/styles';
import home from '@/assets/styles/home';
const styles = { ...global, ...home };

import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Link } from 'expo-router';

import LoggedIn from '@/app/(tabs)/(loggedin)'
import Login from '@/app/(tabs)/(login)'

import { useSnapshot } from 'valtio'
import { store } from '@/store'

const MyComponent = () => {
  const { user } = useSnapshot(store)
  const mapRef = useRef(null);

	return (
		<View style={{ flex: 1 }}>
		{/* <TouchableOpacity style={{ flex: 1 }} onPress={someFunction}>
			<Text>Welcome</Text>
		</TouchableOpacity> */}
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: 0 }}
          initialRegion={{
            latitude: 43.828805,
            longitude: 25.9582707,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        </MapView>
        {
          user ? (<></>) : (
            /* Blurry Overlay */
            <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'white', opacity: 0.85, }}>
              {/* <Image source={require('@/assets/blurredImage.png')} style={styles.image} /> */}
            </View>
          )
        }
      { user ? <LoggedIn /> : <Login /> }
		</View>
	);
};

export default MyComponent;