import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable, Linking } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';
import BackToMoneyComponent from '@/app/account/wallet/back-to-money';

const openURL = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  });
};

import { useTranslation } from 'react-i18next';
const AccountMoneySubComponent = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ ...styles.container, }}>

      <View style={{ flex: 1, justifyContent: 'space-between', }}>
        {/* add money */}
        <View style={{ paddingVertical: 64, }}>
          <View style={{ paddingHorizontal: 12, paddingBottom: 16, }}>
            <Text style={{ paddingBottom: 8, fontSize: 28, textAlign: 'center', }}>{t('deposit.depositWith', { 0: t('deposit.office') })}</Text>
          </View>

          <View style={{ paddingHorizontal: 12, paddingBottom: 16, }}>
            <Text style={{ paddingBottom: 8, fontSize: 16, textAlign: 'center', }}>{t('deposit.depositWithOffice')}</Text>
          </View>

          <TouchableOpacity onPress={() => openURL(`https://www.google.com/maps/search/networx/`)}
            style={{}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center',  }}>
              <Text style={{ padding: 16, textAlign: 'center', backgroundColor: '#5dac30', color: '#ffffff', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 8,}}>{t('deposit.depositWithOfficeButton')}</Text>
            </View>
          </TouchableOpacity>

        </View>

        <BackToMoneyComponent />

      </View>

    </SafeAreaView>
  );
};

export default AccountMoneySubComponent;
