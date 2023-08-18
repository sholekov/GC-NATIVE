import global from '@/assets/styles/styles';
import home from '@/assets/styles/home';
const styles = { ...global, ...home };

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Pressable, } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// Components
import LoggedIn from '@/app/(tabs)/(loggedin)'
import Login from '@/app/(tabs)/(login)'
import CustomCalloutComponent from '@/app/partials/CustomCallout'

import { useSnapshot } from 'valtio'
import { getStations, getStation } from '@/helpers'
import { store, setupStationLocation, setStations } from '@/store'

import { usePlace } from '@/app/hooks/usePlace'

const Home = () => {
  // const handleUserPermissionLocation = async () => {
  //   // Request permission to access the location
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     Alert.alert('Permission to access location was denied');
  //     return;
  //   }
  // }
  // useEffect(() => {
  //   handleUserPermissionLocation();
  // }, []);
  const { stations } = useSnapshot(store)
  const { user } = useSnapshot(store)

  const loadStations = async () => {
    try {
      if (user) {
        getStations()
          .then(response => {
            setStations(response.data);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          })
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    loadStations()
  }, [user?.id]);

  const { PlaceBottomSheetComponent, placeSheetRef, selectedStation, setSelectedStation } = usePlace();

  const mapRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [blockView, setBlockView] = useState(false);
  const handleSelectedPlace = (station, index) => {
    setSelectedStation(null)
    setupStationLocation(null)
    mapRef.current.animateToRegion(
      {
        latitude: station.lat - 0.025, longitude: station.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      250
    )
    placeSheetRef.current.snapToIndex(0)
    setBlockView(true)
    getStation(station.id)
      .then(response => {
        const selected_station = { data: station, stations: response.data };
        setSelectedStation(selected_station)
        setupStationLocation(station)
      })
  }


  const markerRefs = useRef([]);
  const handleSheetChanges: Function = (index, coords) => {
    if (index === -1 && coords.lat && coords.lng) {
      mapRef.current.animateToRegion(
        {
          latitude: coords.lat - 0.015, longitude: coords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        150
      )
      markerRefs.current.forEach(marker => {
        marker.hideCallout();
      });
      setBlockView(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        showsUserLocation={true}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: 0 }}
        initialRegion={{
          latitude: 43.828805 + 0.02,
          longitude: 25.9582707,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => { placeSheetRef.current.close() }}>
        {
          stations?.map((place, index) => (
            <Marker
              ref={(ref) => markerRefs.current[index] = ref}
              key={place.id}
              coordinate={{ latitude: parseFloat(place.lat), longitude: parseFloat(place.lng) }}
              title={place.name}
              description={place.region}
              onPress={() => handleSelectedPlace(place, index)}
              image={ require('@/assets/images/pin-gigacharger.png') }
            >
              <CustomCalloutComponent name={place.name} region={place.region} />
            </Marker>
          ))
        }
      </MapView>
      {user ? (<>
        <LoggedIn />
        {blockView && <Pressable onTouchMove={() => { setBlockView(false); placeSheetRef.current.close() }} onPress={() => { setBlockView(false); placeSheetRef.current.close() }} style={{ ...StyleSheet.absoluteFillObject, }}></Pressable>}
        <PlaceBottomSheetComponent placeSheetRef={placeSheetRef} selectedStation={selectedStation} handleSheetChanges={handleSheetChanges} />
      </>) : (
        /* Blurry Overlay */
        <>
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'white', opacity: 0.85, }}>
            {/* <Image source={require('@/assets/blurredImage.png')} style={styles.image} /> */}
          </View>
          <Login />
        </>)}
      {isLoading && <ActivityIndicator size="large" style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: 1, backgroundColor: 'white', opacity: .8, }} />}
    </View>
  );
};

export default Home;