import globalStyles from '@/assets/styles/styles';
import placeStyles from '@/assets/styles/place';
const styles = { ...globalStyles, ...placeStyles };

import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, } from 'react-native';

import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import PlaceFavourite from '@/app/partials/(tabs)/(placeFavourite)'
import PlaceAccessAndDirections from '@/app/partials/(tabs)/(placeAccessAndDirections)'
import StationRow from '@/app/hooks/components/(station_row)'

const PlaceComponent = ({ station }) => {

  return (
    <View style={styles.placeWrapper}>

      <View style={styles.placeHeadingOuterWrapper}>
        <PlaceHeading station={station.data} />
        <PlaceFavourite station={station.data} />
      </View>

      <View style={styles.placeAccessAndDirectionsOuterWrapper}>
        <PlaceAccessAndDirections station={station.data} />
      </View>

      <View style={styles.placeListWrapper}>
        <FlatList
          contentContainerStyle={styles.placeContentContainerStyle}
          data={station.stations}
          renderItem={({ item }) => <StationRow station={item} />}
          keyExtractor={item => Math.random().toString(36).substr(2, 9)}
        />
      </View>

    </View>
  );
};

export default PlaceComponent;
