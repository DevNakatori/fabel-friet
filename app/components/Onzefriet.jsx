import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useMediaQuery } from '@react-hook/media-query';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import FrenchFriesRain from '~/components/FrenchFriesRain';
import SnowAnimation from '~/components/SnowAnimation';
import ZoomSection from '~/components/ZoomSection';
import SplitText from 'gsap/SplitText';
import '../styles/onzefriet.css';
import { getImageUrl } from '../js/imagesurl';
import images from '../js/images';
import toggleAccordion from '../js/accordion.js';
import alltitleAnimation from '../js/alltitleAnimation.js';
import alldescription from '../js/alldescription.js';
import allinnerlinedescriptn from '../js/allinnerlinedescriptn.js';
import titledynamic from '../js/titledynamic.js';
/* --------------------------------------------------------------------------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger, SplitText);
/* --------------------------------------------------------------------------------------------------------------------- */
const Onzefriet = () => {
  const { language } = useLanguage();
  const [onzefriet, setOnzefriet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktopcanvas = useMediaQuery('(max-width: 767px)');
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* fatch data start */
  useEffect(() => {
    const fetchDataonzefriet = async () => {
      const cachedData = localStorage.getItem(`onzefrietData_${language}`);
      //console.log('onzefrietData Cached Data:', cachedData);
      if (cachedData) {
        setOnzefriet(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "onzefriet" && language == $lang]`,
            { lang: language },
          );
          //console.log('Fetched Onzefriet Data:', data);
          localStorage.setItem(
            `onzefrietData_${language}`,
            JSON.stringify(data),
          );
          setOnzefriet(data);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDataonzefriet();
  }, [language]);
  /* fatch data end */
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* round curcule animation start */
  useEffect(() => {
    if (onzefriet) {
      const timelinesonzefriet = gsap.timeline({});
      timelinesonzefriet.to('.secondesection .wrappertest', {
        scrollTrigger: {
          trigger: '.secondesection',
          start: '0 0',
          end: '8% 8%',
          scrub: 1,
          once: false,
        },
        borderRadius: '0vw 0vw 0px 0px',
        //zIndex: 9,
        ease: 'power1.inOut',
      });
      timelinesonzefriet.to(
        '#section2 .gradient-purple',
        {
          scale: 1,
          borderRadius: 0,
          //zIndex: 0,
          ease: 'power3.easeIn',
          scrollTrigger: {
            trigger: '#section2 .wrappertest',
            start: 'top top-100',
            end: 'top top-300',
          },
        },
        0,
      );
      return () => {
        if (timelinesonzefriet.scrollTrigger) {
          timelinesonzefriet.scrollTrigger.kill();
        }
      };
    }
  }, [onzefriet]);
  /* round curcule animation end */
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* accordian start */
  useEffect(() => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header) => {
      header.addEventListener('click', toggleAccordion);
    });
    return () => {
      accordionHeaders.forEach((header) => {
        header.removeEventListener('click', toggleAccordion);
      });
    };
  }, []);
  /* accordian end */
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* gold title start */
  useEffect(() => {
    if (onzefriet) {
      alltitleAnimation();
      alldescription();
      allinnerlinedescriptn();
      titledynamic();
    }
  }, [onzefriet]);
  /* gold title start */
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* three image animation start */
  useEffect(() => {
    if (onzefriet) {
      gsap.set(['.image-wrapper'], {
        xPercent: -50,
        yPercent: -50,
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.img-container',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 2,
          ease: 'power3.inOut',
          once: false,
        },
      });
      timeline
        .to('.image-wrapper:first-child', {
          left: '20%',
          rotation: -5,
          duration: 2,
          ease: 'power3.out',
          scrollEnd: () => {
            gsap.to('.image-wrapper .threeboxleftlogobar', {
              opacity: 1,
              duration: 3,
              ease: 'power3.out',
            });
          },
        })
        .to(
          '.image-wrapper:nth-child(2)',
          {
            left: '50%',
            duration: 2,
            ease: 'power3.out',
            scrollEnd: () => {
              gsap.to('.image-wrapper .threeboxleftlogobar.lastbottomimg ', {
                opacity: 1,
                duration: 3,
                ease: 'power3.out',
              });
            },
          },
          '<',
        )
        .to(
          '.image-wrapper:last-child',
          {
            left: '80%',
            rotation: 5,
            duration: 2,
            ease: 'power3.out',
          },
          '<',
        );
      gsap.fromTo(
        '.image-wrapper .threeboxleftlogobar',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 3,
          scrollTrigger: {
            trigger: '.img-container',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            repeat: 1,
            yoyo: true,
            ease: 'power3.inOut',
          },
        },
      );
    }
  }, [onzefriet]);
  /* three image animation end */
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const isHardRefreshonzeptag = window.performance.navigation.type === 1;
      const animationDelayonzeptag = isHardRefreshonzeptag ? 300 : 300;

      const initiateAnimationsonzeptag = () => {
        const typeSplitvideoDescription = new SplitType('.onzeptag', {
          types: 'lines, words, chars',
          tagName: 'span',
        });

        gsap.from('.onzeptag .line', {
          opacity: 0.3,
          duration: 0.8,
          ease: 'power1.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.whitewithvideomainbox',
            start: 'top 10%',
            end: '40% 40%',
            scrub: true,
            markers: false,
          },
        });
      };

      setTimeout(() => {
        initiateAnimationsonzeptag();
      }, animationDelayonzeptag);

      return () => {
        gsap.killTweensOf('.onzeptag .line');
      };
    }
  }, [onzefriet]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* svg animation start */
  useEffect(() => {
    if (onzefriet) {
      const path = document.querySelector('.line2');
      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: path,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            markers: false,
          },
        });
      }
    }
  }, [onzefriet]);
  /* svg animation end */
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* video left to right start */
  useEffect(() => {
    if (onzefriet) {
      const revealcontaineronze = document.querySelectorAll('.revealvideo');
      revealcontaineronze.forEach((containeonze) => {
        let imageimpactonze = containeonze.querySelector('.revealvideo video');
        let tlimpact = gsap.timeline({
          scrollTrigger: {
            trigger: containeonze,
          },
        });
        tlimpact.set(containeonze, { visibility: 'visible' });
        tlimpact.from(containeonze, 1.5, {
          xPercent: 0,
          ease: 'Power2.out',
        });
        tlimpact.from(imageimpactonze, 1.5, {
          xPercent: -100,
          scale: 1.3,
          delay: -1.5,
          ease: 'Power2.out',
        });
      });
    }
  }, [onzefriet]);
  /* video left to right start */
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
  if (error) return <div>{error}</div>;
  /* --------------------------------------------------------------------------------------------------------------------- */
  return (
    <section className="panel secondesection" id="section2">

      {onzefriet.map((content, idx) => (
        <div key={idx}>
          {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
          <ZoomSection
            image={getImageUrl(content.transitionSection.image.asset._ref)}
            alt={content.transitionSection.image.alt}
            h2Text={content.transitionSection.topTitle}
            h3Text={content.transitionSection.bottomTitle}
          />
          {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
          <div className="wrappertest" /*ref={rainContainerRef}*/>
            <div className="gradient-purple" id="onzefriendescriptiononzefriet">
              {content.contentSection && (
                <>
                  <div className="line">
                    <h4
                      className="onzefrienttitle"
                      data-title=""
                      data-speed="auto"
                      dangerouslySetInnerHTML={{
                        __html: content.contentSection.heading,
                      }}
                    />
                  </div>
                  {isDesktopcanvas ? (
                    <></>
                  ) : (
                    <p
                      className="onzefriendescription"
                      data-description=""
                      data-speed="auto"
                      dangerouslySetInnerHTML={{
                        __html: content.contentSection.description,
                      }}
                    />
                  )}
                </>
              )}
              <div className="gradient-threebox gradient-threeboxonzefritimgli">
                <div className="img-container">
                  {content.contentSection.three_image.map((image, index) => (
                    <div key={image._key} className="image-wrapper">
                      {index === 0 && (
                        <div className="threeboxleftlogobar">
                          <img
                            src={images.fabelfrietsticker2}
                            alt={image.alt}
                            width="10"
                            height="10"
                          />
                        </div>
                      )}
                      {index === 1 && (
                        <div className="threeboxleftlogobar lastbottomimg ">
                          <img
                            src={images.fabelfrie_bottomlogo}
                            alt={image.alt}
                            width="10"
                            height="10"
                          />
                        </div>
                      )}
                      <img
                        src={getImageUrl(image.asset._ref)}
                        alt={image.alt}
                        width="10"
                        height="10"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
              {isDesktopcanvas ? (
                <></>
              ) : (
                // <canvas
                //   className="canvasfries"
                //   ref={canvasRef}
                //   style={{position: 'absolute', top: -100, left: -50}}
                // />
                // <FrenchFriesRain />
                <SnowAnimation />
              )}
              {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
              <div className="whitebgbox">
                <div className="appcontainers">
                  {content.videoSection && (
                    <div className="whitewithvideomainbox">
                      <div className="leftvideobox">
                        <div className="leftlogobar">
                          <img
                            src={images.fabelfrie_tsticker2}
                            alt="img"
                            width="10"
                            height="10"
                          />
                        </div>
                        <div className="revealvideo">
                          <video
                            id="myVideos"
                            src={content.videoSection.videoLink}
                            //src="https://cdn.shopify.com/videos/c/o/v/558eb6d044f040f1ba690ebb9cf79d93.mp4"
                            autoPlay
                            muted
                            playsInline
                            loop
                          />
                        </div>
                      </div>
                      <div className="righttextbox">
                        <h3
                          id="animated-text"
                          data-aos="fade"
                          data-aos-easing="ease-in-sine"
                          data-aos-duration="500"
                          data-aos-mirror="true"
                          data-speed="auto"
                          dangerouslySetInnerHTML={{
                            __html: content.videoSection.videoHandwritingText,
                          }}
                        />
                        <div className="arrowimage">
                          <svg
                            width="100"
                            height="188"
                            viewBox="0 0 100 188"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="line2"
                              d="M9.76839 0.498047C9.76839 0.498047 63.995 0.49778 81.5852 62.2999C83.4375 68.8079 83.6375 74.8642 82.7316 80.2451M82.7316 80.2451C79.143 101.56 58.2007 112.276 53.8611 98.4787C50.6678 88.3259 68.5835 79.1629 82.7316 80.2451ZM82.7316 80.2451C92.6632 81.0048 100.738 86.8132 98.351 100.872C92.5631 134.958 34.2172 111.966 39.9247 140.854C46.0523 171.867 20.3398 180.748 2.33984 185.248M2.33984 185.248C2.33984 185.248 8.44503 184.312 18.0898 186.748M2.33984 185.248C5.83985 181.998 6.39307 181.294 10.3398 172.748"
                              stroke="url(#paint0_linear_1314_561)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1314_561"
                                x1="2.33984"
                                y1="186.748"
                                x2="154.434"
                                y2="107.999"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop
                                  offset="0.000290329"
                                  stopColor="#0F274D"
                                />
                                <stop offset="0.504985" stopColor="#1F314D" />
                                <stop offset="1" stopColor="#0d1e4d" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <h5
                          data-aos="fade"
                          data-aos-easing="ease-in-sine"
                          data-aos-duration="500"
                          dangerouslySetInnerHTML={{
                            __html: content.videoSection.videoHeading,
                          }}
                        />
                        <p
                          className="onzeptag"
                          dangerouslySetInnerHTML={{
                            __html: content.videoSection.videoDescription,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
                  {content.reviewSection && (
                    <div className="whatpeople-section">
                      <h6
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                        data-whatpeoplesection=""
                        dangerouslySetInnerHTML={{
                          __html: content.reviewSection.reviewHeading,
                        }}
                      />
                      <div
                        className="fl-tests"
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                      >
                        <Swiper
                          loop={true}
                          scrollbar={{
                            hide: true,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          grabCursor={true}
                          speed={3000}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              slidesPerView: 2,
                              spaceBetween: 0,
                            },
                            768: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                            1200: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                            1910: {
                              slidesPerView: 5,
                              spaceBetween: 10,
                            },
                          }}
                          modules={[Pagination, Autoplay]}
                          className="mySwiper"
                        >
                          {content.reviewSection.reviews.map((review) => (
                            <SwiperSlide key={review._key}>
                              <div
                                className="module"
                                data-aos="fade"
                                data-aos-easing="linear"
                                data-aos-duration="500"
                              >
                                <div className="wharpeoplebox">
                                  <p >
                                    "{review.reviewContent}"
                                  </p>
                                  <b>- {review.reviewCustName}</b>
                                  <ul className="starrating">
                                    {[...Array(5)].map((_, index) => {
                                      if (
                                        index < Math.floor(review.reviewRating)
                                      ) {
                                        return (
                                          <li key={index}>
                                            <i className="star">
                                            <svg version="1.1" className="bh-star bh-star--1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xmlSpace="preserve"><path className="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"/><polygon className="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"/><polyline className="full"  points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"/></svg>
                                            </i>
                                          </li>
                                        ); // Full star
                                      } else if (
                                        index ===
                                        Math.floor(review.reviewRating) &&
                                        review.reviewRating % 1 !== 0
                                      ) {
                                        return (
                                          <li key={index}>
                                            <i className="halfstar">
                                            <svg version="1.1" className="bh-star bh-star--3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xmlSpace="preserve"><path className="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"></path><polygon className="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"></polygon><polyline className="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"></polyline></svg>
                                            </i>
                                          </li>
                                        ); // Half star
                                      } else {
                                        return (
                                          <li key={index}>
                                            <i className="blackstar">
                                            <svg version="1.1" className="bh-star bh-star--5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xmlSpace="preserve"><path className="outline" d="M12,4.2L14.5,9l0.2,0.5l0.5,0.1l5.5,0.8L16.8,14l-0.4,0.4l0.1,0.5l1,5.3l-5-2.5L12,17.5l-0.4,0.2l-5,2.5L7.5,15l0.1-0.5 L7.2,14l-4-3.7l5.5-0.8l0.5-0.1L9.5,9L12,4.2 M11.9,2L8.6,8.6L1,9.7l5.5,5.1L5.2,22l6.8-3.4l6.8,3.4l-1.3-7.2L23,9.6l-7.6-1L11.9,2 L11.9,2z"></path><polygon className="full" points="18.8,22 12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2 15.4,8.6 23,9.6 17.5,14.7"></polygon><polyline className="left-half" points="12,18.6 5.2,22 6.5,14.8 1,9.7 8.6,8.6 11.9,2"></polyline></svg>
                                            </i>
                                          </li>
                                        ); // Empty star
                                      }
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                          <div className="swiper-pagination"></div>
                        </Swiper>
                      </div>
                    </div>
                  )}
                  {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
                  {content.accordionSection && (
                    <div className="main-accordian">
                      <h6 data-accordionsection="">
                        {content.accordionSection.accordionHeading}
                      </h6>
                      <div
                        className="accordion-container"
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                      >
                        {content.accordionSection.faq.map((faq) => (
                          <div className="accordion-item" key={faq._key}>
                            <button
                              className="accordion-header"
                              onClick={toggleAccordion}
                            >
                              <div className="faqqestion">{faq.question}</div>
                              <span className="icon"></span>
                            </button>
                            <div className="accordion-content">
                              <p>{faq.answer}</p>
                            </div>
                            <div className="borderbottomaccordian"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
                <div className="overlaybannehand-bottomss">
                  <img src={images.bottompotetoes} />
                </div>
                {/* <!-- -------------------------------------------------------------------------------------------------------------------- -> */}
              </div>
            </div>
          </div>
        </div>
      ))}

    </section>
  );
};

export default Onzefriet;
