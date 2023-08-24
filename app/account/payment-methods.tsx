import constants from '@/constants.json';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
import profile from '@/assets/styles/profile';
const styles = { ...global, ...page, ...profile };

import { useTranslation } from 'react-i18next';

import React, { Component, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Pressable, Alert } from 'react-native';
import { Redirect, Link, } from 'expo-router';

import BottomSheet from '@gorhom/bottom-sheet';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store } from '@/store'
import PaymentInfo from './PaymentInfo';

// Components
// 


const PaymentMethods = () => {
    const { t } = useTranslation();
    const { user } = useSnapshot(store)

    const _bottomSheetShowAddCardRef = useRef(null);
    
    const handleAddCard = () => {
        _bottomSheetShowAddCardRef.current.snapToIndex(0);
    };
    // const handleAlert = () => {
    //     Alert.alert(t('account.paymentMethods.some_label'), t('account.paymentMethods.some_alert'));
    // };

    return (
        <SafeAreaView style={{...styles.container}}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 0, paddingVertical: 42, paddingHorizontal: 24, backgroundColor: '#00000000', borderColor: '#00000000', borderWidth: .5, borderRadius: 32, }}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 32, paddingHorizontal: 12, }}>
                        <Text style={{ fontSize: 28, fontWeight: '600', textAlign: 'center', }}>
                            {t('account.paymentMethods.info')}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 32, padding: 42, backgroundColor: '#fff', borderColor: '#fff', borderWidth: 0, borderRadius: 333, }}>
                        <Icon name="credit-card" solid style={{ fontSize: 84, opacity: .5, }}></Icon>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 32, paddingHorizontal: 12, }}>
                        <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', }}>
                            {t('account.paymentMethods.description')}
                        </Text>
                    </View>

                </View>


                <View style={styles.btns_container}>
                    <TouchableOpacity onPress={handleAddCard} style={{...styles.btn_container, marginHorizontal: 32, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: '#5dac30', borderRadius:180, }}>
                        <View style={{...styles.btn_container.textWrapper, width: '100%', justifyContent: 'center', }}>
                            <Text style={{ ...styles.btn_container.textWrapper.text, color: '#fff', fontSize: 16, fontWeight: '500', }}>{t('account.paymentMethods.cta.add-card')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <BottomSheet
                    ref={_bottomSheetShowAddCardRef}
                    index={-1}
                    snapPoints={['75%', '90%']}
                    enablePanDownToClose={true}
                    onClose={() => _bottomSheetShowAddCardRef.current.close() } >
                        <PaymentInfo />
                    </BottomSheet>
        </SafeAreaView>
    );
};

export default PaymentMethods;
