
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
        if (errors) {
          console.log('errors', errors);
          resolve(false)
        } else if (response.data.success) {
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

  return new Promise(async (resolve, reject) => {
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
          alert("Image uploaded successfully!");
          resolve(uri)
        } else {
          alert("Failed to upload image.");
          resolve(false)
        }
      })
      .catch((error: Error) => {
        console.log('error', error.message);
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


export const getStations = () => {
  return helpers.axiosInstance('locations')
}

export const setLocalUser = (): Promise<any> => {
  return Promise.all([
    helpers.axiosInstance.get('me'),
    helpers.axiosInstance.get('favorites')
  ])
    .then(([result_of_user, result_of_favourite]) => {

      const imageUrl = BASE_URI + "images/clients/" + result_of_user.data.id + ".png"
      const imageRequest = helpers.axiosInstance.get(imageUrl)
      setupUser(result_of_user.data, result_of_favourite.data, imageRequest);
    })
    .catch((e: Error) => {
      console.log('e', e);
      setupUser(null, null, null)
    })
}

export const getStation = (loc_id: string) => {
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
      timeout: 1000,
    },
    // maxRedirects: 0,
    // validateStatus: function(status) {
    //     return status >= 200 && status < 303;
    // },
  })
}