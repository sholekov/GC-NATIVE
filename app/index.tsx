import { Redirect } from 'expo-router';
// import { useEffect } from 'react';
// import { Keyboard } from 'react-native';

import { getUserData, setupUser } from '@/store'

const StartPage = () => {

  getUserData()
    .then((response: Response) => {
      setupUser(response.data);
    })
    .catch((e: Error) => {
      setupUser(null)
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