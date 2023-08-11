import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, } from 'react-native';

import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import PlaceFavourite from '@/app/partials/(tabs)/(placeFavourite)'
import PlaceAccessAndDirections from '@/app/partials/(tabs)/(placeAccessAndDirections)'
import StationRow from '@/app/partials/(tabs)/(station_row)'

const Place = ({station}) => {

  return (
    <View style={{flex: 1, backgroundColor: 'white', }}>

      <View style={{ position: 'relative', width: '100%' }}>
          <PlaceHeading station={station.station} />
          <PlaceFavourite station={station.station} />
      </View>
      
      <PlaceAccessAndDirections station={station.station} />
      
      <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#00000010', }}>
        <FlatList
          contentContainerStyle={{
            marginVertical: 0,
            paddingBottom: 170,
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
