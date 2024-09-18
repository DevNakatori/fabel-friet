import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/b31aa7dc7c0527a0ec7d013d969ab561-min.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
    useEffect(() => {
        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.wrapper-hetmenu',
                    start: 'center center',
                    end: '+=150%',
                    pin: true,
                    scrub: true,
                    markers: false,
                },
            })
            .to(
                '.roundimage-hetmenu, .roundtext-hetmenu',
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
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
    return (
        <section className="panel secondesection" id="section4">
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
        </section>
    );
};

export default Hetmenu;
