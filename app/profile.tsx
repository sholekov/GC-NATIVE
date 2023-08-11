import constants from '@/constants.json';

const rates = {
    'BGN': 1,
};

const getRate = (currency: string) => {
    return rates[currency] || 0;
}

const toInternalValue = (amount: number, currency: string = 'getCurrencyCode') => {
    return Math.round((amount || 0) * constants.MONEY_FACTOR / getRate('BGN'));
}

const toHumanReadable = (internal: number, currency: string = 'getCurrencyCode') => {
  // handle special case when internal is less than 0 but also less than -1 cent
  if (internal < 0 && internal > (-0.01 * constants.MONEY_FACTOR)) {
    return 0;
  }

  return (internal / constants.MONEY_FACTOR * getRate('BGN')).toFixed(2);
}

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
import profile from '@/assets/styles/profile';
const styles = { ...global, ...page, ...profile };

import { useTranslation } from 'react-i18next';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Pressable, Alert } from 'react-native';
import { Redirect, Link, } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

// Components
// 

const MyComponent = () => {
    const { t } = useTranslation();
    const { user } = useSnapshot(store)

    const handleAlert = () => {
        Alert.alert(t('accountNamespace.profile.delete_label'), t('accountNamespace.profile.delete_alert'));
    };

    return (
        <SafeAreaView style={{...styles.container}}>
            {user ? (
                <>
                {/* <Text>id: {user.id}</Text> */}
                {/* User Photo */}
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 0, paddingVertical: 42, paddingHorizontal: 24, backgroundColor: '#00000000', borderColor: '#00000000', borderWidth: .5, borderRadius: 32, }}>
                    
                    <View style={{ marginBottom: 12, padding: 8, backgroundColor: '#fff', borderColor: '#fff', borderWidth: 0, borderRadius: 333, }}>
                        {user.photo_rev ? (
                            <Image source={{ uri: user.photo_rev }} style={{ width: 54, height: 54, }} />
                        ) : (
                            <Icon name="user-circle" solid style={{ fontSize: 154, opacity: .5, }}></Icon>
                        )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 32, paddingHorizontal: 12, }}>
                        <Text style={{ fontSize: 28, fontWeight: '600', }}>John Doe</Text>
                        {/* <Text style={{ fontSize: 28, fontWeight: '600', }}>{constants.MONEY_FACTOR}</Text> */}
                        {/* <Text>{user.name}</Text> */}
                    </View>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 12, paddingHorizontal: 12, }}>
                        {/* <Text>photo_rev: {user.photo_rev}</Text> */}
                        <Text style={{ marginRight: 12, fontSize: 24, fontWeight: '600', opacity: .25, }}>BGN</Text>
                        <Text style={{ fontSize: 48, fontWeight: '300', opacity: .5, }}>+{toHumanReadable(user.balance)}</Text>
                        {/* <Text style={{ fontSize: 154, opacity: .5, }}>{user.balance}</Text> */}
                        {/* <Text>credit: {user.credit}</Text>
                        <Text>frozen: {user.frozen}</Text>
                        <Text>attr: {user.attr}</Text> */}
                    </View>
                </View>


                <View style={styles.btns_container}>
                    <TouchableOpacity onPress={handleAlert} style={{...styles.btn_container, marginHorizontal: 32, paddingHorizontal: 12, paddingVertical: 12, borderColor: 'brown', borderWidth: 1, borderRadius:180, }}>
                        <View style={{...styles.btn_container.textWrapper, width: '100%', justifyContent: 'center', }}>
                            {/* <Icon 
                                name='ban'
                                size={18}
                                color={'brown'}
                                solid
                            /> */}
                            <Text style={{ ...styles.btn_container.textWrapper.text, color: 'brown', fontWeight: '500', }}>{t('accountNamespace.profile.delete_label')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                </>
            ) : <Redirect href="/home" /> }
        </SafeAreaView>
    );
};

export default MyComponent;
