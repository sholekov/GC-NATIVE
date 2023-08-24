import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useTranslation } from 'react-i18next';
const placeAccessAndDirectionsComponent = ({ station }) => {

  const { t } = useTranslation();
  const openURL = (lat: any, lng: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    });
  };

  return (
    <View style={styles.placeAccessAndDirectionsWrapper}>
      {/* Public || Private */}
      <View style={styles.placeAccessAndDirectionsLabel}>
        {
          station.is_public ? (<>
            <Icon style={{ marginRight: 4, fontSize: 20, color: '#3c8f09', }} name="route"></Icon>
            <Text style={{ marginVertical: 4, fontWeight: '600', color: 'grey', opacity: 1, }}>{t('place.accessibilityLabel.public')}</Text>
          </>) : (<>
            <Icon style={{ marginRight: 4, marginTop: 2, fontSize: 18, color: 'brown', }} name="map-marker-alt"></Icon>
            <Text style={{ marginVertical: 4, fontWeight: '600', opacity: .45, }}>{t('place.accessibilityLabel.private')}</Text>
          </>)
        }
      </View>

      {/* Directions */}
      <TouchableOpacity onPress={() => openURL(station.lat, station.lng)} style={styles.placeAccessAndDirectionsCTA}>
        <Text style={styles.placeAccessAndDirectionsCTALabel}>{t('place.directionsLabel')}</Text>
        <Icon name="directions" solid style={styles.placeAccessAndDirectionsCTAIcon}></Icon>
      </TouchableOpacity>

    </View>
  );
};

export default placeAccessAndDirectionsComponent;
