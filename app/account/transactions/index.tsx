
import globalStyles from '@/assets/styles/styles';
import pageStyles from '@/assets/styles/page';
const styles = { ...globalStyles, ...pageStyles };

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable, Linking, TextInput } from 'react-native';
import { Stack } from 'expo-router';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

// Components
import BackButton from '@/app/(components)/stackBackButton';
import BackToMoneyComponent from '@/app/account/(type)/back-to-money';

import { useTranslation } from 'react-i18next';
const AccountMoneySubComponent = () => {
  const { t } = useTranslation();

  const [User, setUser] = useState()
  const [Quantity, setQuantity] = useState()
  const [Description, setDescription] = useState()

  return (
    <SafeAreaView style={{ ...styles.container, }}>
      <Stack.Screen options={{
        title: t('account.tabLabels.payment-methods'),
        headerLeft: () => <BackButton />,
      }} />

      <View style={{ flex: 1, justifyContent: 'space-between', }}>

        <View style={{ paddingVertical: 64, }}>

          <Text style={{ paddingVertical: 64, textAlign: 'center', fontSize: 32, }}>{t('commonNamespace.transactionMake')}</Text>

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
