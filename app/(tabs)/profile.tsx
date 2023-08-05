import global from '@/assets/styles/styles';
import profile from '@/assets/styles/profile';
const styles = { ...global, ...profile };

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Redirect } from 'expo-router';

import Logout from '@/app/(tabs)/partials/(logout)'

import { useSnapshot } from 'valtio'
import { store } from '@/store'

const MyComponent = () => {
    const { user } = useSnapshot(store)
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

                <Logout />
                
                </>
            ) : <Redirect href="/home" /> }
        </View>
    );
};

export default MyComponent;
