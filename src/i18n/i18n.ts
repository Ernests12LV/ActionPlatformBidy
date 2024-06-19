// src/i18n/i18n.ts
import { createIntl, createIntlCache } from 'react-intl';

const messages = {
  en: require('./locales/en.json'), // English translations
  fr: require('./locales/fr.json')  // French translations (example)
  // Add more languages as needed
};

// Create an IntlProvider instance
const cache = createIntlCache();
export const intl = createIntl({
  locale: 'en', // Default locale
  messages: messages['en'] // Default messages
}, cache);