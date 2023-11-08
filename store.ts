
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
import '@/assets/locales/index';

export const getArticles: Function = (axiosInstance): Array<object> => {
  return axiosInstance.get('https://gigacharger.net/wp-json/wp/v2/posts')
}

export const setupUser: Function = (user_data: User, favourites: any[], imageRequest: AxiosPromise): void => {
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

export const setupSelectedLocation: Function = (_object: any): void => {
  store.station_location = _object
}

export const setupStation: Function = (station: any): void => {
  store.station =  station
}

export const setLocations: Function = (data: any): void => {
  store.locations =  data
}

import { AxiosPromise } from 'axios';


export const store = proxy<{ user: User, station_location: any, station: any, locations: any, }>({
  
  user: null,
  station_location: null,
  station: null,
  locations: null,
})
