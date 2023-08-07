import global from '@/assets/styles/styles';
import register from '@/assets/styles/register';
const styles = { ...global, ...register };

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { router, Link, Redirect } from 'expo-router';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store, setupUser } from '@/store'
import { helpers, userRegister, userLogin, fetchCaptcha } from '@/helpers'

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const [captchaInput, setCaptchaInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [captchaUrl, setCaptchaUrl] = useState('https://fooda.cloud/planet-food-ruse/wp-content/uploads/sites/24/woocommerce-placeholder.png'); // Initial captcha URL
  const _fetchCaptcha = async () => {
    fetchCaptcha()
      .then((url) => {
        setCaptchaUrl(url);
      })
  };
  useEffect(() => {
    _fetchCaptcha();
  }, []);
  
  const handleRegister = async () => {
    // Request permission to access the location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    setLoading(true);

    // Get the user's location
    let location = await Location.getCurrentPositionAsync({});
    let coords = location.coords;
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

    // Reverse geocode to get address information
    let [address] = await Location.reverseGeocodeAsync(coords);
    let isoCountryCode = address.isoCountryCode;
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

    const data = {
      locale: isoCountryCode,
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
            .then( ({status, user}: {status: boolean, user: any}) => {
              if (status) {
                setupUser(user);
                router.push('/home');
                setLoading(false);
              } else {
                Alert.alert('Error', 'Invalid credentials');
              }
            })
        } else {
          Alert.alert('Registration failed', 'Please try again.', [
            {
              text: 'OK',
              onPress: () => setTimeout(() => setLoading(false) , 250),
              style: 'cancel',
            },
          ],)
        }
      })
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
        {isLoading ? <ActivityIndicator size="large" style={{ flex: 1 }} /> : (
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Register</Text>

            <TextInput placeholder="First Name" onChangeText={setFirstName} style={styles.input} />
            <TextInput placeholder="Last Name" onChangeText={setLastName} style={styles.input} />

            <TextInput placeholder="Username" keyboardType="email-address" autoCapitalize="none" onChangeText={setUseremail} style={styles.input} />
            <TextInput placeholder="Password" onChangeText={setPassword} autoCapitalize="none" secureTextEntry style={styles.input} />

            <View style={{  marginBottom: 16 }}>
              <TouchableOpacity onPress={_fetchCaptcha} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'space-around' }}>
                <Image source={{ uri: captchaUrl }} style={{...styles.captcha, marginRight: 16, padding: 8, }} />
                <FontAwesome5 style={{ ...styles.captcha_icon }} name="sync" />
              </TouchableOpacity>
              <TextInput placeholder="Enter CAPTCHA" onChangeText={setCaptchaInput} style={styles.input} />
            </View>

            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Link href="/home" style={styles.link}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </Link>
          </View>
        )}
        <StatusBar style="dark" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default Register;
