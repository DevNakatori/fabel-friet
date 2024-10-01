import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';
import { getImageUrl } from '../js/imagesurl';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/b31aa7dc7c0527a0ec7d013d969ab561-min.png';


import insta_3 from '../assets/resizeimgs/insta_3.png';
import hetberoemd from '../assets/resizeimgs/hetinmiddelsberoemde.png';

import arrow_blue1 from '../assets/resizeimgs/arrow_blue1.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {

    const { language } = useLanguage();
    const [hetmenu, sethetmenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
    }, [hetmenu]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "hetmenu" && language == $lang]`,
                    { lang: language },
                );
                console.log('Fetched sethetmenu Data:', data);
                sethetmenu(data);
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

    if (!hetmenu || hetmenu.length === 0) return <div>No menu available.</div>;

    const { contentSection, bottomContentSection, menuSection, transitionSection } = hetmenu[0];

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
                        <h2>{transitionSection.topTitle}</h2>
                        <h3>{transitionSection.bottomTitle}</h3>
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
                    <h4 className="gradient-purplemenu">{contentSection.heading}</h4>
                    <p className="gradient-purpletext">
                        {contentSection.description}
                    </p>

                    <div className="gradient-threebox-menu">
                        <ul>
                            {menuSection.Menu.map((item) => (
                                <li key={item._key}>
                                    <img src={getImageUrl(item.image.asset._ref)} alt={`Menu item ${item._key}`} style={{ maxWidth: '100%', height: 'auto' }} />
                                </li>
                            ))}
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
                            <div className="righttextbox">
                                <h5>{bottomContentSection.bottomHeading}</h5>
                                <p>
                                    {bottomContentSection.bottomDescription}
                                </p>
                            </div>
                            <div className="leftvideobox">
                                <img src={getImageUrl(bottomContentSection.bottomImage.asset._ref)} alt="img" />
                                <div className="bluearrowbottom">
                                    <img src={arrow_blue1} alt="img" />
                                </div>
                                <h3>{bottomContentSection.bottomHeading}</h3>
                                <p>
                                    {bottomContentSection.bottomContent}
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

export default Hetmenu;
