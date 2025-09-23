import React, { createContext, useState, useEffect, useMemo } from 'react';
import enLocale from '../locales/en.json';
import orLocale from '../locales/or.json';

// Create the context that will hold the language state and its functions
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext();

// Create an object to map language codes to their locale data
const availableLocales = {
  'en': enLocale,
  'or': orLocale
};

/**
 * The LanguageProvider component manages the language state for the entire app.
 * It provides the current language, the function to change it, and the
 * corresponding localized text to all its children components.
 */
export const LanguageProvider = ({ children }) => {
  // State to store the current language code (e.g., 'en' or 'or')
  const [lang, setLang] = useState('en');
  // State to store the actual locale data (the JSON content)
  const [locales, setLocales] = useState(availableLocales['en']);

  // This effect updates the locale data whenever the language changes
  useEffect(() => {
    setLocales(availableLocales[lang]);
  }, [lang]);

  // Use useMemo to prevent the context value from changing on every render,
  // which optimizes performance for consuming components.
  const contextValue = useMemo(() => ({
    lang,
    setLang,
    locales
  }), [lang, locales]);

  // Provide the state and functions through the context value
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
