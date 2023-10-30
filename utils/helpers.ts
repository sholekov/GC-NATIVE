import constants from '@/constants.json';
import { helpers, setRates, userLogin, setLocalUser, } from '@/helpers'
import { Alert } from 'react-native';
import { useSnapshot } from 'valtio';


function getRate(currency: string) {
  return helpers.rates[currency] || 0;
  // return parseInt(((this.rates[currency] || 0) * 100).toString()) / 100;
}

type Currency = 'USD' | 'EUR' | 'GBP' | 'BGN' | 'RON';

export const toHumanReadable: Function = (amount: number, currency: Currency): string => {
  // Ensure amount is a number
  if (typeof amount !== 'number') {
    throw new Error('Amount should be a number');
  }
  
  // filter amount
  if (amount < 0 && amount > (-0.01 * constants.MONEY_FACTOR)) {
    amount = 0;
  } else {
    amount = (amount / constants.MONEY_FACTOR * getRate(currency))
  }

  // Format the number based on the currency
  let formattedAmount: string;
  switch (currency) {
    case 'EUR':
      formattedAmount = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
      break;
    case 'BGN':
      formattedAmount = new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'BGN' }).format(amount);
      break;
    case 'RON':
      formattedAmount = new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' }).format(amount);
      break;
    case 'USD':
      formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
      break;
    case 'GBP':
      formattedAmount = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
      break;
    // Add more currencies as needed
    default:
      throw new Error('Unsupported currency');
  }

  return formattedAmount;
}



export const getPrice = (station: any, userId?: number): number => {
  // TODO: implement let price = station.pref_user_id == userId ? station.pref_ppkw : station.ppkw;
  // return (billing ? (price / 10) : price) / constants.MONEY_FACTOR;


  if (station) {
    let price = station.pref_user_id == userId ? station.pref_ppkw : station.ppkw;
    return station.billing ? (price / 10) : price;
  }
  return 0;
}

export const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(0);
}

