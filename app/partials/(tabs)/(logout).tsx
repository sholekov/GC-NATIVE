
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router, Link, Redirect, useRouter } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { userLogout, setLocalUser } from '@/helpers'
import { store } from '@/store'

import { useTranslation } from 'react-i18next';
const Logout = ({ triggerLoading, styles }) => {
  const { t } = useTranslation();
  const { user } = useSnapshot(store)

  const handleLogout = () => {
    console.log('userLogout', performance.now());
    const t0 = performance.now();
    if (user) {
      triggerLoading(true)
      userLogout(user.csrf)
        .then((status: boolean) => {
          const t1 = performance.now();
          console.log('user are Logged out', t1 - t0);
          if (status) {
            setLocalUser(true)
          } else {
            Alert.alert('Logout failed');
          }
          setTimeout(() => {
            console.log('triggerLoading false');
            triggerLoading(false)
          }, 1000);
        })
        .catch(error => {
          console.log('userLogout error', error);
        })
    } else {
      Alert.alert('The user is not settled.');
    }
  };

  return user ? (
    <>
      <TouchableOpacity onPress={handleLogout} style={[styles.btn_container, styles.roundedTop, styles.roundedBottom]}>
        <View style={styles.btn_container.textWrapper}>
          <Icon
            name='sign-out-alt'
            size={18}
            color={'#333'}
          />
          <Text style={styles.btn_container.textWrapperText}>{t('common.logout')}</Text>
        </View>
      </TouchableOpacity>
    </>
  ) : <Text>You should not see this screen!</Text>
};

export default Logout;
