//import liraries
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useSnapshot } from 'valtio'
import { store, addStationToFavourites } from '@/store'

const StationInfo = () => {
    const { name, region } = useLocalSearchParams();
    const { station } = useSnapshot(store)
    
    const handleFavouriteStation = () => addStationToFavourites(station.id)
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
            <Text>name: {name}</Text>
            <Text>region: {region}</Text>
            <TouchableOpacity onPress={handleFavouriteStation}>
                <Text>Favourite Station</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <Text>StationInfo</Text>
                <Text>userID: {station.user_id}</Text>
                <Text>END StationInfo</Text>
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
