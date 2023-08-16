import global from '@/assets/styles/styles';
import home from '@/assets/styles/home';
const styles = { ...global, ...home };

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';

// Components
import LoggedIn from '@/app/(tabs)/(loggedin)'
import Login from '@/app/(tabs)/(login)'
import CustomCalloutComponent from '@/app/partials/CustomCallout'

import { useSnapshot } from 'valtio'
import { getStations, getStation } from '@/helpers'
import { store, setupStationLocation, setStations } from '@/store'

import { usePlace } from '@/app/hooks/usePlace'

const Home = () => {
  const { PlaceBottomSheetComponent, placeSheetRef, selectedStation, setSelectedStation } = usePlace();
  const { stations } = useSnapshot(store);
  const handleUserPermissionLocation = async () => {
    // Request permission to access the location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
  }
  // useEffect(() => {
  //   handleUserPermissionLocation();
  // }, []);

  const { user } = useSnapshot(store)
  const mapRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPinTitle, setShowPinTitle] = useState(true);

  const loadStations = async () => {
    setIsLoading(true);
    try {
      // const response = await fetch('https://api.openchargemap.io/v3/poi/?output=json&countrycode=BG&maxresults=10&key=2282e7f4-8f08-4cce-b41a-41293a92fcc4');
      // const data = await response.json();
      if (user) {
        getStations()
          .then(response => {
            // console.log(response.data);
            // {
                // "id": 117,
                // "name": "10202 - ElBo",
                // "stations": 1,
                // "is_public": 0,
                // "region": "Sofia",
                // "lat": 42.656907,
                // "lng": 23.2645
            // }
            setStations(response.data);
          })        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    loadStations()
  }, [user?.id]);

  const handleSelectedPlace = (station) => {
    getStation(station.id)
      .then(response => {
        placeSheetRef.current.snapToIndex(0);
        mapRef.current.animateToRegion(
          {
            latitude: station.lat - 0.03, longitude: station.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          250
        )
        const selected_station = {data: station, stations: response.data};
        setupStationLocation(station)
        setSelectedStation(selected_station);
      })
  }


  const markerRefs = useRef([]);
  const showSpecificMarkerCallout = (index) => {
    if (index === -1) {
      markerRefs.current.forEach(marker => {
        marker.hideCallout();
      });
    }
    if (markerRefs.current[index]) {
      markerRefs.current[index].showCallout();
    }
  };
  const handleSheetChanges = (index) => {
    if (index === -1) {
      // 2) set Region
      if (selectedStation) {
        showSpecificMarkerCallout(-1);
        mapRef.current.animateToRegion(
          {
            latitude: selectedStation.data.lat - 0.015, longitude: selectedStation.data.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          150
        )
      }
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
        onPress={() => {placeSheetRef.current.close()}}>
        {
          (stations) ?  
          stations.map((place, index) => (
            <Marker
              ref={(ref) => markerRefs.current[index] = ref}
              key={place.id}
              coordinate={{ latitude: parseFloat(place.lat), longitude: parseFloat(place.lng) }}
              title={place.name}
              description={place.region}
              onPress={() => handleSelectedPlace(place, index)}
            >
              <View>
                <Image source={require('@/assets/images/pin-gigacharger.png')} style={{ width: 42, height: 42 }} />
              </View>
              <CustomCalloutComponent name={place.name} region={place.region}/>
            </Marker>
          )): null
        }
      </MapView>
      { user ? null: (
        /* Blurry Overlay */
        <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'white', opacity: 0.85, }}>
          {/* <Image source={require('@/assets/blurredImage.png')} style={styles.image} /> */}
        </View>
      )}
      { user ? (<>
        <LoggedIn />
        <PlaceBottomSheetComponent placeSheetRef={placeSheetRef} selectedStation={selectedStation} handleSheetChanges={handleSheetChanges} />
      </>) : <Login /> }
    </View>
	);
};

export default Home;