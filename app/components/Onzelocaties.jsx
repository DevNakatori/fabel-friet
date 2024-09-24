import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzelocations.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/8bdb17523f8d73487022194d9774c1d3.png';

import fabelfrie_tsticker2 from '../assets/resizeimgs/fabelfriet_sticker2.png';

import Onzelocaties_leftone from '../assets/resizeimgs/Rectangle48.png';
import Onzelocaties_lefttwo from '../assets/resizeimgs/Rectangle62.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzelocaties = () => {
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

        return () => {
            timelines.scrollTrigger.kill();
        };
    }, []);
    return (
        <section className="panel thirdesection" id="section3">
            <div className="wrapper-onzelocation">
                <div className="bannersectinlogo">
                    <img src={bannerlogo} alt="Banner Logo" />
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Main Background" />
                </div>

                <div className="roundimages">
                    <div className="roundtext-onzelocation">
                        <h2>onze</h2>
                        <h3>locaties</h3>
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
                    <h4>locaties</h4>
                    <p id="">
                        Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte
                        Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet
                        van Amsterdam te bakken. Daarbij maken wij gebruik van de beste
                        kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal
                        zijn ontwikkeld voor friet.
                    </p>
                    <a href="#" className="locatebutton">
                        Zie dichtsbijzijnde locatie
                    </a>
                    <div className="whitebgbox">
                        <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                                <img src={Onzelocaties_leftone} alt="img" />
                            </div>
                            <div className="righttextbox">
                                <h5> Runstraat</h5>
                                <div className="locationmaoaddress">
                                    <div className="locationicon">
                                        <i className="mapicon"></i>
                                    </div>
                                    <div className="locationaddtext">
                                        <ul>
                                            <li>Runstraat 1 | 1016 GJ Amsterdam</li>
                                            <li>Mon-Sun: 11:00 - 21:00</li>
                                        </ul>
                                    </div>
                                </div>
                                <p>
                                    Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij
                                    echte Hollandse friet. Elke dag weer geven wij alles om de
                                    lekkerste friet van Amsterdam te bakken. Daarbij maken wij
                                    gebruik van de beste kwaliteit Agria aardappelen van
                                    Nederlandse bodem welke speciaal zijn ontwikkeld voor friet.{' '}
                                </p>

                                <a href="#" className="routbtn">
                                    Route
                                </a>
                            </div>
                        </div>

                        <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                                <img src={Onzelocaties_lefttwo} alt="img" />
                            </div>
                            <div className="righttextbox">
                                <h5> Runstraat</h5>
                                <div className="locationmaoaddress">
                                    <div className="locationicon">
                                        <i className="mapicon"></i>
                                    </div>
                                    <div className="locationaddtext">
                                        <ul>
                                            <li>Runstraat 1 | 1016 GJ Amsterdam</li>
                                            <li>Mon-Sun: 11:00 - 21:00</li>
                                        </ul>
                                    </div>
                                </div>
                                <p>
                                    Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij
                                    echte Hollandse friet. Elke dag weer geven wij alles om de
                                    lekkerste friet van Amsterdam te bakken. Daarbij maken wij
                                    gebruik van de beste kwaliteit Agria aardappelen van
                                    Nederlandse bodem welke speciaal zijn ontwikkeld voor friet.{' '}
                                </p>

                                <a href="#" className="routbtn">
                                    Route
                                </a>
                            </div>
                        </div>

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
        </section>
    );
};

export default Onzelocaties;
