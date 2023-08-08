import global from '@/assets/styles/styles';
import login from '@/assets/styles/login';
const styles = { ...global, ...login };

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Pressable, } from 'react-native';
import { Link } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome';

import { helpers, userLogin } from '@/helpers'
import { setupUser } from '@/store'
import { useSnapshot } from 'valtio';

function Login() {
  const { axiosInstance } = useSnapshot(helpers)

  const [username, setUsername] = useState('');
  const [password, setPIN] = useState('');
  const [loginWithNetworx, setLoginWithNetworx] = useState(false);

  const [showPIN, setShowPIN] = useState(false);
  const [setCredentials, setSetCredentials] = useState(true);
  
  const handleLogin = () => {
    const data = {
      provider: '',
      email: setCredentials ? username : 'sholeka+1@googlemail.com',
      password: setCredentials ? password : '1234',
    };
    if (loginWithNetworx) {
      Object.assign(data, {
        provider: 'networx',
      })
    }

    userLogin(data)
      .then( ({status, user}: {status: boolean, user: any}) => {
        if (status && user) {
          Promise.all([
              axiosInstance.get('me'),
              axiosInstance.get('favorites')
            ])
            .then( ([result_of_user, result_of_favourite]) => {
              setupUser(result_of_user.data, result_of_favourite.data);
            })
            .catch((e: Error) => {
              console.log('e', e);
              setupUser(null, null)
            })
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      })
  };

  const handleLostPIN = () => {
    Alert.alert('Lost PIN', 'Please contact our support team at support@example.com to reset your PIN.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
    
      <View style={styles.container}>
        <Text onPress={() => { setSetCredentials(!setCredentials) }} style={styles.title}>Login</Text>
        <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={setUsername} style={{...styles.input}} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="PIN"
            onChangeText={setPIN}
            secureTextEntry={!showPIN} // Control whether the password is shown
            style={{...styles.input, ...styles.inputPIN}}
          />
          <TouchableOpacity
            onPress={() => setShowPIN(!showPIN)} // Toggle the showPassword state
            style={styles.showPasswordButton}
          >
            <Icon
              name={showPIN ? 'eye-slash' : 'eye'}
              size={20}
              color="black"
              style={styles.showPasswordButton.icon}
            />
          </TouchableOpacity>
        </View>
        
        <View>
          <TouchableOpacity
              style={styles.checkboxContainer} 
              onPress={() => setLoginWithNetworx(!loginWithNetworx)}
            >
            <Icon
              name={loginWithNetworx ? 'check-square-o' : 'square-o'}
              size={20}
              color="black"
              style={styles.checkbox}
            />
            <Text style={styles.label}>Login with Networx</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Link href="/register" style={{ width: '100%' }} asChild>
          <Pressable>
            <Text style={styles.link}>Don't have an account? Register</Text>
          </Pressable>
        </Link>
        
        <TouchableOpacity onPress={handleLostPIN} style={styles.lostPasswordButton}>
          <Text style={styles.lostPasswordText}>Lost Your PIN?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Login;
