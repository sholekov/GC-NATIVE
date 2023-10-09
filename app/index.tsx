import '@/assets/locales/index';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { Redirect, Stack, useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { setAppUILanguage } from '@/store'
import { userLogin, setLocalUser, } from '@/helpers'

import { onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase'

// import * as Sentry from 'sentry-expo';
// Sentry.init({
//   dsn: 'https://c2a38ca15cb08082fa557ad2cf76016a@o4505788528263168.ingest.sentry.io/4505788538355712',
//   enableInExpoDevelopment: false,
//   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

const StartPage = () => {
  console.log('StartPage triggered');
  const { i18n } = useTranslation();


  useEffect(() => {
    console.log('onAuthStateChanged triggered');

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged', user);
      if (user) {
        const data = {
          provider: '',
          email: 'sholeka+1@googlemail.com',
          password: '1234',
        };
        userLogin(data)
        .then(({ status, user }: { status: boolean, user: any }) => {
          if (status && user) {
            setLocalUser()
          } else {
            Alert.alert(t('login.alert-error.title'), t('login.alert-error.text'), [{ text: t('login.alert-error.btn_text'), style: 'default' }]);
          }
        })
      }
    })

    // return unsubscribe
  }, [])
  
  
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
  
  return <Redirect href="home" />;
}

export default StartPage;