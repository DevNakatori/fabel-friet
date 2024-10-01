import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzeimpact.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/e4a873c11067a15b870b670abefd5396-min.png';

import onzie_leftvidep from '../assets/resizeimgs/e4a873c11067a15b870b670abefd5396-min.png';

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
            <div className="wrappertest">
                <section className="section hero"></section>
                <div className="gradient-purple" id="onzefriendescriptiononzefriet">

                    <h4 className="onzefrienttitle">
                        Onze impact
                    </h4>
                    <p className="onzefriendescription" id="lodo">
                        Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken. Daarbij maken wij gebruik van de beste kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal zijn ontwikkeld voor friet.
                    </p>
                    <div className="gradient-threebox">
                        <ul>
                            <li>
                                <img src="https://cdn.sanity.io/images/6tlmpa5b/production/bb2eb1631105dad2899d8aed8da6e35305370efb-603x700.png" />
                            </li>
                            <li>
                                <img src="https://cdn.sanity.io/images/6tlmpa5b/production/679abfc8cb46d1507c6d7c22baaf56f7ec260c86-504x628.png" />
                            </li>
                            <li>
                                <img src="https://cdn.sanity.io/images/6tlmpa5b/production/30a076a381bca2811a1be16aec1c2af9f20c2c80-603x699.png" />
                            </li>
                        </ul>
                    </div>
                    <div className="whitebgbox">
                        <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                                <h4>
                                    Lorem ipsum dolor sit amet Lorem ipsum
                                </h4>
                            </div>
                            <div className="righttextbox">
                                <ul className='onzeimpacttwolist'>
                                    <li>
                                        <div className='onzeimpacttwolistlist'>
                                            <h5>
                                                Kom snel bij ons langs om onze fabelachtige friet zelf te proeven.
                                            </h5>
                                            <p>
                                                Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='onzeimpacttwolistlist'>
                                            <h5>
                                                Kom snel bij ons langs om onze fabelachtige friet zelf te proeven.
                                            </h5>
                                            <p>
                                                Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="whitewithvideomainboxs">
                            <div className="leftvideobox">
                                <img src={onzie_leftvidep} alt="img" />
                            </div>
                            <div className="righttextbox">
                                <h3>
                                Lorem ipsum 
                                dolor sit amet
                                </h3>
                                <p>
                                Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken. Daarbij maken wij gebruik van de beste kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal zijn ontwikkeld voor friet. 
                                </p>
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

export default Onzeimpact;
