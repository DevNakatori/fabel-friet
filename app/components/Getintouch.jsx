import React, {useRef, useEffect, useState} from 'react';
import gsap from 'gsap';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import Newfooter from '~/components/Newfooter';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {getImageUrl} from '../js/imagesurl';
import Contactform from '~/components/Contactform';


import SplitText from 'gsap/SplitText';
import '../styles/getintouch.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/d4f1c7ef00981f46b3a68aed3d06dc01-min.png';
import backgroundImageUrl from '../assets/resizeimgs/tiktiokbg.png';
import facebookIcon from '../assets/resizeimgs/fb.png';
import instagramIcon from '../assets/resizeimgs/insta.png';
import linkedinIcon from '../assets/resizeimgs/in.png';
import twitterIcon from '../assets/resizeimgs/twitter.png';
import tiktokIcon from '../assets/resizeimgs/tiktok.png';

import arrow_blue_2 from '../assets/resizeimgs/arrow_blue_2.png';
import arrow_blue_1 from '../assets/resizeimgs/arrow_blue_1.png';

import liek_1 from '../assets/resizeimgs/like1.png';
import liek_2 from '../assets/resizeimgs/like2.png';
import liek_3 from '../assets/resizeimgs/like3.png';
import liek_4 from '../assets/resizeimgs/like4.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Getintouch = () => {
  const iconMap = {
    facebook: facebookIcon,
    insta: instagramIcon,
    linkedin: linkedinIcon,
    twitter: twitterIcon,
    tiktok: tiktokIcon,
  };

  const {language} = useLanguage();
  const [getIntouch, setGetIntouch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timelinegetintouch = gsap.timeline({
      scrollTrigger: {
        trigger: '.wrapper-getintouch',
        start: 'center center',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        markers: true,
        // onEnter: () => document.body.classList.remove('scrolled'),
        // onLeave: () => document.body.classList.add('scrolled'),
        // onEnterBack: () => document.body.classList.remove('scrolled'),
      },
    });
    timelinegetintouch.to(
      '.roundimage-getintouch, .roundtext-getintouch',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
        //zIndex: 5,
      },
      0,
    );

    timelinegetintouch.to(
      '.section.hero',
      {
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );

    timelinegetintouch.to('.sixthsection .wrappertest', {
      scrollTrigger: {
        trigger: '.sixthsection',
        start: '10% 10%',
        end: '30% 30%',
        scrub: true,
        once: false,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });
    return () => {
      timelinegetintouch.scrollTrigger.kill();
    };
  }, [getIntouch]);

  useEffect(() => {
    // const list = document.querySelectorAll('.gradient-threeboxgetintouch');
    const listgetintouch = document.querySelectorAll(
      '.gradient-threeboxgetintouch',
    );
    listgetintouch.forEach((listgetintouch) => {
      const itemsgetintouch = listgetintouch.querySelectorAll(
        'ul li.gradientgetintouchlist',
      );
      const firstItemgetintouch = itemsgetintouch[0];
      const lastItemgetintouch = itemsgetintouch[itemsgetintouch.length - 1];
      const middleItemgetintouch = itemsgetintouch[1];

      const mobileMediaQuerygetintouch =
        window.matchMedia('(max-width: 768px)');

      let animateMobileTimeline;
      let animateDesktopTimeline;

      // GSAP animation for desktop
      const animateDesktopgetintouch = () => {
        // Kill existing animations
        if (animateMobileTimeline) animateMobileTimeline.scrollTrigger.kill();

        const onzefritthreeimagecentergetintouch = gsap.timeline({
          scrollTrigger: {
            trigger: '.sixthsection .wrappertest',
            start: 'top top',
            end: 'bottom top',
          },
        });

        onzefritthreeimagecentergetintouch.fromTo(
          middleItemgetintouch,
          {bottom: '-55vh', rotation: 0, opacity: 0},
          {
            bottom: '0vh',
            duration: 1,
            opacity: 1,
          },
        );

        const onzefritthreeimageleftgetintouch = gsap.timeline({
          scrollTrigger: {
            trigger: '.sixthsection  .gradient-purple',
            start: 'top top',
            end: 'bottom top',
            // onEnter: () => document.body.classList.add('scrolled'),
            // onEnterBack: () => document.body.classList.add('scrolled'),
          },
        });

        onzefritthreeimageleftgetintouch
          .fromTo(
            firstItemgetintouch,
            {left: '-50vw', rotation: 0, opacity: 0},
            {
              left: '-9vw',
              opacity: 1,
              duration: 1,
            },
          )
          .to(firstItemgetintouch, {
            rotation: -8,
            duration: 1,
            delay: 1,
          });

        const onzefritthreeimagerightgetintouch = gsap.timeline({
          scrollTrigger: {
            trigger: '.sixthsection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        onzefritthreeimagerightgetintouch
          .fromTo(
            lastItemgetintouch,
            {right: '-50vw', rotation: 0, opacity: 0},
            {
              right: '-9vw',
              opacity: 1,
              duration: 1,
            },
          )
          .to(lastItemgetintouch, {
            rotation: 8,
            duration: 1,
            delay: 1,
          });
      };

      // GSAP animation for mobile
      const animateMobilegetintouch = () => {
        // Kill existing animations
        if (animateDesktopTimeline) animateDesktopTimeline.scrollTrigger.kill();

        const mobileTimelineCenter = gsap.timeline({
          scrollTrigger: {
            trigger: '.sixthsection .wrappertest',
            start: 'top top',
            end: 'bottom top',
          },
        });

        mobileTimelineCenter.fromTo(
          middleItemgetintouch,
          {bottom: '-30vh', rotation: 0, opacity: 0},
          {
            bottom: '0vh',
            duration: 0.7,
            opacity: 1,
          },
        );

        const mobileTimelineLeft = gsap.timeline({
          scrollTrigger: {
            trigger: '.sixthsection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        mobileTimelineLeft
          .fromTo(
            firstItemgetintouch,
            {left: '-30vw', rotation: 0, opacity: 0},
            {
              left: '0vw',
              opacity: 1,
              duration: 0.7,
            },
          )
          .to(firstItemgetintouch, {
            rotation: -4,
            duration: 0.7,
            delay: 1,
          });

        const mobileTimelineRight = gsap.timeline({
          scrollTrigger: {
            trigger: '.sixthsection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        mobileTimelineRight
          .fromTo(
            lastItemgetintouch,
            {right: '-30vw', rotation: 0, opacity: 0},
            {
              right: '0vw',
              opacity: 1,
              duration: 0.7,
            },
          )
          .to(lastItemgetintouch, {
            rotation: 4,
            duration: 0.7,
            delay: 1,
          });
      };

      // Execute appropriate animation based on the device
      if (mobileMediaQuerygetintouch.matches) {
        animateMobilegetintouch();
      } else {
        animateDesktopgetintouch();
      }
    });

    const textContent = 'lekkerste friet van Amsterdam!';
    const textLength = textContent.length;
    const duration = textLength * 0.05;
    gsap.fromTo(
      '#animated-text',
      {text: ''},
      {
        text: textContent,
        duration: duration,
        ease: 'none',
        delay: 2,
        scrollTrigger: {
          trigger: '.whitewithvideomainbox',
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none none',
        },
      },
    );

    // gsap.fromTo(
    //   '.likeimagelist img',
    //   {y: -50, opacity: 0},
    //   {
    //     y: 0,
    //     opacity: 1,
    //     stagger: 0.2,
    //     duration: 1,
    //     ease: 'bounce.out',
    //     force3D: true,
    //     yoyo: true,
    //     scrollTrigger: {
    //       trigger: '#section6 .wrappertest',
    //       start: 'top top',
    //       end: 'top top',
    //       pin: true,
    //       once: true,
    //       markers: false,
    //     },
    //   },
    // );

    gsap.to('.likeimagelist img', {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut',
    });

    /* other text and section animation end */
  }, [getIntouch]);

  /* accordian start */
  const toggleAccordion = (e) => {
    const trigger = e.currentTarget;
    const content = trigger.nextElementSibling;
    document.querySelectorAll('.accordion-content').forEach((accordion) => {
      if (accordion !== content) {
        gsap.to(accordion, {
          height: 0,
          duration: 0.5,
          onComplete: () => (accordion.style.display = 'none'),
        });
        accordion.classList.remove('show');
        trigger.classList.remove('active');
      }
    });
    document.querySelectorAll('.accordion-header').forEach((item) => {
      if (item !== trigger) {
        item.classList.remove('active');
      }
    });
    if (content.classList.contains('show')) {
      gsap.to(content, {
        height: 0,
        duration: 0.5,
        onComplete: () => (content.style.display = 'none'),
      });
      content.classList.remove('show');
      trigger.classList.remove('active');
    } else {
      content.style.display = 'block';
      let contentHeight = content.scrollHeight;
      gsap.fromTo(content, {height: 0}, {height: contentHeight, duration: 0.5});
      content.classList.add('show');
      trigger.classList.add('active');
    }
  };
  /* accordian end */

  useEffect(() => {
    const fetchData_Getintouch = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "getintouch" && language == $lang]`,
          {lang: language},
        );
        console.log('Fetched ongetintouch Data:', data);
        setGetIntouch(data[0]);
      } catch (err) {
        console.error('Error fetching ongetintouch data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData_Getintouch();
  }, [language]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!getIntouch) return null;

  const {contactSection, contentSection, transitionSection} = getIntouch;

  return (
    <section className="panel sixthsection" id="section6">
      <div className="wrapper-getintouch">
        <div className="bannersectinlogo">
          {getIntouch.logoImage && (
            <img src={getImageUrl(getIntouch.logoImage.asset._ref)} alt="Logo" />
          )}
        </div>
        <div className="wrappermain">
          {getIntouch.transitionSection && (
            <img className="media" src={getImageUrl(getIntouch.transitionSection.image.asset._ref)} alt="Logo" width="10" height="10"/>
          )}
        </div>
        <div className="roundimages">
          <div className="roundtext-getintouch">
            <h2>{transitionSection.topTitle}</h2>
            <h3>{transitionSection.bottomTitle}</h3>
          </div>
          <div className="roundimage-getintouch"></div>
          <div className="scroll-down">
            <div className="icon-scroll"></div>
            <p>Scroll down</p>
          </div>
        </div>
      </div>
      <div className="wrappertest">
        <section className="section hero"></section>
        <div className="gradient-purple" id="onzefriendescriptiononzefriet">
          <div className="likeimagelist">
            <img src={liek_1} />
            <img src={liek_2} />
            <img src={liek_3} />
            <img src={liek_4} />
          </div>

          <h4
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="onzefrienttitle"
          >
            {contentSection.heading}
          </h4>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="onzefriendescription"
          >
            {contentSection.description}
          </p>
          <div className="gradient-threebox gradient-threeboxgetintouch">
            <ul
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              {/* {contentSection.mobileImages.map((img) => (
                <li key={img._key} className='gradientgetintouchlist'>
                  <img src={getImageUrl(img.image.asset._ref)} alt="" />
                </li>
              ))} */}

              <li
                style={{
                  backgroundImage: `url(${backgroundImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="gradientgetintouchlist"
              >
                <iframe
                  title="tiktok"
                  src="https://www.tiktok.com/player/v1/7423012263239388449?autoplay=1"
                  muted
                  allow="autoplay"
                  loop
                ></iframe>
              </li>

              <li
                style={{
                  backgroundImage: `url(${backgroundImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="gradientgetintouchlist"
              >
                <iframe
                  title="tiktok"
                  src="https://www.tiktok.com/player/v1/7405587642248662304?autoplay=1"
                  muted
                  allow="autoplay"
                  loop
                ></iframe>
              </li>

              <li
                style={{
                  backgroundImage: `url(${backgroundImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="gradientgetintouchlist"
              >
                <iframe
                  title="tiktok"
                  src="https://www.tiktok.com/player/v1/7359908172418665761?autoplay=1"
                  muted
                  allow="autoplay"
                  loop
                ></iframe>
              </li>
            </ul>

            <div className="lefttiktoktext">
              <img
                src={arrow_blue_2}
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                className="swingsd"
              />
              <p data-aos="fade-up" data-aos-easing="ease-out-cubic">
                {contentSection.mobileImages[0].leftText}
              </p>
            </div>

            <div className="righttiktoktext">
              <img
                src={arrow_blue_1}
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                className="swingsd"
              />
              <p data-aos="fade-up" data-aos-easing="ease-out-cubic">
                {contentSection.mobileImages[0].rightText}
              </p>
            </div>
          </div>
          <div className="whitebgbox">
            <div className="appcontainers">
              <div className="socialtitle">
                <h3
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {contentSection.socialMedia?.title}
                </h3>
              </div>
              <div className="socialiconlist">
                <ul
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {Object.entries(contentSection.socialMedia || {}).map(
                    ([platform, url]) =>
                      platform !== 'title' && (
                        <li key={platform}  className={
                          platform.charAt(0).toUpperCase() +
                          platform.slice(1)
                        }>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={platform}
                            className={
                              platform.charAt(0).toUpperCase() +
                              platform.slice(1)
                            }
                          ></a>
                        </li>
                      ),
                  )}
                </ul>
              </div>

              <div className='whatsappbuttonarrow'>
              <img
                src={arrow_blue_1}
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                className="swingsd"
              />
              <div
                className="bottomwhatsapp"
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                {contactSection.contactDetails.whatsAppLabel && (
                  <div key="whatsapp">
                    <a
                      href={contactSection.contactDetails.whatsAppLabel}
                      target="_blank"
                      aria-label="whatsapp"
                      rel="noopener noreferrer"
                      className="Whatsappbtn"
                    >
                      <svg
                        height="800px"
                        width="800px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 308 308"
                        xmlSpace="preserve"
                      >
                        <g id="XMLID_468_">
                          <path
                            id="XMLID_469_"
                            d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
                              c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
                              c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
                              c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
                              c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
                              c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
                              c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
                              c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
                              c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
                              C233.168,179.508,230.845,178.393,227.904,176.981z"
                          ></path>
                          <path
                            id="XMLID_470_"
                            d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
                              c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
                              c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
                              M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
                              l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
                              c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
                              C276.546,215.678,222.799,268.994,156.734,268.994z"
                          ></path>
                        </g>
                      </svg>

                      {contactSection.contactDetails.whatsAppLabel}
                    </a>
                  </div>
                )}
              </div>
              </div>
              <h4
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                className="onlydesktop"
              >
                {contactSection.heading}
              </h4>
              <div className="whitewithvideomainboxss">
                <div
                  className="leftvideobox"
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-offset="500"
                  data-aos-duration="500"
                >
                  <h4
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    className="onlymobile"
                  >
                    {contactSection.heading}
                  </h4>

                  <div className="leftvideoboxinner">
                    <Contactform/>
                  </div>
                </div>
                <div
                  className="righttextbox"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-offset="500"
                  data-aos-duration="500"
                >
                  <h3
                    id="animated-text"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    {contactSection.contactDetails.title}
                  </h3>
                  {contactSection.contactDetails.whatsAppLabel && (
                    <div
                      key="whatsapp"
                      data-aos="fade-up"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      <a
                        href={contactSection.contactDetails.whatsAppLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Whatsappbtn"
                      >
                        <svg
                          height="800px"
                          width="800px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 308 308"
                          xmlSpace="preserve"
                        >
                          <g id="XMLID_468_">
                            <path
                              id="XMLID_469_"
                              d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
                              c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
                              c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
                              c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
                              c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
                              c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
                              c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
                              c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
                              c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
                              C233.168,179.508,230.845,178.393,227.904,176.981z"
                            ></path>
                            <path
                              id="XMLID_470_"
                              d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
                              c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
                              c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
                              M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
                              l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
                              c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
                              C276.546,215.678,222.799,268.994,156.734,268.994z"
                            ></path>
                          </g>
                        </svg>
                        {contactSection.contactDetails.whatsAppLabel}
                      </a>
                    </div>
                  )}
                  <ul className="emailtelbox">
                    <li
                      data-aos="fade-up"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      <i className="tele">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                          fill="none"
                        >
                          <path
                            d="M2.49296 0L8.49752 0.217288C9.76226 0.263043 10.8846 1.06171 11.3694 2.26083L13.1448 6.653C13.558 7.67511 13.4468 8.84129 12.8484 9.76194L10.5737 13.2619C11.9205 15.1958 15.5837 19.727 19.4626 22.3794L22.3548 20.5994C23.0899 20.147 23.97 20.0126 24.8018 20.2258L30.5515 21.7003C32.0808 22.0925 33.1112 23.559 32.9904 25.171L32.6213 30.0935C32.4916 31.8209 31.0779 33.1763 29.3997 32.9813C7.24753 30.4055 -5.74292 -4.94998e-05 2.49296 0Z"
                            fill="#0D1E4D"
                          />
                        </svg>
                      </i>
                      Telephone | <a href={`tel:${contactSection.contactDetails?.telephone}`}>{contactSection.contactDetails?.telephone}</a>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      <i className="tele">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_887_340)">
                            <mask
                              id="mask0_887_340"
                              style={{maskType: 'luminance'}}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="39"
                              height="39"
                            >
                              <path d="M39 0H0V39H39V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_887_340)">
                              <path
                                d="M32.5 6.5H6.5C4.7125 6.5 3.26625 7.9625 3.26625 9.75L3.25 29.25C3.25 31.0375 4.7125 32.5 6.5 32.5H32.5C34.2875 32.5 35.75 31.0375 35.75 29.25V9.75C35.75 7.9625 34.2875 6.5 32.5 6.5ZM32.5 13L19.5 21.125L6.5 13V9.75L19.5 17.875L32.5 9.75V13Z"
                                fill="#0D1E4D"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_887_340">
                              <rect width="39" height="39" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </i>
                      Email | <a href={`mailto:${contactSection.contactDetails?.email}`}>{contactSection.contactDetails?.email}</a>
                    </li>
                  </ul>
                  <div
                    className="locationbox"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    <h6
                      data-aos="fade-up"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      Locaties
                    </h6>
                    <ul>
                      {contactSection.contactDetails.locations?.length > 0 ? (
                        contactSection.contactDetails.locations.map(
                          (location) => (
                            <li
                              data-aos="fade-up"
                              data-aos-easing="ease-out-cubic"
                              data-aos-duration="2000"
                              key={location._key}
                            >
                              <p>
                                <i className="location">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="49"
                                    height="49"
                                    viewBox="0 0 49 49"
                                    fill="none"
                                  >
                                    <g clipPath="url(#clip0_887_348)">
                                      <path
                                        d="M24.5 3.0625C20.0344 3.06793 15.7533 4.84428 12.5957 8.00192C9.43805 11.1596 7.6617 15.4407 7.65627 19.9062C7.65099 23.5556 8.8432 27.1059 11.05 30.0125C11.05 30.0125 11.5094 30.6166 11.5832 30.7042L23.7373 45.038C24.1367 45.509 24.8633 45.509 25.2627 45.038L37.4222 30.6976C37.4874 30.6194 37.9123 30.0615 37.9477 30.015C37.9495 30.0127 37.9508 30.0107 37.9524 30.0082C40.1578 27.1027 41.3492 23.554 41.3438 19.9062C41.3383 15.4407 39.562 11.1596 36.4044 8.00192C33.2467 4.84428 28.9656 3.06793 24.5 3.0625ZM24.5 26.0312C23.2886 26.0312 22.1044 25.672 21.0972 24.999C20.0899 24.326 19.3048 23.3694 18.8413 22.2502C18.3777 21.131 18.2564 19.8995 18.4927 18.7113C18.729 17.5232 19.3124 16.4318 20.169 15.5752C21.0256 14.7186 22.117 14.1353 23.3051 13.8989C24.4932 13.6626 25.7248 13.7839 26.844 14.2475C27.9632 14.7111 28.9197 15.4961 29.5928 16.5034C30.2658 17.5106 30.625 18.6948 30.625 19.9062C30.6232 21.5301 29.9773 23.087 28.829 24.2353C27.6808 25.3835 26.1239 26.0294 24.5 26.0312Z"
                                        fill="#0D1E4D"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_887_348">
                                        <rect
                                          width="49"
                                          height="49"
                                          rx="1"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </i>
                                {location.address}
                              </p>
                            </li>
                          ),
                        )
                      ) : (
                        <p>No locations available.</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="main-accordian">
                <h6
                  data-aos="fade-down"
                  ddata-aos-easing="linear"
                  data-aos-duration="500"
                >
                  {contactSection.contactDetails?.faqSection?.heading}
                </h6>

                <div
                  className="accordion-container"
                  data-aos="fade-down"
                  ddata-aos-easing="linear"
                  data-aos-duration="500"
                >
                  {contactSection.contactDetails?.faqSection?.faq?.length >
                  0 ? (
                    contactSection.contactDetails.faqSection.faq.map((faq) => (
                      <div className="accordion-item" key={faq._key}>
                        <button
                          className="accordion-header"
                          onClick={toggleAccordion}
                        >
                          {faq.question}
                          <span className="icon"></span>
                        </button>
                        <div className="accordion-content">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No FAQs available.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="overlaybannehand-bottoms"></div>
          </div>
        </div>
      </div>
      <Newfooter />
    </section>
  );
};

export default Getintouch;
