
function getFirstTwoDigits(num: number) {
  const str = Math.abs(num).toString();
  return parseInt(str.slice(-2), 10);
}

import { toHumanReadable, getPrice } from '@/utils/helpers';
import { getStation } from '@/helpers'

import { store, resetCharging, setupStation } from '@/store'

import useFetchStation from '@/app/hooks/useFetchStation';

const StationInfo = () => {
  const { t } = useTranslation();
  const { station, station_location, chargingMessage, CHARGING, charged_station_id } = useSnapshot(store)

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

  const { data_station, loading } = useFetchStation(station.user_id);

  const [socket, setSocket] = useState(null);
  const [started, setStarted] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);

  const setHelpers = (data) => {
    console.log('setHelpers triggered');
    if (station.operating === 2) {
      const message = JSON.parse(data);
      const station_id = message[1][0];
      console.log('setHelpers', station_id, station.user_id);

      store.chargingMessage = message[1];
      if (message[1][1]) {
        store.CHARGING = true
        // getStation(station_id)
        // .then(response => {
        // const selected_station = { data: station, stations: response.data };
        // setupSelectedLocation(statio
        // setSelectedStation(selected_station)
        // })
        // setStationData()
      }
      if ((message[1][1] - 1) === 100 && (message[1][1] - 1) % 100 === 0) {
        setChargeLevel(() => 0);
      } else {
        const _result = getFirstTwoDigits(message[1][1])
        setChargeLevel(_result);
      }
    }
  }

  const resetHelpers = () => {
    console.log('resetHelpers triggered');
  }

  useEffect(() => {

    const ws = new WebSocket(BASE_WS, '', { headers: { 'User-Agent': 'ReactNative' } }); // +'/drain/start?id='+station.user_id
    setSocket(ws);

    ws.onopen = () => {
      // connection opened
      console.log('connection opened');
      ws.send('something')
    };

    ws.onmessage = e => {
      console.log('Ooo...', e.data);
      if (CHARGING) {
        setHelpers(e.data)
      }
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };

    // station.operating === 1
    console.log('CHARGING', CHARGING, charged_station_id, station.user_id);
    if (CHARGING && (charged_station_id === station.user_id)) {
      
      setStarted(true)
    } else {
      // 
    }


    return () => {
      setStarted(false)
      setChargeLevel(0)
      // Clean up the connection when the component is unmounted
      if (!CHARGING) {
        if (ws) ws.close();
      }
    };
  }, []);

  // const sendPing = useCallback(() => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.send('ping');
  //   }
  // }, [socket]);

  const startCharging = () => {
    // fetch('https://httpbin.org/get')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('User-Agent:', data.headers['User-Agent']);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    if (socket) {
      store.CHARGING = true
      setStarted(true);
      console.log('startCharging', socket.readyState, 'drain/start');
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(['drain/start', station.user_id]));
      socket.onmessage = e => {
        console.log('startCharging onmessage received: ', e.data);
        const message = JSON.parse(e.data);
        store.chargingMessage = message[1];
        console.log('startCharging onmessage received: ', message[1]);
        if ( message[1][1] === 'danger') {
          if (message[1][0][0] === 'notEnoughCurrency') {
            Alert.alert('Not enough currency');
            setStarted(false);
            return
          }
        }
        if (message[1][1]) {
          store.charged_station_id = message[1][0]
          // const station_id = message[1][0];
        }
        if ((message[1][1] - 1) === 100 && (message[1][1] - 1) % 100 === 0) {
          setChargeLevel(0);
        } else {
          const _result = getFirstTwoDigits(message[1][1])
          setChargeLevel(_result);
        }
      };
    }
  }

  const stopCharging = () => {
    if (socket) {
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(['drain/end', station.user_id]));
      resetCharging()
      setStarted(false)
      setupStation(data_station);
      console.log(socket.readyState, 'drain/end');
    }
  }

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

              {/* <View style={{ }}>
                            <Text style={{ marginRight: 8, }}>{station.pref_user_id}</Text>
                            {
                                station.pref_user_id ? <Icon name="user" solid></Icon> : <Icon name="user-slash"></Icon>
                            }
                        </View> */}
              {
                started && (
                  <Suspense fallback={<Text>Loading...</Text>}>
                    <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: 8, }}>

                      <View style={{ marginBottom: 8, }}>
                        <Battery />
                      </View>

                      <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 12,
                        width: 168,
                      }}>
                        {chargingMessage?.length ? (
                          <>
                            <Text style={{ width: "auto" }}>{(chargingMessage[1] / 1000).toFixed(2)} kW</Text>
                            <Text style={{ width: "auto" }}>{((chargingMessage[1] / 1000).toFixed(2) * getPrice(station.billing, station.ppkw)).toFixed(2)} BGN</Text>
                          </>
                        ) : (
                          <>
                            <Text style={{ width: "100%", textAlign: "center" }}>Waiting...</Text>
                          </>
                        )}
                      </View>
                    </View>
                  </Suspense>
                )
              }
              <View style={styles.stationContentWrapper}>
                {/* {chargingMessage && (
                  <View style={styles.stationContentLabel}>
                    <Text style={{ width: '100%' }}>station: {chargingMessage[0]}</Text>
                    <Text style={{ width: '100%' }}>consumed: {(chargingMessage[1] / 1000).toFixed(2)} kW</Text>
                    <Text style={{ width: '100%' }}>ppw: {station.ppkw} | {chargingMessage[2] * 1000} / {toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN')}</Text>
                    <Text style={{ width: '100%' }}>power: {formatPower(chargingMessage[3])}kW</Text>
                    <Text style={{ width: '100%' }}>smartPower: {chargingMessage[4]}</Text>
                  </View>)} */}

                <OutletStaticComponent station_outlets={station.model.outlets} station_operating={station.operating} station_maxPow={station.model.maxPow} />

                {/* <View style={{ position: 'relative', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: 18, backgroundColor: '#ffffff90', borderTopColor: 'silver', borderTopWidth: 1, borderBottomColor: 'silver', borderBottomWidth: 1,  }}> */}
                <View style={styles.stationContentPriceWrapper}>
                  {/* <Icon name="tag" style={{ marginRight: 8, opacity: .65, }} size={18} /> */}
                  <Text style={styles.stationContentPriceLabel}>BGN</Text>
                  <Text style={styles.stationContentPriceValue}>{toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN')}</Text>
                  <Text style={styles.stationContentPriceLabel}>/ kWh</Text>
                </View>

                {
                  started && chargingMessage?.length && (
                    <TouchableOpacity onPress={stopCharging}>
                      <View style={styles.stationContentCTAWrapper}>
                        <View style={{ ...styles.stationContentCTAWrapperInner, paddingHorizontal: 12, backgroundColor: '#FF0000', }}>
                          <Icon name="stop-circle" style={{ ...styles.stationContentCTAWrapperInnerIcon, fontSize: 32, }} />
                          <Text style={styles.stationContentCTAWrapperInnerText}>{t('station.cta_stop')}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
                {
                  !started && (station.operating === 0) ? (
                    <View style={styles.stationContentCTAWrapper}>
                      <View style={{ ...styles.stationContentCTAWrapperInner, backgroundColor: 'pink', }}>
                        <Icon name="charging-station" style={{ ...styles.stationContentCTAWrapperInnerText, color: '#00000095', }} />
                        <Text style={{ ...styles.stationContentCTAWrapperInnerText, color: '#00000095', }}>Не работи</Text>
                      </View>
                    </View>
                  ) : null
                }
                {
                  !started && (station.operating === 1) ? (
                    <TouchableOpacity onPress={() => startCharging()} style={styles.stationContentCTAWrapper}>
                      <View style={styles.stationContentCTAWrapperInner}>
                        <Icon name="charging-station" style={styles.stationContentCTAWrapperInnerIcon} />
                        <Text style={styles.stationContentCTAWrapperInnerText}>{t('station.cta')}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : null
                }
                {
                  !started && (station.operating === 2) ? (
                    <View style={styles.stationContentCTAWrapper}>
                      <View style={{ ...styles.stationContentCTAWrapperInner, backgroundColor: 'pink', }}>
                        <Icon name="charging-station" style={{ ...styles.stationContentCTAWrapperInnerText, color: '#00000095', }} />
                        <Text style={{ ...styles.stationContentCTAWrapperInnerText, color: '#00000095', }}>Заета</Text>
                      </View>
                    </View>
                  ) : null
                }
              </View>

            </ImageBackground>
          </View>

        </View >

      </SafeAreaView >
    </>
  );
};

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;
const BASE_WS = process.env.EXPO_PUBLIC_API_WS;

// React, ReactNative, Expo
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Components
import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import OutletStaticComponent from './outletStatic'
const Battery = React.lazy(() => import('@/app/(components)/battery'));

// Styles
import globalStyles from '@/assets/styles/styles';
import stationStyles from '@/assets/styles/station';
const styles = { ...globalStyles, ...stationStyles };

/**
 * Others
 */

// Valtio
import { useSnapshot } from 'valtio'

// i18n
import { useTranslation } from 'react-i18next';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome5';

export default StationInfo;
