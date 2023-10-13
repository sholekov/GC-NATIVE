import { toHumanReadable, getPrice } from '@/utils/helpers';

import globalStyles from '@/assets/styles/styles';
import pageStyles from '@/assets/styles/page';
const styles = { ...globalStyles, ...pageStyles };

import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

import Icon from 'react-native-vector-icons/FontAwesome5';

// Components
import BackButton from '@/app/(components)/stackBackButton';
import Divider from '@/app/partials/divider';

import { useTranslation } from 'react-i18next';
const AccountMoneyComponent = () => {
  const { t } = useTranslation();

  // TODO: get from server
  const payment_methods = ["office", "paypal", "revolut-pay", "card"];

  return (
    <SafeAreaView style={{ ...styles.container, }}>
      <Stack.Screen options={{
        title: t('account.tabLabels.wallet'),
        headerLeft: () => <BackButton />,
      }} />

      <View style={{ flex: 1, justifyContent: 'space-between', }}>
        {/* add money */}
        <View style={{ paddingVertical: 32, }}>
          <View style={{ paddingHorizontal: 12, paddingBottom: 16, }}>
            <Text style={{ paddingBottom: 8, fontSize: 24, textAlign: "center", }}>{t('deposit.depositing')}</Text>
            <Text style={{ fontSize: 14, textAlign: "center", }}>{t('deposit.depositingDesc')}</Text>
          </View>
          <View style={{}}>
            <View style={styles.btns_container}>
              {
                payment_methods.map((item, index) => (
                  <View key={item}>
                    <Link href={{ pathname: `account/(type)`, params: { type: item } }} asChild >
                      <Pressable>
                        <View style={[{ ...styles.btn_container, }, (index == 0) && { ...styles.roundedTop }, (index + 1 === payment_methods.length) && { ...styles.roundedBottom }]}>
                          <View style={styles.btn_container.textWrapper}>
                            {
                              item === 'office' ? (
                                <Icon
                                  style={{ width: 32, }}
                                  name='building'
                                  size={18}
                                  color={'#333'}
                                />
                              ) : item === 'paypal' ? (
                                <Icon
                                  style={{ width: 32, }}
                                  name='paypal'
                                  size={18}
                                  color={'#333'}
                                />
                              ) : item === 'revolut-pay' ? (
                                <Icon
                                  style={{ width: 32, }}
                                  name='money-bill-wave'
                                  size={18}
                                  color={'#333'}
                                />
                              ) : item === 'card' ? (
                                <Icon
                                  style={{ width: 32, }}
                                  name='credit-card'
                                  size={18}
                                  color={'#333'}
                                />
                              ) : null
                            }
                            <Text style={styles.btn_container.textWrapperText}>{t(`deposit.${item}`)}</Text>
                          </View>
                          <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                          />
                        </View>
                      </Pressable>
                    </Link>
                    {(index < payment_methods.length) && <Divider />}
                  </View>
                ))
              }
            </View>
          </View>
          <View style={{ paddingHorizontal: 12, paddingBottom: 32, }}>
            {/* (1 / i18n.currencies.getRate(i18n.getCurrencyCode())).toFixed(6) */}
            <Text style={{ fontSize: 14, color: '#999' }}>{t('deposit.conversionClarification', { 0: 'Currency' })}</Text>
          </View>
        </View>

        <View style={{ paddingVertical: 32, }}>

          {/* make transfer */}
          <View style={styles.btns_container}>
            <Link href='account/transaction' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='exchange-alt'
                      size={18}
                      color={'#333'}
                    />
                    <Text style={styles.btn_container.textWrapperText}>{t('commonNamespace.transactionMake')}</Text>
                  </View>
                  <Icon
                    name='chevron-right'
                    size={18}
                    color={'grey'}
                  />
                </View>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default AccountMoneyComponent;
