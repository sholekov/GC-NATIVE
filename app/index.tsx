import { Redirect } from 'expo-router';
// import { useEffect } from 'react';
// import { Keyboard } from 'react-native';

import { useSnapshot } from 'valtio';
import { setupUser } from '@/store'
import { helpers } from '@/helpers'

const StartPage = () => {

  const { axiosInstance } = useSnapshot(helpers)
  // getUserData()
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