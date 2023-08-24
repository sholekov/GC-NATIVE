import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import BackToMoneyComponent from '@/app/account/wallet/back-to-money';

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;

import { useTranslation } from 'react-i18next';
const AccountMoneyComponent = () => {
  const { t } = useTranslation();
  const { user, station, station_location } = useSnapshot(store)

  return (
    <SafeAreaView style={{ ...styles.container, }}>

      <View style={{ flex: 1, justifyContent: 'space-between', }}>
        {/* add money */}
        <View style={{ paddingVertical: 32, }}>
          <View style={{ paddingHorizontal: 12, paddingBottom: 16, }}>
            <Text style={{ paddingBottom: 8, fontSize: 34, }}>{t('deposit.depositing')}</Text>
          </View>
          
        </View>

        <BackToMoneyComponent />
        
      </View>

    </SafeAreaView>
  );
};

export default AccountMoneyComponent;
