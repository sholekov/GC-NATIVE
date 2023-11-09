import { httpUserLogout } from '@/utils/http/httpLoginRegisterRequests'
import { store } from '@/store'
import { user } from '@/utils/user'

const LogoutComponent = ({ triggerLoading, styles }) => {
  const { t } = useTranslation();
  const { data: User } = useSnapshot(user)

  const handleLogout = () => {
    triggerLoading(true)

    const t0 = performance.now();
    console.log('userLogout', t0);
    
    if (User) {
      Promise.all([
        signOut(auth),
        httpUserLogout(User.csrf)
      ])
        .then(([nothing, statusGCLogout]: [void, boolean]) => {
          const t1 = performance.now();
          console.log('user are Logged out', t1 - t0, statusGCLogout);
          if (statusGCLogout) {
            user.data = null;
          } else {
            Alert.alert('Logout failed');
          }
        })
        .catch(error => {
          console.log('userLogout error', error);
        })
        .finally(() => {
          triggerLoading(false)
        })
  
    } else {
      Alert.alert('The user is not settled.');
    }
  };

  return User ? (
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

// React
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

// Expo
import { router, Link, Redirect, useRouter } from 'expo-router';

// Firebase
import { signOut, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase'

import { useTranslation } from 'react-i18next';

import { useSnapshot } from 'valtio'

import Icon from 'react-native-vector-icons/FontAwesome5';

export default LogoutComponent;
