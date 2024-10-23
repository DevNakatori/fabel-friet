import React, { createContext, useContext, useState, useEffect } from 'react';
const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl'); // Default language
  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  useEffect(() => {
    const detectLanguage = async () => {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (browserLanguage) {
          const langCode = browserLanguage.split('-')[0];
          switchLanguage(langCode);
        }
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          const country = data.country_code; 
          
          if (country === 'NL') {
            switchLanguage('nl'); 
          } else if (country === 'FR') {
            switchLanguage('fr');
          } else if (country === 'DE') {
            switchLanguage('de'); 
          } else {
            switchLanguage('en');
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          switchLanguage('en'); 
        }
      }
    };
    detectLanguage();
  }, []);
  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

