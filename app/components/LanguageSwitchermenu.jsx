import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '~/components/LanguageContext';
import { gsap } from 'gsap';

const languages = [
    { code: 'en', name: 'English', flag: 'flag-icon-us' },
    { code: 'nl', name: 'Nederland', flag: 'flag-icon-nl' },
    //{ code: 'de', name: 'Deutsch', flag: 'flag-icon-de' },
];

const LanguageSwitchermenu = () => {
    const { language, switchLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {

    }, []);


    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                '.language-listqr',
                { opacity: 0, y: 300 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
            );
        } else {
            gsap.to('.language-listqr', {
                opacity: 0,
                y: 300,
                duration: 0.5,
                ease: 'power2.in',
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const animation = gsap.fromTo(
            '.language-popup .language-switcherr',
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.1,
                ease: 'power2.out',
                delay: 0.5,
                repeat: 0,
            },
        );

        return () => {
            gsap.killTweensOf('.language-popup .language-switcherr');
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

        const selectedLanguage = document.querySelector('.selected-language');
        const spans = selectedLanguage.querySelectorAll('.span');

        gsap.set(spans[1], { x: '100%', opacity: 0 });

        selectedLanguage.addEventListener('mouseenter', () => {

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



    

    const handleLanguageChange = () => {
        document.body.classList.add('hidepopup');
    };

    return (

        <div className={`language-popup ${isOpen ? 'open' : ''}`} id="language-popup">
        <h2>select your preferred language</h2>
        <div className="language-switcherr main-menu is-at-top" ref={dropdownRef}>
            <div className="selected-language" onClick={toggleDropdown}>
                
                <i
                    className={`flag-icon ${languages.find((lang) => lang.code === language).flag} flag-icon-squared`}
                ></i>
                <span className="span">
                    {languages.find((lang) => lang.code === language)?.code}
                </span>
                

                <div className="arrow"></div>
            </div>
            <ul className={`language-listqr ${isOpen ? 'open' : ''}`}>
                {languages.map((lang) => (
                    <li
                        key={lang.code}
                        className={`language-item ${language === lang.name ? 'active' : ''}`}
                        onClick={() => {
                            switchLanguage(lang.code);  // Switch the language
                            handleLanguageChange();  // Close the dropdown
                        }}
                    >
                        <span className={`flag-icon ${lang.flag} flag-icon-squared`}></span>
                        <span>{lang.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
};

export default LanguageSwitchermenu;
