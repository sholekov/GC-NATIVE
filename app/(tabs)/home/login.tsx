import globalStyles from '@/assets/styles/styles';
import loginStyles from '@/assets/styles/login';
const styles = { ...globalStyles, ...loginStyles };

import { useTranslation } from 'react-i18next';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator, } from 'react-native';
import { Link } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome';

import { userLogin, setLocalUser } from '@/helpers'

function Login({triggerLoading}) {
  const { t } = useTranslation();
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
    triggerLoading(true)
    userLogin(data)
      .then( ({status, user}: {status: boolean, user: any}) => {
        if (status && user) {
          setLocalUser()
        } else {
          triggerLoading(false)
          Alert.alert(t('login.alert-error.title'), t('login.alert-error.text'), [{text: t('login.alert-error.btn_text'), style: 'default'}]);
        }
      })
  };

  const handleLostPIN = () => {
    Alert.alert(t('login.alert-lost-pin.title'), t('login.alert-lost-pin.text'));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
    
      <View style={styles.container}>
        <Text onPress={() => { __DEV__ && setSetCredentials(!setCredentials) }} style={styles.page_title}>
          {t('login.page-title')}
        </Text>
        <TextInput placeholder={t('login.placeholder.username')} keyboardType="email-address" autoCapitalize="none" onChangeText={setUsername} style={{...styles.input}} />
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
    </KeyboardAvoidingView>
  );
}

export default Login;
