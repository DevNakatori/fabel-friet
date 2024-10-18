import React, {useRef, useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzeimpact.css';
import {getImageUrl} from '../js/imagesurl';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Autoplay} from 'swiper/modules';
import onzie_leftvidep from '../assets/resizeimgs/e4a873c11067a15b870b670abefd5396-min.png';
import arrow_bluebottom from '../assets/resizeimgs/arrow_bluebottom.png';

import fabelfrietsticker2 from '../assets/resizeimgs/fabelfrietsticker2.png';
import fabelfrie_tsticker2 from '../assets/resizeimgs/fabelfriet_sticker2.png';
import fabelfrie_bottomlogo from '../assets/resizeimgs/120370700_177300s284025419_49173006.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzeimpact = () => {
  const {language} = useLanguage();
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
    });
    timelineimpact.to(
      '.roundimage-impact, .roundtext-impact',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
        zIndex: 5,
      },
      0,
    );

    timelineimpact.to(
      '.section.hero',
      {
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );

    timelineimpact.to(
      '#section5 .gradient-purple',
      {
        scale: 1,
        borderRadius: 0,
        ease: 'power3.easeIn',
        scrollTrigger: {
          trigger: '#section5 .wrappertest',
          start: 'top top-100',
          end: 'top top-300',
        },
      },
      0, // Start this animation at the same time as the previous one
    );

    timelineimpact.to('.fifthesection .wrappertest', {
      scrollTrigger: {
        trigger: '.fifthesection',
        start: '10% 10%',
        end: '30% 30%',
        scrub: true,
        once: true,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

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
      timelineimpact.scrollTrigger.kill();
    };
  }, [onzeimpact]);

  useEffect(() => {
    const listimpact = document.querySelectorAll(
      '.gradient-threeboxonzeimpact',
    );
    listimpact.forEach((listimpact) => {
      const itemslistimpact = listimpact.querySelectorAll(
        'ul li.threeboxonzeimpactlist',
      );
      const firstItemimpact = itemslistimpact[0];
      const lastItemimpact = itemslistimpact[itemslistimpact.length - 1];
      const middleItemimpact = itemslistimpact[1];
      const mobileMediaQuerys = window.matchMedia('(max-width: 768px)');
      // GSAP animation for desktop
      const animateDesktopimpact = () => {
        const onzefritthreeimagecenterimpact = gsap.timeline({
          scrollTrigger: {
            trigger: '.fifthesection .wrappertest',
            start: 'top top',
            end: 'center center',
          },
        });

        onzefritthreeimagecenterimpact.fromTo(
          middleItemimpact,
          {bottom: '-55vh', rotation: 0, opacity: 0},
          {
            bottom: '0vh',
            duration: 1,
            opacity: 1,
          },
        );

        const onzefritthreeimageleftimpact = gsap.timeline({
          scrollTrigger: {
            trigger: '.fifthesection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        onzefritthreeimageleftimpact
          .fromTo(
            firstItemimpact,
            {left: '-50vw', rotation: 0, opacity: 0},
            {
              left: '-9vw',
              opacity: 1,
              duration: 1,
            },
          )
          .to(firstItemimpact, {
            rotation: -8,
            duration: 1,
            delay: 1,
          });

        const onzefritthreeimagerightimpact = gsap.timeline({
          scrollTrigger: {
            trigger: '.fifthesection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        onzefritthreeimagerightimpact
          .fromTo(
            lastItemimpact,
            {right: '-50vw', rotation: 0, opacity: 0},
            {
              right: '-9vw',
              opacity: 1,
              duration: 1,
            },
          )
          .to(lastItemimpact, {
            rotation: 8,
            duration: 1,
            delay: 1,
          });
      };

      // GSAP animation for mobile
      const animateMobileimpact = () => {
        const mobileTimelineCenter = gsap.timeline({
          scrollTrigger: {
            trigger: '.fifthesection .wrappertest',
            start: '0 0',
            markers: false,
          },
        });

        mobileTimelineCenter.fromTo(
          middleItemimpact,
          {bottom: '-30vh', rotation: 0, opacity: 0},
          {
            bottom: '0vh',
            duration: 0.7,
            opacity: 1,
          },
        );

        const mobileTimelineLeft = gsap.timeline({
          scrollTrigger: {
            trigger: '.fifthesection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        mobileTimelineLeft
          .fromTo(
            firstItemimpact,
            {left: '-30vw', rotation: 0, opacity: 0},
            {
              left: '0vw',
              opacity: 1,
              duration: 0.7,
            },
          )
          .to(firstItemimpact, {
            rotation: -4,
            duration: 0.7,
            delay: 1,
          });

        const mobileTimelineRight = gsap.timeline({
          scrollTrigger: {
            trigger: '.fifthesection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        mobileTimelineRight
          .fromTo(
            lastItemimpact,
            {right: '-30vw', rotation: 0, opacity: 0},
            {
              right: '0vw',
              opacity: 1,
              duration: 0.7,
            },
          )
          .to(lastItemimpact, {
            rotation: 4,
            duration: 0.7,
            delay: 1,
          });
      };

      // Execute appropriate animation based on the device
      if (mobileMediaQuerys.matches) {
        animateMobileimpact();
      } else {
        animateDesktopimpact();
      }
    });
  }, [onzeimpact]);

  useEffect(() => {
    const fetchDataonzeimpactData = async () => {
      const cachedData = localStorage.getItem(`onzeimpactData_${language}`);
      //console.log('Cached fetchDataonzeimpactData Data:', cachedData);
      if (cachedData) {
        setonzeimpact(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "onzeimpact" && language == $lang]`,
            {lang: language},
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!onzeimpact || onzeimpact.length === 0) return <p>No data available</p>;

  const data = onzeimpact[0];

  return (
    <section className="panel fifthesection" id="section5">
      <div className="wrapper-impact">
        <div className="bannersectinlogo">
          <img
            src={getImageUrl(data.logoImage.asset._ref)}
            alt="Logo"
            width="10"
            height="10"
          />
        </div>
        <div className="wrappermain">
          <img
            className="media"
            src={getImageUrl(data.transitionSection.image.asset._ref)}
            alt={data.transitionSection.image.alt}
            width="10"
            height="10"
          />
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
          <h4
            className="onzeimpacttitle"
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            {data.contentSection.heading}
          </h4>
          <p
            className="onzeimpactdescription"
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            {data.contentSection.description}
          </p>
          <div className="gradient-threebox gradient-threeboxonzeimpact">
            <ul
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              {data.imageSection.image.map((img, index) => (
    <li key={img._key} className="threeboxonzeimpactlist">
      {index === 0 && (
                        <div className="threeboxleftlogobar">
                          <img
                            src={fabelfrietsticker2}
                            width="10"
                            height="10"
                          />
                        </div>
                      )}

                      {index === 1 && (
                        <div className="threeboxleftlogobar lastbottomimg">
                          <img
                            src={fabelfrie_bottomlogo}
                            width="10"
                            height="10"
                          />
                        </div>
                      )}
      <img
        src={getImageUrl(img.image.asset._ref)}
        alt="Descriptive Alt Text"
        width="10"
        height="10"
      />
    </li>
  ))}
            </ul>
          </div>
          <div className="whitebgbox">
            <div className="appcontainers">
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
                  <h4>{data.cardSection.secTitle}</h4>
                </div>
                <div
                  className="righttextbox"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="500"
                >
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
                              data-aos="fade-up"
                              data-aos-easing="ease-out-cubic"
                              data-aos-duration="2000"
                            >
                              {card.cardTitle}
                            </h5>
                            <p
                              data-aos="fade-up"
                              data-aos-easing="ease-out-cubic"
                              data-aos-duration="2000"
                            >
                              {card.cardDescription}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="onlymobile">
                    <ul className="onzeimpacttwolist">
                      <Swiper
                        loop={true}
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
                                >
                                  {card.cardTitle}
                                </h5>
                                <p
                                  data-aos="fade-up"
                                  data-aos-easing="ease-out-cubic"
                                  data-aos-duration="2000"
                                >
                                  {card.cardDescription}
                                </p>
                              </div>
                            </li>
                          </SwiperSlide>
                        ))}
                        <div className="swiper-pagination"></div>
                        {/* <div className="swiper-scrollbar"></div> */}
                      </Swiper>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="whitewithvideomainboxs"
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <div
                  className="leftvideobox"
                  data-aos="fade-leftt"
                  data-aos-easing="ease-in-sine"
                  data-aos-anchor=".gradient-threebox"
                  data-aos-offset="300"
                  data-aos-duration="500"
                >
                  <img
                    src={getImageUrl(data.bottomSection.image.asset._ref)}
                    alt="Bottom Section Image"
                    data-speed="auto"
                    width="10"
                    height="10"
                  />
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
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    {data.bottomSection.secTitle}
                  </h3>
                  <p
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    {data.bottomSection.secDescription}
                  </p>
                </div>
              </div>

              <div
                className="binimageboxmain"
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
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
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    <img
                      src={arrow_bluebottom}
                      alt="Bin Imagebox"
                      width="10"
                      height="10"
                    />
                  </div>
                </div>
                <div className="binimagebox">
                  <img
                    src={getImageUrl(data.bottomSection.sideImage.asset._ref)}
                    alt="Bin Imagebox"
                    data-speed="auto"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    width="10"
                    height="10"
                  />
                </div>
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
