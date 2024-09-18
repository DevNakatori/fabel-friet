import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzelocations.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/8bdb17523f8d73487022194d9774c1d3.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzelocaties = () => {
    useEffect(() => {
        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.wrapper-onzelocation',
                    start: 'center center',
                    end: '+=150%',
                    pin: true,
                    scrub: true,
                    markers: false,
                },
            })
            .to(
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
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
    return (
        <section className="panel secondesection" id="section3">
            <div className="wrapper-onzelocation">
                <div className="bannersectinlogo">
                    <img src={bannerlogo}></img>
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Round Image" />
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
        </section>
    );
};

export default Onzelocaties;
