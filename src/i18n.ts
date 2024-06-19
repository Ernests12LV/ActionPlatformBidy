import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import your language files
import enTranslation from './services/locales/en.json';
import frTranslation from './services/locales/fr.json';
import lvTranslation from './services/locales/lv.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Pass initReactI18next to configure react-i18next
  .init({
    fallbackLng: 'en', // Fallback language if translation for detected language is not available
    debug: true, // Enable debug output (optional)
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      lv: {
        translation: lvTranslation,
      },
      // Add more languages as needed
    },
  });

export default i18n;
