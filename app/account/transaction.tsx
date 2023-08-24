import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable, Linking, TextInput } from 'react-native';

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
  const { user, station, station_location } = useSnapshot(store)

  const [User, setUser] = useState()
  const [Quantity, setQuantity] = useState()
  const [Description, setDescription] = useState()

  return (
    <SafeAreaView style={{ ...styles.container, }}>

      <View style={{ flex: 1, justifyContent: 'space-between', }}>
      
        <View style={{ paddingVertical: 64, }}>
  
          <Text style={{ paddingVertical: 64, textAlign: 'center', fontSize: 32, }}>{t('commonNamespace.transactionMake')}</Text>

          <View style={{ paddingHorizontal: 12, paddingBottom: 16, }}>

            <TextInput placeholder="User" onChangeText={User} autoCapitalize="none" style={styles.input} />
            <TextInput placeholder="Quantity" onChangeText={Quantity} style={styles.input} />

            <TextInput placeholder="Description" onChangeText={Description} autoCapitalize="none" secureTextEntry style={{ ...styles.input, height: 128, }} multiline={true} numberOfLines={4} />

          </View>

          <TouchableOpacity onPress={() => { }} style={{}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
              <Text style={{ padding: 16, textAlign: 'center', backgroundColor: '#5dac30', color: '#ffffff', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 8, }}>{t('commonNamespace.commit')}</Text>
            </View>
          </TouchableOpacity>

        </View>

        <BackToMoneyComponent />

      </View>

    </SafeAreaView>
  );
};

export default AccountMoneySubComponent;
