
import { proxy } from 'valtio'

export const setChargingMessages: Function = (messages: object) => {
  charging.messages = messages
}

export const setChargingStatus: Function = (status: boolean) => {
  charging.CHARGING = status
}

export const setupChargingStation: Function = (station: any): void => {
  charging.CHARGING_STATION =  station
}

export const setupChargingStationID: Function = (id: number): void => {
  charging.CHARGING_STATION_ID =  id
}

export const charging = proxy<{ CHARGING: boolean, CHARGING_STATION_ID: number | undefined, CHARGING_STATION: any, messages: object }>({
  CHARGING: false,
  CHARGING_STATION_ID: undefined,
  CHARGING_STATION: undefined,
  messages: {},
})
