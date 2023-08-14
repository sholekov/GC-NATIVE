import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React from 'react';
import { View, Text } from 'react-native';

const PlaceHeading = ({station}) => {
  return (
    <View>
      <Text style={{...styles.placeHeading, }}>{station.name}</Text>
      <View style={styles.placeRegionWrapper}>
        <View style={styles.placeRegionRounded}>
          <Text style={styles.placeRegionLabel}>{station.region}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlaceHeading;
