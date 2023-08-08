const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(0);
}

import { router } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { setupStation } from '@/store'

const StationRow = ({place, station}) => {

  // console.log('StationRow', place, station);
  
  const handleSetupStation = () => {
    setupStation(station)
    router.push(`/station?id=${place.id}&name=${place.name}&region=${place.region}`);
  }

  return (
    <TouchableOpacity onPress={handleSetupStation} style={{ marginBottom: 8, borderBottomWidth: 0, borderColor: '#00000010', backgroundColor: '#00000005', }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, }}>
        <View style={{ marginRight: 8, flexDirection: 'column', justifyContent: 'center', }}>
          <View style={{ marginBottom: 4, }}>
            <Text style={{ fontSize: 18, fontWeight: '600', }}>Station#: {station.user_id}</Text>
          </View>
          {
            station.billing ? (<Text>{station.billing} lv.</Text>) : <Text>0 lv.</Text>
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontSize: 22, }}>{formatPower(station.model.maxPow)}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>kW</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: station.operating ? 'green' : 'pink', 
              borderColor: '#00000010',
              borderWidth: 1,
              borderRadius: 150,}}>
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
            {
              (station.model.outlets !== 'shuko' && station.model.outlets !== 'type2') ? (
                <Image source={require('@/assets/shuko.png')} style={{ width: 50, height: 50, opacity: 0, }} />
              ) : null
            }
            {/* <Image source={require('@/assets/images/pin-charging.png')} style={{ width: 50, height: 50 }} /> */}
          </View>
          <View style={{ paddingLeft: 18, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <Icon name="chevron-right" style={{ fontSize: 20, }}></Icon>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StationRow;
