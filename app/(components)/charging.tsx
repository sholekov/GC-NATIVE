
function getFirstTwoDigits(num: number) {
  const str = Math.abs(num).toString();
  return parseInt(str.slice(-2), 10);
}
import { toHumanReadable, getPrice } from '@/utils/helpers';

import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import { store, } from '@/store'
import { useSnapshot } from 'valtio';
import { use } from 'i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BASE_WS = process.env.EXPO_PUBLIC_API_WS;

const ChargingComponent = () => {
  const { user, stations, CHARGING, chargingMessage } = useSnapshot(store)

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [chargeLevel, setChargeLevel] = useState(null);

  useEffect(() => {
    console.log('chargeLevel', chargeLevel);
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

  useEffect(() => {
    const ws = new WebSocket(BASE_WS, '', { headers: { 'User-Agent': 'ReactNative' } });

    ws.onopen = () => {
      // connection opened
      console.log('connection opened');
    };

    ws.onmessage = e => {
      const _data = JSON.parse(e.data);
      console.log('onmessage', e.data, _data);
      if (_data[0] === 'session') {
        store.CHARGING = true
        store.chargingMessage = _data[1];
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

  }, [])

  useEffect(() => {
    if (CHARGING && chargingMessage) {
      setChargeLevel(getFirstTwoDigits(chargingMessage[1] - 1));
    }
  }, [chargingMessage])

  return CHARGING && (
    <View style={styles.container}>

      <View style={styles.batteryContainer}>
        <View style={styles.batteryTip} />
        <View style={[styles.battery]}>
          <Animated.View style={[styles.batteryFill, { height: batteryHeight }]} />
        </View>
      </View>

      {/* <Text style={styles.label}>{chargeLevel}</Text> */}
      
      <Text style={{ width: 'auto' }}>{(chargingMessage[1] / 1000).toFixed(2)} kW</Text>
      {/* <Text style={{ width: 'auto' }}>{((chargingMessage[1] / 1000).toFixed(2) * getPrice(station.billing, station.ppkw)).toFixed(2)} BGN</Text> */}
                        
      <View style={styles.stopButton}>
        <Text style={styles.labelStop}>stop</Text>
        <FontAwesome name="stop-circle" size={30} color="#FF0000" onPress={() => {
          // Handle stop button press here
          console.log('Stop button pressed!');
        }} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  stopButton: {
    // position: 'absolute',
    // bottom: 10,
    // alignItems: 'center',
    // justifyContent: 'center'
 },
 
  container: {
    position: 'absolute',
    top: '10%',
    right: 16,

    width: 52,
    height: 52 * 3,

    justifyContent: 'flex-end',
    alignItems: 'center',

    paddingVertical: 8,

    backgroundColor: '#fff',
    borderRadius: 99,
  },
  labelStop: {
    maxWidth: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
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
    marginBottom: 4,
    // flexDirection: 'row',
    alignItems: 'center',
    // height: '100%',
    // borderRadius: 99,
    // backgroundColor: 'green',
  },
  battery: {
    width: 24,
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

});


export default ChargingComponent;
