import { store } from '@/store'
import { helpers, userLogin, setLocalUser, setUserCredentials } from '@/helpers'

import setupLanguage from '@/hooks/useSetupLanguage'
import loginActions from '@/hooks/useLoginActions'

// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from 'expo-web-browser';
// WebBrowser.maybeCompleteAuthSession();


function LoginComponent({ triggerLoading }) {
  const { t, i18n } = useTranslation();
  const { LanguagesComponent } = setupLanguage();
  const { login, forgetPassword } = loginActions();

  const [username, setUsername] = useState('');
  const [password, setPIN] = useState('');
  const [loginWithNetworx, setLoginWithNetworx] = useState(false);

  const [showPIN, setShowPIN] = useState(false);
  const [setCredentials, setSetCredentials] = useState(true);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: "270750900606-sb793cv8pjnl9shg1rrhlcamn1528do5.apps.googleusercontent.com",
  //   androidClientId: "270750900606-p57d3h3s0gdgjf6n4qq6800e356v7e7c.apps.googleusercontent.com",
  // });
  // useEffect(() => {
  //   if (response?.type == "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);


  const handleLogin = () => {
    console.log('handleLogin triggered');
    
    const data = {
      email: setCredentials ? username : 'sholeka@gmail.com',
      password: setCredentials ? password : '123123',
      // email: setCredentials ? username : 'sholeka+1@googlemail.com',
      // password: setCredentials ? password : '1234',
    };
    if (loginWithNetworx) {
      helpers.provider = 'networx'
    }
    triggerLoading(true)
    
    login(data)
      .then(user_data => {
        const user = user_data.user;
        console.log('data', data.email, data.password);
        // setUserCredentials(data)
        console.log('user_data:', user_data);
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        console.log(error.message)
        // Alert.alert(t('login.alert-error.title'), t('login.alert-error.text'), [{ text: t('login.alert-error.btn_text'), style: 'default' }]);
        triggerLoading(false)
      })

    return;
  };

  const handleLostPIN = () => {
    Alert.alert(t('login.alert-lost-pin.title'), t('login.alert-lost-pin.text'));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, }}>
        
        <LanguagesComponent />

        <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 70, }}>

          <View style={styles.container}>
            <Text onPress={() => { __DEV__ & setSetCredentials(!setCredentials) }} style={styles.page_title}>
              {t('login.page-title')}
            </Text>
            <TextInput placeholder={t('login.placeholder.useremail')} keyboardType="email-address" autoCapitalize="none" onChangeText={setUsername} style={{ ...styles.input }} />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder={t('login.placeholder.password')}
                onChangeText={setPIN}
                secureTextEntry={!showPIN}
                style={[styles.input, styles.inputPIN]}
              />
              <TouchableOpacity
                onPress={() => setShowPIN(!showPIN)}
                style={styles.showPasswordButton}
              >
                <Icon
                  name={showPIN ? 'eye-slash' : 'eye'}
                  style={styles.showPasswordButton.icon}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => setLoginWithNetworx(!loginWithNetworx)}
                style={styles.checkboxContainer}
              >
                <Icon
                  name={loginWithNetworx ? 'check-square-o' : 'square-o'}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>
                  {t('login.login_with_networx_label')}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.buttonContainerPressable}>
              <Text style={styles.buttonText}>
                {t('login.cta_label')}
              </Text>
            </TouchableOpacity>

            <Link href="register" style={styles.ctaSecondaryContainer} asChild>
              <Pressable>
                <Text style={styles.link}>{t('login.cta_register_label')}</Text>
              </Pressable>
            </Link>

            <TouchableOpacity onPress={handleLostPIN} style={styles.lostPasswordButton}>
              <Text style={[styles.lostPasswordText, styles.link]}>{t('login.cta_lost_pin_label')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
}

import { useTranslation } from 'react-i18next';

import React, { useEffect, useState, useContext } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator, SafeAreaView, FlatList, } from 'react-native';
import { Link } from 'expo-router';

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithCredential, createUserWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase'

import Icon from 'react-native-vector-icons/FontAwesome';

import { useSnapshot } from 'valtio'

// Styles
import globalStyles from '@/assets/styles/styles';
import loginStyles from '@/assets/styles/login';
const styles = { ...globalStyles, ...loginStyles };

export default LoginComponent;
