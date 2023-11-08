import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { helpers, getLocations, getStation } from '@/helpers'
import { store, setupSelectedLocation, setLocations, setupStation } from '@/store'
import { user } from '@/utils/user'

import { usePushNotifications } from '@/services/usePushNotifications';

import { usePlace } from '@/app/hooks/usePlace'

const HomeComponent = () => {
  const { t } = useTranslation();
  const { locations, station } = useSnapshot(store)
  const { rates } = useSnapshot(helpers)
  const { data: User } = useSnapshot(user)

  // const { expoPushToken } = usePushNotifications();
  // console.log('expoPushToken', expoPushToken);
  
  const [userLocation, setUserLocation] = useState({ latitude: 43.828805, longitude: 25.9582707 });
  const handleUserLocation = async () => {
    if (!isSimulator()) {
      // Request permission to access the location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;
      setUserLocation(coords)
    }
  }
  
  useEffect(() => {
    handleUserLocation();
  }, []);

  const loadStations = async () => {
    console.log('loadStations', User?.id);
    try {
      if (User) {
        setIsLoading(true)
        getLocations()
          .then(response => {
            setLocations(response.data);
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

  useEffect(() => {
    const _mapRef = mapRef.current
    setTimeout(() => {
      _mapRef.animateToRegion({
        latitude: userLocation.latitude + 0.02,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 2500)
    }, 250);
  }, [userLocation])

  const { PlaceBottomSheetComponent, placeSheetRef, selectedStation, setSelectedStation } = usePlace();
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [blockView, setBlockView] = useState(false);
  const handleSelectedPlace = (place, index) => {
    console.log('station (place)', place); // station {"id": 8, "is_public": 1, "lat": 43.851807, "lng": 25.952181, "name": "Офис 16", "region": "Ruse", "stations": 1}

    setSelectedStation(null)
    setupSelectedLocation(null)
    markerRefs.current[index].showCallout()
    mapRef.current.animateToRegion({
      latitude: place.lat - 0.025, longitude: place.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 250)
    placeSheetRef.current.snapToIndex(0)
    setBlockView(true)
    getStation(place.id)
      .then(response => {
        const selected_station = { data: place, stations: response.data };
        setSelectedStation(selected_station)
        setupSelectedLocation(place)
        // if ( ! station ) {
        //   setupChargingStation(station)
        // }
        // router.push(`station`);
      })
  }

  const markerRefs = useRef([]);
  const handleSheetChanges = (index, coords) => {
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
        testID="mapView"
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
          locations?.map((place, index) => (
            <Marker
              ref={(ref) => markerRefs.current[index] = ref}
              key={place.id}
              coordinate={{ latitude: parseFloat(place.lat), longitude: parseFloat(place.lng) }}
              title={place.name}
              description={place.region}
              onPress={() => handleSelectedPlace(place, index)}
            // image={require('@/assets/images/pin-gigacharger.png')}
            >
              <Image
                source={require('@/assets/images/pin-gigacharger.png')}
                style={styles.markerImage}
              />
              <CustomCalloutComponent name={place.name} region={place.region} />
            </Marker>
          ))
        }
      </MapView>
      {User ? (<>
        <Charging handleSelectedPlace={handleSelectedPlace} />
        {(!blockView && locations) && <MapActions locations={locations} handleSelectedPlace={handleSelectedPlace} userLocation={userLocation} handleUserLocation={handleUserLocation} />}
        <LoggedIn />
        {blockView && <Pressable onTouchMove={() => { setBlockView(false); placeSheetRef.current.close() }} onPress={() => { setBlockView(false); placeSheetRef.current.close() }} style={styles.pressableComponent}></Pressable>}
        <PlaceBottomSheetComponent placeSheetRef={placeSheetRef} selectedStation={selectedStation} handleSheetChanges={handleSheetChanges} />
      </>) : (
        /* TODO: Add Blurry Overlay Eventually */
        <>
          <View style={styles.decoTransparentView}>
            {/* <Image source={require('@/assets/blurredImage.png')} /> */}
          </View>
          <LoginComponent triggerLoading={setIsLoading} />
        </>)}
      {isLoading && <ActivityIndicator size="large" style={styles.activityIndicatorStyle} />}
    </View>
  );
};

// Styles
import globalStyles from '@/assets/styles/styles';
import homeStyles from '@/assets/styles/home';
const styles = { ...globalStyles, ...homeStyles };

// React, ReactNative, Expo
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ActivityIndicator, Pressable, Alert, Platform, } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { router } from 'expo-router';

// Components
import Charging from '@/app/(components)/charging'
import MapActions from './mapActions'
import LoggedIn from '@/app/(tabs)/home/loggedin'
import LoginComponent from '@/app/(tabs)/home/login'
import CustomCalloutComponent from '@/app/partials/CustomCallout'

import { useTranslation } from 'react-i18next';

import { useSnapshot } from 'valtio'

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

export default HomeComponent;