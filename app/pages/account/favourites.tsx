import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
import profile from '@/assets/styles/profile';
const styles = { ...global, ...page, ...profile };

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Pressable } from 'react-native';
import { Redirect, Link, } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store, setupUser } from '@/store'
import { toggleStationToFavourites, getFavouriteStations } from '@/helpers'

// Components
import Logout from '@/app/partials/(tabs)/(logout)'

const MyComponent = () => {
    const { user } = useSnapshot(store)

    const handleFavouriteStation = (id: number, csrf: string) => {
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

    return (
        <SafeAreaView style={{ flex: 1, }}>
            {user ? (
                <>
                <View style={{ marginVertical: 32, paddingHorizontal: 12, }}>
 
                    <FlatList
                    contentContainerStyle={{
                        backgroundColor: 'pink',
                        borderRadius: 16,
                        padding: 16,
                    }}
                    data={user.favourite_stations}
                    renderItem={({item}) => (
                        <>
                        <Text>u_id: {item.u_id}</Text>
                        <Text>l_id: {item.l_id}</Text>
                        <TouchableOpacity onPress={() => handleFavouriteStation(item.l_id, user.csrf)}>
                            <Text>remove from Favourites</Text>
                        </TouchableOpacity>
                        </>
                    )}
                    keyExtractor={item => Math.random().toString(36).substr(2, 9)}
                    />
                </View>

                </>
            ) : <Redirect href="/home" /> }
        </SafeAreaView>
    );
};

export default MyComponent;
