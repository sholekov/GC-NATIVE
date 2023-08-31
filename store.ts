
type User = {
  id: number,
  name: string,
  photo_rev: string,
  balance: number,
  credit: number,
  frozen: number,
  attr: number,
  locale: string,
  created: string,
  updated: string,
  meta: [],
  csrf: string,
  favorite_stations: [],
} | null

import { proxy } from 'valtio'

export const getArticles: Function = (axiosInstance): Array<object> => {
  return axiosInstance.get('https://gigacharger.net/wp-json/wp/v2/posts')
}

export const setupUser: Function = (user_data: User, favourites: any[], imageRequest: AxiosPromise): void => {
  console.log('setupUser', user_data, favourites);
  store.user = user_data
  if (favourites) {
    Object.assign(store.user, { favourite_places: favourites })
  }

  if (imageRequest === null) {
    return
  }
  imageRequest
    .then((response) => {
      console.log("imageRequest");
      if (response.status === 200) {
        Object.assign(store.user, { image: response.config.url })
      }
    })
    .catch((error) => {
      console.log("Image error", error);
    })
}

export const setupSelectedStation: Function = (_object: any): void => {
  store.station_location = _object
}

export const setupStation: Function = (station: any): void => {
  store.station =  station
}

export const setStations: Function = (data: any): void => {
  store.stations =  data
}


import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosPromise } from 'axios';
type Lang = 'bg' | 'en' | 'ro' | 'de' | 'ru' | 'fr' | 'it' | 'es' | 'pt' | 'pl' | 'hu' | 'cs' | 'sk' | 'sl' | 'hr' | 'sr' | 'mk' | 'sq' | 'el' | 'tr' | 'ar' | 'fa' | 'ur' | 'hi' | 'bn' | 'th' | 'zh' | 'ja' | 'ko' | 'he' | 'id' | 'ms' | 'vi' | 'tl' | 'ta' | 'ml' | 'kn' | 'te' | 'mr' | 'ne' | 'si' | 'my' | 'km' | 'lo' | 'am' | 'ti' | 'so' | 'sw' | 'rw' | 'ny' | 'ha' | 'ig' | 'yo' | 'zu' | 'xh' | 'st' | 'tn' | 'ts' | 'ss' | 've' | 'nr' | 'wo' | 'ff' | 'ak' | 'tw' | 'ee' | 'fo' | 'is' | 'et' | 'lv' | 'lt' | 'pl' | 'uk' | 'be' | 'kk' | 'ky' | 'uz' | 'tt' | 'tr' | 'tk' | 'az' | 'hy' | 'eu' | 'ca' | 'gl' | 'eu' | 'mt' | 'gd' | 'cy' | 'ga' | 'sq' | 'mk' | 'bs' | 'hr' | 'sr' | 'sl' | 'sk' | 'cs' | 'hu' | 'pl' | 'ru' | 'uk' | 'be' | 'kk' | 'ky' | 'uz' | 'tt' | 'tr' | 'tk' | 'az' | 'hy' | 'eu' | 'ca' | 'gl' | 'eu' | 'mt' | 'gd' | 'cy' | 'ga' | 'sq' | 'mk' | 'bs' | 'hr' | 'sr' | 'sl' | 'sk' | 'cs' | 'hu' | 'pl' | 'ru' | 'uk' | 'be' | 'kk' | 'ky' | 'uz' | 'tt' | 'tr' | 'tk' | 'az' | 'hy' | 'eu' | 'ca' | 'gl' | 'eu' | 'mt' | 'gd' | 'cy' | 'ga' | 'sq' | 'mk' | 'bs' | 'hr' | 'sr' | 'sl' | 'sk' | 'cs' | 'hu' | 'pl' | 'ru' | 'uk' | 'be' | 'kk' | 'ky' | 'uz';
export const setAppUILanguage: Function = (selectedLang: Lang, i18n: any): void => {
  AsyncStorage.setItem('user_preffered_UI_language', selectedLang)
  i18n.changeLanguage(selectedLang);
  store.language =  selectedLang
}

export const store = proxy<{ user: User, station_location: any, station: any, language: string | null, stations: any, }>({
  language: null,
  user: null,
  station_location: null,
  station: null,
  stations: null,
})
