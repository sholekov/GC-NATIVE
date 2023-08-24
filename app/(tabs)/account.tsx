import globalStyles from '@/assets/styles/styles';
import pageStyles from '@/assets/styles/page';
const styles = { ...globalStyles, ...pageStyles };

import React from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { Link, Redirect } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

// Components
import AccountHeader from '@/app/partials/(tabs)/account/accountHeader'
import Divider from '@/app/partials/divider'
import Logout from '@/app/partials/(tabs)/(logout)'

import { useTranslation } from 'react-i18next';
const AccountComponent = () => {
  const { t } = useTranslation();
  const { user } = useSnapshot(store)

  return (
    <>
      {user ? (
        <SafeAreaView style={{ flex: 1, }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 32 }}>
            <View style={{ ...styles.btns_container, paddingTop: 14, }}>
              <AccountHeader user={user} />
            </View>

            <View style={styles.btns_container}>
              <Link href='account/details' asChild>
                <Pressable>
                  <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom, }}>
                    <View style={styles.btn_container.textWrapper}>
                      <Icon
                        name='user-circle'
                        size={18}
                        color={'#333'}
                        solid
                      />
                      <Text style={styles.btn_container.textWrapperText}>{t('account.navLabels.details')}</Text>
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


            <View style={styles.btns_container}>
              <Link href='account/favourites' asChild>
                <Pressable>
                  <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedTop }}>
                    <View style={styles.btn_container.textWrapper}>
                      <Icon
                        name='star'
                        size={18}
                        color={'#333'}
                        solid
                      />
                      <Text style={styles.btn_container.textWrapperText}>{t('account.navLabels.favourites')}</Text>
                    </View>
                    <Icon
                      name='chevron-right'
                      size={18}
                      color={'grey'}
                    />
                  </View>
                </Pressable>
              </Link>
              <Divider />
              <Link href='account/wallet' asChild>
                <Pressable>
                  <View style={{ ...styles.btn_container, ...styles.roundedBottom }}>
                    <View style={styles.btn_container.textWrapper}>
                      <Icon
                        name='wallet'
                        size={18}
                        color={'#333'}
                        solid
                      />
                      <Text style={styles.btn_container.textWrapperText}>{t('account.navLabels.wallet')}</Text>
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



            <View style={styles.btns_container}>
              <Link href='account/payment-methods' asChild>
                <Pressable>
                  <View style={{ ...styles.btn_container, ...styles.roundedTop, }}>
                    <View style={styles.btn_container.textWrapper}>
                      <Icon
                        name='credit-card'
                        size={18}
                        color={'#333'}
                      />
                      <Text style={styles.btn_container.textWrapperText}>{t('account.navLabels.payment-methods')}</Text>
                    </View>
                    <Icon
                      name='chevron-right'
                      size={18}
                      color={'grey'}
                    />
                  </View>
                </Pressable>
              </Link>
              <Divider />
              {/* <Link href='/home' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='coins'
                      size={18}
                      color={'#333'}
                      solid
                    />
                    <Text style={styles.btn_container.textWrapperText}>{t('account.navLabels.promotional-ballance')}</Text>
                  </View>
                  <Icon
                    name='chevron-right'
                    size={18}
                    color={'grey'}
                  />
                </View>
              </Pressable>
            </Link>
            <Divider /> */}
              <Link href='account/transactions' asChild>
                <Pressable>
                  <View style={{ ...styles.btn_container, ...styles.roundedBottom }}>
                    <View style={styles.btn_container.textWrapper}>
                      <Icon
                        name='receipt'
                        size={18}
                        color={'#333'}
                      />
                      <Text style={styles.btn_container.textWrapperText}>{t('account.navLabels.transactions')}</Text>
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

            <View style={styles.btns_container}>
              <Logout styles={styles} />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Redirect href={'/home'} />
      )}
    </>
  )
};

export default AccountComponent;
