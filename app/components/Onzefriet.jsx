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

import onzie_leftvidep from '../assets/resizeimgs/Rectangle43.png';
import mainbannerbg from '../assets/resizeimgs/c275d393c488ff040abd318900bf7f3b.png';
import fries_one from '../assets/resizeimgs/Rectangle89.png';
import fries_two from '../assets/resizeimgs/Rectangle88.png';
import fries_three from '../assets/resizeimgs/AdobeStock_616168104.png';
import fries_four from '../assets/resizeimgs/AdobeStock_616168104.png';
import fries_five from '../assets/resizeimgs/Rectangle90.png';
import fries_six from '../assets/resizeimgs/Rectangle91.png';
import fries_seven from '../assets/resizeimgs/Rectangle92.png';
import fries_eight from '../assets/resizeimgs/Rectangle93.png';
import arrow_blue from '../assets/resizeimgs/arrow_blue.png';
import fabelfrietsticker2 from '../assets/resizeimgs/fabelfrietsticker2.png';
import fabelfrie_tsticker2 from '../assets/resizeimgs/fabelfriet_sticker2.png';

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
        scrub: true,
        markers: false,
      },
    });

    timelinesonzefriet.to('#section2 .roundimage, #section2 .roundtext', {
      scale: 4,
      z: 350,
      transformOrigin: 'center center',
      ease: 'power1.inOut',
      zIndex: 5,
    });

    timelinesonzefriet.to('.secondesection .wrappertest', {
      scrollTrigger: {
        trigger: '.secondesection',
        start: '10% 10%',
        end: '30% 30%',
        scrub: true,
        once: true,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelinesonzefriet.to(
      '#section2 .section.hero',
      {
        scale: 1.1,
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
          start: 'top top-500',
          end: 'top top-200',
        },
      },
      0, // Start this animation at the same time as the previous one
    );

    gsap.fromTo(
      '.allfiressections img',
      {y: -50, opacity: 0},
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'bounce.out',
        force3D: true,
        yoyo: true,
        scrollTrigger: {
          trigger: '#section2 .wrappertest',
          start: 'top top-500',
          end: 'top top-200',
          pin: true,
          once: true,
          markers: false,
        },
      },
    );

    gsap.to('.allfiressections img', {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 5,
      ease: 'sine.inOut',
    });

    return () => {
      timelinesonzefriet.scrollTrigger.kill();
    };
  }, [onzefriet]);

  /* round curcule animation start */

  /* other text and section animation start */
  useEffect(() => {
    const list = document.querySelectorAll('.gradient-threebox');
    list.forEach((list) => {
      const items = list.querySelectorAll('ul li');
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const middleItem = items[1];

      const onzefritthreeimagecenter = gsap.timeline({
        scrollTrigger: {
          trigger: '.wrappertest',
          start: 'top top',
          end: 'bottom top',
        },
      });

      onzefritthreeimagecenter
        .fromTo(
          middleItem,
          {bottom: '-55vh', rotation: 0, opacity: 0},
          {
            //bottom: '0vh',
            delay: 0,
            duration: 1,
          },
        )
        .to(middleItem, {
          rotation: 0,
          bottom: '0vh',
          duration: 1,
          opacity: 1,
          delay: 0,
        });

      const onzefritthreeimageleft = gsap.timeline({
        scrollTrigger: {
          trigger: '.gradient-purple',
          start: 'top top',
          end: 'bottom top',
        },
      });

      onzefritthreeimageleft
        .fromTo(
          firstItem,
          {left: '-50vw', rotation: 0, opacity: 0},
          {
            left: '-9vw',
            opacity: 1,
            delay: 0,
            duration: 1,
          },
        )
        .to(firstItem, {
          // left: '-10vw',
          rotation: -8,
          duration: 1,
          delay: 1,
        });

      const onzefritthreeimageright = gsap.timeline({
        scrollTrigger: {
          trigger: '.gradient-purple',
          start: 'top top',
          end: 'bottom top',
        },
      });

      onzefritthreeimageright
        .fromTo(
          lastItem,
          {right: '-50vw', rotation: 0, opacity: 0},
          {
            right: '-9vw',
            opacity: 1,
            delay: 0,
            duration: 1,
          },
        )
        .to(lastItem, {
          // right: '-10vw',
          rotation: 8,
          duration: 1,
          delay: 1,
        });
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

  /* fatch data start */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "onzefriet" && language == $lang]`,
          {lang: language},
        );
        console.log('Fetched setOnzefriet Data:', data);
        setOnzefriet(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);
  /* fatch data end */

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="panel secondesection" id="section2">
      {onzefriet.map((content, idx) => (
        <div key={idx}>
          <div className="wrapper">
            <div className="bannersectinlogo">
              <img
                src={getImageUrl(content.logoImage.asset._ref)}
                alt={content.logoImage.alt}
              />
            </div>
            <div
              className="wrappermain"
              style={{backgroundImage: `url(${mainbannerbg})`}}
            ></div>
            <div className="roundimages">
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
                      data-aos-anchor-placement="top-center"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                    >
                      {content.contentSection.heading}
                    </h4>
                  </div>
                  <p
                    className="onzefriendescription"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    {content.contentSection.description}
                  </p>
                </>
              )}
              <div className="gradient-threebox">
                <ul>
                  {content.contentSection.three_image.map((image, index) => (
                    <li key={image._key}>
                      {index === 0 && (
                        <div className="threeboxleftlogobar">
                          <img src={fabelfrietsticker2} alt={image.alt} />
                        </div>
                      )}
                      <img
                        src={getImageUrl(image.asset._ref)}
                        alt={image.alt}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="allfiressections">
                <img src={fries_one} alt="img" />
                <img src={fries_two} alt="img" />
                <img src={fries_three} alt="img" />
                <img src={fries_five} alt="img" />
                <img src={fries_six} alt="img" />
                <img src={fries_seven} alt="img" />
                <img src={fries_eight} alt="img" />
              </div>

              <div className="whitebgbox">
                {content.videoSection && (
                  <div className="whitewithvideomainbox">
                    <div
                      className="leftvideobox"
                      data-aos="fade-left"
                      data-aos-easing="ease-in-sine"
                      data-aos-offset="500"
                      data-aos-duration="500"
                    >
                      <div className="leftlogobar">
                        <img src={fabelfrie_tsticker2} alt="img" />
                      </div>
                      <img src={onzie_leftvidep} alt="img" data-speed="auto" />
                    </div>
                    <div
                      className="righttextbox"
                      data-aos="fade-right"
                      data-aos-easing="ease-in-sine"
                      data-aos-offset="500"
                      data-aos-duration="500"
                    >
                      <h3 id="animated-text">
                        {content.videoSection.videoHandwritingText}
                      </h3>
                      <img
                        className="arrowimage"
                        src={arrow_blue}
                        alt="img"
                        data-speed="auto"
                      />
                      <h5>{content.videoSection.videoHeading}</h5>
                      <p className="onzeptag">
                        {content.videoSection.videoDescription}
                      </p>
                    </div>
                  </div>
                )}

                {content.reviewSection && (
                  <div className="whatpeople-section">
                    <h6
                      data-aos="fade-down"
                      ddata-aos-easing="linear"
                      data-aos-offset="500"
                      data-aos-duration="500"
                    >
                      {content.reviewSection.reviewHeading}
                    </h6>
                    <div
                      className="fl-tests"
                      data-aos="fade-down"
                      data-aos-easing="linear"
                      data-aos-offset="500"
                      data-aos-duration="500"
                    >
                      <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
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
                            slidesPerView: 4,
                            spaceBetween: 40,
                          },
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
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
                              ddata-aos-easing="linear"
                              data-aos-offset="500"
                              data-aos-duration="500"
                            >
                              <div className="wharpeoplebox">
                                <p className="onzeptag">
                                  "{review.reviewContent}"
                                </p>
                                <b>-{review.reviewCustName}</b>
                                <ul className="starrating">
                                  <li>
                                    <i className="star"></i>
                                  </li>
                                  <li>
                                    <i className="star"></i>
                                  </li>
                                  <li>
                                    <i className="star"></i>
                                  </li>
                                  <li>
                                    <i className="star"></i>
                                  </li>
                                  <li>
                                    <i className="blackstar"> </i>
                                  </li>
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
                      data-aos="fade-down"
                      ddata-aos-easing="linear"
                      data-aos-offset="500"
                      data-aos-duration="500"
                    >
                      {content.accordionSection.accordionHeading}
                    </h6>
                    <div
                      className="accordion-container"
                      data-aos="fade-down"
                      ddata-aos-easing="linear"
                      data-aos-offset="500"
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
