
function getFirstTwoDigits(num: number) {
  const str = Math.abs(num).toString();
  return parseInt(str.slice(-2), 10);
}
import { toHumanReadable, getPrice } from '@/utils/helpers';

import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';

import { usePlace } from '@/app/hooks/usePlace'

import { store, } from '@/store'
import { fetchStation, getStation, } from '@/helpers'
import { useSnapshot } from 'valtio';
import { use } from 'i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BASE_WS = process.env.EXPO_PUBLIC_API_WS;

const ChargingComponent = ({ handleSelectedPlace }) => {
  const { user, stations, CHARGING, chargingMessage, charged_station_id } = useSnapshot(store)

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [chargeLevel, setChargeLevel] = useState(null);
  const [chargingLocation, setChargingLocation] = useState(null);
  const [chargingStationID, setChargingStationID] = useState(null);

  useEffect(() => {
    if (chargeLevel) {
      Animated.timing(animatedValue, {
        toValue: chargeLevel,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [chargeLevel]);

  const batteryHeight = animatedValue.interpolate({
    inputRange: [0, 90],
    outputRange: ['0%', '100%'],
  });

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(BASE_WS, '', { headers: { 'User-Agent': 'ReactNative' } });
    setSocket(ws);

    ws.onmessage = e => {
      const _data = JSON.parse(e.data);
      console.log('onmessage', _data);
      if (_data.length && _data[0] === 'session') {
        store.CHARGING = true
        store.charged_station_id = _data[1][0]
      }
      if (_data[0] === 'session' && chargingLocation == null) {
        fetchStation(_data[1][0])
          .then((station) => {
            // loop stations
            // console.log('store.stations', store.stations);
            store.stations.forEach((_station: Object) => {
              if (_station.id === station.data.station.loc_id) {
                console.log('station loc_id', _station.id);
                setChargingLocation(_station);
              }
            })
            // {"id": 75, "is_public": 0, "lat": 42.675037, "lng": 23.260613, "name": "10135 - StKr", "region": "Sofia", "stations": 1}
            // console.log('stationID', _data[1][0], station.data.loc_id);
          })
          .catch(error => {
            console.error('Error fetching station data:', error);
          })
        store.chargingMessage = _data[1];
      }
    };

    ws.onerror = e => console.log(e.message)
    ws.onclose = e => console.log(e.code, e.reason)

    return () => {
      ws.close();
    }
  }, [])

  useEffect(() => {
    if (CHARGING && chargingMessage) {
      setChargeLevel(getFirstTwoDigits(chargingMessage[1] - 1));
    }
  }, [chargingMessage])


  const stopCharging = () => {
    console.log('stopCharging pressed')
    if (socket) {
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(['drain/end', charged_station_id]));

      socket.onmessage = e => {
        console.log('stopCharging message', e.data);

        store.CHARGING = false
        store.chargingMessage = null
        console.log(socket.readyState, 'drain/end');
      };
    }
  }

  return (CHARGING && chargingMessage) && (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => handleSelectedPlace(chargingLocation, 3)}>
        <Image
          style={{
            width: 62, height: 62,
          }}
          source={require('@/assets/images/pin-gigacharger.png')}
        />
        {(CHARGING && chargingMessage) ? <Text>{chargingMessage[1]}</Text> : <Text>! chargingMessage</Text>}
      </TouchableOpacity>

      <View style={{ marginBottom: 6, }}>
        <Text style={{ width: 'auto', fontSize: 18, textAlign: 'center', fontWeight: '500', }}>{chargingLocation?.name}</Text>
      </View>

      <View style={styles.batteryContainer}>
        <View style={styles.batteryTip} />
        <View style={[styles.battery]}>
          <Animated.View style={[styles.batteryFill, { height: batteryHeight }]} />
        </View>
      </View>

      <View style={{ marginBottom: 6, }}>
        <Text style={{ width: 'auto', fontSize: 18, textAlign: 'center', fontWeight: '500', }}>{(chargingMessage[1] / 1000).toFixed(2)}</Text>
        <Text style={{ width: 'auto', fontSize: 22, textAlign: 'center', }}>kW</Text>
      </View>
      {/* <Text style={{ width: 'auto' }}>{((chargingMessage[1] / 1000).toFixed(2) * getPrice(station.billing, station.ppkw)).toFixed(2)} BGN</Text> */}

      <View style={{ paddingVertical: 8, width: '100%', backgroundColor: '#00000075', }}>
        <Text style={{ width: 'auto', fontSize: 15, textAlign: 'center', fontWeight: '500', color: '#fff', }}>{(chargingMessage[1] / 1000).toFixed(2)} lv.</Text>
      </View>

      <TouchableOpacity onPress={stopCharging} style={styles.stopButton}>
        <Text style={styles.labelStop}>STOP</Text>
        <FontAwesome name="stop-circle" size={51} color="#FF0000" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: '10%',
    right: 16,

    width: 52 * 1.25,
    height: 52 * 7,

    justifyContent: 'flex-end',
    alignItems: 'center',

    backgroundColor: '#fff',
    borderRadius: 99,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  label: {
    // opacity: 0,
    position: 'absolute',
    bottom: 12,
    right: 0,

    width: '100%',
    height: 24,

    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
    fontSize: 20,

    backgroundColor: '#99999950',
  },


  batteryContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  battery: {
    width: 38,
    height: 58,
    // height: '100%',
    // paddingLeft: 3,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  batteryFill: {
    maxHeight: 158,
    width: '100%',
    backgroundColor: 'limegreen',
    // justifyContent: 'center',
    // borderRadius: 99,
  },
  batteryTip: {
    height: 5,
    width: 12,
    backgroundColor: 'black',
    borderRadius: 2,
    marginBottom: -1,
  },

  // STOP area
  labelStop: {
    maxWidth: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  stopButton: {
    paddingTop: 8,
    paddingBottom: 8,
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#00000017',
    borderBottomLeftRadius: 99,
    borderBottomRightRadius: 99,
  },
});


export default ChargingComponent;
