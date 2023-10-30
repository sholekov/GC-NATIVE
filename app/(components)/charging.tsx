
function getFirstTwoDigits(num: number) {
  const str = Math.abs(num).toString();
  return parseInt(str.slice(-2), 10);
}
import { toHumanReadable, getPrice } from '@/utils/helpers';


import { usePlace } from '@/app/hooks/usePlace'



const ChargingComponent = ({ handleSelectedPlace }) => {
  const { messages, CHARGING, CHARGING_STATION_ID, CHARGING_STATION} = useSnapshot(charging)

  const [chargeLevel, setChargeLevel] = useState(null);
  const [chargingLocation, setChargingLocation] = useState(null);
  const [chargingStationID, setChargingStationID] = useState(null);



  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(BASE_WS, '', { headers: { 'User-Agent': 'ReactNative' } });
    setSocket(ws);

    ws.onmessage = e => {
      const _data = JSON.parse(e.data);
      console.log('onmessage', _data);
      if (_data.length && _data[0] === 'session') {
        setChargingStatus(true)
        setupChargingStationID(_data[1][0])
        setChargingMessages(_data[1]);
      }
      if (_data[0] === 'session' && chargingLocation == null) {
        fetchStation(_data[1][0])
          .then((station) => {
            setupChargingStation(station.data.station);
            store.locations.forEach((_station: Object) => {
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
      }
    };

    ws.onerror = e => console.log(e.message)
    ws.onclose = e => console.log(e.code, e.reason)

    return () => {
      ws.close();
    }
  }, [])

  useEffect(() => {
    if (CHARGING && messages) {
      setChargeLevel(getFirstTwoDigits(messages[1] - 1));
    }
  }, [messages])


  const stopCharging = () => {
    console.log('stopCharging pressed')
    if (socket) {
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(['drain/end', CHARGING_STATION_ID]));

      socket.onmessage = e => {
        console.log('stopCharging message', e.data);
        setChargingStatus(false)
        setChargingMessages(null)
        console.log(socket.readyState, 'drain/end');
      };
    }
  }

  return (CHARGING && messages) && (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => handleSelectedPlace(chargingLocation, CHARGING_STATION_ID)}>
        <Image
          style={{
            marginBottom: 12,
            width: 64, height: 64,
          }}
          source={require('@/assets/images/pin-gigacharger.png')}
        />
        {/* {(CHARGING && chargingMessage) ? <Text>{chargingMessage[1]}</Text> : <Text>! chargingMessage</Text>} */}
      </TouchableOpacity>

      <View style={{ marginBottom: 8, }}>
        <Battery />
      </View>

      <View style={{ marginBottom: 6, }}>
        <Text style={{ width: 'auto', fontSize: 18, textAlign: 'center', fontWeight: '500', }}>{(messages[1] / 1000).toFixed(2)}</Text>
        <Text style={{ width: 'auto', fontSize: 22, textAlign: 'center', }}>kW</Text>
      </View>
      {/* <Text style={{ width: 'auto' }}>{((chargingMessage[1] / 1000).toFixed(2) * getPrice(station.billing, station.ppkw)).toFixed(2)} BGN</Text> */}

      {/* <View style={{ paddingVertical: 8, width: '100%', backgroundColor: '#00000075', }}>
        <Text style={{ width: 'auto', fontSize: 15, textAlign: 'center', fontWeight: '500', color: '#fff', }}>{(chargingMessage[1] / 1000).toFixed(2)} lv.</Text>
        <Text style={{ width: "auto" }}>{((chargingMessage[1] / 1000).toFixed(2) * getPrice(station.billing, station.ppkw)).toFixed(2)} BGN</Text>
      </View> */}

      <TouchableOpacity onPress={stopCharging} style={styles.stopButton}>
        <Text style={styles.labelStop}>STOP</Text>
        <FontAwesome name="stop-circle" size={51} color="#FF0000" />
      </TouchableOpacity>

    </View>
  );
};

import React, { Component, useEffect, useState } from 'react';

import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';

// Components
import Battery from '@/app/(components)/battery';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useSnapshot } from 'valtio';
import { charging, setChargingStatus, setupChargingStationID, setupChargingStation, setChargingMessages } from '@/charging'
import { store, } from '@/store'
import { fetchStation, getStation, } from '@/helpers'

const BASE_WS = process.env.EXPO_PUBLIC_API_WS;

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: '10%',
    right: 16,

    width: 52 * 1.25,
    height: 52 * 5.65,

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
