import React, {useEffect, useRef, useState} from 'react';
import {useLanguage} from '~/components/LanguageContext';
import {gsap} from 'gsap';

const languages = [
  {code: 'en', name: 'English', flag: 'flag-icon-us'},
  {code: 'nl', name: 'Dutch', flag: 'flag-icon-nl'},
  {code: 'de', name: 'Germany', flag: 'flag-icon-de'},
];

const LanguageSwitcher = () => {
  const {language, switchLanguage} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Log available languages when the component mounts
  useEffect(() => {
    console.log('Available Languages:', languages);
  }, []);
  

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.language-list',
        {opacity: 0, y: 300},
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
      );
    } else {
      gsap.to('.language-list', {
        opacity: 0,
        y: 300,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const animation = gsap.fromTo(
      '.language-switcher',
      {opacity: 0, y: -30},
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 8,
        repeat: 0,
      },
    );

    return () => {
      gsap.killTweensOf('.language-switcher');
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <div className="selected-language" onClick={toggleDropdown}>
        <span
          className={`flag-icon ${
            languages.find((lang) => lang.code === language).flag
          } flag-icon-squared`}
        ></span>
        <div className="arrow"></div>
      </div>
      <ul className={`language-list ${isOpen ? 'open' : ''}`}>
        {languages.map((lang) => (
          <li
            key={lang.code}
            className={`language-item ${
              language === lang.code ? 'active' : ''
            }`}
            onClick={() => {
              switchLanguage(lang.code);
              setIsOpen(false);
            }}
          >
            <span className={`flag-icon ${lang.flag} flag-icon-squared`}></span>
            <span>{lang.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
