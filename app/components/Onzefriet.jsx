import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzefriet.css';

import onzie_leftvidep from '../assets/resizeimgs/Rectangle43.png';

import mainbannerbg from '../assets/resizeimgs/c275d393c488ff040abd318900bf7f3b.png';
import fries_one from '../assets/resizeimgs/Rectangle89.png';
import fries_two from '../assets/resizeimgs/Rectangle88.png';
import fries_three from '../assets/resizeimgs/AdobeStock_616168104.png';
import fries_four from '../assets/resizeimgs/AdobeStock_616168104.png';
import fries_five from '../assets/resizeimgs/Rectangle90.png';
import fries_six from '../assets/resizeimgs/Rectangle91.png';
import fries_seven from '../assets/resizeimgs/Rectangle92.png';
import fries_eight from '../assets/resizeimgs/Rectangle93.png';
import arrow_blue from '../assets/resizeimgs/arrow_blue.png';
import fabelfrietsticker2 from '../assets/resizeimgs/fabelfrietsticker2.png';
import fabelfrie_tsticker2 from '../assets/resizeimgs/fabelfriet_sticker2.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzefriet = () => {
    const { language } = useLanguage();
    const [onzefriet, setOnzefriet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timelinesonzefriet = gsap.timeline({
            scrollTrigger: {
                trigger: '.wrapper',
                start: 'center center',
                end: '+=150%',
                pin: true,
                scrub: true,
                markers: false,
            },
        });
        timelinesonzefriet.to('.roundimage,.roundtext', {
            scale: 4,
            z: 350,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
            scrub: true,
            zIndex: 5,
        });
        timelinesonzefriet.to(
            '.section.hero',
            {
                scale: 1.1,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
            },
            '<',
        );
        timelinesonzefriet.to(
            '.gradient-purple',
            {
                scale: 1,
                borderRadius: 0,
                ease: 'power3.easeIn',
                scrollTrigger: {
                    trigger: '.wrappertest',
                    start: 'top top-500',
                    end: 'top top-200',
                },
            },
            0,
        );
        return () => {
            timelinesonzefriet.scrollTrigger.kill();
        };
    }, [onzefriet]);

    useEffect(() => {
        const container = document.querySelector('#container');
        const flTests = document.querySelector('.fl-tests');

        if (container && flTests) {
            const timelinereview = gsap.to(container, {
                x: () => -(container.offsetWidth - window.innerWidth + 1500) + 'px',
                ease: 'none',
                scrollTrigger: {
                    scroller: '.fl-tests',
                    trigger: '#container',
                    start: 'top top',
                    pin: true,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    end: () => '+=' + (container.offsetWidth - window.innerWidth),
                    markers: false,
                },
            });
            return () => {
                if (timelinereview.scrollTrigger) {
                    timelinereview.scrollTrigger.kill();
                }
            };
        }
    }, [onzefriet]);

    useEffect(() => {
        const list = document.querySelectorAll('.gradient-threebox');

        '.allfiressections img',
            { y: -100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 3,
            ease: 'bounce.out',
            scrollTrigger: {
                trigger: '.allfiressections',
                start: 'top top',
                end: '50% 50%',

                pin: true,
                once: true,
            },
        };

        gsap.fromTo(
            '.allfiressections img',
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 3,
                ease: 'bounce.out',
                scrollTrigger: {
                    trigger: '.allfiressections',
                    start: 'top top',
                    end: '50% 50%',

                    pin: true,
                    once: true,
                },
            },
        );

        gsap.to('.allfiressections img', {
            y: 20,
            repeat: -1,
            yoyo: true,
            duration: 6,
            ease: 'sine.inOut',
        });

        gsap.fromTo(
            '.gradient-purple h4',
            {
                opacity: 0,
                y: 50,
                scale: 0.5,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.gradient-purple',
                    start: 'top 80%',
                    end: 'top 50%',

                    markers: false,
                },
            },
        );

        gsap.fromTo(
            '.gradient-purple p',
            {
                opacity: 0,
                scale: 0.5,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.gradient-purple h4',
                    start: 'top 80%',
                    end: 'top 50%',

                    markers: false,
                },
            },
        );

        const textContent = 'lekkerste friet van Amsterdam!';
        const textLength = textContent.length;
        const duration = textLength * 0.05;
        gsap.fromTo(
            '#animated-text',
            { text: '' },
            {
                text: textContent,
                duration: duration,
                ease: 'none',
                delay: 2,
                scrollTrigger: {
                    trigger: '.whitewithvideomainbox',
                    start: 'top 75%',
                    end: 'top 25%',
                    toggleActions: 'play none none none',
                },
            },
        );

        gsap.to('.leftvideobox', {
            scrollTrigger: {
                trigger: '.whitewithvideomainbox',
                start: 'top top',
                end: 'bottom top',
            },
            x: 0,
            opacity: 1,
            ease: 'power1.out',
            duration: 1,
        });

        gsap.to('.righttextbox', {
            scrollTrigger: {
                trigger: '.whitewithvideomainbox',
                start: 'top top',
                end: 'bottom top',
            },
            x: 0,
            opacity: 1,
            ease: 'power1.out',
            duration: 1,
        });

        list.forEach((list) => {
            const items = list.querySelectorAll('ul li');
            const firstItem = items[0];
            const lastItem = items[items.length - 1];

            gsap.fromTo(
                firstItem,
                { rotation: 0, opacity: 0 },
                {
                    opacity: 1,
                    rotation: -8,
                    scrollTrigger: {
                        trigger: '.gradient-purple',
                        start: 'top top',
                        end: 'bottom top',
                    },
                },
            );

            gsap.fromTo(
                lastItem,
                { rotation: 0, opacity: 0 },
                {
                    opacity: 1,
                    rotation: 8,
                    scrollTrigger: {
                        trigger: '.gradient-purple',
                        start: 'top top',
                        end: 'bottom top',
                    },
                },
            );
        });
    }, [onzefriet]);

    const toggleAccordion = (e) => {
        const trigger = e.currentTarget;
        const content = trigger.nextElementSibling;
        document.querySelectorAll('.accordion-content').forEach((accordion) => {
            if (accordion !== content) {
                gsap.to(accordion, {
                    height: 0,
                    duration: 0.5,
                    onComplete: () => (accordion.style.display = 'none'),
                });
                accordion.classList.remove('show');
                trigger.classList.remove('active');
            }
        });
        document.querySelectorAll('.accordion-header').forEach((item) => {
            if (item !== trigger) {
                item.classList.remove('active');
            }
        });
        if (content.classList.contains('show')) {
            gsap.to(content, {
                height: 0,
                duration: 0.5,
                onComplete: () => (content.style.display = 'none'),
            });
            content.classList.remove('show');
            trigger.classList.remove('active');
        } else {
            content.style.display = 'block';
            let contentHeight = content.scrollHeight;
            gsap.fromTo(content, { height: 0 }, { height: contentHeight, duration: 0.5 });
            content.classList.add('show');
            trigger.classList.add('active');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "onzefriet" && language == $lang]`,
                    { lang: language },
                );
                console.log('Fetched setOnzefriet Data:', data);
                setOnzefriet(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const getImageUrls = (refs) => {
        const baseRefs = refs.slice(6);
        const fileExtensions = baseRefs.includes('-svg')
            ? '.svg'
            : baseRefs.includes('-png')
                ? '.png'
                : baseRefs.includes('-jpg')
                    ? '.jpg'
                    : '';
        const formattedRefs = baseRefs
            .replace('-svg', fileExtensions)
            .replace('-png', fileExtensions)
            .replace('-jpg', fileExtensions);
        return `https://cdn.sanity.io/images/6tlmpa5b/production/${formattedRefs}`;
    };

    return (
        <section className="panel secondesection" id="section2">
            {/* {onzefriet.map((content, idx) => (
                <div key={idx}>
                    <h3>{content.transitionSection.topTitle}</h3>
                    <p>{content.contentSection.description}</p>
                </div>
            ))} */}
            {onzefriet.map((content, idx) => (
                <div key={idx}>
                    <div className="wrapper">
                        <div className="bannersectinlogo">
                            <img
                                src={getImageUrls(content.logoImage.asset._ref)}
                                alt={content.logoImage.alt}
                            />
                        </div>
                        <div
                            className="wrappermain"
                            style={{ backgroundImage: `url(${mainbannerbg})` }}
                        ></div>
                        <div className="roundimages">
                            <div className="roundtext">
                                {content.transitionSection && (
                                    <>
                                        <h2>{content.transitionSection.topTitle}</h2>
                                        <h3>{content.transitionSection.bottomTitle}</h3>
                                    </>
                                )}
                            </div>
                            <div className="roundimage"></div>
                            <div className="scroll-down">
                                <div className="icon-scroll"></div>
                                <p>Scroll down</p>
                            </div>
                        </div>
                    </div>

                    <div className="wrappertest">
                        <section className="section hero"></section>
                        <div className="gradient-purple">
                            <div className="allfiressections">
                                <img src={fries_one} alt="img" />
                                <img src={fries_two} alt="img" />
                                <img src={fries_three} alt="img" />
                                <img src={fries_five} alt="img" />
                                <img src={fries_six} alt="img" />
                                <img src={fries_seven} alt="img" />
                                <img src={fries_eight} alt="img" />
                            </div>
                            {content.contentSection && (
                                <>
                                    <h4>{content.contentSection.heading}</h4>
                                    <p id="lodo">{content.contentSection.description}</p>
                                </>
                            )}
                            <div className="gradient-threebox">
                                <ul>
                                    {content.contentSection.three_image.map((image, index) => (
                                        <li key={image._key}>
                                            {index === 0 && (
                                                <div className="threeboxleftlogobar">
                                                    <img src={fabelfrietsticker2} alt={image.alt} />
                                                </div>
                                            )}
                                            <img
                                                src={getImageUrls(image.asset._ref)}
                                                alt={image.alt}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="whitebgbox">
                                {content.videoSection && (
                                    <div className="whitewithvideomainbox">
                                        <div className="leftvideobox">
                                            <div className="leftlogobar">
                                                <img src={fabelfrie_tsticker2} alt="img" />
                                            </div>
                                            <img src={onzie_leftvidep} alt="img" />
                                        </div>
                                        <div className="righttextbox">
                                            <h3 id="animated-text">
                                                {content.videoSection.videoHandwritingText}
                                            </h3>
                                            <img className="arrowimage" src={arrow_blue} alt="img" />
                                            <h5>{content.videoSection.videoHeading}</h5>
                                            <p>{content.videoSection.videoDescription}</p>
                                        </div>
                                    </div>
                                )}
                                {content.reviewSection && (
                                    <div className="whatpeople-section">
                                        <h6>{content.reviewSection.reviewHeading}</h6>

                                        <div className="fl-tests">
                                            <div id="container">
                                                {content.reviewSection.reviews.map((review, idx) => (
                                                    <div className="module" key={review._key}>
                                                        <div className="wharpeoplebox">
                                                            <p>"{review.reviewContent}"</p>
                                                            <b>-{review.reviewCustName}</b>
                                                            <ul className="starrating">
                                                                <li>
                                                                    <i className="star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="blackstar"> </i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {content.accordionSection && (
                                    <div className="main-accordian">
                                        <h6>{content.accordionSection.accordionHeading}</h6>
                                        <div className="accordion-container">
                                            {content.accordionSection.faq.map((faq) => (
                                                <div className="accordion-item" key={faq._key}>
                                                    <button
                                                        className="accordion-header"
                                                        onClick={toggleAccordion}
                                                    >
                                                        {faq.question}
                                                        <span className="icon"></span>
                                                    </button>
                                                    <div className="accordion-content">
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="overlaybannehand-bottoms"></div>
                                <div className="bottomsection">
                                    <div className="scroll-down">
                                        <div className="icon-scroll"></div>
                                        <p>Scroll down</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Onzefriet;
