import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { Link, Redirect } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store } from '@/store'

// Components
import AccountHeader from '@/app/partials/(tabs)/account/accountHeader'
import Divider from '@/app/partials/divider'
import Logout from '@/app/partials/(tabs)/(logout)'

const AccountComponent = () => {
  const { user } = useSnapshot(store)

  return (
    <>
      {user ? (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 32, }}>
          <View style={{ ...styles.btns_container, paddingTop: 14, }}>
            <AccountHeader user={user} />
          </View>


          <View style={styles.btns_container}>
            <Link href='pages/account/details' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom, }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='user-circle'
                      size={18}
                      color={'#333'}
                      solid
                    />
                    <Text style={styles.btn_container.textWrapperText}>Account details</Text>
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
            <Link href='pages/account/favourites' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedTop }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='star'
                      size={18}
                      color={'#333'}
                      solid
                    />
                    <Text style={styles.btn_container.textWrapperText}>Favourites</Text>
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
            <Link href='pages/account/details' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, ...styles.roundedBottom }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='wallet'
                      size={18}
                      color={'#333'}
                      solid
                    />
                    <Text style={styles.btn_container.textWrapperText}>Your money</Text>
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
            <Link href='pages/account/payment-methods' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, ...styles.roundedTop, }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='credit-card'
                      size={18}
                      color={'#333'}
                    />
                    <Text style={styles.btn_container.textWrapperText}>Payment methods</Text>
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
            <Link href='/home' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='coins'
                      size={18}
                      color={'#333'}
                      solid
                    />
                    <Text style={styles.btn_container.textWrapperText}>Promotional balance</Text>
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
            <Link href='/home' asChild>
              <Pressable>
                <View style={{ ...styles.btn_container, ...styles.roundedBottom }}>
                  <View style={styles.btn_container.textWrapper}>
                    <Icon
                      name='receipt'
                      size={18}
                      color={'#333'}
                    />
                    <Text style={styles.btn_container.textWrapperText}>Billing</Text>
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
        </SafeAreaView>
      ) : (
        <Redirect href={'/home'} />
      )}
    </>
  )
};

export default AccountComponent;
