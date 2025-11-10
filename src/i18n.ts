import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import pt from './locales/pt/common.json';

void i18n.use(initReactI18next).init({
  resources: {
    pt: { common: pt },
    en: { common: en },
  },
  lng: 'pt',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
