import React, { useState, useEffect } from 'react';

const sections = ['section1', 'section2', 'section3','section4','section5','section6'];

const ScrollNav = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        const scrollPos = window.scrollY;
        const sectionOffsets = sections.map((id) => {
            const section = document.getElementById(id);
            return {
                id,
                offset: section ? section.offsetTop : 0,
                height: section ? section.offsetHeight : 0,
            };
        });

        const newIndex = sectionOffsets.findIndex(
            ({ offset, height }) => scrollPos >= offset && scrollPos < offset + height,
        );

        if (newIndex === -1 && sectionOffsets.length) {
            setActiveIndex(0);
        } else {
            setActiveIndex(newIndex);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        sections.forEach((id, index) => {
            const section = document.getElementById(id);
            if (section) {
                if (index === activeIndex) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            }
        });
    }, [activeIndex]);

    useEffect(() => {
        const section = document.getElementById(sections[0]);
        if (section) {
            section.classList.add('active');
        }
    }, []);

    const scrollToSection = (index) => {
        const section = document.getElementById(sections[index]);
        if (section) {
            window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <div className="rightsidebullets">
            <ul>
                {sections.map((section, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? 'activebullets' : ''}
                    >
                        <button onClick={() => scrollToSection(index)}>
                            <span className="bullets"></span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScrollNav;
