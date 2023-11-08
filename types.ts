
export type Lang = 'bg' | 'en' | 'ro' | 'de' | 'ru' | 'fr' | 'it' | 'es' | 'pt' | 'pl' | 'hu' | 'cs' | 'sk' | 'sl' | 'hr' | 'sr' | 'mk' | 'sq' | 'el' | 'tr' | 'ar' | 'fa' | 'ur' | 'hi' | 'bn' | 'th' | 'zh' | 'ja' | 'ko' | 'he' | 'id' | 'ms' | 'vi' | 'tl' | 'ta' | 'ml' | 'kn' | 'te' | 'mr' | 'ne' | 'si' | 'my' | 'km' | 'lo' | 'am' | 'ti' | 'so' | 'sw' | 'rw' | 'ny' | 'ha' | 'ig' | 'yo' | 'zu' | 'xh' | 'st' | 'tn' | 'ts' | 'ss' | 've' | 'nr' | 'wo' | 'ff' | 'ak' | 'tw' | 'ee' | 'fo' | 'is' | 'et' | 'lv' | 'lt' | 'pl' | 'uk' | 'be' | 'kk' | 'ky' | 'uz' | 'tt' | 'tr' | 'tk' | 'az' | 'hy' | 'eu' | 'ca' | 'gl' | 'eu' | 'mt' | 'gd' | 'cy' | 'ga' | 'sq' | 'mk' | 'bs' | 'hr' | 'sr' | 'sl' | 'sk' | 'cs' | 'hu' | 'pl' | 'ru' | 'uk' | 'be' | 'kk' | 'ky' | 'uz' | 'tt' | 'tr' | 'tk' | 'az' | 'hy' | 'eu' | 'ca' | 'gl' | 'eu' | 'mt' | 'gd' | 'cy' | 'ga' | 'sq' | 'mk' | 'bs' | 'hr' | 'sr' | 'sl' | 'sk' | 'cs' | 'hu' | 'pl' | 'ru' | 'uk' | 'be' | 'kk' | 'ky' | 'uz' | 'tt' | 'tr' | 'tk' | 'az' | 'hy' | 'eu' | 'ca' | 'gl' | 'eu' | 'mt' | 'gd' | 'cy' | 'ga' | 'sq' | 'mk' | 'bs' | 'hr' | 'sr' | 'sl' | 'sk' | 'cs' | 'hu' | 'pl' | 'ru' | 'uk' | 'be' | 'kk' | 'ky' | 'uz';

export type ProviderEmpty = '';
export type ProviderNetowrx = 'networx';
export type Provider = ProviderEmpty | ProviderNetowrx;

export type GCUser = {
  id: number;
  name: string;
  photo_rev: string | null;
  balance: number;
  credit: number;
  frozen: number;
  attr: number;
  locale: string;
  created: string; // ISO date in string format
  updated: string; // ISO date in string format
  meta: any[]; // Array of any type, TODO: setup specific type
  csrf: string;
};

export type AppUser = {
  favourite_places: any[]; // Array of any type, TODO: setup specific type
  image: string;
} & GCUser;

