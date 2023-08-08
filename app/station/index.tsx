const formatPower: Function = (watts: number) => {
    return (watts / 1000).toFixed(1);
}

import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useSnapshot } from 'valtio'
import { store, setupUser } from '@/store'
import { toggleStationToFavourites, getFavouriteStations } from '@/helpers'

import Icon from 'react-native-vector-icons/FontAwesome5';

const StationInfo = () => {
    const { user } = useSnapshot(store)

    const { id, name, region } = useLocalSearchParams();
    const { station } = useSnapshot(store)
    
    const handleFavouriteStation = (id, csrf) => {
        console.log('handleFavouriteStation', id, csrf);
        
        toggleStationToFavourites(id, csrf)
            .then( response => {
                getFavouriteStations()
                    .then( response => {
                        setupUser(user, response.data)
                    })
                    .catch( error => {
                        console.log('getFavouriteStations error', error);
                    })
            })
            .catch( error => {
                console.log('toggleStationToFavourites error', error);
            })
    }
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
        <View style={styles.container}>
            {/* <Text>name: {name}</Text> */}
            <Text style={{ paddingVertical: 8, }}>{region}</Text>
            <TouchableOpacity onPress={() => handleFavouriteStation(id, user.csrf)}>
                {
                user.favourite_stations.filter(_ => {
                    return _.l_id == id
                }).length ? 
                    <Icon name="star" solid></Icon> : <Icon name="star"></Icon>
                }
            </TouchableOpacity>
            <View style={styles.container}>
                <Text>Station#: {station.user_id}</Text>
                <Text>{station.pref_user_id}</Text>
                <Text style={{ borderWidth: 1, borderColor: '#000', }}>{station.billing}</Text>
                {
                    station.pref_user_id ? <Icon name="user" solid></Icon> : <Icon name="user-slash"></Icon>
                }
                {
                    station.billing ? (<Text>{station.billing} lv.</Text>) : <Text>0 lv.</Text>
                }
                <Text>{formatPower(station.model.maxPow)} kW</Text>
                {
                    station.model.outlets === 'type2' ? (
                    <Image source={require('@/assets/type2.png')} style={{ width: 50, height: 50 }} />
                    ) : null
                }
                {
                    station.model.outlets === 'shuko' ? (
                    <Image source={require('@/assets/shuko.png')} style={{ width: 50, height: 50 }} />
                    ) : null
                }
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default StationInfo;
