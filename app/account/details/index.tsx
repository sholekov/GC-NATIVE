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

import React, { Component, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Pressable, Alert } from 'react-native';
import { Redirect, Link, Stack, } from 'expo-router';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

// Components
import BackButton from '@/app/(components)/stackBackButton';
import UserPhotoComponent from './userPhoto';

const AccountDetailsComponent = () => {

  const { t } = useTranslation();
  const { user } = useSnapshot(store)

  const handleAlert = () => {
    Alert.alert(t('account.profile.delete_label'), t('account.profile.delete_alert'));
  };

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <Stack.Screen options={{
        title: t('account.tabLabels.details'),
        headerLeft: () => <BackButton />,
      }} />

      {user ? (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>
          {/* <Text>id: {user.id}</Text> */}
          <View style={{ flex: 9, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginHorizontal: 32, marginBottom: 0, paddingVertical: 0, paddingHorizontal: 24, }}>

            <UserPhotoComponent />

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


          <View style={{ flex: 1, ...styles.btns_container, }}>
            <TouchableOpacity onPress={handleAlert} style={{ ...styles.btn_container, marginHorizontal: 32, paddingHorizontal: 12, paddingVertical: 12, borderColor: 'brown', borderWidth: 1, borderRadius: 180, }}>
              <View style={{ ...styles.btn_container.textWrapper, width: '100%', justifyContent: 'center', }}>
                <Text style={{ ...styles.btn_container.textWrapperText, color: 'brown', fontWeight: '500', }}>{t('account.profile.delete_label')}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      ) : <Redirect href="/home" />}
    </SafeAreaView>
  );
};

export default AccountDetailsComponent;
