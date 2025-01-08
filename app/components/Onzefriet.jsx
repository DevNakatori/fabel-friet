import React, {useRef, useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzefriet.css';
import {Pagination, Autoplay} from 'swiper/modules';
import {getImageUrl} from '../js/imagesurl';
import onzie_leftvidep from '../assets/resizeimgs/webp/Rectangle43.webp';
import fries_one from '../assets/resizeimgs/webp/friewebp/Fries5_FabelFriet.webp';
import fries_two from '../assets/resizeimgs/webp/friewebp/Fries6_FabelFriet.webp';
import fries_three from '../assets/resizeimgs/webp/friewebp/Fries3_FabelFriet.webp';
import fries_four from '../assets/resizeimgs/webp/friewebp/Fries2_FabelFriet.webp';
import fries_five from '../assets/resizeimgs/webp/friewebp/Fries1_FabelFriet.webp';
import fries_six from '../assets/resizeimgs/webp/friewebp/Fries4_FabelFriet.webp';
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
        smoothTouch: 0.1,
      },
    });

    timelinesonzefriet.to(
      '#section2 .roundimage, #section2 .roundtext',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      0,
    );

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
      '<',
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
        },
      },
      0,
    );
    return () => {
      timelinesonzefriet.scrollTrigger.kill();
      // document.body.classList.remove('scrolled');
    };
  }, [onzefriet]);

  /* round curcule animation start */

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
          repeat: -1,
          yoyo: true,
          ease: 'power3.inOut',
        },
      },
    );
  }, [onzefriet]);

  useEffect(() => {
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
  }, [onzefriet]);

  const rainContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const fries = useRef([]);
  const fryImages = useRef([]);
  const numberOfFries = 80;
  const fryImageSources = [
    fries_one,
    fries_two,
    fries_three,
    fries_four,
    fries_five,
    fries_six,
  ];

  useEffect(() => {
    if (!rainContainerRef.current || !canvasRef.current) return;
    fryImages.current = fryImageSources.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const rainContainer = rainContainerRef.current;
      if (!canvas || !rainContainer) return; 
      canvas.width = rainContainer.offsetWidth;
      canvas.height = rainContainer.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const createFries = () => {
      fries.current = [];
      const canvas = canvasRef.current;
      if (!canvas) return; 
      for (let i = 0; i < numberOfFries; i++) {
        fries.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 1 + 0.3, // Slower speed: 0.5 to 1.5 pixels per frame
          sway: Math.random() * 50 - 25,
          image:
            fryImages.current[
              Math.floor(Math.random() * fryImages.current.length)
            ], // Random image
        });
      }
    };
    const renderFries = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fries.current.forEach((fry) => {
        fry.y += fry.speed;
        fry.x += fry.sway * 0.01; 
        if (fry.y > canvas.height) {
          fry.y = -50; 
          fry.x = Math.random() * canvas.width; 
          fry.image =
            fryImages.current[
              Math.floor(Math.random() * fryImages.current.length)
            ]; 
        }
        ctx.drawImage(fry.image, fry.x, fry.y, 200, 300); 
      });
      requestAnimationFrame(renderFries);
    };
    ScrollTrigger.create({
      trigger: rainContainerRef.current,
      start: 'top center',
      onEnter: () => {
        createFries();
        renderFries();
      },
      onLeaveBack: () => {
        fries.current = []; 
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
        }
      },
    });
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [onzefriet]);

  useEffect(() => {
    let typeSplit = new SplitType('[data-onzefrienttitle]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    var charsOnzefrienttitle = typeSplit.chars;
    gsap.from('[data-onzefrienttitle] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-onzefrienttitle]',
      },
      onUpdate: function () {
        charsOnzefrienttitle.forEach((typeSplit) => {
          typeSplit.style.backgroundImage =
            "url('/assets/plain-gold-background-C9ahylQT.webp')";
          typeSplit.style.webkitBackgroundClip = 'text';
          typeSplit.style.webkitTextFillColor = 'transparent';
          typeSplit.style.backgroundPosition = '97px -83px';
        });
      },
    });

    const typeSplitonzefriendescription = new SplitType(
      '[data-onzefriendescription]',
      {
        types: 'lines, words, chars',
        tagName: 'span',
      },
    );

    gsap.from('[data-onzefriendescription] .line', {
      y: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'sine.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '#onzefriendescriptiononzefriet',
        start: 'top center',
      },
    });

    let typeSplitvideoDescription = new SplitType('[data-videodescription]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    gsap.from('[data-videodescription] .line', {
      opacity: 0.3,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-videodescription]',
        start: 'top center',
        scrub: true,
      },
    });

    let typeSplitwhatpeoplesection = new SplitType('[data-whatpeoplesection]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    var charswhatpeoplesection = typeSplitwhatpeoplesection.chars;
    gsap.from('[data-whatpeoplesection] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-whatpeoplesection]',
      },
      onUpdate: function () {
        charswhatpeoplesection.forEach((typeswhatpeoplesection) => {
          typeswhatpeoplesection.style.backgroundPosition = '97px -83px';
        });
      },
    });

    let typeSplitaccordionSection = new SplitType('[data-accordionsection]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    var charsaccordionSection = typeSplitaccordionSection.chars;
    gsap.from('[data-accordionsection] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-accordionsection]',
      },
      onUpdate: function () {
        charsaccordionSection.forEach((typesaccordionSection) => {
          typesaccordionSection.style.backgroundPosition = '97px -83px';
        });
      },
    });

    let revealcontaineronze = document.querySelectorAll('.revealvideo');
    revealcontaineronze.forEach((containeonze) => {
      let imageimpactonze = containeonze.querySelector('.revealvideo video');
      let tlimpact = gsap.timeline({
        scrollTrigger: {
          trigger: containeonze,
        },
      });

      tlimpact.set(containeonze, {visibility: 'visible'});
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

    // gsap.fromTo(
    //   '.allfiressections img',
    //   { y: -50, opacity: 0 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     stagger: 0.5,
    //     duration: 1,
    //     ease: 'bounce.out',
    //     force3D: true,
    //     yoyo: true,
    //     scrollTrigger: {
    //       trigger: '#section2 .wrappertest',
    //       start: 'top top-500',
    //       end: 'top top-200',
    //       pin: true,
    //       once: true,
    //       markers: false,
    //     },
    //     onComplete: () => {

    //       gsap.to('.allfiressections img', {
    //         scale: 1.1,
    //         stagger: 0.3,
    //         zIndex: 22,
    //         duration: 1,
    //         ease: 'none',
    //         yoyo: true,
    //         repeat: -1,
    //       });
    //     },
    //   },
    // );
  }, [onzefriet]);

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
              {/* <div className="bannersectinlogo">
                <img
                  src={getImageUrl(content.logoImage.asset._ref)}
                  alt="Logo"
                  width="10"
                  height="10"
                  data-aos="fade"
                  data-aos-easing="linear"
                  data-aos-duration="4500"
                />
              </div> */}
              <div className="roundtext">
                {content.transitionSection && (
                  <>
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: content.transitionSection.topTitle,
                      }}
                    />
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: content.transitionSection.bottomTitle,
                      }}
                    />
                  </>
                )}
              </div>
              <div className="roundimage"></div>
              <div className="scroll-down">
                <div className="scroll-down">
                  <div className="icon-scroll"></div>
                  <p>Scroll down</p>
                </div>
                {/* <div className="icon-scroll"></div>
                <p>Scroll down</p> */}

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
          </div>

          <div className="wrappertest" ref={rainContainerRef}>
            <section className="section hero"></section>
            <div className="gradient-purple" id="onzefriendescriptiononzefriet">
              {content.contentSection && (
                <>
                  <div className="line">
                    <h4
                      className="onzefrienttitle"
                      data-onzefrienttitle=""
                      dangerouslySetInnerHTML={{
                        __html: content.contentSection.heading,
                      }}
                    />
                  </div>
                  <p
                    className="onzefriendescription"
                    data-onzefriendescription=""
                    dangerouslySetInnerHTML={{
                      __html: content.contentSection.description,
                    }}
                  />
                </>
              )}
              <div className="gradient-threebox gradient-threeboxonzefritimgli">
                <div className="img-container">
                  {content.contentSection.three_image.map((image, index) => (
                    <div key={image._key} className="image-wrapper">
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
                    </div>
                  ))}
                </div>
              </div>

              <canvas
                className="canvasfries"
                ref={canvasRef}
                style={{position: 'absolute', top: -100, left: -50}}
              />

              {/* <div className="allfiressections">
                <img src={fries_one} alt="img" width="10" height="10" />
                <img src={fries_two} alt="img" width="10" height="10" />
                <img src={fries_three} alt="img" width="10" height="10" />
                <img src={fries_four} alt="img" width="10" height="10" />
                <img src={fries_five} alt="img" width="10" height="10" />
                <img src={fries_six} alt="img" width="10" height="10" />
              </div> */}

              <div className="whitebgbox">
                <div className="appcontainers">
                  {content.videoSection && (
                    <div className="whitewithvideomainbox">
                      <div className="leftvideobox">
                        <div className="leftlogobar">
                          <img
                            src={fabelfrie_tsticker2}
                            alt="img"
                            width="10"
                            height="10"
                          />
                        </div>
                        {/* <img
                          src={onzie_leftvidep}
                          alt="img"
                          data-speed="auto"
                          width="10"
                          height="10"
                        /> */}
                        <div className="revealvideo">
                          <video
                            id="myVideos"
                            src={content.videoSection.videoLink}
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
                          data-videodescription=""
                          dangerouslySetInnerHTML={{
                            __html: content.videoSection.videoHandwritingText,
                          }}
                        />
                        {/* <img
                          className="arrowimage swing"
                          src={arrow_blue}
                          alt="img"
                          data-speed="auto"
                          width="10"
                          height="10"
                        /> */}

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
                          data-videodescription=""
                          dangerouslySetInnerHTML={{
                            __html: content.videoSection.videoDescription,
                          }}
                        />
                      </div>
                    </div>
                  )}

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
                <div className="overlaybannehand-bottoms"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Onzefriet;
