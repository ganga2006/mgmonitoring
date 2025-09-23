import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

/**
 * Custom hook to access the language context.
 * Throws an error if used outside of a LanguageProvider.
 * @returns {{ lang: string, setLang: function, locales: object }}
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
