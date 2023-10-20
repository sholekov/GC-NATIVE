import { toHumanReadable, getPrice } from '@/utils/helpers';

import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, Pressable, Linking, TextInput } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

const HeaderText = ({ children }) => <Text style={localStyles.headerText}>{children}</Text>;
const ConfirmButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={localStyles.confirmCancelButton}>
    <Icon name="chevron-right" style={localStyles.confirmCancelButtonIcon} />
  </TouchableOpacity>
);

const merchantIdentifier = process.env.APPLE_PAY_MERCHANT_IDENTIFIER;

import { useTranslation } from 'react-i18next';
const AccountMoneySubComponent = () => {
  const { t } = useTranslation();
  const { type } = useLocalSearchParams();

  const [amount, setAmount] = useState('');
  const [confirmAmount, setConfirmAmount] = useState(false);

  useEffect(() => {
    if (isNaN(amount)) {
      // Alert.alert('Invalid Amount', 'Please enter a valid amount to proceed.');
      // setAmount('');
      // return;
    } else {
      // Alert.alert('Payment Initiated', `You've initiated a payment of $${amount} to the merchant.`);
    }
    if (confirmAmount) {
      if (parseFloat(amount) <= 19) {
        setAmount('');
        setConfirmAmount(false);
        Alert.alert('Amount is too low', 'Please enter a minimum amount of 20 to proceed.');
        return;
      }
    }
  }, [amount, confirmAmount]);

  return (
    <StripeProvider
      publishableKey="pk_test_2lS9I3igYzfy3gyKIbh8WNsF00ipAOEotm"
      urlScheme="gigacharger" // required for 3D Secure and bank redirects
      merchantIdentifier={merchantIdentifier} // required for Apple Pay
    >
      <SafeAreaView style={{ ...styles.container, }}>

        <Stack.Screen options={{
          title: t(`deposit.depositing`),
          headerLeft: () => <BackButton />,
        }} />

        <View style={{...localStyles.outerWrapper,  opacity: (confirmAmount ? 0.25 : 1),}}>

          {/* <View style={{ paddingVertical: 64, }}></View> */}

          <View style={localStyles.innerWrapper}>

            <View style={localStyles.iconWrapper}>
              {
                type === 'networxoffice' ? (
                  <Icon name='building' style={localStyles.iconStyle} />
                ) : type === 'paypal' ? (
                  <Icon name='paypal' style={localStyles.iconStyle} />
                ) : type === 'revolut-pay' ? (
                  <Icon name='money-bill-wave' style={localStyles.iconStyle} />
                ) : type === 'card' ? (
                  <Icon name='credit-card' style={localStyles.iconStyle} />
                ) : null
              }
              {
                (type === 'card' || type === 'paypal') ? (
                  <>
                    {/* <SupHeader>{t(`deposit.header.depositWith`)}</SupHeader> */}
                    <HeaderText>{t(`deposit.label.depositWith.${type}`)}</HeaderText>
                  </>) : type === 'office' ? <HeaderText>{t(`deposit.label.depositWith.office`)}</HeaderText> : null
              }
            </View>
            <View style={{ marginBottom: 8, }}>
              {
                (type === 'card' || type === 'paypal') ? (
                  <>
                  <Text style={{ ...localStyles.subText, marginBottom: 12, color: "#333", }}>{t(`deposit.description.${type}`)}</Text>
                  <View style={{ ...localStyles.inputOuter, }}>
                    <View style={{ ...localStyles.inputWrapper, }}>
                      <Text style={[
                        localStyles.currencySign,
                        !amount && { color: '#00000035', }
                      ]}>$</Text>
                      <TextInput
                        style={[
                          localStyles.input,
                          confirmAmount && { backgroundColor: '#e0e0e050', borderColor: '#bdbdbd75', color: '#9e9e9e', }
                        ]}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder={t(`deposit.placeholder.enter_amount`)}
                        editable={!confirmAmount}
                      />
                      {!confirmAmount && amount && (parseInt(amount) > 19) && (
                        <ConfirmButton onPress={() => setConfirmAmount(true)}></ConfirmButton>
                      )}
                      {confirmAmount && (
                        <TouchableOpacity onPress={() => setConfirmAmount(false)} style={localStyles.confirmCancelButton}>
                          <Icon name="check" style={{ ...localStyles.confirmCancelButtonIcon, fontSize: 16, }} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  </>) : type === 'networxoffice' ? (
                    <>
                    <View style={{ paddingHorizontal: 24, paddingBottom: 16, }}>
                      <Text style={{ paddingBottom: 8, fontSize: 16, textAlign: 'center', }}>{t('deposit.depositWithOffice')}</Text>
                    </View>

                    <TouchableOpacity onPress={() => openURL(`https://www.google.com/maps/search/networx/`)} style={{ flexDirection: 'row', justifyContent: 'center', }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#9a9a9a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 8, }}>
                        <Text style={{ marginRight: 12, fontSize: 18, color: '#ffffff', }}>{t('deposit.depositWithOfficeButton')}</Text>
                        <Icon name="chevron-right" style={{ fontSize: 18, color: '#fff' }} />
                      </View>
                    </TouchableOpacity>
                    </>
                  ) : type === 'revolut' ? (
                    <>
                    </>
                  ) : null
              }
            </View>

            {(type === 'card' || type === 'paypal') && (<View style={{ paddingVertical: 12, borderTopColor: '#99999950', borderTopWidth: 0, backgroundColor: '#e0e0e050', }}>
              <Text style={localStyles.subText}>{t("deposit.subDescription")}</Text>
            </View>)}

          </View>

          {/* <BackToMoneyComponent></BackToMoneyComponent> */}

        </View>

        {confirmAmount && (
          <PaymentSheet amount={(parseInt(amount) * 100)} type={type} setConfirmAmount={setConfirmAmount} />
        )}

      </SafeAreaView>
    </StripeProvider>
  );
};

// Components
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '@/app/(components)/stackBackButton';
import { StripeProvider } from '@stripe/stripe-react-native';
import BackToMoneyComponent from '@/app/account/(type)/back-to-money';
import PaymentSheet from './PaymentSheet';

export default AccountMoneySubComponent;

const openURL = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  });
};

const localStyles = StyleSheet.create({
  outerWrapper: { flex: 1, paddingVertical: 32, },
  innerWrapper: {
    flex: 1, justifyContent: 'center',
    marginHorizontal: 24,
    backgroundColor: '#fff',

    borderColor: '#99999950', borderWidth: 1, borderRadius: 8,
    // backgroundColor: '#5dac30',
    
    shadowColor: "#00000050",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  iconStyle: {
    marginBottom: 4,
    fontSize: 38,
    color: '#333',
  },
  headerText: {
    paddingBottom: 8,
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
  },
  subText: {
    paddingHorizontal: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
  },

  inputOuter: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputWrapper: {
    // position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',

    padding: 8,

    backgroundColor: '#99999915',

    borderColor: '#99999985',
    borderWidth: 1,
    borderRadius: 8,
  },
  currencySign: {
    marginLeft: 4,
    marginRight: 4,
    fontSize: 22,
    fontWeight: '600',
    color: '#00000070',
  },
  input: {
    minWidth: 128,
    fontSize: 22,
  },
  confirmCancelButton: {
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',

    padding: 2,

    width: 34,
    height: 30,

    backgroundColor: '#5dac30',
    // borderColor: '#99999925',
    // borderWidth: 0.5,
    borderRadius: 8,
  },
  confirmCancelButtonIcon: {
    marginRight: -2,
    fontSize: 18,
    color: '#fff',
  },
});
