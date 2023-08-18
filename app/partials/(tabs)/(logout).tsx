import global from '@/assets/styles/styles';
const styles = { ...global, };

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router, Link, Redirect } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { userLogout, setLocalUser } from '@/helpers'
import { store } from '@/store'

const Logout = ({styles}) => {
  const { user } = useSnapshot(store)

  const handleLogout = () => {
    if (user) {
      userLogout(user.csrf)
        .then((status: boolean) => {
          if (status) {
            setLocalUser()
            .then(() => {
              router.push('/home');
            })
          } else {
            Alert.alert('Logout failed');
          }
        })
    } else {
      Alert.alert('The user is not settled.');
    }
  };
  
  return user ? (
    <>
    <TouchableOpacity onPress={handleLogout} style={{...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom}}>
      <View style={styles.btn_container.textWrapper}>
          <Icon 
              name='sign-out-alt'
              size={18}
              color={'#333'}
          />
          <Text style={styles.btn_container.textWrapperText}>Logout</Text>
      </View>
    </TouchableOpacity>
    </>
  ) : <Text>You should not see this screen!</Text>
};

export default Logout;
