import React, {createContext, useContext, useState, useEffect} from 'react';
const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('nl');
  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{language, switchLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
