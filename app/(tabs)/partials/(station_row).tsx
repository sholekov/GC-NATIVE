const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(1);
}

import { Link } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { setupStation } from '@/store'

const StationRow = ({place, station}) => {

  const handleSetupStation = () => setupStation(station)

  return (
    <Link href={`/station?id=${place.id}&name=${place.name}&region=${place.region}`} onPress={handleSetupStation} style={{ borderWidth: 1, borderColor: '#000', }}>
      <Text>Station#: {station.user_id}</Text>
      {
        station.billing ? (<Text>{station.billing} lv.</Text>) : null
      }
      <Text>{formatPower(station.model.maxPow)} kW</Text>
      {
        station.model.outlets === 'type2' ? (
          <Image source={require('@/assets/type2.png')} style={{ width: 50, height: 50 }} />
        ) : null
      }
      {
        station.model.outlets === 'shuko' ? (
          <Image source={require('@/assets/shuko.png')} style={{ width: 50, height: 50 }} />
        ) : null
      }
    </Link>
  );
};

export default StationRow;
