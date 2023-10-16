
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
          renderItem={({ item }) => (
            <StationRow station_id={item.user_id} />
          )}
          keyExtractor={item => Math.random().toString(36).substr(2, 9)}
        />
      </View>

    </View>
  );
};

// Styles
import globalStyles from '@/assets/styles/styles';
import placeStyles from '@/assets/styles/place';
const styles = { ...globalStyles, ...placeStyles };

// React
import React, { Component, Suspense } from 'react';

// React Native
import { View, Text, FlatList, TouchableOpacity, } from 'react-native';

// Components
import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import PlaceFavourite from '@/app/partials/(tabs)/(placeFavourite)'
import PlaceAccessAndDirections from '@/app/partials/(tabs)/(placeAccessAndDirections)'
import StationRow from '@/app/hooks/components/(station_row)'

export default PlaceComponent;
