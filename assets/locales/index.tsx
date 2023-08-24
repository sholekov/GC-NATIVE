import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '@/assets/locales/en.json';
import bg from '@/assets/locales/bg.json';
import ro from '@/assets/locales/ro.json';

const resources = {
  en: {
    translation: en,
  },
  bg: {
    translation: bg,
  },
  ro: {
    translation: ro,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'bg',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});
