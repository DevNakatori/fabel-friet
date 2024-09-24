import React, { useEffect } from 'react';
import { useLanguage } from '~/components/LanguageContext';
import { gsap } from 'gsap';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Dutch' },
    // Add more languages as needed
];

const LanguageSwitcher = () => {
    const { language, switchLanguage } = useLanguage();

    useEffect(() => {
        // Start your animation here
        const animation = gsap.to('.language-switcher', {
            duration: 1,
            opacity: 1,
            y: 0,
            // Add more animation properties as needed
        });

        return () => {
            // Stop the animation on component unmount or when dependencies change
            gsap.killTweensOf('.language-switcher');
        };
    }, []);

    return (
        <div className="language-switcher">
            <div className="select-container">
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => {
                        switchLanguage(e.target.value);
                        // Optionally stop the animation here if needed
                        gsap.killTweensOf('.language-switcher');
                    }}
                >
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <div className="arrow"></div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
