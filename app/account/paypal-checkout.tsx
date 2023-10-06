import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable, Linking, TextInput } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import { StripeProvider } from '@stripe/stripe-react-native';
import BackToMoneyComponent from '@/app/account/wallet/back-to-money';
import PaymentForm from './PaymentForm';

const openURL = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  });
};

const HeaderText = ({ children }) => <Text style={localStyles.headerText}>{children}</Text>;
const SubText = ({ children }) => <Text style={localStyles.subText}>{children}</Text>;
const ConfirmButton = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={localStyles.confirmButton}>
    <Text style={{ color: '#ffffff' }}>{children}</Text>
  </TouchableOpacity>
);

import { useTranslation } from 'react-i18next';
const AccountMoneySubComponent = () => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');
  const [confirmAmount, setConfirmAmount] = useState(false);

  return (
    <StripeProvider
      publishableKey="pk_test_2lS9I3igYzfy3gyKIbh8WNsF00ipAOEotm"
      urlScheme="gigacharger" // required for 3D Secure and bank redirects
      merchantIdentifier="cosysoy.com.gigacharger" // required for Apple Pay
    >
      <SafeAreaView style={{ ...styles.container, }}>

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', }}>

          <View style={{ alignContent: 'center', justifyContent: 'center', paddingVertical: 64, width: '90%', maxWidth: 248, }}>

            {/* add money */}
            <HeaderText>{t('deposit.depositWith', { 0: t('deposit.paypal-checkout') })}</HeaderText>
            <SubText>{t('deposit.depositWithPaypal')}</SubText>
            <SubText>{t("deposit.minAmount", { 0: 20 })}</SubText>

            <TextInput
              style={[
                localStyles.input,
                !confirmAmount ? {} : { backgroundColor: '#e0e0e0', borderColor: '#bdbdbd', color: '#9e9e9e' }
              ]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter Amount"
              editable={!confirmAmount}
            />

            {!confirmAmount && amount && (
              <ConfirmButton onPress={() => setConfirmAmount(true)}>
                {t('deposit.label-confirm')}
              </ConfirmButton>
            )}

            {confirmAmount && (
              <>
                <PaymentForm amount={(parseInt(amount)*100)} />
                <TouchableOpacity onPress={() => setConfirmAmount(false)} style={localStyles.cancelButton}>
                  <Text style={{ color: '#555' }}>{t('deposit.label-change-amount')}</Text>
                </TouchableOpacity>
              </>
            )}

          </View>

          <BackToMoneyComponent></BackToMoneyComponent>

        </View>

      </SafeAreaView>
    </StripeProvider>
  );
};

export default AccountMoneySubComponent;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 64,
    paddingHorizontal: 12,
  },
  headerText: {
    paddingBottom: 8,
    fontSize: 28,
    textAlign: 'center',
  },
  subText: {
    paddingBottom: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    marginVertical: 12,
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  confirmButton: {
    padding: 16,
    backgroundColor: '#5dac30',
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#99999900',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
