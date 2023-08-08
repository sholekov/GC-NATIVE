
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

import { AxiosPromise } from 'axios';
import { helpers } from '@/helpers'
import { proxy, useSnapshot } from 'valtio'

export const setupUser: Function = (user_data: User, favourites: any[]): void => {
  store.user = user_data
  if (favourites) {
    Object.assign(store.user, { favourite_stations: favourites })
  }
}

export const setupStationLocation: Function = (_object: any): void => {
  store.station_location = _object
}
export const setupStation: Function = (station: any): void => {
  store.station =  station
}


export const store = proxy<{ user: User, station_location: any, station: any, }>({
  user: null,
  station_location: null,
  station: null,
})
