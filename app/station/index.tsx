
function getFirstTwoDigits(num: number) {
  const str = Math.abs(num).toString();
  return parseInt(str.slice(-2), 10);
}

import { toHumanReadable, getPrice } from '@/utils/helpers';
import { getStation } from '@/helpers'

const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(0);
}

import globalStyles from '@/assets/styles/styles';
import stationStyles from '@/assets/styles/station';
const styles = { ...globalStyles, ...stationStyles };

import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import Battery from './Battery';

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;

import { useTranslation } from 'react-i18next';
const StationInfo = () => {
  const { t } = useTranslation();
  const { station, station_location, chargingMessage } = useSnapshot(store)

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

  const BASE_WS = process.env.EXPO_PUBLIC_API_WS;

  const [socket, setSocket] = useState(null);
  // const [message, setMessage] = useState(null);
  const [started, setStarted] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);

  const setHelpers = (data) => {
    console.log('setHelpers triggered');
    if (station.operating) {
      const message = JSON.parse(data);
      store.chargingMessage = message[1];
      if (message[1][1]) {
        store.CHARGING = true;
        const station_id = message[1][0];
        // getStation(station_id)
        // .then(response => {
          // const selected_station = { data: station, stations: response.data };
          // setupSelectedStation(statio
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
    store.chargingMessage = null
    console.log('resetHelpers triggered');
  }

  useEffect(() => {

    if (store.CHARGING) {
      // set CHARGING_STATION
      // get station info

      setStarted(true)
    }

    const ws = new WebSocket(BASE_WS, '', { headers: { 'User-Agent': 'ReactNative' } }); // +'/drain/start?id='+station.user_id

    ws.onopen = () => {
      // connection opened
      console.log('connection opened');
      ws.send('something')
    };

    ws.onmessage = e => {
      console.log('Ooo...', e.data);
      setHelpers(e.data)
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
      resetHelpers();
    };

    setSocket(ws);

    // Clean up the connection when the component is unmounted
    return () => {
      setStarted(false)
      setChargeLevel(0)
      if (!store.CHARGING) {
        resetHelpers();
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
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(['drain/start', station.user_id]));
      console.log(socket.readyState, 'drain/start', socket);
      setStarted(true);
      socket.onmessage = e => {
        const message = JSON.parse(e.data);
        store.chargingMessage = message[1];
        if (message[1][1]) {
          store.CHARGING = true;
        }
        if ((message[1][1] - 1) === 100 && (message[1][1] - 1) % 100 === 0) {
          setChargeLevel(0);
        } else {
          const _result = getFirstTwoDigits(message[1][1])
          console.log('getFirstTwoDigits', _result);
          setChargeLevel(_result);
        }

        console.log('onmessage', e.data);
      };
    }
  }

  const stopCharging = () => {
    if (socket) {
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(['drain/end', station.user_id]));
      
      store.CHARGING = false;
      resetHelpers();
      
      console.log(socket.readyState, 'drain/end', socket);
      socket.onmessage = e => {
        // a message was received
        console.log('stopCharging message', e.data);
      };
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

              {/* <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#ffffffD9', borderRadius: 48, }}>
                        </View> */}

              {/* <View style={{ }}>
                            <Text style={{ marginRight: 8, }}>{station.pref_user_id}</Text>
                            {
                                station.pref_user_id ? <Icon name="user" solid></Icon> : <Icon name="user-slash"></Icon>
                            }
                        </View> */}

              <View style={styles.stationContentWrapper}>
                {/* {chargingMessage && (
                  <View style={styles.stationContentLabel}>
                    <Text style={{ width: '100%' }}>station: {chargingMessage[0]}</Text>
                    <Text style={{ width: '100%' }}>consumed: {(chargingMessage[1] / 1000).toFixed(2)} kW</Text>
                    <Text style={{ width: '100%' }}>ppw: {station.ppkw} | {chargingMessage[2] * 1000} / {toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN')}</Text>
                    <Text style={{ width: '100%' }}>power: {formatPower(chargingMessage[3])}kW</Text>
                    <Text style={{ width: '100%' }}>smartPower: {chargingMessage[4]}</Text>
                  </View>)} */}
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

                {
                  started && chargingMessage?.length && (
                    <TouchableOpacity onPress={() => stopCharging()}>
                      <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: 32, }}>
                        <Battery chargeLevel={chargeLevel} />
                        <View style={{
                          position: 'absolute',
                          top: 0,
                          left: 18,
                          bottom: 0,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 12,
                          width: 168,
                        }}>
                          <Text style={{ width: 'auto' }}>{(chargingMessage[1] / 1000).toFixed(2)} kW</Text>
                          <Text style={{ width: 'auto' }}>{((chargingMessage[1] / 1000).toFixed(2) * getPrice(station.billing, station.ppkw)).toFixed(2)} BGN</Text>
                        </View>
                      </View>
                      <View style={styles.stationContentCTAWrapper}>
                        <View style={styles.stationContentCTAWrapperInner}>
                          <Icon name="charging-station" style={styles.stationContentCTAWrapperInnerIcon} />
                          <Text style={styles.stationContentCTAWrapperInnerText}>{t('station.cta_stop')}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
                {
                  !started &&
                  (!station.operating ? (
                    <View style={styles.stationContentCTAWrapper}>
                      <View style={{ ...styles.stationContentCTAWrapperInner, backgroundColor: 'pink', }}>
                        <Icon name="charging-station" style={{ ...styles.stationContentCTAWrapperInnerText, color: '#00000095', }} />
                        <Text style={{ ...styles.stationContentCTAWrapperInnerText, color: '#00000095', }}>Заета или не работи</Text>
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => startCharging()} style={styles.stationContentCTAWrapper}>
                      <View style={styles.stationContentCTAWrapperInner}>
                        <Icon name="charging-station" style={styles.stationContentCTAWrapperInnerIcon} />
                        <Text style={styles.stationContentCTAWrapperInnerText}>{t('station.cta')}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }

              </View>

            </ImageBackground>
          </View>

        </View >

      </SafeAreaView >
    </>
  );
};

export default StationInfo;
