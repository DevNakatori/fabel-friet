import React, {useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzelocations.css';

import {getImageUrl} from '../js/imagesurl';

import mainbannerbg from '../assets/resizeimgs/8bdb17523f8d73487022194d9774c1d3.png';

import Onzelocaties_leftone from '../assets/resizeimgs/Rectangle48.png';
import Onzelocaties_lefttwo from '../assets/resizeimgs/Rectangle62.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzelocaties = () => {
  const {language} = useLanguage();
  const [onzelocaties, setOnzelocaties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timelines = gsap.timeline({
      scrollTrigger: {
        trigger: '.wrapper-onzelocation',
        start: 'center center',
        end: '+=150%',
        pin: true,
        scrub: true,
        markers: false,
      },
    });
    timelines.to(
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

    timelines.to('.thirdesection .wrappertest', {
      scrollTrigger: {
        trigger: '.thirdesection',
        start: '20% 20%',
        end: '40% 40%',
        scrub: true,
        once: false,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelines.to(
      '.section.hero',
      {
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );
    timelines.to(
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

    return () => {
      timelines.scrollTrigger.kill();
    };
  }, [onzelocaties]);

  useEffect(() => {
    const fetchDataOnzelocaties = async () => {
      const cachedData = localStorage.getItem(`onzelocatiesData_${language}`);
      //console.log('onzelocatiesData Cached Data:', cachedData);

      if (cachedData) {
        setOnzelocaties(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "onzelocaties" && language == $lang]`,
            {lang: language},
          );
          // console.log('Fetched onzelocatiesData Data:', data);
          localStorage.setItem(
            `onzelocatiesData_${language}`,
            JSON.stringify(data),
          );
          setOnzelocaties(data);
        } catch (err) {
          console.error('Error fetching Onzelocaties data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDataOnzelocaties();
  }, [language]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="panel thirdesection" id="section3">
      {onzelocaties.map((locationData) => (
        <div key={locationData._id}>
          <div className="wrapper-onzelocation">
            <div className="bannersectinlogo">
              <img
                src={getImageUrl(locationData.logoImage.asset._ref)}
                alt={locationData.logoImage.alt}
              />
            </div>
            <div className="wrappermain">
              <img className="media" src={mainbannerbg} alt="" />
            </div>

            <div className="roundimages">
              <div className="roundtext-onzelocation">
                <h2>{locationData.transitionSection.topTitle}</h2>
                <h3>{locationData.transitionSection.bottomTitle}</h3>
              </div>
              <div className="roundimage-onzelocation"></div>
              <div className="scroll-down">
                <div className="icon-scroll"></div>
                <p>Scroll down</p>
              </div>
            </div>
          </div>
          <div className="wrappertest">
            <section className="section hero"></section>
            <div className="gradient-purple" id="locationtiononzefriet">
              <h4
                className="locationtitle"
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                {locationData.contentSection.heading}
              </h4>
              <p
                className="locationescription"
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                {locationData.contentSection.description}
              </p>
              <a
                href="#"
                className="locatebutton"
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                {locationData.contentSection.btn_label}
              </a>
              <div className="whitebgbox">
                {locationData.locationSection.location.map((loc) => (
                  <div key={loc._key}>
                    <div className="whitewithvideomainbox">
                      <div
                        className="leftvideobox"
                        data-aos="fade-left"
                        data-aos-easing="ease-in-sine"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img
                          src={getImageUrl(loc.image.asset._ref)}
                          alt={loc.image.alt}
                        />
                      </div>
                      <div
                        className="righttextbox"
                        data-aos="fade-right"
                        data-aos-easing="ease-in-sine"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <h5
                          data-aos="fade-up"
                          data-aos-anchor-placement="top-center"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000"
                        >
                          {loc.locationName}
                        </h5>
                        <div
                          className="locationmaoaddress"
                          data-aos="fade-up"
                          data-aos-anchor-placement="top-center"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000"
                        >
                          <div className="locationicon">
                            <i className="mapicon"></i>
                          </div>
                          <div className="locationaddtext">
                            <ul>
                              <li>{loc.address}</li>
                            </ul>
                          </div>
                        </div>
                        <p
                          data-aos="fade-up"
                          data-aos-anchor-placement="top-center"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000"
                        >
                          {loc.info}
                        </p>
                        <a
                          href="#"
                          className="routbtn"
                          data-aos="fade-up"
                          data-aos-anchor-placement="top-center"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000"
                        >
                          {loc.btn_label}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
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
        </div>
      ))}
    </section>
  );
};

export default Onzelocaties;
