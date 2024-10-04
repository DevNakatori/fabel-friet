import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzeimpact.css';
import { getImageUrl } from '../js/imagesurl';
import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/e4a873c11067a15b870b670abefd5396-min.png';
import onzie_leftvidep from '../assets/resizeimgs/e4a873c11067a15b870b670abefd5396-min.png';
import arrow_bluebottom from '../assets/resizeimgs/arrow_bluebottom.png';


gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzeimpact = () => {
    const { language } = useLanguage();
    const [onzeimpact, setonzeimpact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timelineimpact = gsap.timeline({
            scrollTrigger: {
                trigger: '.wrapper-impact',
                start: 'center center',
                end: '+=150%',
                pin: true,
                scrub: 0.5,
                markers: false,
            },
        })
        timelineimpact.to(
            '.roundimage-impact, .roundtext-impact',
            {
                scale: 4,
                z: 350,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
                zIndex: 5,
            },
            0,
        );

        timelineimpact.to(".fifthesection .wrappertest", {
            scrollTrigger: {
                trigger: ".fifthesection",
                start: "20% 20%",
                end: "40% 40%",
                scrub: true,
                once: false,
            },
            borderRadius: "0vw 0vw 0px 0px",
            ease: "power1.inOut",
        });

        timelineimpact.to(
            '.section.hero',
            {
                scale: 1.1,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
            },
            '<',
        );


        const timelineimpactfour = gsap.fromTo(
            '.gradient-purple h4.onzeimpacttitle',
            {opacity: 0, y: -30},
            {
              opacity: 1,
              y: 0,
              stagger: 0,
              duration: 1,
              ease: 'power2.out',
              delay: 1.5,
              repeat: 0,
              scrollTrigger: {
                trigger: '#onzeimpactnonzefriet',
              },
            },
          );
      
          const timelineimpactfourp = gsap.fromTo(
            '.gradient-purple p.onzeimpactdescription',
            {opacity: 0, y: -30},
            {
              opacity: 1,
              y: 0,
              stagger: 0,
              duration: 1,
              ease: 'power2.out',
              delay: 2,
              repeat: 0,
              scrollTrigger: {
                trigger: '#onzeimpactnonzefriet',
              },
            },
          );


          gsap.fromTo(
            '.fifthesection .gradient-threebox',
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
              delay: 1,
              stagger: 0.2,
              scrollTrigger: {
                trigger: '.fifthesection .gradient-purple',
                markers: false,
              },
            },
          );
      
          gsap.fromTo(
            '.fifthesection .whitewithvideomainbox',
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
              delay: 2,
              stagger: 0.3,
              scrollTrigger: {
                trigger: '.fifthesection .gradient-purple',
                markers: false,
              },
            },
          );
      
          gsap.fromTo(
            '.fifthesection .whitewithvideomainboxs',
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
              delay: 2,
              stagger: 0.3,
              scrollTrigger: {
                trigger: '.fifthesection .whitewithvideomainbox',
                markers: false,
              },
            },
          );

        // gsap.fromTo(
        //     '.gradient-purple h4.onzefrienttitle',
        //     {
        //         opacity: 0,
        //         y: 50,
        //         scale: 0.5,
        //     },
        //     {
        //         opacity: 1,
        //         y: 0,
        //         scale: 1,
        //         duration: 1,
        //         delay: 1,
        //         ease: 'power2.out',
        //         scrollTrigger: {
        //             trigger: '#onzefriendescriptiononzefriet',
        //             start: 'top 80%',
        //             end: 'top 50%',

        //             markers: false,
        //         },
        //     },
        // );

        // gsap.fromTo(
        //     '.gradient-purple p.onzefriendescription',
        //     {
        //         opacity: 0,
        //         scale: 0.5,
        //         y: 50,
        //     },
        //     {
        //         opacity: 1,
        //         y: 0,
        //         scale: 1,
        //         duration: 1,
        //         ease: 'power2.out',
        //         delay: 2,
        //         scrollTrigger: {
        //             trigger: '#onzefriendescriptiononzefriet',
        //             start: 'top 80%',
        //             end: 'top 50%',
        //             markers: false,
        //         },
        //     },
        // );
        
        return () => {
            timelineimpact.scrollTrigger.kill();
        };
    }, [onzeimpact]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "onzeimpact" && language == $lang]`,
                    { lang: language },
                );
                console.log('Fetched onzeimpact Data:', data);
                setonzeimpact(data);
            } catch (err) {
                console.error('Error fetching onzeimpact data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!onzeimpact || onzeimpact.length === 0) return <p>No data available</p>;

    const data = onzeimpact[0];


    return (
        <section className="panel fifthesection" id="section5">
            <div className="wrapper-impact">
                <div className="bannersectinlogo">
                    <img src={bannerlogo}></img>
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Round Image" />
                </div>

                <div className="roundimages">
                    <div className="roundtext-impact">
                        <h2>{data.transitionSection.topTitle}</h2>
                        <h3>{data.transitionSection.bottomTitle}</h3>
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
                <div className="gradient-purple" id="onzeimpactnonzefriet">

                    <h4 className="onzeimpacttitle">
                        {data.contentSection.heading}
                    </h4>
                    <p className="onzeimpactdescription">
                        {data.contentSection.description}
                    </p>
                    <div className="gradient-threebox">
                        <ul>
                            {data.imageSection.image.map((img) => (
                                <li>
                                    <img key={img._key} src={getImageUrl(img.image.asset._ref)} alt="Descriptive Alt Text" />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="whitebgbox">
                        <div className='qrcodeimagebox'>
                            <img src={getImageUrl(data.cardSection.qrImage.asset._ref)} alt="QR Code" data-speed="auto"/>
                        </div>
                        <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                                <h4>
                                    {data.cardSection.secTitle}
                                </h4>
                            </div>
                            <div className="righttextbox">
                                <ul className='onzeimpacttwolist'>
                                    {data.cardSection.card.map((card) => (
                                        <li key={card._key}>
                                            <div className='onzeimpacttwolistlist'>
                                                <h5>
                                                    {card.cardTitle}
                                                </h5>
                                                <p>
                                                    {card.cardDescription}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="whitewithvideomainboxs">
                            <div className="leftvideobox">
                                <img src={getImageUrl(data.bottomSection.image.asset._ref)} alt="Bottom Section Image" data-speed="auto"/>
                            </div>
                            <div className="righttextbox">
                                <h3>
                                    {data.bottomSection.secTitle}
                                </h3>
                                <p>
                                    {data.bottomSection.secDescription}
                                </p>
                            </div>
                        </div>

                        <div className='binimageboxmain'>
                            <div className='binimageboxieft'>
                                <h6>
                                    {data.bottomSection.sideText}
                                </h6>
                                <div className='binarrowimg'>
                                    <img src={arrow_bluebottom} alt="Bin Imagebox" />
                                </div>
                            </div>
                            <div className='binimagebox'>
                                <img src={getImageUrl(data.bottomSection.sideImage.asset._ref)} alt="Bin Imagebox" data-speed="auto"/>
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
