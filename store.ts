
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
} | null

import { AxiosPromise } from 'axios';
import { helpers } from '@/helpers'
import { proxy, useSnapshot } from 'valtio'

export const getUserData: Function = (): AxiosPromise => {
  const { axiosInstance } = useSnapshot(helpers)
  return axiosInstance.get('me')
}

export const setupUser: Function = (user_data: User): void => {
  store.user = user_data
}

export const resetUser: Function = (): void => {
  store.user = null
}

export const store = proxy<{ user: User, }>({
  user: null,
})
