import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';


const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(0);
}


const OutletStaticComponent = ({ station_outlets, station_operating, station_maxPow }) => {
  return (
    <View style={styles.stationContentOutletsWrapper}>
      {
        station_outlets === 'type2' && (
          <>
            <View style={{ ...styles.stationContentOutletsWrapperImageWrapper, backgroundColor: station_operating ? '#7acb4d' : 'pink', }}>
              <Image source={require('@/assets/images/connectors/type2.png')} style={styles.stationContentOutletsImage} />
            </View>
            <Text style={styles.stationContentOutletsLabel} >TYPE 2</Text>
          </>
        )
      }
      {
        station_outlets === 'shuko' && (
          <Image source={require('@/assets/images/connectors/shuko.png')} style={styles.stationContentOutletsImage} />
        )
      }
      {
        (station_outlets !== 'shuko' && station_outlets !== 'type2') && (
          <Image source={require('@/assets/images/connectors/ccs2.png')} style={{ width: 50, height: 50, opacity: 0, }} />
        )
      }
      <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: '500', }} >- {formatPower(station_maxPow)}kW</Text>
    </View>
  );
};

import globalStyles from '@/assets/styles/styles';
import stationStyles from '@/assets/styles/station';
const styles = { ...globalStyles, ...stationStyles };

export default OutletStaticComponent;
