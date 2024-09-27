import React, { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzelocations.css';

import mainbannerbg from '../assets/resizeimgs/8bdb17523f8d73487022194d9774c1d3.png';

import Onzelocaties_leftone from '../assets/resizeimgs/Rectangle48.png';
import Onzelocaties_lefttwo from '../assets/resizeimgs/Rectangle62.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzelocaties = () => {
    const { language } = useLanguage();
    const [onzelocaties, setOnzelocaties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timelines = gsap.timeline({
            scrollTrigger: {
                trigger: '.wrapper-onzelocation',
                start: 'center center',
                end: '+=150%',
                pin: true,
                scrub: true,
                markers: false,
            },
        });
        timelines.to(
            '.roundimage-onzelocation, .roundtext-onzelocation',
            {
                scale: 4,
                z: 350,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
                scrub: true,
                zIndex: 5,
            },
            0,
        );
        timelines.to(
            '.section.hero',
            {
                scale: 1.1,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
            },
            '<',
        );
        timelines.to(
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



        const leftVideoAnimation = {
            from: {
                x: '-50%',
                autoAlpha: 0,
            },
            to: {
                duration: 0.5,
                autoAlpha: 1,
                x: '0%',
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#section3 .whitewithvideomainbox',
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: 1,
                    once: true,
                },
            },
        };

        const rightTextBoxAnimation = {
            from: {
                x: '100%',
                autoAlpha: 0,
            },
            to: {
                duration: 0.5,
                x: '0%',
                autoAlpha: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#section3 .whitewithvideomainbox',
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: 1,
                    once: true,
                },
            },
        };

        gsap.utils.toArray('#section3 .leftvideobox').forEach((locationleft) => {
            gsap.fromTo(locationleft, leftVideoAnimation.from, leftVideoAnimation.to);
        });

        gsap.utils.toArray('#section3 .righttextbox').forEach((locationright) => {
            gsap.fromTo(locationright, rightTextBoxAnimation.from, rightTextBoxAnimation.to,);
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
                    trigger: '#section3 .gradient-purple',
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
                    trigger: '#section3 .gradient-purple h4',
                    start: 'top 80%',
                    end: 'top 50%',
                    markers: false,
                },
            },
        );


        gsap.fromTo(
            '.locatebutton',
            {
                opacity: 0,
                y: 50,
                scale: 1,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.locatebutton',
                    start: 'top 80%',
                    end: 'top 50%',

                    markers: false,
                },
            },
        );





        return () => {
            timelines.scrollTrigger.kill();
        };
    }, [onzelocaties]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "onzelocaties" && language == $lang]`,
                    { lang: language },
                );
                console.log('Fetched setOnzelocaties Data:', data);
                setOnzelocaties(data);
            } catch (err) {
                console.error('Error Onzelocat fetching data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const getImageUrlss = (refss) => {
        const baseRefss = refss.slice(6);
        const fileExtensionss = baseRefss.includes('-svg')
            ? '.svg'
            : baseRefss.includes('-png')
                ? '.png'
                : baseRefss.includes('-jpg')
                    ? '.jpg'
                    : '';
        const formattedRefss = baseRefss
            .replace('-svg', fileExtensionss)
            .replace('-png', fileExtensionss)
            .replace('-jpg', fileExtensionss);
        return `https://cdn.sanity.io/images/6tlmpa5b/production/${formattedRefss}`;
    };

    return (
        <section className="panel thirdesection" id="section3">
            {onzelocaties.map((locationData) => (
                <div key={locationData._id}>
                    <div className="wrapper-onzelocation">
                        <div className="bannersectinlogo">
                            <img
                                src={getImageUrlss(locationData.logoImage.asset._ref)}
                                alt={locationData.logoImage.alt}
                            />
                        </div>
                        <div className="wrappermain">
                            <img className="media" src={mainbannerbg} alt="" />
                        </div>

                        <div className="roundimages">
                            <div className="roundtext-onzelocation">
                                <h2>{locationData.transitionSection.topTitle}</h2>
                                <h3>{locationData.transitionSection.bottomTitle}</h3>
                            </div>
                            <div className="roundimage-onzelocation"></div>
                            <div className="scroll-down">
                                <div className="icon-scroll"></div>
                                <p>Scroll down</p>
                            </div>
                        </div>
                    </div>
                    <div className="wrappertest">
                        <section className="section hero"></section>
                        <div className="gradient-purple">
                            <h4>{locationData.contentSection.heading}</h4>
                            <p>{locationData.contentSection.description}</p>
                            <a href="#" className="locatebutton">
                                {locationData.contentSection.btn_label}
                            </a>
                            <div className="whitebgbox">
                                {locationData.locationSection.location.map((loc) => (
                                    <div key={loc._key}>
                                        <div className="whitewithvideomainbox">
                                            <div className="leftvideobox">
                                                <img
                                                    src={getImageUrlss(loc.image.asset._ref)}
                                                    alt={loc.image.alt}
                                                />
                                            </div>
                                            <div className="righttextbox">
                                                <h5>{loc.locationName}</h5>
                                                <div className="locationmaoaddress">
                                                    <div className="locationicon">
                                                        <i className="mapicon"></i>
                                                    </div>
                                                    <div className="locationaddtext">
                                                        <ul>
                                                            <li>{loc.address}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p>{loc.info}</p>
                                                <a href="#" className="routbtn">
                                                    {loc.btn_label}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

export default Onzelocaties;
