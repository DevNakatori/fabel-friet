import React, {useRef, useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzefriet.css';
import {Pagination, Autoplay} from 'swiper/modules';
import {getImageUrl} from '../js/imagesurl';

import onzie_leftvidep from '../assets/resizeimgs/webp/Rectangle43.webp';

import fries_one from '../assets/resizeimgs/webp/Rectangle89.webp';
import fries_two from '../assets/resizeimgs/webp/Rectangle88.webp';
import fries_three from '../assets/resizeimgs/webp/AdobeStock_616168104.webp';
import fries_four from '../assets/resizeimgs/webp/AdobeStock_616168104.webp';
import fries_five from '../assets/resizeimgs/webp/Rectangle90.webp';
import fries_six from '../assets/resizeimgs/webp/Rectangle91.webp';
import fries_seven from '../assets/resizeimgs/webp/Rectangle92.webp';
import fries_eight from '../assets/resizeimgs/webp/Rectangle93.webp';
import arrow_blue from '../assets/resizeimgs/webp/arrow_blue.webp';
import fabelfrietsticker2 from '../assets/resizeimgs/webp/fabelfrietsticker2.webp';
import fabelfrie_tsticker2 from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';

import fabelfrie_bottomlogo from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzefriet = () => {
  const {language} = useLanguage();
  const [onzefriet, setOnzefriet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* round curcule animation start */
  useEffect(() => {
    const timelinesonzefriet = gsap.timeline({
      scrollTrigger: {
        trigger: '#section2 .wrapper',
        start: 'center center',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        markers: false,
        smoothTouch: 0.1, // reduce smoothness for touch device
        // onEnter: () => document.body.classList.remove('scrolled'),
        // onLeave: () => document.body.classList.add('scrolled'),
        // onEnterBack: () => document.body.classList.remove('scrolled'),
      },
    });

    timelinesonzefriet.to('#section2 .roundimage, #section2 .roundtext', {
      scale: 2.5,
      z: 350,
      transformOrigin: 'center center',
      ease: 'power1.inOut',
      //zIndex: 5,
    });

    timelinesonzefriet.to('.secondesection .wrappertest', {
      scrollTrigger: {
        trigger: '.secondesection',
        start: '10% 10%',
        end: '25% 25%',
        scrub: true,
        once: false,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelinesonzefriet.to(
      '#section2 .section.hero',
      {
        scale: 2.5,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<', // Position the animation at the same time as the previous one
    );

    timelinesonzefriet.to(
      '#section2 .gradient-purple',
      {
        scale: 1,
        borderRadius: 0,
        ease: 'power3.easeIn',
        scrollTrigger: {
          trigger: '#section2 .wrappertest',
          start: 'top top-100',
          end: 'top top-300',
          // onEnter: () => document.body.classList.add('scrolled'),
          // onEnterBack: () => document.body.classList.add('scrolled'),
          //onLeave: () => document.body.classList.remove('scrolled'),
        },
      },
      0, // Start this animation at the same time as the previous one
    );
    return () => {
      timelinesonzefriet.scrollTrigger.kill();
      // document.body.classList.remove('scrolled');
    };
  }, [onzefriet]);

  /* round curcule animation start */

  /* other text and section animation start */
  useEffect(() => {
    const list = document.querySelectorAll('.gradient-threeboxonzefritimgli');
    list.forEach((list) => {
      const items = list.querySelectorAll('ul li.onzefritimgli');
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const middleItem = items[1];

      // Define media queries
      const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

      // GSAP animation for desktop
      const animateDesktop = () => {
        const onzefritthreeimagecenter = gsap.timeline({
          scrollTrigger: {
            trigger: '.secondesection .wrappertest',
            start: 'top top',
            end: 'center center',
            markers: false,
          },
        });

        onzefritthreeimagecenter.fromTo(
          middleItem,
          {bottom: '-55vh', rotation: 0, opacity: 0},
          {
            bottom: '0vh',
            duration: 1,
            opacity: 1,
          },
        );

        const onzefritthreeimageleft = gsap.timeline({
          scrollTrigger: {
            trigger: '.secondesection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        onzefritthreeimageleft
          .fromTo(
            firstItem,
            {left: '-50vw', rotation: 0, opacity: 0},
            {
              left: '-10%',
              opacity: 1,
              duration: 1,
            },
          )
          .to(firstItem, {
            rotation: -8,
            duration: 1,
            delay: 1,
          });

        const onzefritthreeimageright = gsap.timeline({
          scrollTrigger: {
            trigger: '.secondesection .gradient-purple',
            start: 'top top',
            end: 'bottom top',
          },
        });

        onzefritthreeimageright
          .fromTo(
            lastItem,
            {right: '-50vw', rotation: 0, opacity: 0},
            {
              right: '-10%',
              opacity: 1,
              duration: 1,
            },
          )
          .to(lastItem, {
            rotation: 8,
            duration: 1,
            delay: 1,
          });
      };

      // GSAP animation for mobile
      const animateMobile = () => {
        const mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.secondesection .wrappertest',
            // start: 'top top',
            // end: 'center center',
            start: '10 20',
            //end: 'bottom bottom',
            markers: false,
          },
        });

        mobileTimeline.fromTo(
          middleItem,
          {bottom: '-30vh', rotation: 0, opacity: 0},
          {
            bottom: '0vh',
            duration: 0.3,
            opacity: 1,
          },
        );

        const mobileImageLeft = gsap.timeline({
          scrollTrigger: {
            trigger: '.secondesection .gradient-purple',
            //start: 'top top',
            //end: 'bottom top',
          },
        });

        mobileImageLeft
          .fromTo(
            firstItem,
            {left: '-30vw', rotation: 0, opacity: 0},
            {
              left: '0vw',
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
            },
          )
          .to(firstItem, {
            rotation: -6,
            duration: 1,
            delay: 1,
          });

        const mobileImageRight = gsap.timeline({
          scrollTrigger: {
            trigger: '.secondesection .gradient-purple',
            //start: 'top top',
            // end: 'bottom top',
          },
        });

        mobileImageRight
          .fromTo(
            lastItem,
            {right: '-30vw', rotation: 0, opacity: 0},
            {
              right: '0vw',
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
            },
          )
          .to(lastItem, {
            rotation: 6,
            duration: 1,
            delay: 1,
          });
      };

      // Execute appropriate animation based on the device
      if (mobileMediaQuery.matches) {
        animateMobile();
      } else {
        animateDesktop();
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

    /* other text and section animation end */
  }, [onzefriet]);

  /* accordian start */
  const toggleAccordion = (e) => {
    const trigger = e.currentTarget;
    const content = trigger.nextElementSibling;
    document.querySelectorAll('.accordion-content').forEach((accordion) => {
      if (accordion !== content) {
        gsap.to(accordion, {
          height: 0,
          duration: 0,
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
        duration: 0,
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
            {lang: language},
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

  useEffect(() => {
    function setupSplits() {
      var tlSplitBurrowing = gsap.timeline(),
        SplitBurrowing = new SplitText('.onzefriendescription', {
          type: 'words,chars',
        }),
        chars = SplitBurrowing.chars;
      tlSplitBurrowing.from(
        chars,
        {
          duration: 1,
          opacity: 0,
          y: 10,
          ease: 'circ.out',
          stagger: 0.01,
          scrollTrigger: {
            trigger: '.onzefriendescription',
            start: 'top 75%',
            end: 'bottom center',
            scrub: 1,
            once: true,
          },
        },
        '+=0',
      );
    }

    ScrollTrigger.addEventListener('refresh', setupSplits);
    setupSplits();

    gsap.from('.allfiressections', {
      y: '-100vh',
      delay: 0.5,
      scrollTrigger: {
        trigger: '.secondesection .gradient-purple',
      },
    });

    gsap.to('.allfiressections img', {
      x: 'random(-20, 20)',
      y: 'random(-20, 20)',
      zIndex: 22,
      duration: 2,
      ease: 'none',
      yoyo: true,
      repeat: -1,
    });
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="panel secondesection" id="section2">
      {onzefriet.map((content, idx) => (
        <div key={idx}>
          <div className="wrapper">
            <div className="wrappermain">
              <img
                className="media"
                src={getImageUrl(content.transitionSection.image.asset._ref)}
                alt={content.transitionSection.image.alt}
                width="10"
                height="10"
              />
            </div>
            <div className="roundimages">
              <div className="bannersectinlogo">
                <img
                  src={getImageUrl(content.logoImage.asset._ref)}
                  alt="Logo"
                  width="10"
                  height="10"
                />
              </div>
              <div className="roundtext">
                {content.transitionSection && (
                  <>
                    <h2>{content.transitionSection.topTitle}</h2>
                    <h3>{content.transitionSection.bottomTitle}</h3>
                  </>
                )}
              </div>
              <div className="roundimage"></div>
              <div className="scroll-down">
                <div className="icon-scroll"></div>
                <p>Scroll down</p>
              </div>
            </div>
          </div>

          <div className="wrappertest">
            <section className="section hero"></section>
            <div className="gradient-purple" id="onzefriendescriptiononzefriet">
              {content.contentSection && (
                <>
                  <div className="line">
                    <h4
                      className="onzefrienttitle"
                      data-aos="fade-up"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="500"
                    >
                      {content.contentSection.heading}
                    </h4>
                  </div>
                  <p
                    className="onzefriendescription"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="500"
                  >
                    {content.contentSection.description}
                  </p>
                </>
              )}
              <div className="gradient-threebox gradient-threeboxonzefritimgli">
                <ul>
                  {content.contentSection.three_image.map((image, index) => (
                    <li key={image._key} className="onzefritimgli">
                      {index === 0 && (
                        <div className="threeboxleftlogobar">
                          <img
                            src={fabelfrietsticker2}
                            alt={image.alt}
                            width="10"
                            height="10"
                          />
                        </div>
                      )}

                      {index === 1 && (
                        <div className="threeboxleftlogobar lastbottomimg ">
                          <img
                            src={fabelfrie_bottomlogo}
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
                    </li>
                  ))}
                </ul>
              </div>

              <div className="allfiressections">
                <img src={fries_one} alt="img" width="10" height="10" />
                <img src={fries_two} alt="img" width="10" height="10" />
                <img src={fries_three} alt="img" width="10" height="10" />
                <img src={fries_five} alt="img" width="10" height="10" />
                <img src={fries_six} alt="img" width="10" height="10" />
                <img src={fries_seven} alt="img" width="10" height="10" />
                <img src={fries_eight} alt="img" width="10" height="10" />
              </div>

              <div className="whitebgbox">
                <div className="appcontainers">
                  {content.videoSection && (
                    <div className="whitewithvideomainbox">
                      <div
                        className="leftvideobox"
                        data-aos="fade-left"
                        data-aos-anchor=".gradient-threebox"
                        data-aos-easing="ease-in-sine"
                        data-aos-anchor-placement="top-center"
                        data-aos-offset="200"
                        data-aos-duration="500"
                      >
                        <div className="leftlogobar">
                          <img
                            src={fabelfrie_tsticker2}
                            alt="img"
                            width="10"
                            height="10"
                          />
                        </div>
                        <img
                          src={onzie_leftvidep}
                          alt="img"
                          data-speed="auto"
                          width="10"
                          height="10"
                        />
                      </div>
                      <div
                        className="righttextbox"
                        data-aos="fade-down"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="500"
                      >
                        <h3
                          id="animated-text"
                          data-aos="fade"
                          data-aos-easing="ease-in-sine"
                          data-aos-duration="500"
                        >
                          {content.videoSection.videoHandwritingText}
                        </h3>
                        <img
                          className="arrowimage swing"
                          src={arrow_blue}
                          alt="img"
                          data-speed="auto"
                          width="10"
                          height="10"
                        />
                        <h5
                          data-aos="fade"
                          data-aos-easing="ease-in-sine"
                          data-aos-duration="500"
                        >
                          {content.videoSection.videoHeading}
                        </h5>
                        <p
                          className="onzeptag"
                          data-aos="fade"
                          data-aos-easing="ease-in-sine"
                          data-aos-duration="500"
                        >
                          {content.videoSection.videoDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {content.reviewSection && (
                    <div className="whatpeople-section">
                      <h6
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                      >
                        {content.reviewSection.reviewHeading}
                      </h6>
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
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 40,
                            },
                            1200: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            1910: {
                              slidesPerView: 4,
                              spaceBetween: 20,
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
                                  <p className="onzeptag">
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
                                            <i className="star"></i>
                                          </li>
                                        ); // Full star
                                      } else if (
                                        index ===
                                          Math.floor(review.reviewRating) &&
                                        review.reviewRating % 1 !== 0
                                      ) {
                                        return (
                                          <li key={index}>
                                            <i className="halfstar"></i>
                                          </li>
                                        ); // Half star
                                      } else {
                                        return (
                                          <li key={index}>
                                            <i className="blackstar"></i>
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
                          {/* <div className="swiper-scrollbar"></div> */}
                        </Swiper>
                      </div>
                    </div>
                  )}

                  {content.accordionSection && (
                    <div className="main-accordian">
                      <h6
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                      >
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
                              {faq.question}
                              <span className="icon"></span>
                            </button>
                            <div className="accordion-content">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
        </div>
      ))}
    </section>
  );
};

export default Onzefriet;
