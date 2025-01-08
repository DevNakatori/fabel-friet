import React, {useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzelocations.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Autoplay} from 'swiper/modules';
import {getImageUrl} from '../js/imagesurl';
import mainbannerbg from '../assets/resizeimgs/webp/8bdb17523f8d73487022194d9774c1d3.webp';
import Onzelocaties_leftone from '../assets/resizeimgs/webp/Rectangle48.webp';
import Onzelocaties_lefttwo from '../assets/resizeimgs/webp/Rectangle62.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzelocaties = () => {
  const {language} = useLanguage();
  const [onzelocaties, setOnzelocaties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timelines = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3 .wrapper-onzelocation',
        start: 'center center',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        markers: false,
        smoothTouch: 0.1,
      },
    });

    timelines.to(
      '#section3 .roundimage-onzelocation, #section3 .roundtext-onzelocation',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      0,
    );

    timelines.to('.thirdesection .wrappertest', {
      scrollTrigger: {
        trigger: '.thirdesection',
        start: '10% 10%',
        end: '35% 35%',
        scrub: true,
        once: false,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelines.to(
      '#section3 .section.hero',
      {
        scale: 2.5,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );
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
          console.log('Fetched onzelocatiesData Data:', data);
          localStorage.setItem(
            `onzelocatiesData_${language}`,
            JSON.stringify(data),
          );

          setOnzelocaties(data);
          //console.log('Fetched onzelocatiesData Data:', data);
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

  useEffect(() => {
    const animateButton = (e) => {
      e.preventDefault();
      const button = e.target;
      button.classList.remove('animate');
      button.classList.add('animate');
      setTimeout(() => button.classList.remove('animate'), 400);
    };
    const bubblyButtons = document.getElementsByClassName('bubbly-button');
    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton);
    }
  }, [onzelocaties]);

  useEffect(() => {
    let typeSplitlocationtitle = new SplitType('[data-locationtitle]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    var charslocationtitle = typeSplitlocationtitle.chars;
    gsap.from('[data-locationtitle] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-locationtitle]',
      },
      onUpdate: function () {
        charslocationtitle.forEach((typeSplitlocationtitle) => {
          typeSplitlocationtitle.style.backgroundImage =
            "url('/assets/plain-gold-background-C9ahylQT.webp')";
          typeSplitlocationtitle.style.webkitBackgroundClip = 'text';
          typeSplitlocationtitle.style.webkitTextFillColor = 'transparent';
          typeSplitlocationtitle.style.backgroundPosition = '97px -83px';
        });
      },
    });

    // const typeSplitlocationdescription = new SplitType(
    //   '[data-locationdescription]',
    //   {
    //     types: 'lines, words, chars',
    //     tagName: 'span',
    //   },
    // );

    // gsap.from('[data-locationdescription] .word', {
    //   y: '100%',
    //   opacity: 0,
    //   duration: 0.45,
    //   ease: 'none.inOut',
    //   stagger: 0.1,
    //   scrollTrigger: {
    //     trigger: '[data-locationdescription]',
    //     start: 'top center',
    //     once: true
    //   },
    // });

    let revealContainers = document.querySelectorAll('.reveal');

    revealContainers.forEach((container) => {
      let image = container.querySelector('.reveal img');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      tl.set(container, {autoAlpha: 1});
      tl.from(container, 1.5, {
        xPercent: 0,
        ease: 'Power2.out',
      });
      tl.from(image, 1.5, {
        xPercent: -100,
        scale: 1.3,
        delay: -1.5,
        ease: 'Power2.out',
      });
    });
  }, [onzelocaties]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="panel thirdesection" id="section3">
      {onzelocaties.map((locationData) => (
        <div key={locationData._id}>
          <div className="wrapper-onzelocation">
            {/* <div className="bannersectinlogo">
              <img
                src={getImageUrl(locationData.logoImage.asset._ref)}
                alt="Logo"
                width="10"
                height="10"
                data-aos="fade"
                data-aos-easing="linear"
                data-aos-duration="4500"
              />
            </div> */}
            <div className="wrappermain">
              <img
                className="media"
                src={getImageUrl(
                  locationData.transitionSection.image.asset._ref,
                )}
                alt={locationData.transitionSection.image.alt}
                width="10"
                height="10"
              />
            </div>

            <div className="roundimages">
              <div className="roundtext-onzelocation">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: locationData.transitionSection.topTitle,
                  }}
                />
                <h3
                  dangerouslySetInnerHTML={{
                    __html: locationData.transitionSection.bottomTitle,
                  }}
                />
              </div>
              <div className="roundimage-onzelocation"></div>
              <div className="scroll-down">
                <div className="icon-scroll"></div>
                <p>Scroll down</p>
              </div>
              {/* <div className="scroll-down">
                <div className="c-scroll-icon">
                  <div className="c-scroll-icon-line-mask">
                    <div className="c-scroll-icon-line"></div>
                  </div>
                  <div className="c-scroll-icon-triangle">
                    <div className="c-scroll-icon-triangle-mask first">
                      <div className="c-scroll-icon-triangle-line first"></div>
                    </div>
                    <div className="c-scroll-icon-triangle-mask right">
                      <div className="c-scroll-icon-triangle-line right"></div>
                    </div>
                    <div className="c-scroll-icon-triangle-mask left">
                      <div className="c-scroll-icon-triangle-line left"></div>
                    </div>
                    <div className="c-scroll-icon-triangle-mask last">
                      <div className="c-scroll-icon-triangle-line last"></div>
                    </div>
                  </div>
                </div>
                <p>Scroll down</p>
              </div> */}
            </div>
          </div>
          <div className="wrappertest">
            <section className="section hero"></section>
            <div className="gradient-purple" id="locationtiononzefriet">
              <h4
                className="locationtitle"
                data-locationtitle=""
                dangerouslySetInnerHTML={{
                  __html: locationData.contentSection.heading,
                }}
              />
              <p
                className="locationescription onlydesktop"
                data-aos="fade-down"
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
                  <div className="onlymobile slideraddress">
                    <Swiper
                      loop={true}
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
                                  dangerouslySetInnerHTML={{__html: loc.info}}
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
                      {/* <div className="swiper-scrollbar"></div> */}
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
                  {/* mobile location slider */}

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
                            dangerouslySetInnerHTML={{__html: loc.info}}
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
                </div>
                <div className="overlaybannehand-bottoms"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Onzelocaties;
