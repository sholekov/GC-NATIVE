import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
const styles = { ...global };

const formatPower: Function = (watts: number) => {
    return (watts / 1000).toFixed(0);
}

import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import { useSnapshot } from 'valtio'
import { store, setupUser } from '@/store'
import { toggleStationToFavourites, getFavouriteStations } from '@/helpers'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import PlaceFavourite from '@/app/partials/(tabs)/(placeFavourite)'
import PlaceAccessAndDirections from '@/app/partials/(tabs)/(placeAccessAndDirections)'

const BASE_URI = 'https://core.gigacharger.net/v1' //process.env.EXPO_PUBLIC_API_URL;

const StationInfo = () => {
    const { user, station, station_location } = useSnapshot(store)

    const { id, name, region } = useLocalSearchParams();

    // const [bgImage, setBgImage] = useState(null)
    const bgImage = BASE_URI + "images/stations/" + station_location.id + ".png"

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
        <SafeAreaView style={{ ...styles.droidSafeArea, backgroundColor: 'white', width: '100%', }}>
            <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, padding: 12, backgroundColor: 'white', width: '100%', borderBottomColor: '#00000015', borderBottomWidth: .5, }}>
                <View style={{ position: 'absolute', top: 6, left: 0, padding: 8, }}>
                    <Icon name="chevron-left" size={18} color="grey" />
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', }}>Station#: {station.user_id}</Text>
            </TouchableOpacity>

            <View style={{ position: 'relative', width: '100%', }}>
                <PlaceHeading station={station_location} />
                <PlaceFavourite station={station_location} />
            </View>
            
            <PlaceAccessAndDirections station={station_location} />

            {/* <View style={{ marginTop: 12,  position: 'relative', width: '75%', borderBottomColor: 'grey', borderBottomWidth: 1, }}> */}
            {/* </View> */}

            <View style={{ position: 'relative', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, }}>
                {
                    station.model.outlets === 'type2' ? (
                    <>
                    <Image source={require('@/assets/images/connectors/type2.png')} style={{ width: 36, height: 36 }} />
                    <Text style={{ marginLeft: 8, fontSize: 20, fontWeight: '300', }} >TYPE 2</Text>
                    </>
                    ) : null
                }
                {
                    station.model.outlets === 'shuko' ? (
                    <Image source={require('@/assets/images/connectors/shuko.png')} style={{ width: 36, height: 36 }} />
                    ) : null
                }
                {
                    (station.model.outlets !== 'shuko' && station.model.outlets !== 'type2') ? (
                        <Image source={require('@/assets/images/connectors/ccs2.png')} style={{ width: 50, height: 50, opacity: 0, }} />
                    ) : null
                }
                <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: '300', }} >- {formatPower(station.model.maxPow)}kW</Text>
            </View>

            <View style={{ position: 'relative', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: 18, backgroundColor: '#00000001', borderTopColor: 'silver', borderTopWidth: 1, borderBottomColor: 'silver', borderBottomWidth: 1,  }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name="tag" style={{ marginRight: 8, opacity: .65, }} size={18} />
                    <Text style={{ fontSize: 16, fontWeight: '400', }}>BGN { toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN') } / kWh</Text>
                </View>
                <Icon name="chevron-right" style={{ opacity: .25, color: 'grey', }} size={20} />
            </View>

            <View style={{...styles.container, flexDirection: 'row', }}>
                <Text style={{ marginRight: 8, }}>{station.pref_user_id}</Text>
                {
                    station.pref_user_id ? <Icon name="user" solid></Icon> : <Icon name="user-slash"></Icon>
                }
            </View>

            {/* <Text>{bgImage}</Text>
            <Image source={{ uri: bgImage }} style={{ width: '100%', height: 200, resizeMode: 'cover', }} /> */}
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 32, padding: 12, paddingHorizontal: 32, backgroundColor: '#00000005', borderColor: '#00000050', borderWidth: .5, borderRadius: 32, }}>
                <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <Icon name="charging-station" size={18} style={{marginRight: 8 }} />
                    <Text style={{ fontSize: 14, fontWeight: '600', }}>Start charging</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};

export default StationInfo;
