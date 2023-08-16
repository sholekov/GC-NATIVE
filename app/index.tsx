import '@/assets/locales/index';
import { useTranslation } from 'react-i18next';

import { Redirect } from 'expo-router';
// import { useEffect } from 'react';
// import { Keyboard } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSnapshot } from 'valtio';
import { setupUser, setAppUILanguage } from '@/store'
import { helpers, setLocalUser } from '@/helpers'


const StartPage = () => {
  const { i18n } = useTranslation();

  setLocalUser()

  AsyncStorage.getItem('user_preffered_UI_language')
    .then((value) => {
      setAppUILanguage(value || i18n.language, i18n)
    })

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  // const _keyboardDidShow = () => {
  //   console.log('keyboardDidShow');
  // };
  // const _keyboardDidHide = () => {
  //   console.log('keyboardDidHide');
  // };
  
  return <Redirect href="/home" />;
}

export default StartPage;