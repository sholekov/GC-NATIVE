
import { store, setupUser } from '@/store'
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

import axios, { AxiosPromise } from 'axios';
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
        // console.log('Registration response:', response);
        console.log('Registration response data:', response.data);
        const errors = response.data?.form?.errors;
        if (errors) {
          console.log('errors', errors);
          resolve(false)
        } else if (response.data.success) {
          resolve(true)
        } else {
          resolve(false)
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
export const userLogin: Function = ({ email, password, provider }: { email: string, password: string, provider: string }): object => {
  return new Promise((resolve, reject) => {
    helpers.axiosInstance({
      method: 'POST',
      url: 'login',
      data: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&provider=${encodeURIComponent(provider)}`
    })
      .then((response: any) => {
        const errors = response.data?.form?.errors;
        if (errors) {
          console.log('errors', errors);
          resolve({ status: false, user: null });
        } else if (response.data.success) {
          resolve({ status: true, user: response.data.user });
        } else {
          resolve({ status: true, user: null });
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
        console.log('logout response', response.data.success);
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

export const uploadImageToServer = async (selectedImage: any, csrf: string) => {
  const uri = selectedImage.uri;
  const formData = new FormData();
  formData.append('manix-csrf', csrf);
  formData.append('image', {
    uri: uri,
    name: 'some_photo.jpg',
  });
  helpers.axiosInstance({
    method: 'POST',
    url: 'avatar',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then((response: any) => {
      if (response.data === null) {
        Alert.alert('Image uploaded successfully!', 'To see the changes, wait some time');
        setLocalUser()
      } else {
        Alert.alert("Failed to upload image.");
      }
    })
    .catch((error: Error) => {
      console.log('error', error.message);
    })
}

import base64 from 'base-64';

export const fetchCaptcha: Function = () => {
  return new Promise((resolve, reject) => {
    helpers.axiosInstance({
      url: `captcha?timestamp=${new Date().getTime()}`,
      responseType: 'arraybuffer',
      // responseType: 'blob',
      headers: {
        "content-type": "image/*",
        'Accept': '*/*',
      },
    })
      .then((response: any) => {
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const url = response.config.baseURL + response.config.url

        const base64Data = base64.encode(String.fromCharCode(...new Uint8Array(response.data)));
        const imageURI = "data:image/jpeg;base64," + base64Data;
        if (imageURI) {
          resolve(imageURI)
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

export const fetchRates: Function = () => {
  return helpers.axiosInstance('rates')
}

export const fetchStation: Function = (station_id: number) => {
  return helpers.axiosInstance({
    method: 'GET',
    url: `station?id=${station_id}&timestamp=true`,
  })
}

// export const user = {}
export const getOwnMoney: Function = () => { }
export const credit: Function = () => { }
export const frozen: Function = () => { }

export const getAvailableFunds = () => {
  return this.balance() + this.credit() - this.frozen();
}
export const getOwnFunds = () => {
  return this.balance() - this.frozen();
}


export const _setLocalUser = (force?: boolean): Promise<any> | void => {
  console.log('setLocalUser');
  if (!force) {
    return Promise.all([
      helpers.axiosInstance.get('me'),
      helpers.axiosInstance.get('favorites')
    ])
      .then(([result_of_user, result_of_favourite]) => {
        const imageUrl = BASE_URI + "images/clients/" + result_of_user.data.id + ".png"
        const imageRequest = helpers.axiosInstance.get(imageUrl)
        setupUser(result_of_user.data, result_of_favourite.data, imageRequest);
        return true
      })
      .catch((e: Error) => {
        console.log('e', e);
        setupUser(null, null, null)
        return false
      })
  } else {
    setupUser(null, null, null)
  }
}

export const setLocalUser = (force?: boolean): Promise<any> | void => {
  console.log('setLocalUser');
  if (!force) {
    return Promise.all([
      helpers.axiosInstance.get('me'),
      helpers.axiosInstance.get('favorites')
    ])
      .then(([result_of_user, result_of_favourite]) => {
        const imageUrl = BASE_URI + "images/clients/" + result_of_user.data.id + ".png"
        const imageRequest = helpers.axiosInstance.get(imageUrl)
        setupUser(result_of_user.data, result_of_favourite.data, imageRequest);
        return true
      })
      .catch((e: Error) => {
        console.log('e', e);
        setupUser(null, null, null)
        return false
      })
  } else {
    setupUser(null, null, null)
  }
}

export const setUserCredentials = (data: object) => {
  helpers.user_credentials.useremail = data.useremail
  helpers.user_credentials.password = data.password
}

export const getLocations = () => {
  return helpers.axiosInstance('locations')
}

export const getStation = (loc_id: string): AxiosPromise => {
  // [
  //   {
  //     "billing": null,
  //     "meta": [],
  //     "model": {
  //       "id": "PAM",
  //       "maxPow": 7400,
  //       "outlets": "type2"
  //     },
  //     "operating": 0,
  //     "ppkw": 250550,
  //     "pref_ppkw": 1,
  //     "pref_user_id": 12548,
  //     "ps": "116",
  //     "user": {
  //       "id": 10085,
  //       "name": null
  //     },
  //     "user_id": 10085
  //   }
  // ]
  return helpers.axiosInstance({
    method: 'GET',
    url: `stations?loc_id=${loc_id}`,
  })
}

export const toggleStationToFavourites: Function = (id: any, csrf: any): void => {
  return helpers.axiosInstance({
    method: 'POST',
    url: 'favorites',
    data: `l_id=${encodeURIComponent(id)}&manix-csrf=${encodeURIComponent(csrf)}`,
  })
}
export const getFavouriteStations = () => {
  return helpers.axiosInstance('favorites')
}
export const getReports = () => {
  return helpers.axiosInstance('reports')
}

export const paymentMethods = (locale) => {
  return helpers.axiosInstance('paymentMethods', {
    data: {
      locale: locale
    }
  })
}


export const withdraw = () => {
  return helpers.axiosInstance({
    method: 'POST',
    url: 'withdraw',
    data: {
      // amount: amount.getInternalValue(),
      // paymentMethod: (<any>document).getElementsByName("paymentMethod")[0].value,
      // sendTo: (<any>document).getElementsByName("sendTo")[0].value,
    },
  })
}


export const helpers = proxy<{ axiosInstance: axiosInstance, user_credentials: object }>({
  axiosInstance: initAxios(),
  user_credentials: {
    useremail: '',
    password: '',
  },
})






/**
 * 
 * Local Helpers
 * 
 * Axios Instance
 * 
 */

function initAxios() {

  const customUserAgent = 'ReactNative';
  axios.defaults.baseURL = `${BASE_URI}`
  axios.defaults.headers.common['User-Agent'] = customUserAgent;
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return axios.create({
    headers: {
      // ContentType: 'application/json',
      // UserAgent: customUserAgent,
      // Accept: 'application/json',
      timeout: 1000,
    },
    // maxRedirects: 0,
    // validateStatus: function(status) {
    //     return status >= 200 && status < 303;
    // },
  })
}