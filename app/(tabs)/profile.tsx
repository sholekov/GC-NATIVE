import global from '@/assets/styles/styles';
import profile from '@/assets/styles/profile';
const styles = { ...global, ...profile };

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Redirect } from 'expo-router';

import Logout from '@/app/(tabs)/partials/(logout)'

import { useSnapshot } from 'valtio'
import { store, setupUser } from '@/store'
import { toggleStationToFavourites, getFavouriteStations } from '@/helpers'

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
        <View style={styles.container}>
            {user ? (
                <>
                {/* <Text>id: {user.id}</Text> */}
                <View>
                    {user.photo_rev ? (
                        <Image source={{ uri: user.photo_rev }} style={{ width: 54, height: 54, }} />
                    ) : (
                        <Image source={require('@/assets/logo-square.png')} style={{ width: 54, height: 54, }} />
                    )}
                </View>
                <View>
                    <Text>name: {user.name}</Text>
                    {/* <Text>photo_rev: {user.photo_rev}</Text> */}
                    <Text>balance: {user.balance}</Text>
                    <Text>credit: {user.credit}</Text>
                    <Text>frozen: {user.frozen}</Text>
                    <Text>attr: {user.attr}</Text>
                </View>

                <FlatList
                  contentContainerStyle={{
                    paddingBottom: 120,
                    backgroundColor: 'pink',
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

                <Logout />
                
                </>
            ) : <Redirect href="/home" /> }
        </View>
    );
};

export default MyComponent;
