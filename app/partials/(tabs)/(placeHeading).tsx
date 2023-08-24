import globalStyles from '@/assets/styles/styles';
import placeStyles from '@/assets/styles/place';
const styles = { ...globalStyles, ...placeStyles };

import React from 'react';
import { View, Text } from 'react-native';

const PlaceHeading = ({ station }) => {
  return (
    <View style={styles.placeHeadingWrapper}>
      <Text style={styles.placeHeadingTitle}>{station.name}</Text>
      <View style={styles.placeHeadingRegionWrapper}>
        <Text style={styles.placeHeadingRegionLabel}>{station.region}</Text>
      </View>
    </View>
  );
};

export default PlaceHeading;
