import React, {useEffect, useRef, useState} from 'react';
import {useLanguage} from '~/components/LanguageContext';
import {gsap} from 'gsap';

const languages = [
  {code: 'en', name: 'English', flag: 'flag-icon-us'},
  {code: 'nl', name: 'Nederlands', flag: 'flag-icon-nl'},
  {code: 'de', name: 'Deutsch', flag: 'flag-icon-de'},
];

const LanguageSwitcher = () => {
  const {language, switchLanguage} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Log available languages when the component mounts
  useEffect(() => {
  
  }, []);
  

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.language-list',
        {opacity: 0, y:300, pointerEvents: 'none'},
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          pointerEvents: 'inherit',
          ease: 'power2.out',
        },
      );
    } else {
      gsap.to('.language-list', {
        opacity: 0,
        y: 300,
        pointerEvents: 'none',
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


  useEffect(() => {
    // Select the spans and set initial positions
    const selectedLanguage = document.querySelector('.selected-language');
    const spans = selectedLanguage.querySelectorAll('span');

    // Ensure that the second span starts hidden to the right
    gsap.set(spans[1], { x: '100%', opacity: 0 });

    selectedLanguage.addEventListener('mouseenter', () => {
      // Hide the first span and show the second span with a sliding effect
      gsap.to(spans[0], {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(spans[1], {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });

    selectedLanguage.addEventListener('mouseleave', () => {
      // Reset positions when mouse leaves
      gsap.to(spans[0], {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(spans[1], {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });
  }, []);

  return (
    <div className="language-switcher main-menu is-at-top" ref={dropdownRef}>
      <div className="selected-language" onClick={toggleDropdown}>
        {/* <span
          className={`flag-icon ${
            languages.find((lang) => lang.code === language).flag
          } flag-icon-squared`}
        ></span>
        <div className="arrow"></div> */}
        {/* <div className="arrow"></div> */}
        <i
          className={`flag-icon ${
            languages.find((lang) => lang.code === language).flag
          } flag-icon-squared`}
        ></i>
        <span>{languages.find((lang) => lang.code === language)?.code}</span>
        <span>{languages.find((lang) => lang.code === language)?.code}</span>
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
