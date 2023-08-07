import global from '@/assets/styles/styles';
import home from '@/assets/styles/home';
const styles = { ...global, ...home };

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import { Link } from 'expo-router';
import * as Location from 'expo-location';
import { ScrollView, FlatList, } from 'react-native-gesture-handler';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';

import LoggedIn from '@/app/(tabs)/(loggedin)'
import Login from '@/app/(tabs)/(login)'
import StationRow from '@/app/(tabs)/partials/(station_row)'

import { useSnapshot } from 'valtio'
import { getStations, getStation } from '@/helpers'
import { store } from '@/store'

const Home = () => {
  
  const handleUserPermissionLocation = async () => {
    // Request permission to access the location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
  }
  useEffect(() => {
    handleUserPermissionLocation();
  }, []);

  const { user } = useSnapshot(store)
  const mapRef = useRef(null);

  const [stations, setStations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStations, setSelectedStations] = useState(null);
  const [showPinTitle, setShowPinTitle] = useState(true);
  const _bottomSheetShowStationRef = useRef(null);

  const loadStations = async () => {
    setIsLoading(true);
    try {
      // const response = await fetch('https://api.openchargemap.io/v3/poi/?output=json&countrycode=BG&maxresults=10&key=2282e7f4-8f08-4cce-b41a-41293a92fcc4');
      // const data = await response.json();
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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadStations()
  }, [user])

  const handleMarkerPress = (station) => {
    getStation(station.id)
      .then(response => {
        mapRef.current.animateToRegion(
          {
            latitude: station.lat - 0.03, longitude: station.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          250
        )
        // mapRef.current.fitToCoordinates([
        //   { latitude: station.lat, longitude: station.lng },
        // ], {
        //   edgePadding: {
        //     top: 20,
        //     right: 20,
        //     bottom: 20,
        //     left: 20,
        //   },
        //   animated: true,
        // });
        console.log(response.data);
        // [
        //   {
        //     "billing": null,
        //     "meta": [],
        //     "model": {
        //       "id": "PAM",
        //       "maxPow": 7400,
        //       "outlets": "type2"
        //     },
        //     "operating": 0,
        //     "ppkw": 250550,
        //     "pref_ppkw": 1,
        //     "pref_user_id": 12548,
        //     "ps": "116",
        //     "user": {
        //       "id": 10085,
        //       "name": null
        //     },
        //     "user_id": 10085
        //   }
        // ]
        const selected_station = {station: station, stations: response.data};
        setSelectedStations(selected_station);
        _bottomSheetShowStationRef.current.snapToIndex(0);
      })
  }

  const setMap = () => {
    mapRef.current.animateToRegion(
      {
        latitude: selectedStations.station.lat - 0.015, longitude: selectedStations.station.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      150
    )
  }

	return (
    <View style={{ flex: 1 }}>
      <MapView
        showsUserLocation={true}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: 0 }}
        initialRegion={{
          latitude: 43.828805,
          longitude: 25.9582707,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => {_bottomSheetShowStationRef.current.close()}}>
        {
          (stations) ?  
          stations.map(place => (
            <Marker
              key={place.id}
              coordinate={{ latitude: parseFloat(place.lat), longitude: parseFloat(place.lng) }}
              title={showPinTitle ? place.name : undefined}
              description={place.region}
              onPress={() => handleMarkerPress(place)}
              pinColor={'#5dac30'}
            >
              <View>
                <Image source={require('@/assets/images/pin-charging.png')} style={{ width: 30, height: 30 }} />
              </View>
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
        <BottomSheet
          ref={_bottomSheetShowStationRef}
          index={-1}
          snapPoints={['75%', '90%']}
          enablePanDownToClose={true}
          onClose={() => setMap() } >
          { selectedStations ? (
            <View style={{flex: 1, backgroundColor: 'red', }}>
              <Text>name: {selectedStations.station.name}</Text>
              <Text>region: {selectedStations.station.region}</Text>
              {
                selectedStations.station.is_public ? (<Text>public</Text>) : (<Text>private</Text>)
              }
              <Text>destination</Text>
              <Text>favourite</Text>
              <View style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={{
                    paddingBottom: 120,
                    backgroundColor: 'pink',
                  }}
                  data={selectedStations.stations}
                  renderItem={({item}) => <StationRow place={selectedStations} station={item} />}
                  keyExtractor={item => Math.random().toString(36).substr(2, 9)}
                />
              </View>
            </View>
          ) : null }
        </BottomSheet>
      </>) : <Login /> }
    </View>
	);
};

export default Home;