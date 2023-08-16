import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
import profile from '@/assets/styles/profile';
const styles = { ...global, ...page, ...profile };

import { Redirect, Link, } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { setupStationLocation, store } from '@/store'

import { getStation } from '@/helpers'

// Hooks
import { usePlace } from '@/app/hooks/usePlace'

// Components
import CustomCalloutComponent from '@/app/partials/CustomCallout'

function calculateRegion(markers) {
  let minLat, maxLat, minLng, maxLng;

  if (markers?.length === 0) {
    return {
      latitude: 43.828805,
      longitude: 25.9582707,
      latitudeDelta: 0.015, // .0922,
      longitudeDelta: 0, // .0421,
    }
  }

  // First marker's coordinates
  ({ latitude: minLat, longitude: minLng } = { latitude: markers[0].lat, longitude: markers[0].lng });
  maxLat = minLat;
  maxLng = minLng;

  // Loop through markers to determine min, max latitudes and longitudes
  markers.forEach(marker => {
    if (marker.lat < minLat) minLat = marker.lat;
    if (marker.lat > maxLat) maxLat = marker.lat;
    if (marker.lng < minLng) minLng = marker.lng;
    if (marker.lng > maxLng) maxLng = marker.lng;
  });

  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;

  const latDelta = 0.075;  // added some padding
  const lngDelta = 0.055;  // added some padding

  return {
    latitude: midLat + 0.01,
    longitude: midLng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };
}

const UserFavourites = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSnapshot(store)
  const { stations } = useSnapshot(store);

  const [user_stations, setUserStations] = useState(null);
  const [shown_stations, setShownStations] = useState(null);

  useEffect(() => {
    // 1) set user_stations
    const _user_stations = stations.filter(station => user.favourite_places.some(place => place.l_id === station.id))
    setUserStations(_user_stations);
    setShownStations(_user_stations);

    // 2) set Region
    if (_user_stations?.length && !isCollapsed) {
      let region = {
        latitude: 43.828805,
        longitude: 25.9582707,
        latitudeDelta: .0922,
        longitudeDelta: .0421,
      }
      region = calculateRegion(_user_stations);
      setTimeout(() => {
        mapRef.current.animateToRegion(region, 250)
      }, 150);
    }
  }, [user.favourite_places]);

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

  const { PlaceBottomSheetComponent, placeSheetRef, selectedStation, setSelectedStation } = usePlace();

  const handleSelectedPlace = (station, index) => {
    showSpecificMarkerCallout(index);
    getStation(station.id)
      .then(response => {
        mapRef.current.animateToRegion(
          {
            latitude: station.lat - 0.027,
            longitude: station.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          250)
        const selected_station = { data: station, stations: response.data };

        setupStationLocation(station)
        setSelectedStation(selected_station);

        setShownStations([selected_station.data]);

        setIsCollapsed(prev => true);
        placeSheetRef.current.snapToIndex(0);
      })
  }

  const mapRef = useRef(null);

  const handleSheetChanges = (index) => {
    if (index === -1) {
      // 2) set Region
      if (user_stations?.length) {
        const _user_stations = stations.filter(station => user.favourite_places.some(place => place.l_id === station.id))
        setShownStations(_user_stations);

        showSpecificMarkerCallout(-1);
        const region = calculateRegion(user_stations);
        mapRef.current.animateToRegion(region, 250)
      }
      setIsCollapsed(prev => false);
    }
  }

  const resetScreenView = () => {
    placeSheetRef.current.close()
    setIsCollapsed(prev => false);
  }

  return (
    <>
      {user ?
        <>
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
            onPress={resetScreenView} >
            {(shown_stations?.length) ?
              shown_stations.map((place, index) => (
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
                  <CustomCalloutComponent name={place.name} region={place.region} />
                </Marker>
              )) : null}
          </MapView>

          {
            (user_stations?.length === 0) ?
              <Link href='/home' asChild>
                <Pressable style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#ffffffd0', }}>
                  <View style={{ position: 'relative', marginTop: -128, marginBottom: 18, padding: 16, backgroundColor: '#ffffff00', borderRadius: 999, borderColor: '#00000000', borderWidth: 2, }}>
                    <Image source={require('@/assets/images/pin-gigacharger.png')} style={{ width: 128, height: 128 }} />
                    <Icon size={38} name="star" solid style={{ position: 'absolute', top: 16, right: 16, color: 'rgb(255, 212, 59)', }}></Icon>
                  </View>

                  <Text style={{ marginBottom: 32, fontSize: 18, fontWeight: '600', }}>No favourite places</Text>
                  <Text style={{ marginBottom: 32, fontSize: 16, textAlign: 'center', }}>
                    Click on the star icon on those charging stations that you want to mark as favourites.
                    Access them quickly and directly through this section.
                  </Text>
                  <Text style={{ ...styles.link, fontSize: 16, }}>You can add favourite places from the map</Text>
                </Pressable>
              </Link> :
              <SafeAreaView style={{ height: '100%', backgroundColor: 'transparent', }}>
                {
                  (!isCollapsed) ? (
                    <View style={{
                      margin: 16,
                      backgroundColor: '#ffffff50',
                      borderRadius: 16,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                    }}>
                      <FlatList
                        data={user_stations}
                        renderItem={({ item: station, index }) => (
                          <TouchableOpacity onPress={() => handleSelectedPlace(station, index)} style={{ marginVertical: 4, padding: 12, backgroundColor: (false && selectedStation?.data?.id == station.id) ? '#99999930' : '#fff', borderColor: '#00000010', borderWidth: 1, borderRadius: 8, }}>
                            <View>
                              <Icon size={12} name="star" solid style={{ position: 'absolute', top: -8, right: -8, color: 'rgb(255, 212, 59)', }}></Icon>
                              <Text style={{ fontSize: 18, fontWeight: '600', }}>{station.name}</Text>{/* #{station.id} */}
                              <View style={{ marginTop: 4, }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#999', }}>{station.region}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={item => Math.random().toString(36).substr(2, 9)}
                      />
                    </View>) : null
                }
              </SafeAreaView>
          }
          <PlaceBottomSheetComponent placeSheetRef={placeSheetRef} selectedStation={selectedStation} handleSheetChanges={handleSheetChanges} />
        </> : <Redirect href="/home" />}
    </>
  );
};

export default UserFavourites;
