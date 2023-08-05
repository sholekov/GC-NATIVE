
import { store } from '@/store'
import { useSnapshot } from 'valtio'

/**
 * Local Constants
 **/

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;

/**
 * Local Types
 **/

type axiosInstance = any

type userRegisterProvidedData = {
  locale: string,
  email: string,
  name: string,
  password: string,
  captcha: string,
}

// type LoginResponse = {
//   data: {
//     success: boolean,
//     user: User,
//     backto: string,
//     form: {
//       errors: {
//         email: string,
//         password: string,
//         provider: string,
//       }
//     }
//   }
// }

import axios from 'axios';
import { Alert } from 'react-native';
import { proxy } from 'valtio'


export const resetRequest = () => {
  helpers.axiosInstance = null
}

export const setRequest = () => {
  helpers.axiosInstance = initAxios()
}

/**
 * User Register
 * @param {userRegisterProvidedData}
 * @returns {object} {status: boolean, user: User} 
 **/
export const userRegister: Function = (data: userRegisterProvidedData): object => {
  return new Promise((resolve, reject) => {
    helpers.axiosInstance({
      method: 'POST',
      url: 'register',
      data: data,
    })
    .then((response: any) => {
      console.log('Registration response:', response);
      console.log('Registration response data:', response.data);
      const errors = response.data?.form?.errors;
      if(errors) {
        console.log('errors', errors);
        resolve(false)
      } else if(response.data.success) {
        resolve(true)
      } else {
        resolve(true)
      }
    })
    .catch((error: Error) => {
      console.log('error', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
      reject(error);
    });
  })
}

/**
 * User Login
 * @param {object} {email, password, provider}
 * @returns {object} {status: boolean, user: User} 
 **/
export const userLogin: Function = ({email, password, provider}: {email: string, password: string, provider: string}): object => {
  return new Promise((resolve, reject) => {
    helpers.axiosInstance({
      method: 'POST',
      url: 'login',
      data: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&provider=${encodeURIComponent(provider)}`
    })
    .then((response: any) => {
      const errors = response.data?.form?.errors;
      if(errors) {
        console.log('errors', errors);
        resolve({status: false, user: null});
      } else if(response.data.success) {
        resolve({status: true, user: response.data.user});
      } else {
        resolve({status: true, user: null});
      }
    })
    .catch((error: Error) => {
      console.log('error', error);
      Alert.alert('Error', 'Login failed. Please try again.');
      reject(error);
    });
  })
}

export const userLogout: Function = (csrf: string) => {
  return new Promise((resolve, reject) => {
    helpers.axiosInstance({
      method: 'POST',
      url: 'logout',
      data: `manix-csrf=${encodeURIComponent(csrf)}&manix-method=DELETE`
    })
    .then((response: any) => {
      if (response.data.success) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
    .catch((error: Error) => {
      console.log('error', error);
      reject(error);
    })
  })
}



export const fetchCaptcha: Function = () => {
  return new Promise((resolve, reject) => {
    helpers.axiosInstance({
      url: `captcha?timestamp=${new Date().getTime()}`,
      responseType: 'blob',
      headers: {
        "content-type": "image/png",
        'Accept': '*/*',
      },
    })
    .then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      if (url) {
        resolve(url)
      } else {
        resolve(false)
      }
    })
    .catch((error: Error) => {
      console.log('error', error);
      reject(error);
    })
  })
}


export const helpers = proxy<{ axiosInstance: axiosInstance, }>({
  axiosInstance: initAxios(),
})






/**
 * 
 * Local Helpers
 * 
 * Axios Instance
 * 
 */

function initAxios() {
  return axios.create({
    baseURL: `${BASE_URI}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      timeout : 1000,
    }, 
    // maxRedirects: 0,
    // validateStatus: function(status) {
    //     return status >= 200 && status < 303;
    // },
  })
}