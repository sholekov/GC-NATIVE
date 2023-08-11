import constants from '@/constants.json';

type Currency = 'USD' | 'EUR' | 'GBP' | 'BGN' | 'RON';

export const toHumanReadable: Function = (amount: number, currency: Currency): string => {
  // Ensure amount is a number
  if (typeof amount !== 'number') {
    throw new Error('Amount should be a number');
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



export const getPrice = (billing: boolean, price: any, userId?: number): number => {
  // TODO: implement let price = station.pref_user_id == userId ? station.pref_ppkw : station.ppkw;
  return (billing ? (price / 10) : price) / constants.MONEY_FACTOR;
}

export const formatPower: Function = (watts: number) => {
  return (watts / 1000).toFixed(0);
}

