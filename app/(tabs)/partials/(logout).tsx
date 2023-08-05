import global from '@/assets/styles/styles';
const styles = { ...global, };

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router, Link, Redirect } from 'expo-router';
import { useSnapshot } from 'valtio'

import { userLogout } from '@/helpers'
import { store, setupUser } from '@/store'

const Logout = () => {
  const { user } = useSnapshot(store)

  const handleLogout = () => {
    if (user) {
      userLogout(user.csrf)
        .then((status: boolean) => {
          if (status) {
            setupUser(null);
            router.push('/home');
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
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
    </>
  ) : <Text>You should not see this screen!</Text>
};

export default Logout;
