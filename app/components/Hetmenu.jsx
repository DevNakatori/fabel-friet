import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/b31aa7dc7c0527a0ec7d013d969ab561-min.png';

import menu_one from '../assets/resizeimgs/menu_one.png';
import menu_two from '../assets/resizeimgs/menu_two.png';
import menu_three from '../assets/resizeimgs/menu_three.png';
import insta_3 from '../assets/resizeimgs/insta_3.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
    useEffect(() => {
        const timelineshetmenu = gsap.timeline({
            scrollTrigger: {
                trigger: '.wrapper-hetmenu',
                start: 'center center',
                end: '+=150%',
                pin: true,
                scrub: true,
                markers: false,
            },
        });
        timelineshetmenu.to('.roundimage-hetmenu, .roundtext-hetmenu', {
            scale: 4,
            z: 350,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
            scrub: true,
            zIndex: 5,
        });
        timelineshetmenu.to(
            '.section.hero',
            {
                scale: 1.1,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
            },
            '<',
        );
        timelineshetmenu.to(
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
            '.gradient-purplemenu',
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
            '.gradient-purpletext',
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
            timelineshetmenu.scrollTrigger.kill();
        };
    }, []);

    return (
        <section className="panel fourthsection" id="section4">
            <div className="wrapper-hetmenu">
                <div className="bannersectinlogo">
                    <img src={bannerlogo}></img>
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Round Image" />
                </div>

                <div className="roundimages">
                    <div className="roundtext-hetmenu">
                        <h2>het</h2>
                        <h3>menu</h3>
                    </div>
                    <div className="roundimage-hetmenu"></div>
                    <div className="scroll-down">
                        <div className="icon-scroll"></div>
                        <p>Scroll down</p>
                    </div>
                </div>
            </div>

            <div className="wrappertest">
                <section className="section hero"></section>
                <div className="gradient-purple">
                    <h4 className="gradient-purplemenu">menu</h4>
                    <p className="gradient-purpletext">
                        Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte
                        Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet
                        van Amsterdam te bakken. Daarbij maken wij gebruik van de beste
                        kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal
                        zijn ontwikkeld voor friet.
                    </p>

                    <div className="gradient-threebox-menu">
                        <ul>
                            <li>
                                <img src={menu_one} alt="img" />
                            </li>
                            <li>
                                <img src={menu_two} alt="img" />
                            </li>
                            <li>
                                <img src={menu_three} alt="img" />
                            </li>
                        </ul>
                    </div>

                    <div className="whitebgbox">
                        <div className="instagramfeedimagesimain">
                            <div className="instagramfeedimages">
                                <div className="contaernrul">
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                    <div className="contaernrulitem">
                                        <img src={insta_3} alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                                <img src="" alt="img" />
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hetmenu;
