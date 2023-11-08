import '@/assets/locales/index';

import { useEffect } from 'react';

import { Alert } from 'react-native';

import { Redirect, Stack, useRouter } from 'expo-router';


import { useSnapshot } from 'valtio';
import { helpers, setRates, } from '@/helpers'


// import * as Sentry from 'sentry-expo';
// Sentry.init({
//   dsn: 'https://c2a38ca15cb08082fa557ad2cf76016a@o4505788528263168.ingest.sentry.io/4505788538355712',
//   enableInExpoDevelopment: false,
//   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

import { store } from '@/store'
import setupUser from '@/hooks/useSetupUser'

const StartPage = () => {
  console.log('StartPage triggered');

  setupUser()
  // setRates()

  useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  }, []);
  // const _keyboardDidShow = () => {
  //   console.log('keyboardDidShow');
  // };
  // const _keyboardDidHide = () => {
  //   console.log('keyboardDidHide');
  // };
  
  return <Redirect href="home" />;
}

export default StartPage;