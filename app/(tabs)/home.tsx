const isSimulator = () => {
  let isSim = false;
  if (Constants.isDevice) {
    if (Platform.OS === 'ios') {
      isSim = !Constants.isDevice && Constants.deviceName !== 'iPhone Simulator';
    } else {
      isSim = !Constants.isDevice;
    }
  } else {
    isSim = true;
  }
  return isSim;
};

import globalStyles from '@/assets/styles/styles';
import homeStyles from '@/assets/styles/home';
const styles = { ...globalStyles, ...homeStyles };

import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, Pressable, Alert, Platform, } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// Components
import LoggedIn from '@/app/(tabs)/(loggedin)'
import Login from '@/app/(tabs)/(login)'
import CustomCalloutComponent from '@/app/partials/CustomCallout'

import { useSnapshot } from 'valtio'
import { getStations, getStation } from '@/helpers'
import { store, setupStationLocation, setStations } from '@/store'

import { usePlace } from '@/app/hooks/usePlace'

import { useTranslation } from 'react-i18next';
const HomeComponent = () => {
  const { t } = useTranslation();
  const { user } = useSnapshot(store)
  const { stations } = useSnapshot(store)

  const [userLocation, setUserLocation] = useState({ latitude: 43.828805, longitude: 25.9582707 });
  const handleUserLocation = async () => {
    if (!isSimulator()) {
      // Request permission to access the location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = location.coords; 
    setUserLocation(coords)
  }
  useEffect(() => {
    handleUserLocation();
  }, []);

  const loadStations = async () => {
    try {
      if (user) {
        setIsLoading(true)
        getStations()
          .then(response => {
            setStations(response.data);
            setTimeout(() => {
              setIsLoading(false)
            }, 750);
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
    mapRef.current.animateToRegion({
      latitude: station.lat - 0.025, longitude: station.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 250)
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
      mapRef.current.animateToRegion({
        latitude: coords.lat - 0.015, longitude: coords.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 150)
      markerRefs.current.forEach(marker => {
        marker.hideCallout();
      });
      setBlockView(false)
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        initialRegion={{
          latitude: userLocation.latitude + 0.02,
          longitude: userLocation.longitude,
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
              image={require('@/assets/images/pin-gigacharger.png')}
            >
              <CustomCalloutComponent name={place.name} region={place.region} />
            </Marker>
          ))
        }
      </MapView>
      {user ? (<>
        <LoggedIn />
        {blockView && <Pressable onTouchMove={() => { setBlockView(false); placeSheetRef.current.close() }} onPress={() => { setBlockView(false); placeSheetRef.current.close() }} style={styles.pressableComponent}></Pressable>}
        <PlaceBottomSheetComponent placeSheetRef={placeSheetRef} selectedStation={selectedStation} handleSheetChanges={handleSheetChanges} />
      </>) : (
        /* TODO: Add Blurry Overlay Eventually */
        <>
          <View style={styles.decoTransparentView}>
            {/* <Image source={require('@/assets/blurredImage.png')} /> */}
          </View>
          <Login />
        </>)}
      {isLoading && <ActivityIndicator size="large" style={styles.activityIndicatorStyle} />}
    </View>
  );
};

export default HomeComponent;