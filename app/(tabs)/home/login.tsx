import globalStyles from '@/assets/styles/styles';
import loginStyles from '@/assets/styles/login';
const styles = { ...globalStyles, ...loginStyles };

import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator, SafeAreaView, FlatList, } from 'react-native';
import { Link } from 'expo-router';

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithCredential, createUserWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase'

import Icon from 'react-native-vector-icons/FontAwesome';

import languages from '@/assets/languages.json';
import { useSnapshot } from 'valtio'
import { store, setAppUILanguage } from '@/store'
import { helpers, userLogin, setLocalUser, setUserCredentials } from '@/helpers'


// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from 'expo-web-browser';
// WebBrowser.maybeCompleteAuthSession();

function Login({ triggerLoading }) {
  const { t, i18n } = useTranslation();
  const { language } = useSnapshot(store)
  const { user_credentials } = useSnapshot(helpers)
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


  // TODO: add trigger for forget password CTA
  // firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
  const forgetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent")
      })
      .catch((error) => {
        alert(error)
      })
  }

  const handleLogin = () => {
    console.log('handleLogin triggered');
    
    const data = {
      provider: '',
      email: setCredentials ? username : 'sholeka@gmail.com',
      password: setCredentials ? password : '123123',
      // email: setCredentials ? username : 'sholeka+1@googlemail.com',
      // password: setCredentials ? password : '1234',
    };
    if (loginWithNetworx) {
      Object.assign(data, {
        provider: 'networx',
      })
    }
    triggerLoading(true)
    
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(user_data => {
        const user = user_data.user;

        console.log('data', data.email, data.password);
        // setUserCredentials(data)
        helpers.user_credentials.email = data.email
        helpers.user_credentials.password = data.password
        console.log('user_data:', user_data);
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        alert(error.message)
        // Alert.alert(t('login.alert-error.title'), t('login.alert-error.text'), [{ text: t('login.alert-error.btn_text'), style: 'default' }]);
        triggerLoading(false)
      })

    return;

    // not used because of firebase auth
    userLogin(data)
      .then(({ status, user }: { status: boolean, user: any }) => {
        if (status && user) {
          setLocalUser()
        } else {
          triggerLoading(false)
          Alert.alert(t('login.alert-error.title'), t('login.alert-error.text'), [{ text: t('login.alert-error.btn_text'), style: 'default' }]);
        }
      })
  };

  const handleLostPIN = () => {
    Alert.alert(t('login.alert-lost-pin.title'), t('login.alert-lost-pin.text'));
  };

  const LangItem = ({ checked, item }) => {
    const flags = {
      bg: require('@/assets/images/flags/tn_bg-flag.jpg'),
      en: require('@/assets/images/flags/tn_en-flag.jpg'),
      ro: require('@/assets/images/flags/tn_ro-flag.jpg'),
    };
    return (<View style={[styles.flagWrapper]}>
      <View style={[checked && styles.langChecked]}></View>
      <Image source={flags[item.value]}
        style={[styles.flag]}
      />
      <Text style={[styles.langLabel,]}>{item.label.split(' ')[0]}</Text>
    </View>)
  }
  const LangItemComponent = ({ checked = false, item }) => {
    return (<TouchableOpacity onPress={() => setLang(val => item.value)}>
      <LangItem checked={checked} item={item} />
    </TouchableOpacity>)
  }
  const [_langs, setLangs] = useState([]);
  useEffect(() => {
    const _languages: Object[] = []
    Object.keys(languages).forEach(locale => {
      _languages.push({ label: languages[locale], value: locale })
    });
    _languages.sort((a, b) => a.label.localeCompare(b.label))
    setLangs(_languages)
  }, []);
  const [selectedLang, setLang] = useState(language);
  useEffect(() => {
    console.log('selectedLang', selectedLang);
    setAppUILanguage(selectedLang, i18n);
  }, [selectedLang]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, }}>
        <FlatList
          contentContainerStyle={styles.flagsWrapper}
          horizontal
          data={_langs}
          renderItem={({ item }) => <LangItemComponent checked={item.value == selectedLang} item={item} />}
          keyExtractor={item => item.value}
        />
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

export default Login;
