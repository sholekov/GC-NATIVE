
import { formatPower, toHumanReadable, getPrice } from '@/utils/helpers';

import { store, setupStation, } from '@/store'
import { getLocations } from '@/helpers'

import useFetchStation from '@/app/hooks/useFetchStation';

const StationRow = ({ station_data }: {station_data: any}) => {
  const { t } = useTranslation();
  const { user, CHARGING, charged_station_id } = useSnapshot(store)

  // const { data_station, loading } = useFetchStation(station_id);

  const [station, setStation] = useState(null);

  useEffect(() => {
    console.log('station_data', station_data);
    
    setStation(station_data);
  }, [])

  const handleSetupStation = () => {
    setupStation(station);
    router.push(`station`);
  }

  if (!station) {
    return <Text>Loading...</Text>;
  }
  return (
    <TouchableOpacity onPress={handleSetupStation} style={styles.placeItemContainer}>
      <View style={styles.placeItemWrapper}>
        <View style={[CHARGING && station?.user_id == charged_station_id ? { flexDirection: 'row', } : { flexDirection: 'column', }]}>
          <View style={styles.placeItemLeft}>
            <Text style={styles.placeItemLeftLabel}>{t('place.stationNumberLabel')}: #{station?.user_id}</Text>
            <Text style={styles.placeItemLeftPrice}>{toHumanReadable(getPrice(station?.billing, station?.ppkw), 'BGN')} / kWh.</Text>
          </View>
        </View>
        <View style={styles.placeItemRight}>
          <View style={styles.placeItemRightPower}>
            <Text style={styles.placeItemRightPowerValue}>{formatPower(station?.model.maxPow)}</Text>
            <Text style={styles.placeItemRightPowerLabel}>kW</Text>
          </View>
          <View style={{ ...styles.placeItemRightImageSocketWrapper, backgroundColor: station?.operating ? '#7acb4d' : 'pink', }}>
            {
              station?.model.outlets === 'type2' ? (
                <Image source={require('@/assets/images/connectors/type2.png')} style={{ ...styles.placeItemRightImageSocketImage, }} />
              ) : null
            }
            {
              station?.model.outlets === 'shuko' ? (
                <Image source={require('@/assets/images/connectors/shuko.png')} style={{ ...styles.placeItemRightImageSocketImage, }} />
              ) : null
            }
            {
              (station?.model.outlets !== 'shuko' && station?.model.outlets !== 'type2') ? (
                <Image source={require('@/assets/images/connectors/ccs2.png')} style={{ ...styles.placeItemRightImageSocketImage, opacity: 0, }} />
              ) : null
            }
            {/* <Image source={require('@/assets/images/pin-charging.png')} style={{ width: 50, height: 50 }} /> */}
          </View>
          <View style={styles.placeItemRightIconWrapper}>
            <Icon name="chevron-right" style={styles.placeItemRightIconIcon}></Icon>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles
import globalStyles from '@/assets/styles/styles';
import placeStyles from '@/assets/styles/place';
const styles = { ...globalStyles, ...placeStyles };

// React
import React, { Component, useEffect, useState } from 'react';

// React Native
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

// Expo
import { router } from 'expo-router';

// Components
import Battery from '@/app/(components)/battery';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'

import { useTranslation } from 'react-i18next';

export default StationRow;
