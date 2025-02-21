import React, { useEffect, useState, useRef } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzelocations.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { getImageUrl } from '../js/imagesurl';
import images from '../js/images';
import { useMediaQuery } from '@react-hook/media-query';
import ZoomSection from '~/components/ZoomSection';
import alltitleAnimation from '../js/alltitleAnimation.js';
import alldescription from '../js/alldescription.js';
import allinnerlinedescriptn from '../js/allinnerlinedescriptn.js';
gsap.registerPlugin(ScrollTrigger, SplitText);
/* --------------------------------------------------------------------------------------------------------------------- */
const Onzelocaties = () => {
  const { language } = useLanguage();
  const [dataLoadedlocaties, setDataLoadedlocaties] = useState(false);
  const [onzelocaties, setOnzelocaties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktop = useMediaQuery('(max-width: 767px)');
  const wrapperRefonzelocaties = useRef(null);
  const imgRefonzelocaties = useRef(null);
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* fatch data start */
  useEffect(() => {
    const fetchDataOnzelocaties = async () => {
      const cachedData = localStorage.getItem(`onzelocatiesData_${language}`);
      //console.log('onzelocatiesData C Data:', cachedData);

      if (cachedData) {
        setOnzelocaties(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "onzelocaties" && language == $lang]`,
            { lang: language },
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
  /* fatch data end */
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (onzelocaties) {
      const timelines = gsap.timeline({});
      timelines.to('.thirdesection .wrappertest', {
        scrollTrigger: {
          trigger: '.thirdesection',
          start: '0% 0%',
          end: '8% 8%',
          scrub: true,
          once: false,
        },
        borderRadius: '0vw 0vw 0px 0px',
        ease: 'power1.inOut',
      });
      timelines.to(
        '#section3 .gradient-purple',
        {
          scale: 1,
          borderRadius: 0,
          ease: 'power3.easeIn',
          scrollTrigger: {
            trigger: '#section3 .wrappertest',
            start: 'top top-100',
            end: 'top top-300',
          },
        },
        0,
      );
      return () => {
        if (timelines.scrollTrigger) 
          {
            timelines.scrollTrigger.kill();
          }  
      };
    }
  }, [onzelocaties]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* gold title start */
  useEffect(() => {
    if (onzelocaties) {
      alltitleAnimation();
      alldescription();
      allinnerlinedescriptn();
    }
  }, [onzelocaties]);
  /* gold title start */
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    const animateButton = (e) => {
      e.preventDefault();
      const button = e.target;
      const link = button.closest('a');
      button.classList.remove('animate');
      button.classList.add('animate');
      setTimeout(() => {
        button.classList.remove('animate');
        if (link) {
          window.open(link.href, '_blank');
        }
      }, 400);
    };
    const bubblyButtons = document.getElementsByClassName('bubbly-button');
    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton);
    }
  }, [onzelocaties]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    const revealContainers = document.querySelectorAll('.reveal');
    revealContainers.forEach((containerlocaltion) => {
      let location = containerlocaltion.querySelector('.reveal img');
      let tllocation = gsap.timeline({
        scrollTrigger: {
          trigger: containerlocaltion,
          start: 'top bottom',
          end: 'bottom top',
        },
      });
      tllocation.set(containerlocaltion, { autoAlpha: 1 });
      tllocation.from(containerlocaltion, 1.5, {
        xPercent: 0,
        ease: 'Power2.out',
      });
      tllocation.from(location, 1.5, {
        xPercent: -100,
        scale: 1.3,
        delay: -1.5,
        ease: 'Power2.out',
      });
    });
  }, [onzelocaties]);
/* --------------------------------------------------------------------------------------------------------------------- */
  if (loading)
    return (
      <div>
        <div className="loadersite">
          <div className="logosvg">
            <img src={images.bannerlogo} alt="logo" />
          </div>
          <div className="loader1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <section className="panel thirdesection" id="section3">
      {onzelocaties.map((locationData) => (
        <div key={locationData._id}>
          <ZoomSection
            image={getImageUrl(
              locationData.transitionSection.image.asset._ref,
            )}
            alt={locationData.transitionSection.image.alt}
            h2Text={locationData.transitionSection.topTitle}
            h3Text={locationData.transitionSection.bottomTitle}
          />
          <div className="wrappertest">
            <div className="gradient-purple" id="locationtiononzefriet">
              <h4
                className="locationtitle"
                data-title=""
                data-speed="auto"
                dangerouslySetInnerHTML={{
                  __html: locationData.contentSection.heading,
                }}
              />
              <p
                className="locationescription onlydesktop"
                data-description=""
                data-speed="auto"
                dangerouslySetInnerHTML={{
                  __html: locationData.contentSection.description,
                }}
              />

              <div
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                <a
                  href=""
                  className="locatebutton onlydesktop bubbly-button swipe-effect"
                >
                  {locationData.contentSection.btn_label}
                </a>
              </div>

              {/* mobile location slider */}
              <div className="whitebgbox ">
                <div className="appcontainers">
                  {isDesktop ? (
                    <>
                      <div className="onlymobile slideraddress">
                        <Swiper
                          loop={false}
                          scrollbar={{
                            hide: true,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          slidesPerView={1}
                          centeredSlides={false}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              spaceBetween: 10,
                              slidesPerView: 1,
                              centeredSlides: false,
                              loop: true,
                            },
                            768: {
                              slidesPerView: 1,
                              spaceBetween: 30,
                              centeredSlides: false,
                            },
                            1024: {
                              slidesPerView: 1,
                              spaceBetween: 30,
                              centeredSlides: false,
                            },
                          }}
                          modules={[Pagination]}
                          className="mySwiper"
                        >
                          {locationData.locationSection.location.map((loc) => (
                            <SwiperSlide key={loc._key}>
                              <div
                                className="module"
                                data-aos="fade"
                                ddata-aos-easing="linear"
                                data-aos-offset="500"
                                data-aos-duration="500"
                              >
                                <div className="wharpeoplebox">
                                  <h5
                                    data-aos="fade-up"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000"
                                  >
                                    {loc.locationName}
                                  </h5>

                                  <div className="sliderwhitebg">
                                    <img
                                      src={getImageUrl(loc.image.asset._ref)}
                                      alt={loc.image.alt}
                                      width="10"
                                      height="10"
                                    />
                                    <h4>Opening hours</h4>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: loc.info,
                                      }}
                                    />
                                    <div className="locationmaoaddress">
                                      <div className="locationicon">
                                        <i className="mapicon"></i>
                                      </div>
                                      <div className="locationaddtext">
                                        <ul>
                                          <li
                                            dangerouslySetInnerHTML={{
                                              __html: loc.address,
                                            }}
                                          />
                                        </ul>
                                      </div>
                                    </div>

                                    <a
                                      href={loc.btn_link}
                                      className="routbtn bubbly-button swipe-effect"
                                    >
                                      <span>{loc.btn_label}</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}

                          <div className="swiper-pagination"></div>
                        </Swiper>

                        <p className="siwprtext">
                          Swipe to see the locations{' '}
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="10"
                              viewBox="0 0 22 10"
                              fill="none"
                            >
                              <path
                                d="M1 5L21 5M21 5L13.2222 1M21 5L13.2222 9"
                                stroke="#EFEBE7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </i>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {locationData.locationSection.location.map((loc) => (
                        <div className="onlydesktop" key={loc._key}>
                          <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                              <div className="reveal">
                                <img
                                  src={getImageUrl(loc.image.asset._ref)}
                                  alt={loc.image.alt}
                                  width="10"
                                  height="10"
                                  className="whitewithvideomainboximg"
                                />
                              </div>
                            </div>
                            <div
                              className="righttextbox"
                              data-aos="fade-right"
                              data-aos-easing="ease-in-sine"
                              data-aos-duration="500"
                            >
                              <h5
                                data-aos="fade-up"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000"
                              >
                                {loc.locationName}
                              </h5>
                              <div
                                className="locationmaoaddress"
                                data-aos="fade-up"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000"
                              >
                                <div className="locationicon">
                                  <i className="mapicon bouncemap"></i>
                                </div>
                                <div className="locationaddtext">
                                  <ul>
                                    <li
                                      dangerouslySetInnerHTML={{
                                        __html: loc.address,
                                      }}
                                    />
                                  </ul>
                                </div>
                              </div>

                              <p
                                data-aos="fade-up"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000"
                                dangerouslySetInnerHTML={{ __html: loc.info }}
                              />

                              <a
                                href={loc.btn_link}
                                target="_blank"
                                className="routbtn bubbly-button swipe-effect"
                                data-aos="fade-up"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000"
                              >
                                {loc.btn_label}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className="overlaybannehand-bottomss">
                  <img src={images.bottompotetoes} />
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
