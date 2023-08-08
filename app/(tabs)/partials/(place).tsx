import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import StationRow from '@/app/(tabs)/partials/(station_row)'

import { useSnapshot } from 'valtio';
import { store, setupUser } from '@/store'
import { helpers, toggleStationToFavourites, getFavouriteStations } from '@/helpers'

const Place = ({station}) => {
  const { user } = useSnapshot(store)
  
  const handleFavouriteStation = (id, csrf) => {
    toggleStationToFavourites(id, csrf)
        .then( response => {
            getFavouriteStations()
                .then( response => {
                    setupUser(user, response.data)
                })
                .catch( error => {
                    console.log('getFavouriteStations error', error);
                })
        })
        .catch( error => {
            console.log('toggleStationToFavourites error', error);
        })
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', }}>
      <Text style={styles.placeHeading}>{station.station.name}</Text>
      <View style={styles.placeRegionWrapper}>
        <View style={styles.placeRegionRounded}>
          <Text style={styles.placeRegionLabel}>{station.station.region}</Text>
        </View>
      </View>      
      {
        station.station.is_public ? (<><Icon name="route"></Icon><Text>public</Text></>) : (<><Icon name="map-marker-alt"></Icon><Text>private</Text></>)
      }
      <View style={{ flexDirection: 'row', }}>
        <Text>directions</Text>
        <Icon name="directions" solid></Icon>
      </View>
      <TouchableOpacity onPress={() => handleFavouriteStation(station.station.id, user.csrf)}>
        {
          user.favourite_stations.filter(_ => _.l_id == station.station.id).length ? 
            <Icon name="star" solid></Icon> : <Icon name="star"></Icon>
        }
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 120,
            backgroundColor: 'pink',
          }}
          data={station.stations}
          renderItem={({item}) => <StationRow place={station.station} station={item} />}
          keyExtractor={item => Math.random().toString(36).substr(2, 9)}
        />
      </View>
    </View>
  );
};

export default Place;
