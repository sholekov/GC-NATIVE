import constants from '@/constants.json';
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

export const isCyrillic = (text) => {
  // This regex matches any character in the range of Cyrillic characters.
  return /[а-яА-ЯЁё]/.test(text);
}

export const transliterateCyrillicToLatin = (cyrillicString) => {
  const transliterationTable = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Ё': 'Yo', 'ё': 'yo',
    'Ж': 'Zh', 'ж': 'zh',
    'З': 'Z', 'з': 'z',
    'И': 'I', 'и': 'i',
    'Й': 'J', 'й': 'j',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Х': 'H', 'х': 'h',
    'Ц': 'Ts', 'ц': 'ts',
    'Ч': 'Ch', 'ч': 'ch',
    'Ш': 'Sh', 'ш': 'sh',
    'Щ': 'Shch', 'щ': 'shch',
    'Ъ': '', 'ъ': '',
    'Ы': 'Y', 'ы': 'y',
    'Ь': '', 'ь': '',
    'Э': 'E', 'э': 'e',
    'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya',
  };

  return cyrillicString.split('').map((char) => 
    transliterationTable[char] || char
  ).join('');
}
// Example usage:
// const cyrillicText = 'Привет, как дела?';
// const latinText = transliterateCyrillicToLatin(cyrillicText);
// console.log(latinText); // Should print: Privet, kak dela?

import CryptoJS from 'crypto-js';
export const stringTo8DigitNumber: Function = (str: string) => {
    const hash = CryptoJS.MD5(str).toString(); // Convert to MD5 hash

    // Take the first 8 characters of the MD5 hash and convert them to a decimal number
    const portion = parseInt(hash.substring(0, 8), 16);

    return portion % 100000000;  // Ensure it's 8 digits
}

import { Lang, Provider } from '@/types';
import { proxy } from 'valtio'
export const helpers = proxy<{ language: Lang | null, provider: Provider, }>({
  language: null,
  provider: '',
})
