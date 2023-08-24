import globalStyles from '@/assets/styles/styles';
import placeStyles from '@/assets/styles/place';
const styles = { ...globalStyles, ...placeStyles };

import { formatPower, toHumanReadable, getPrice } from '@/utils/helpers';

import { router } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { setupStation } from '@/store'

import { useTranslation } from 'react-i18next';
const StationRow = ({ station }) => {
  const { t } = useTranslation();

  const handleSetupStation = () => {
    setupStation(station)
    router.push(`station`);
  }

  return (
    <TouchableOpacity onPress={handleSetupStation} style={styles.placeItemContainer}>
      <View style={styles.placeItemWrapper}>
        <View style={styles.placeItemLeft}>
          <Text style={styles.placeItemLeftLabel}>{t('place.stationNumberLabel')}: #{station.user_id}</Text>
          <Text style={styles.placeItemLeftPrice}>{toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN')} / kWh.</Text>
        </View>
        <View style={styles.placeItemRight}>
          <View style={styles.placeItemRightPower}>
            <Text style={styles.placeItemRightPowerValue}>{formatPower(station.model.maxPow)}</Text>
            <Text style={styles.placeItemRightPowerLabel}>kW</Text>
          </View>
          <View style={{...styles.placeItemRightImageSocketWrapper, backgroundColor: station.operating ? '#7acb4d' : 'pink',}}>
            {
              station.model.outlets === 'type2' ? (
                <Image source={require('@/assets/images/connectors/type2.png')} style={{ ...styles.placeItemRightImageSocketImage, }} />
              ) : null
            }
            {
              station.model.outlets === 'shuko' ? (
                <Image source={require('@/assets/images/connectors/shuko.png')} style={{ ...styles.placeItemRightImageSocketImage, }} />
              ) : null
            }
            {
              (station.model.outlets !== 'shuko' && station.model.outlets !== 'type2') ? (
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

export default StationRow;
