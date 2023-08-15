import { toHumanReadable, getPrice } from '@/utils/helpers';
const formatPower: Function = (watts: number) => {
    return (watts / 1000).toFixed(0);
}

import global from '@/assets/styles/styles';
const styles = { ...global };

import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import PlaceHeading from '@/app/partials/(tabs)/(placeHeading)'
import PlaceFavourite from '@/app/partials/(tabs)/(placeFavourite)'
import PlaceAccessAndDirections from '@/app/partials/(tabs)/(placeAccessAndDirections)'

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;

const StationInfo = () => {
    const { user, station, station_location } = useSnapshot(store)

    const { id, name, region } = useLocalSearchParams();

    // const [bgImage, setBgImage] = useState(null)
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

    const [imageHeight, setImageHeight] = useState(128);
    const setImageVisibility = () => {
        console.log('setImageVisibility', imageHeight);
        
        if (imageHeight === 128) {
            setImageHeight('100%')
        } else {
            setImageHeight(128)
        }
    }

    return (
        <>
            <Image source={{ uri: bgImage }} style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: 0, resizeMode: 'cover', }} />
            <SafeAreaView style={{ ...styles.droidSafeArea, backgroundColor: '#ffffffD9', }}>

                <TouchableOpacity onPress={() => router.back()} style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, padding: 12, width: '100%', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 6, left: 12, width: 32, height: 32, backgroundColor: '#00000000', borderRadius: 99, }}>
                        <Icon name="arrow-left" size={18} color="#555" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '600', }}>Station#: {station.user_id}</Text>
                    {/* <PlaceFavourite station={station_location} /> */}
                </TouchableOpacity>

                <View style={{
                    flex: 1, marginHorizontal: 12, marginBottom: 12, paddingTop: 22,
                    backgroundColor: '#fff',
                    borderRadius: 48,

                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: .05,
                    elevation: 16,
                }}>

                    <PlaceHeading station={station_location} />

                    <View style={{
                        flex: 1, flexDirection: 'column', justifyContent: 'space-between',
                        marginHorizontal: 8,
                        marginVertical: 8,
                        backgroundColor: '#00000015',
                        borderColor: '#00000000',
                        borderWidth: 4, borderRadius: 41,
                    }}>

                        <TouchableOpacity onPress={ () => setImageVisibility() } style={{
                                borderRadius: 36,
                                position: 'absolute', top: 0, right: 0,
                                zIndex: 1,
                                width: '100%', height: imageHeight,
                            }}>
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
                        </TouchableOpacity>

                        {/* <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#ffffffD9', borderRadius: 48, }}>
                        </View> */}

                        {/* <View style={{ }}>
                            <Text style={{ marginRight: 8, }}>{station.pref_user_id}</Text>
                            {
                                station.pref_user_id ? <Icon name="user" solid></Icon> : <Icon name="user-slash"></Icon>
                            }
                        </View> */}

                        {/* <PlaceAccessAndDirections station={station_location} /> */}

                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 128}}>

                            <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, }}>
                                {
                                    station.model.outlets === 'type2' ? (
                                        <>

                                            <View style={{
                                                padding: 2,
                                                backgroundColor: station.operating ? '#7acb4d' : 'pink',
                                                borderRadius: 150,
                                            }}>
                                                <Image source={require('@/assets/images/connectors/type2.png')} style={{ width: 36, height: 36 }} />
                                            </View>
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

                            {/* <View style={{ position: 'relative', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: 18, backgroundColor: '#ffffff90', borderTopColor: 'silver', borderTopWidth: 1, borderBottomColor: 'silver', borderBottomWidth: 1,  }}> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    {/* <Icon name="tag" style={{ marginRight: 8, opacity: .65, }} size={18} /> */}
                                    <Text style={{ fontSize: 16, fontWeight: '400', }}>BGN {toHumanReadable(getPrice(station.billing, station.ppkw), 'BGN')} / kWh</Text>
                                </View>
                                {/* <Icon name="chevron-right" style={{ opacity: .25, color: 'grey', }} size={20} /> */}
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 32, padding: 12, paddingHorizontal: 32, backgroundColor: '#5dac30', borderColor: '#fff', borderWidth: 3, borderRadius: 32, }}>
                            <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <Icon name="charging-station" size={18} color='white' style={{ marginRight: 8 }} />
                                <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', }}>Start charging</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </SafeAreaView>
        </>
    );
};

export default StationInfo;
