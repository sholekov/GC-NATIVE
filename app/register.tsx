import globalStyles from '@/assets/styles/styles';
import registerStyles from '@/assets/styles/register';
const styles = { ...globalStyles, ...registerStyles };

import locales from '@/assets/locales.json';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { router, Link } from 'expo-router';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { userRegister, userLogin, fetchCaptcha, setLocalUser } from '@/helpers'

import { useTranslation } from 'react-i18next';
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const [captchaInput, setCaptchaInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [captchaUrl, setCaptchaUrl] = useState('');
  const handleCaptcha = async () => {
    fetchCaptcha()
      .then((url) => {
        setCaptchaUrl(url);
      })
  };
  useEffect(() => {
    handleCaptcha();
  }, []);

  const { t } = useTranslation();
  const handleRegister = async () => {
    // Request permission to access the location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('register.alert-permissions.text'));
      return;
    }

    setLoading(true);

    // Get the user's location
    let location = await Location.getCurrentPositionAsync({});
    // {
    //   "coords": {
    //       "accuracy": 5,
    //       "altitude": 0,
    //       "altitudeAccuracy": -1,
    //       "heading": -1,
    //       "latitude": 37.785834,
    //       "longitude": -122.406417,
    //       "speed": -1
    //   },
    //   "timestamp": 1690893479740.977
    // }  
    let coords = location.coords; 

    // Reverse geocode to get address information
    let [address] = await Location.reverseGeocodeAsync(coords);
    // {
    //   "city": "San Francisco",
    //   "country": "United States",
    //   "district": "Union Square",
    //   "isoCountryCode": "US",
    //   "name": "1 Stockton St",
    //   "postalCode": "94108",
    //   "region": "CA",
    //   "street": "Stockton St",
    //   "streetNumber": "1",
    //   "subregion": "San Francisco County",
    //   "timezone": "America/Los_Angeles"
    // }
    let isoCountryCode = address.isoCountryCode || 'bg_BG';

    const data = {
      locale: locales[isoCountryCode],
      email: useremail,
      name: firstName + ' ' + lastName,
      password: password,
      captcha: captchaInput,
    };
    userRegister(data)
      .then((status: boolean) => {
        if (status === true) {
          const data = {
            provider: '',
            email: useremail,
            password: password,
          };
          userLogin(data)
            .then(({ status, user }: { status: boolean, user: any }) => {
              if (status && user) {
                setLocalUser()
                  .then(() => {
                    router.push('/home');
                    setLoading(false);
                  })
                  .catch((e: Error) => {
                    console.log('e', e);
                    setLoading(false);
                  })
              } else {
                Alert.alert(t('login.alert-error.title'), t('login.alert-error.text'), [{text: t('login.alert-error.btn_text'), style: 'default'}]);
                setLoading(false);
              }
            })
        } else {
          Alert.alert(t('register.alert-error.title'), t('register.alert-error.text'), [
            {
              text: t('register.alert-error.btn_text'),
              onPress: () => setTimeout(() => setLoading(false), 250),
              style: 'cancel',
            },
          ],)
        }
      })
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={styles.scrollView}>
        {isLoading ? <ActivityIndicator size="large" style={styles.activityIndicator} /> : (
          <View style={styles.innerContainer}>

            <Text style={styles.page_header}>{t('register.page-title')}</Text>

            <TextInput placeholder={t('register.placeholder.first_name')} onChangeText={setFirstName} style={styles.input} />
            <TextInput placeholder={t('register.placeholder.last_name')} onChangeText={setLastName} style={styles.input} />

            <TextInput placeholder={t('register.placeholder.username')}keyboardType="email-address" autoCapitalize="none" onChangeText={setUseremail} style={styles.input} />
            <TextInput placeholder={t('register.placeholder.password')} onChangeText={setPassword} autoCapitalize="none" secureTextEntry style={styles.input} />

            <View style={styles.captchaContainer}>
              <TouchableOpacity onPress={handleCaptcha} style={styles.captchaCta}>
                <Image source={{ uri: captchaUrl }} style={styles.captchaImg} />
                <FontAwesome5 style={styles.captchaIcon} name="sync" />
              </TouchableOpacity>
              <TextInput placeholder={t('register.placeholder.enter_captcha')} onChangeText={setCaptchaInput} style={styles.input} />
            </View>

            <TouchableOpacity onPress={handleRegister} style={styles.buttonContainerPressable}>
              <Text style={styles.buttonText}>{t('register.cta_label')}</Text>
            </TouchableOpacity>

            <Link href="/home" style={styles.link}>
              <Text style={styles.link}>{t('register.cta_login_label')}</Text>
            </Link>

          </View>
        )}
        <StatusBar style="dark" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default Register;
