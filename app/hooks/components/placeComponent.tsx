import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, } from 'react-native';

import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import PlaceFavourite from '@/app/partials/(tabs)/(placeFavourite)'
import PlaceAccessAndDirections from '@/app/partials/(tabs)/(placeAccessAndDirections)'
import StationRow from '@/app/hooks/components/(station_row)'

const PlaceComponent = ({ station }) => {

  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>

      <View style={{ position: 'relative', paddingVertical: 12, width: '100%', }}>
        <PlaceHeading station={station.data} />
        <PlaceFavourite station={station.data} />
      </View>

      <View style={{
        alignSelf: 'center',

        marginHorizontal: 12,
        marginBottom: 18,

        paddingVertical: 8,
        paddingHorizontal: 12,

        width: '90%',
        
        borderColor: '#00000025',
        borderWidth: 0.5,
        borderRadius: 120,
        backgroundColor: 'white',
        backgroundColor: '#00000005',

      }}>
        <PlaceAccessAndDirections station={station.data} />
      </View>


      <View style={{ flex: 1, borderTopWidth: 1, borderColor: '#00000010', }}>
        <FlatList
          contentContainerStyle={{
            marginVertical: 0,
            paddingBottom: 170,
          }}
          data={station.stations}
          renderItem={({ item }) => <StationRow place={station.data} station={item} />}
          keyExtractor={item => Math.random().toString(36).substr(2, 9)}
        />
      </View>

    </View>
  );
};

export default PlaceComponent;
