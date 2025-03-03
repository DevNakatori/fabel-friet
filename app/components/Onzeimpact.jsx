import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import ZoomSection from '~/components/ZoomSection';
import '../styles/onzeimpact.css';
import { getImageUrl } from '../js/imagesurl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import images from '../js/images';
import alltitleAnimation from '../js/alltitleAnimation.js';
import alldescription from '../js/alldescription.js';
import allinnerlinedescriptn from '../js/allinnerlinedescriptn.js';
import titledynamic from '../js/titledynamic.js';
import blutextanimationtext from '../js/blutextanimationtext.js';
import potetoanimation from '../js/potetoanimation.js';
gsap.registerPlugin(ScrollTrigger, SplitText);
import { useMediaQuery } from '@react-hook/media-query';
/* --------------------------------------------------------------------------------------------------------------------- */
const Onzeimpact = () => {
  const { language } = useLanguage();
  const [dataLoadedimpact, setDataLoadedimpact] = useState(false);
  const [onzeimpact, setonzeimpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ismobile = useMediaQuery('(max-width: 767px)');
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchDataonzeimpactData = async () => {
      const cachedData = localStorage.getItem(`onzeimpactData_${language}`);
      //console.log('C fetchDataonzeimpactData Data:', cachedData);
      if (cachedData) {
        setonzeimpact(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "onzeimpact" && language == $lang]`,
            { lang: language },
          );
          //console.log('Fetched fetchDataonzeimpactData Data:', data);
          localStorage.setItem(
            `onzeimpactData_${language}`,
            JSON.stringify(data),
          );
          setonzeimpact(data);
        } catch (err) {
          console.error('Error fetching Onzeimpact data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDataonzeimpactData();
  }, [language]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (onzeimpact) {
      const timelineimpact = gsap.timeline({});

      timelineimpact.to('.fifthesection .wrappertest', {
        zIndex:9,
        scrollTrigger: {
          trigger: '.fifthesection',
          start: '0% 0%',
          end: '8% 8%',
          scrub: true,
          once: false,
        },
        borderRadius: '0vw 0vw 0px 0px',
       // zIndex:9,
        ease: 'power1.inOut',
      });

      timelineimpact.to(
        '#section5 .gradient-purple',
        {
          scale: 1,
          borderRadius: '100vw 100vw 0px 0px',
          //zIndex: 0,
          ease: 'power1.inOut',
          //zIndex:0,
          //ease: 'power3.easeIn',
          scrollTrigger: {
            trigger: '#section5 .wrappertest',
            start: 'top top-100',
            end: 'top top-300',
          },
        },
        0,
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

      return () => {
        if (timelineimpact.scrollTrigger) {
          timelineimpact.scrollTrigger.kill();
        }
      };
    }
  }, [onzeimpact]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (onzeimpact) {
      gsap.set(['.image-wrappers'], {
        xPercent: -50,
        yPercent: -50,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.img-containerss',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 2,
          ease: 'power3.inOut',
          once: false,
        },
      });

      timeline
        .to('.image-wrappers:first-child', {
          left: '20%',
          rotation: -5,
          duration: 2,
          ease: 'power3.out',
          scrollEnd: () => {
            gsap.to('.image-wrappers .threeboxleftlogobar', {
              opacity: 1,
              duration: 3,
              ease: 'power3.out',
            });
          },
        })
        .to(
          '.image-wrappers:nth-child(2)',
          {
            left: '50%',
            duration: 2,
            ease: 'power3.out',
            scrollEnd: () => {
              gsap.to('.image-wrappers .threeboxleftlogobar.lastbottomimg ', {
                opacity: 1,
                duration: 3,
                ease: 'power3.out',
              });
            },
          },
          '<',
        )
        .to(
          '.image-wrappers:last-child',
          {
            left: '80%',
            rotation: 5,
            duration: 2,
            ease: 'power3.out',
          },
          '<',
        );

      gsap.fromTo(
        '.image-wrappers .threeboxleftlogobar',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 3,
          scrollTrigger: {
            trigger: '.img-containerss',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power3.inOut',
          },
        },
      );
    }
  }, [onzeimpact]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* gold title start */
  useEffect(() => {
    if (onzeimpact) {
      alltitleAnimation();
      alldescription();
      allinnerlinedescriptn();
      titledynamic();
      blutextanimationtext();
      potetoanimation();
    }
  }, [onzeimpact]);
  /* gold title start */
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (window.innerWidth >= 1024) {
    const isHardRefreshonzeptagss = window.performance.navigation.type === 1;
    const animationDelayonzeptagss = isHardRefreshonzeptagss ? 0 : 0;

    const initiateAnimationsonzeptagss = () => {
     document.querySelectorAll('.onzeptagssthe')
        .forEach((element) => {
          new SplitType(element, {
            types: 'lines, words, chars',
            tagName: 'span',
          });
        });

        // const typeSplitsecdescriptionss = new SplitType('.onzeptagssthe', {
        //   types: 'lines, words, chars',
        //   tagName: 'span',
        // });
    
      gsap.from('.onzeptagssthe .line', {
        opacity: 0.3,
        duration: 0.2,
        ease: 'power1.out',
        stagger: 0,
        scrollTrigger: {
          id:'whitewithvideomainboxtag',
          trigger: '.appcontainersimpppact',
          scrub: true,
          start: '0% 0%',
          end: '20% 20%',
          markers: false,  
        },
      });
    };


    const typeSplitsecdescription = new SplitType('.hetmenubottom', {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    gsap.from('.hetmenubottom .line', {
      opacity: 0.3,
      duration: 0.3,
      ease: 'power1.out',
      stagger: 0.1,
      scrollTrigger: {
        id:'whitewithvideomainboxs',
        trigger: '.whitewithvideomainboxsimpact',
        scrub: true,
        start: '0% 0%',
        end: '1% 1%',
        markers: false,  
      },
    });

    setTimeout(() => {
      initiateAnimationsonzeptagss();
    }, animationDelayonzeptagss);
    
    return () => {
     gsap.killTweensOf('.onzeptagssthe .line');
     gsap.killTweensOf('.hetmenubottom .line');
   };
  }
  }, [onzeimpact]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (onzeimpact) {
      const pathss = document.querySelector('.line2ss');
      if (pathss) {
        const pathssLength = pathss.getTotalLength();
        gsap.set(pathss, {
          strokeDasharray: pathssLength,
          strokeDashoffset: pathssLength,
        });
        gsap.to(pathss, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: pathss,
            scrub: true,
            markers: false,
          },
        });
      }
    }
  }, [onzeimpact]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    let revealcontainerimpactsimpact = document.querySelectorAll('.reveal');
    revealcontainerimpactsimpact.forEach((containerimpact) => {
      let imageimpact = containerimpact.querySelector('.reveal img');
      let tlimpact = gsap.timeline({
        scrollTrigger: {
          trigger: containerimpact,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      tlimpact.set(containerimpact, { autoAlpha: 1 });
      tlimpact.from(containerimpact, 1.5, {
        xPercent: 0,
        ease: 'Power2.out',
      });
      tlimpact.from(imageimpact, 1.5, {
        xPercent: -100,
        scale: 1.3,
        delay: -1.5,
        ease: 'Power2.out',
      });
    });
  }, [onzeimpact]);
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
  if (!onzeimpact || onzeimpact.length === 0) return <p>No data available</p>;
  const data = onzeimpact[0];
  /* --------------------------------------------------------------------------------------------------------------------- */
  return (
    <section className="panel fifthesection" id="section5">
      <div>
        <ZoomSection
          image={getImageUrl(data.transitionSection.image.asset._ref)}
          alt={data.transitionSection.image.alt}
          h2Text={data.transitionSection.topTitle}
          h3Text={data.transitionSection.bottomTitle}
        />
        {/* --------------------------------------------------------------------------------------------------------------------- */}
        <div className="wrappertest">
          <div className="gradient-purple" id="onzeimpactnonzefriet">
            <h4 className="onzeimpacttitle" data-title="" data-speed="auto">
              {data.contentSection.heading}
            </h4>
            <p
              className="onzeimpactdescription"
              data-description=""
              data-speed="auto"
              dangerouslySetInnerHTML={{
                __html: data.contentSection.description,
              }}
            />
            <div className="gradient-threebox gradient-threeboxonzeimpact whitewithvideomainboxtag">
              <div className="img-containerss">
                {data.imageSection.image.map((img, index) => (
                  <div
                    key={img._key}
                    className="threeboxonzeimpactlist image-wrappers"
                  >
                    {index === 0 && (
                      <div className="threeboxleftlogobar">
                        <img
                          src={images.fabelfrietsticker2}
                          width="10"
                          height="10"
                          alt="img"
                        />
                      </div>
                    )}
                    {index === 1 && (
                      <div className="threeboxleftlogobar lastbottomimg">
                        <img
                          src={images.fabelfrie_bottomlogo}
                          width="10"
                          height="10"
                          alt="img"
                        />
                      </div>
                    )}
                    <img
                      src={getImageUrl(img.image.asset._ref)}
                      alt="Descriptive Alt Text"
                      width="10"
                      height="10"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* --------------------------------------------------------------------------------------------------------------------- */}
            <div className="whitebgbox">
              <div className="appcontainers appcontainersimpppact">
                <div
                  className="qrcodeimagebox"
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <img
                    src={getImageUrl(data.cardSection.qrImage.asset._ref)}
                    alt="QR Code"
                    data-speed="auto"
                    width="10"
                    height="10"
                  />
                </div>
                <div className="whitewithvideomainbox">
                  <div
                    className="leftvideobox"
                    data-aos="fade-left"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="500"
                  >
                    <h4 data-blutextanimationtext="">
                      {data.cardSection.secTitle}
                    </h4>
                  </div>
                  <div
                    className="righttextbox"
                    data-aos="fade-right"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="500"
                  >
                    {ismobile ? (
                      <div className="onlymobile">
                        <ul className="onzeimpacttwolist">
                          <Swiper
                            loop={false}
                            scrollbar={{
                              hide: true,
                            }}
                            pagination={{
                              clickable: true,
                            }}
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                            breakpoints={{
                              640: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                                centeredSlides: true,
                              },
                              768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                                centeredSlides: true,
                              },
                              1024: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                                centeredSlides: true,
                                enabled: false,
                              },
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                          >
                            {data.cardSection.card.map((card) => (
                              <SwiperSlide key={card._key}>
                                <li
                                  data-aos="fade-up"
                                  data-aos-easing="ease-out-cubic"
                                  data-aos-duration="2000"
                                >
                                  <div className="onzeimpacttwolistlist">
                                    <h5
                                      data-aos="fade-up"
                                      data-aos-easing="ease-out-cubic"
                                      data-aos-duration="2000"
                                      dangerouslySetInnerHTML={{
                                        __html: card.cardTitle,
                                      }}
                                    />

                                    <p
                                      data-aos="fade-up"
                                      data-aos-easing="ease-out-cubic"
                                      data-aos-duration="2000"
                                      dangerouslySetInnerHTML={{
                                        __html: card.cardDescription,
                                      }}
                                    />
                                  </div>
                                </li>
                              </SwiperSlide>
                            ))}
                            <div className="swiper-pagination"></div>
                          </Swiper>
                        </ul>
                      </div>
                    ) : (
                      <div className="onlydesktop">
                        <ul className="onzeimpacttwolist">
                          {data.cardSection.card.map((card) => (
                            <li
                              key={card._key}
                              data-aos="fade-up"
                              data-aos-easing="ease-out-cubic"
                              data-aos-duration="2000"
                            >
                              <div className="onzeimpacttwolistlist">
                                <h5
                                  data-blutextanimationtext=""
                                  dangerouslySetInnerHTML={{
                                    __html: card.cardTitle,
                                  }}
                                />

                                <p
                                  className='onzeptagssthe'
                                  dangerouslySetInnerHTML={{
                                    __html: card.cardDescription,
                                  }}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* --------------------------------------------------------------------------------------------------------------------- */}
                <div
                  className="whitewithvideomainboxs whitewithvideomainboxsimpact"
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <div className="leftvideobox">
                    <div className="reveal">
                      <img
                        src={getImageUrl(data.bottomSection.image.asset._ref)}
                        alt="Bottom Section Image"
                        data-speed="auto"
                        width="10"
                        height="10"
                      />
                    </div>
                  </div>
                  <div
                    className="righttextbox"
                    data-aos="fade-right"
                    data-aos-easing="ease-in-sine"
                    data-aos-anchor=".gradient-threebox"
                    data-aos-offset="500"
                    data-aos-duration="500"
                  >
                    <h3
                      data-blutextanimationtext=""
                      dangerouslySetInnerHTML={{
                        __html: data.bottomSection.secTitle,
                      }}
                    />

                    <p
                      className='hetmenubottom'
                      dangerouslySetInnerHTML={{
                        __html: data.bottomSection.secDescription,
                      }}
                    />
                  </div>
                </div>

                <div
                  className="binimageboxmain"

                >
                  <div className="binimageboxieft">
                    <h6
                      data-aos="fade-up"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      {data.bottomSection.sideText}
                    </h6>
                    <div
                      className="binarrowimg"

                    >
                      <div className="arrowimageimpect">
                        <svg
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 165 135"
                        >
                          <path
                            className="line2ss"
                            d="M32.6,106.7c-4.8-2.6-9.5-6.4-13.5-11.8C-19,43.3,14,.5,14,.5M64.6,94.9c8.3,11.8-13,21.9-32,11.7,7.8-11.8,25.9-20.4,32-11.7ZM164.5,107c-14.5,11.5-37.2,26.4-58,2.7-19.4-22.1-36.7,38-67.2,21.8-12.6-6.7-12.2-16.6-6.8-24.9M156.1,120.4c3.9-9.1,8.4-13.4,8.4-13.4M149.7,105.8c9.2,2.1,10,2.1,14.7,1.3"
                            stroke="url(#paint0_linear_1314_561)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1314_561"
                              x1="-24.6"
                              y1="63.4"
                              x2="127.1"
                              y2="141.9"
                              gradientTransform="translate(168.2 96.2) rotate(127.6)"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0.000290329" stopColor="#0F274D" />
                              <stop offset="0.504985" stopColor="#1F314D" />
                              <stop offset="1" stopColor="#0d1e4d" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="binimagebox">
                    <img
                      src={images.bottomdustbin}
                      alt="Bin Imagebox"
                      width="10"
                      height="10"
                    />
                    <img
                      src={images.topdustin}
                      alt="Bin Imagebox"
                      width="10"
                      className="topdustbinimage"
                      height="10"
                    />
                  </div>
                </div>
              </div>
              <div className="overlaybannehand-bottomss">
                <img src={images.bottompotetoes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onzeimpact;
