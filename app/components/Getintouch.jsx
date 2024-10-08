import React, {useRef, useEffect, useState} from 'react';
import gsap from 'gsap';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import Newfooter from '~/components/Newfooter';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {getImageUrl} from '../js/imagesurl';
import SplitText from 'gsap/SplitText';
import '../styles/getintouch.css';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/d4f1c7ef00981f46b3a68aed3d06dc01-min.png';

import facebookIcon from '../assets/resizeimgs/fb.png';
import instagramIcon from '../assets/resizeimgs/insta.png';
import linkedinIcon from '../assets/resizeimgs/in.png';
import twitterIcon from '../assets/resizeimgs/twitter.png';
import tiktokIcon from '../assets/resizeimgs/tiktok.png';

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
        markers: false,
      },
    });
    timelinegetintouch.to(
      '.roundimage-getintouch, .roundtext-getintouch',
      {
        scale: 4,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
        zIndex: 5,
      },
      0,
    );

    timelinegetintouch.to('.sixthsection .wrappertest', {
      scrollTrigger: {
        trigger: '.sixthsection',
        start: '20% 20%',
        end: '40% 40%',
        scrub: true,
        once: false,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelinegetintouch.to(
      '.section.hero',
      {
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );

    return () => {
      timelinegetintouch.scrollTrigger.kill();
    };
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
    const fetchData = async () => {
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
    fetchData();
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
            <img
              src={getImageUrl(getIntouch.logoImage.asset._ref)}
              alt="Logo"
            />
          )}
        </div>
        <div className="wrappermain">
          <img className="media" src={mainbannerbg} alt="Round Image" />
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
          <div className="gradient-threebox">
            <ul
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              {contentSection.mobileImages.map((img) => (
                <li key={img._key}>
                  <img src={getImageUrl(img.image.asset._ref)} alt="" />
                </li>
              ))}
            </ul>
          </div>
          <div className="whitebgbox">
            <div className="socialtitle">
              <h3
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                {contentSection.socialMedia?.title}
              </h3>
            </div>
            <div className="socialiconlist">
              <ul
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                {Object.entries(contentSection.socialMedia || {}).map(
                  ([platform, url]) =>
                    platform !== 'title' && (
                      <li key={platform}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            platform.charAt(0).toUpperCase() + platform.slice(1)
                          }
                        ></a>
                      </li>
                    ),
                )}
              </ul>
            </div>

            <div
              className="bottomwhatsapp"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              {contactSection.contactDetails.whatsAppLabel && (
                <div key="whatsapp">
                  <a
                    href={contactSection.contactDetails.whatsAppLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="Whatsappbtn"
                  >
                    {contactSection.contactDetails.whatsAppLabel}
                  </a>
                </div>
              )}
            </div>
            <h4
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
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
              ></div>
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
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {contactSection.contactDetails.title}
                </h3>
                {contactSection.contactDetails.whatsAppLabel && (
                  <div
                    key="whatsapp"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    <a
                      href={contactSection.contactDetails.whatsAppLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="Whatsappbtn"
                    >
                      {contactSection.contactDetails.whatsAppLabel}
                    </a>
                  </div>
                )}
                <ul className="emailtelbox">
                  <li
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
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
                    Telephone | {contactSection.contactDetails?.telephone}
                  </li>
                  <li
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
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
                        <g clip-path="url(#clip0_887_340)">
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
                    Email | {contactSection.contactDetails?.email}
                  </li>
                </ul>
                <div
                  className="locationbox"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <h5
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    Locaties
                  </h5>
                  <ul>
                    {contactSection.contactDetails.locations?.length > 0 ? (
                      contactSection.contactDetails.locations.map(
                        (location) => (
                          <li
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-center"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000"
                          >
                            <p key={location._key}>
                              <i className="location">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="49"
                                  height="49"
                                  viewBox="0 0 49 49"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_887_348)">
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

            <div
              className="main-accordian"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              <div className="accordion-container">
                <h6
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {contactSection.contactDetails?.faqSection?.heading}
                </h6>
                {contactSection.contactDetails?.faqSection?.faq?.length > 0 ? (
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
            <div className="overlaybannehand-bottoms"></div>
          </div>
        </div>
      </div>
      <Newfooter />
    </section>
  );
};

export default Getintouch;
