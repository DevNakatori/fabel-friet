import React, {useRef, useEffect, useState} from 'react';
import gsap from 'gsap';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
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
        start: '30% 30%',
        end: '50% 50%',
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
          <h4 className="onzefrienttitle">{contentSection.heading}</h4>
          <p className="onzefriendescription">{contentSection.description}</p>
          <div className="gradient-threebox">
            <ul>
              {contentSection.mobileImages.map((img) => (
                <li key={img._key}>
                  <img src={getImageUrl(img.image.asset._ref)} alt="" />
                </li>
              ))}
            </ul>
          </div>
          <div className="whitebgbox">
            <div className="socialtitle">
              <h3>{contentSection.socialMedia?.title}</h3>
            </div>
            <div className="socialiconlist">
              <ul>
                {Object.entries(contentSection.socialMedia || {}).map(
                  ([platform, url]) =>
                    platform !== 'title' && (
                      <li key={platform}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      </li>
                    ),
                )}
              </ul>
            </div>

            <h4>{contactSection.heading}</h4>
            <div className="whitewithvideomainboxss">
              <div className="leftvideobox"></div>
              <div className="righttextbox">
                <h3 id="animated-text">{contactSection.title}</h3>
                <ul>
                  <li>Email: {contactSection.contactDetails?.email}</li>
                  <li>Telephone: {contactSection.contactDetails?.telephone}</li>
                </ul>
                <div className="locationbox">
                  <h5>Locaties</h5>
                  <ul>
                    {contactSection.contactDetails.locations?.length > 0 ? (
                      contactSection.contactDetails.locations.map(
                        (location) => (
                          <p key={location._key}>{location.address}</p>
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
              <div className="accordion-container">
                <h6>{contactSection.contactDetails?.faqSection?.heading}</h6>
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

export default Getintouch;
