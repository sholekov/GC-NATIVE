import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable, Linking } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';
import BackToMoneyComponent from '@/app/account/(type)/back-to-money';

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

        </View>

        <BackToMoneyComponent />

      </View>

    </SafeAreaView>
  );
};

export default AccountMoneySubComponent;
