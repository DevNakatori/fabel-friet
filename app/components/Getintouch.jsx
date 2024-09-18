import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/getintouch.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/d4f1c7ef00981f46b3a68aed3d06dc01-min.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Getintouch = () => {
    useEffect(() => {
        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.wrapper-getintouch',
                    start: 'center center',
                    end: '+=150%',
                    pin: true,
                    scrub: true,
                    markers: false,
                },
            })
            .to(
                '.roundimage-getintouch, .roundtext-getintouch',
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
        <section className="panel secondesection" id="section6">
            <div className="wrapper-getintouch">
                <div className="bannersectinlogo">
                    <img src={bannerlogo}></img>
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Round Image" />
                </div>

                <div className="roundimages">
                    <div className="roundtext-getintouch">
                        <h2>get</h2>
                        <h3>
                            in <br />
                            touch
                        </h3>
                    </div>
                    <div className="roundimage-getintouch"></div>
                    <div className="scroll-down">
                        <div className="icon-scroll"></div>
                        <p>Scroll down</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Getintouch;
