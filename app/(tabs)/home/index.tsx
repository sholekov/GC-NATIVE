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
import { View, Image, ActivityIndicator, Pressable, Alert, Platform, } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

// Components
import Charging from '@/app/(components)/charging'
import MapActions from './mapActions'
import LoggedIn from '@/app/(tabs)/home/loggedin'
import Login from '@/app/(tabs)/home/login'
import CustomCalloutComponent from '@/app/partials/CustomCallout'

import { useSnapshot } from 'valtio'
import { getStations, getStation } from '@/helpers'
import { store, setupSelectedStation, setStations } from '@/store'

import { usePlace } from '@/app/hooks/usePlace'

import { useTranslation } from 'react-i18next';

import { registerForPushNotificationsAsync } from '@/services/notifications'

const HomeComponent = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  const { t } = useTranslation();
  const { user, stations, CHARGING } = useSnapshot(store)

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
  // useEffect(() => {
  // handleUserLocation();
  // }, []);

  const loadStations = async () => {
    console.log('loadStations', user?.id);
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
  const handleSelectedPlace = (station, index) => {
    console.log('station', station); // station {"id": 8, "is_public": 1, "lat": 43.851807, "lng": 25.952181, "name": "Офис 16", "region": "Ruse", "stations": 1}
    
    setSelectedStation(null)
    setupSelectedStation(null)
    markerRefs.current[index].showCallout()
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
        setupSelectedStation(station)
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
          stations?.map((place, index) => (
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
      {user ? (<>
        <Charging handleSelectedPlace={handleSelectedPlace} />
        {(!blockView && stations) && <MapActions stations={stations} handleSelectedPlace={handleSelectedPlace} userLocation={userLocation} handleUserLocation={handleUserLocation} />}
        <LoggedIn />
        {blockView && <Pressable onTouchMove={() => { setBlockView(false); placeSheetRef.current.close() }} onPress={() => { setBlockView(false); placeSheetRef.current.close() }} style={styles.pressableComponent}></Pressable>}
        <PlaceBottomSheetComponent placeSheetRef={placeSheetRef} selectedStation={selectedStation} handleSheetChanges={handleSheetChanges} />
      </>) : (
        /* TODO: Add Blurry Overlay Eventually */
        <>
          <View style={styles.decoTransparentView}>
            {/* <Image source={require('@/assets/blurredImage.png')} /> */}
          </View>
          <Login triggerLoading={setIsLoading} />
        </>)}
      {isLoading && <ActivityIndicator size="large" style={styles.activityIndicatorStyle} />}
    </View>
  );
};

export default HomeComponent;