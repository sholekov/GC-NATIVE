import { User } from 'firebase/auth';
import httpGCInstance from './../httpInstance';
import { GCUser } from '@/types';

type Response = {
  success: boolean;
  user: GCUser;
  backto: null; // TODO: Learn what backto is for and setup type
};

// const responseObject: Response = {
//   success: true,
//   user: {
//     id: 12738,
//     name: "I S",
//     photo_rev: null,
//     balance: 12353292363943,
//     credit: 0,
//     frozen: 2561743,
//     attr: 0,
//     locale: "BG",
//     created: "2023-08-01T14:18:24+00:00",
//     updated: "2023-08-01T14:18:24+00:00",
//     meta: [],
//     csrf: "61576187660760771222459058739215"
//   },
//   backto: null
// };

import { Provider } from '@/types';
import { stringTo8DigitNumber } from '@/utils/helpers';

export const httpUserLogin: Function  = async (user: User, provider: Provider): Promise<Response> => {

  let email = user.email || ''; // TODO: refactor this to const email = user.email || '';
  let password = user.uid || '';

  password = stringTo8DigitNumber(password);
  
  // TODO: remove this
    email = 'sholeka+1@googlemail.com'
    // email: user_credentials.email == 'sholeka@gmail.com' ? 'sholeka+1@googlemail.com' : user_credentials.email,
    password = '1234'
    // password: user_credentials.email == 'sholeka@gmail.com' ? '1234' : user_credentials.password,
  
  return httpGCInstance.post('login', `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&provider=${encodeURIComponent(provider)}`)
  // return httpGCInstance.request({
  //   method: 'POST',
  //   url: 'login',
  //   data: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&provider=${encodeURIComponent(provider)}`
  // })
}

