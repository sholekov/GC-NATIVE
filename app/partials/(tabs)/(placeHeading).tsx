import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React from 'react';
import { View, Text } from 'react-native';

const PlaceHeading = ({station}) => {
  return (
    <View style={{...styles.placeHeadingWrapper, }}>
      <Text style={{...styles.placeHeadingTitle, }}>{station.name}</Text>
      <View style={styles.placeHeadingRegionWrapper}>
        <View style={styles.placeHeadingRegionRounded}>
          <Text style={styles.placeHeadingRegionLabel}>{station.region}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlaceHeading;
