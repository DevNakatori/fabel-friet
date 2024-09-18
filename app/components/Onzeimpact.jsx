import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzeimpact.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/e4a873c11067a15b870b670abefd5396-min.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzeimpact = () => {
    useEffect(() => {
        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.wrapper-impact',
                    start: 'center center',
                    end: '+=150%',
                    pin: true,
                    scrub: true,
                    markers: false,
                },
            })
            .to(
                '.roundimage-impact, .roundtext-impact',
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
        <section className="panel secondesection" id="section5">
            <div className="wrapper-impact">
                <div className="bannersectinlogo">
                    <img src={bannerlogo}></img>
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Round Image" />
                </div>

                <div className="roundimages">
                    <div className="roundtext-impact">
                        <h2>onze</h2>
                        <h3>impact</h3>
                    </div>
                    <div className="roundimage-impact"></div>
                    <div className="scroll-down">
                        <div className="icon-scroll"></div>
                        <p>Scroll down</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Onzeimpact;
