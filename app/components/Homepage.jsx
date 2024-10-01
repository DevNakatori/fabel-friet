import React, { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import '../styles/homebanner.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import SplitText from 'gsap/SplitText';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Cookies from 'js-cookie';
import bannerlogo from '../assets/resizeimgs/logobanner.png';
import writingicon from '../assets/resizeimgs/writingicon.png';

import { getImageUrl } from '../js/imagesurl';

gsap.registerPlugin(
    TextPlugin,
    ScrollSmoother,
    SplitText,
    DrawSVGPlugin,
    ScrollTrigger,
);

const HomePage = () => {
    const { language } = useLanguage();
    const [bannerData, setBanner] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /* animation start */
        const smoother = ScrollSmoother.create({
            smooth: 3,
            effects: true,
        });
        smoother.effects('.allfiressections img', { speed: 'auto' });
        /* animation end */

        /* data fatched */
        const fetchData = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "homebanner" && language == $lang]`,
                    { lang: language },
                );
                console.log('Fetched setBanner Data:', data);
                setBanner(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);
    /* data fatched */

    useEffect(() => {
        if (!loading) {
            gsap.to('.loadersite', {
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    document.body.classList.add('hiddenoverflow');

                    gsap.to('.banner_video', {
                        autoAlpha: 1,
                        duration: 0,
                        delay: 0.1,
                    });
                },
            });
        }
    }, [loading]);

    useEffect(() => {
        const video = document.getElementById('myVideo');
        const overlayMain = document.querySelector('.banner_overlaymain');
        const overlay = document.querySelector('.banner_overlay');
        const elements = {
            logo: document.querySelector('.bannerlogo'),
            title: document.querySelector('.banner_title_text'),
            content: document.querySelector('.banner_content_text'),
            button: document.querySelector('.banner_bottombtn'),
            rotateText: document.querySelector('.bannerrotate_text'),
        };

        gsap.fromTo(
            'nav.header-menu-desktop .header-menu-item',
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.out',
                delay: 2,
                repeat: 0,
            },
        );

        if (video) {
            video.autoplay = true;
            video.addEventListener('ended', () => {
                video.classList.add('hidden');
                if (overlayMain) {
                    gsap.fromTo(
                        overlayMain,
                        {
                            x: '-100%',
                        },
                        {
                            duration: 0.5,
                            x: '0%',
                            ease: 'power2.out',
                            delay: 0,
                            opacity: 1,
                        },
                    );
                }
                if (overlay) {
                    gsap.to(overlay, {
                        duration: 2,
                        opacity: 1,
                        ease: 'power2.out',
                        delay: 0.2,
                    });
                }
                gsap.to('.overlaybannehand-bottom', {
                    duration: 1.5,
                    bottom: '0px',
                    ease: 'power1.inOut',
                    delay: 0.1,
                });
                gsap.fromTo(
                    elements.logo,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1 },
                );
                gsap.fromTo(
                    elements.title,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.5 },
                );
                gsap.fromTo(
                    elements.content,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 2 },
                );
                gsap.fromTo(
                    elements.button,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 2.5 },
                );
                gsap.to('.overlaybannehand-left', {
                    duration: 1,
                    left: '0px',
                    ease: 'power1.inOut',
                    delay: 3,
                });
                gsap.to('.overlaybannehand-right', {
                    duration: 1,
                    right: '0px',
                    ease: 'power1.inOut',
                    delay: 3,
                });
                gsap.fromTo(
                    elements.rotateText,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 4 },
                );
                gsap.fromTo(
                    elements.rotateText,
                    { text: '' },
                    {
                        text: bannerData[0].bannerText,
                        duration: bannerData[0].bannerText.length * 0.05,
                        ease: 'none',
                        delay: 4.5,
                    },
                );
                gsap.to('body', { delay: 3.5, onComplete: removeClass });

                gsap.fromTo(
                    '.banner_content_text p span.bold img.imgerasr_one',
                    {
                        y: '-100%',
                    },
                    {
                        duration: 0.5,
                        y: '0%',
                        ease: 'power2.out',
                        opacity: 1,
                        delay: 5,
                    },
                );

                gsap.fromTo(
                    '.banner_content_text p span.bold img.imgerasr_two',
                    {
                        y: '-100%',
                    },
                    {
                        duration: 0.5,
                        y: '0%',
                        ease: 'power2.out',
                        opacity: 1,
                        delay: 5.5,
                    },
                );

                gsap.fromTo(
                    '#target',
                    { drawSVG: '0 0' },
                    {
                        drawSVG: '100% -175%',
                        duration: 1,
                        ease: 'none',
                        repeat: 0,
                        delay: 6,
                    },
                );

                gsap.fromTo(
                    '#target_one',
                    { drawSVG: '0 0' },
                    {
                        drawSVG: '100% -175%',
                        duration: 1,
                        ease: 'none',
                        repeat: 0,
                        delay: 6.5,
                    },
                );

                gsap.fromTo(
                    '.rightsidebullets ul li',
                    { opacity: 0, y: -30 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.5,
                        duration: 1,
                        ease: 'power2.out',
                        delay: 5.5,
                    },
                );
            });
        }
        return () => {
            if (video) {
                video.removeEventListener('ended', () => { });
            }
        };
    }, [bannerData]);

    function removeClass() {
        document.body.classList.remove('hiddenoverflow');
    }

    useEffect(() => {
        const paragraph = document.getElementById('text');
        if (paragraph) {
            const words = paragraph.innerText.split(' ');

            if (words.length >= 5) {
                words[1] = `<span class="bold"><svg version="1.0" x="0px" y="0px" viewBox="0 0 260 152" style="enable-background:new 0 0 260 152;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="target" class="st0" d="M16.8,61.9c0,0,44.4-36.5,79.7-53.5c0,0-70.3,59.4-88.2,85c0,0,86.5-72.4,190.3-85c0,0-103.5,72.1-162.7,116.5c0,0,142.1-77.5,215.9-105.5c0,0-88.2,73.7-115,98.4c0,0,55.9-34.7,79.7-39.1c0,0-6,23.4-48.5,65c0,0,16.3-15.1,41.8-23.5"/></svg> ${words[1]} </span>`;
                words[4] = `<span class="bold"><svg version="1.0" x="0px" y="0px" viewBox="0 0 260 152" style="enable-background:new 0 0 260 152;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="target_one" class="st0" d="M16.8,61.9c0,0,44.4-36.5,79.7-53.5c0,0-70.3,59.4-88.2,85c0,0,86.5-72.4,190.3-85c0,0-103.5,72.1-162.7,116.5c0,0,142.1-77.5,215.9-105.5c0,0-88.2,73.7-115,98.4c0,0,55.9-34.7,79.7-39.1c0,0-6,23.4-48.5,65c0,0,16.3-15.1,41.8-23.5"/></svg> ${words[4]} </span>`;
                paragraph.innerHTML = words.join(' ');
            }
        }
    }, [bannerData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bannerData]);

    

    if (loading)
        return (
            <div className="loadersite">
                <div className="logosvg">
                    <img src={bannerlogo} alt="logo" />
                </div>
                <div className="loader1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    if (error) return <div>{error}</div>;

    return (
        <section className="bannersection" id="section1">
            <div className="banner_video">
                {bannerData[0].bannerVideo && (
                    <video
                        id="myVideo"
                        src={bannerData[0].bannerVideo}
                        autoPlay
                        muted
                        playsInline
                    />
                )}
            </div>
            <div className="banner_overlaymain">
                <div className="banner_overlay">
                    <div className="bannerlogo">
                        <img
                            src={getImageUrl(bannerData[0].bannerLogo.asset._ref)}
                            alt={bannerData[0].bannerLogo.alt}
                        />
                    </div>

                    <div className="banner_title_text">
                        <h1>{bannerData[0].title}</h1>
                    </div>

                    <div className="banner_content_text">
                        <p id="text">{bannerData[0].bannerContent}</p>
                    </div>

                    {bannerData[0].bannerButton && (
                        <a
                            className="banner_bottombtn"
                            href={bannerData[0].bannerButton.buttonLink}
                        >
                            {bannerData[0].bannerButton.buttonText}
                        </a>
                    )}

                    <div className="bannerrotate_text">
                        <p>{bannerData[0].bannerText}</p>
                    </div>
                </div>
                <div className="overlaybannehand">
                    <div className="overlaybannehand-left"></div>
                    <div className="overlaybannehand-right"></div>
                    <div className="overlaybannehand-bottom"></div>
                </div>
            </div>
        </section>
    );
};
export default HomePage;
