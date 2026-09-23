import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import bn from './bn';

const DICTIONARIES = { en, bn };
const STORAGE_KEY = 'garibook.lang';

const LanguageContext = createContext(null);

/** Reads the stored preference once, before the first paint. */
const initialLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'bn' || saved === 'en' ? saved : 'en';
  } catch {
    return 'en';
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);

  // Keep <html lang> honest so screen readers switch pronunciation, and tag
  // the document so the Bangla typeface can be applied from CSS.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* private mode — the toggle still works for this session */
    }
  }, [language]);

  const toggle = useCallback(
    () => setLanguage((current) => (current === 'en' ? 'bn' : 'en')),
    []
  );

  const value = useMemo(
    () => ({ language, t: DICTIONARIES[language], toggle, isBangla: language === 'bn' }),
    [language, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** `const { t, language, toggle } = useLanguage()` */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}

/** Shorthand when a component only needs the dictionary. */
export const useT = () => useLanguage().t;
