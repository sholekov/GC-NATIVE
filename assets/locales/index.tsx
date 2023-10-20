import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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

// export type ITranslation = keyof typeof bg;
// export type ILanguage = 'bg' I 'en' I 'es';
// export default i18n.t as (key: keyof typeof bg, interpolations?: any) => string;
// export function changeLanguage(newLanguage: ILanguage) {
//   if (i18n.Language === newLanguage) {
//     return;
//     return i18n.changeLanguage(newLanguage);
//   }
// }

i18n.use(initReactI18next).init({
  resources,
  lng: 'bg',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});
