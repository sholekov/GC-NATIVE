import { toHumanReadable, getPrice } from '@/utils/helpers';
const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(0);
}

import globalStyles from '@/assets/styles/styles';
import stationStyles from '@/assets/styles/station';
const styles = { ...globalStyles, ...stationStyles };

import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;

import { useTranslation } from 'react-i18next';
const StationInfo = () => {
  const { t } = useTranslation();
  const { user, station, station_location } = useSnapshot(store)

  const { id, name, region } = useLocalSearchParams();

  const bgImage = BASE_URI + "images/stations/" + station.user.id + ".png"

  // Riga
  // https://core.gigacharger.net/v1images/stations/10047.png

  //   {
  //     "billing": null,
  //     "meta": [],
  //     "model": {
  //       "id": "PAM",
  //       "maxPow": 7400,
  //       "outlets": "type2"
  //     },
  //     "operating": 0,
  //     "ppkw": 250550,
  //     "pref_ppkw": 1,
  //     "pref_user_id": 12548,
  //     "ps": "116",
  //     "user": {
  //       "id": 10085,
  //       "name": null
  //     },
  //     "user_id": 10085
  //   }

  return (
    <>
      <Image source={{ uri: bgImage }} style={styles.bgImage} />
      <SafeAreaView style={[styles.droidSafeArea, styles.wrapper]}>

        <TouchableOpacity onPress={() => router.back()} style={styles.top}>
          <View style={styles.topWrapperIconWrapper}>
            <Icon name="arrow-left" style={styles.topWrapperIcon} />
          </View>
          <Text style={styles.topLabel}>{t('station.numberLabel')}: #{station.user_id}</Text>
        </TouchableOpacity>

        <View style={styles.stationWrapper}>

          <PlaceHeading station={station_location} />

          {/* <View style={{
                        marginHorizontal: 12,
                        marginBottom: 18,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderColor: '#00000025',
                        borderWidth: 0.5,
                        borderRadius: 120,
                        backgroundColor: '#00000005',

                    }}>
                        <PlaceAccessAndDirections station={station_location} />
                    </View> */}

          <View style={styles.stationWrapperInner}>

            <ImageBackground source={{ uri: bgImage }} style={styles.stationBgImageWrapper} imageStyle={styles.stationBgImage}>
              {/* <TouchableOpacity onPress={() => setImageVisibility()} style={{
                                borderRadius: 36,
                                position: 'absolute', top: 0, right: 0,
                                zIndex: 1,
                                width: '100%', height: imageHeight,
                            }}>
                                <Image source={require('@/assets/images/placeholder.png')} style={{
                                    borderRadius: 36,
                                    position: 'absolute', top: 0, right: 0,
                                    width: '100%', height: '100%', resizeMode: 'cover',
                                }} />
                                <Image source={{ uri: bgImage }} style={{
                                    borderRadius: 36,
                                    width: '100%', height: '100%', resizeMode: 'cover',
                                }} />
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                    position: 'absolute', bottom: 16, right: 16,
                                    zIndex: 1,
                                    width: 36, height: 36,
                                    backgroundColor: '#ffffffC9',
                                    borderRadius: 36,
                                }}>
                                    {imageHeight !== 128 ? <Icon name={'search-minus'} size={18} /> : <Icon name={'search-plus'} size={18} />}
                                </View>
                            </TouchableOpacity> */}

              {/* <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#ffffffD9', borderRadius: 48, }}>
                        </View> */}

              {/* <View style={{ }}>
                            <Text style={{ marginRight: 8, }}>{station.pref_user_id}</Text>
                            {
                                station.pref_user_id ? <Icon name="user" solid></Icon> : <Icon name="user-slash"></Icon>
                            }
                        </View> */}

              <View style={styles.stationContentWrapper}>
                <View style={styles.stationContentOutletsWrapper}>
                  {
                    station.model.outlets === 'type2' && (
                      <>
                        <View style={{ ...styles.stationContentOutletsWrapperImageWrapper, backgroundColor: station.operating ? '#7acb4d' : 'pink', }}>
                          <Image source={require('@/assets/images/connectors/type2.png')} style={styles.stationContentOutletsImage} />
                        </View>
                        <Text style={styles.stationContentOutletsLabel} >TYPE 2</Text>
                      </>
                    )
                  }
                  {
                    station.model.outlets === 'shuko' && (
                      <Image source={require('@/assets/images/connectors/shuko.png')} style={styles.stationContentOutletsImage} />
                    )
                  }
                  {
                    (station.model.outlets !== 'shuko' && station.model.outlets !== 'type2') && (
                      <Image source={require('@/assets/images/connectors/ccs2.png')} style={{ width: 50, height: 50, opacity: 0, }} />
                    )
                  }
                  <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: '500', }} >- {formatPower(station.model.maxPow)}kW</Text>
                </View>

                {/* <View style={{ position: 'relative', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: 18, backgroundColor: '#ffffff90', borderTopColor: 'silver', borderTopWidth: 1, borderBottomColor: 'silver', borderBottomWidth: 1,  }}> */}
                <View style={styles.stationContentPriceWrapper}>
                    {/* <Icon name="tag" style={{ marginRight: 8, opacity: .65, }} size={18} /> */}
                    <Text style={styles.stationContentPriceLabel}>BGN</Text>
                    <Text style={styles.stationContentPriceValue}>{toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN')}</Text>
                    <Text style={styles.stationContentPriceLabel}>/ kWh</Text>
                </View>

                <TouchableOpacity onPress={() => router.back()} style={styles.stationContentCTAWrapper}>
                  <View style={styles.stationContentCTAWrapperInner}>
                    <Icon name="charging-station" style={styles.stationContentCTAWrapperInnerIcon} />
                    <Text style={styles.stationContentCTAWrapperInnerText}>{t('station.cta')}</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </ImageBackground>
          </View>

        </View>

      </SafeAreaView>
    </>
  );
};

export default StationInfo;
