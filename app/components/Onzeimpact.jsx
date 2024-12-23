import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzeimpact.css';
import { getImageUrl } from '../js/imagesurl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import onzie_leftvidep from '../assets/resizeimgs/webp/e4a873c11067a15b870b670abefd5396-min.webp';
import arrow_bluebottom from '../assets/resizeimgs/webp/arrow_bluebottom.webp';
import etuh from '../assets/resizeimgs/webp/etuh.png';
import etuij from '../assets/resizeimgs/webp/etuij.png';
import fabelfrietsticker2 from '../assets/resizeimgs/webp/fabelfrietsticker2.webp';
import fabelfrie_tsticker2 from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';
import fabelfrie_bottomlogo from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';


import bottomdustbin from '../assets/resizeimgs/webp/DustbinBottom.webp';
import topdustin from '../assets/resizeimgs/webp/Top.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzeimpact = () => {
  const { language } = useLanguage();
  const [onzeimpact, setonzeimpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showGarbage, setShowGarbage] = useState(false);
  const binLidRef = useRef(null);
  const garbageRef = useRef(null);
  const binContainerRef = useRef(null); // Ref for the bin container element


  useEffect(() => {

    const createAndAnimatePotato = (index) => {
      if (!binContainerRef.current) return;

      const potatoContainer = document.createElement('div');
      potatoContainer.classList.add('potato-container');
      const potatoImages = [etuh, etuij];
      const randomImage = potatoImages[Math.floor(Math.random() * potatoImages.length)];
      const potatoImg = document.createElement('img');
      potatoImg.src = randomImage;
      potatoImg.style.width = '60px';
      potatoImg.style.height = '60px';
      potatoContainer.appendChild(potatoImg);
      binContainerRef.current.appendChild(potatoContainer);
      setShowGarbage(true);
      gsap.to(binLidRef.current, { y: -30, duration: 0.3, ease: 'power1.inOut' });
      gsap.to(garbageRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut' });
      gsap.to(potatoContainer, {
        y: 500,
        opacity: 0,
        duration: 1.5,
        delay: index * 0.1,
        ease: 'power1.inOut',
        onComplete: () => {
          potatoContainer.remove();
        },
      });
      setTimeout(() => {
        gsap.to(binLidRef.current, { y: 0, duration: 0.5, ease: 'power1.inOut' });
      }, 200);
    };
    let index = 0;
    const interval = setInterval(() => {
      createAndAnimatePotato(index);
      index += 1;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timelineimpact = gsap.timeline({
      scrollTrigger: {
        trigger: '#section5 .wrapper-impact',
        start: 'center center',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        markers: false,
        smoothTouch: 0.1,
      },
    });
    timelineimpact.to(
      '#section5 .roundimage-impact, #section5 .roundtext-impact',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      0,
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

    timelineimpact.to(
      '#section5 .section.hero',
      {
        scale: 2.5,
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
      timelineimpact.scrollTrigger.kill();
    };
  }, [onzeimpact]);

  useEffect(() => {
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
  }, [onzeimpact]);

  useEffect(() => {
    const fetchDataonzeimpactData = async () => {
      const cachedData = localStorage.getItem(`onzeimpactData_${language}`);

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
          console.log('Fetched fetchDataonzeimpactData Data:', data);
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

  useEffect(() => {
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
  }, [onzeimpact]);

  useEffect(() => {
    let typeSplitonzeimpacttitle = new SplitType('[data-onzeimpacttitle]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    var charsonzeimpacttitle = typeSplitonzeimpacttitle.chars;
    gsap.from('[data-onzeimpacttitle] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-onzeimpacttitle]',
      },
      onUpdate: function () {
        charsonzeimpacttitle.forEach((typeSplitcharsonzeimpacttitleas) => {
          typeSplitcharsonzeimpacttitleas.style.backgroundImage =
            "url('/assets/plain-gold-background-C9ahylQT.webp')";
          typeSplitcharsonzeimpacttitleas.style.webkitBackgroundClip = 'text';
          typeSplitcharsonzeimpacttitleas.style.webkitTextFillColor =
            'transparent';
          typeSplitcharsonzeimpacttitleas.style.backgroundPosition =
            '97px -83px';
        });
      },
    });

    let typeSplitonzeimpactdescription = new SplitType(
      '[data-onzeimpactdescription]',
      {
        types: 'lines, words, chars',
        tagName: 'span',
      },
    );

    gsap.from('[data-onzeimpactdescription] .line', {
      y: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'sine.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-onzeimpactdescription]',
      },
    });

    let typeSplitleftvideoboxsectitle = new SplitType(
      '[data-leftvideoboxsectitle]',
      {
        types: 'lines, words, chars',
        tagName: 'span',
      },
    );
    var charsleftvideoboxsectitle = typeSplitleftvideoboxsectitle.chars;
    gsap.from('[data-leftvideoboxsectitle] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-leftvideoboxsectitle]',
      },
      onUpdate: function () {
        charsleftvideoboxsectitle.forEach((typeSplitleftvideoboxsectitle) => {

          typeSplitleftvideoboxsectitle.style.backgroundPosition = '97px -83px';
        });
      },
    });

    let typeSplitrighttextboxtitle = new SplitType('[data-righttextboxtitle]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    var charsrighttextboxtitle = typeSplitrighttextboxtitle.chars;
    gsap.from('[data-righttextboxtitle] .line', {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '[data-righttextboxtitle]',
      },
      onUpdate: function () {
        charsrighttextboxtitle.forEach((typeSplitrighttextboxtitlse) => {

          typeSplitrighttextboxtitlse.style.backgroundPosition = '97px -83px';
        });
      },
    });

    document
      .querySelectorAll('[data-onzeimpacttwolistlisttext]')
      .forEach((element) => {
        new SplitType(element, {
          types: 'lines, words, chars',
          tagName: 'span',
        });
      });

    gsap.from('[data-onzeimpacttwolistlisttext] .line', {
      opacity: 0.3,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0,
      scrollTrigger: {
        trigger: '[data-onzeimpacttwolistlisttext]',
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
        markers: false,
      },
    });

    let typeSplitsecdescription = new SplitType('[data-secdescription]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    gsap.from('[data-secdescription] .line', {
      opacity: 0.3,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-secdescription]',
        scrub: true,
      },
    });

    let onzeimpacttwolistlisttitle = new SplitType(
      '[data-onzeimpacttwolistlisttitle]',
      {
        types: 'lines, words, chars',
        tagName: 'span',
      },
    );
    var charsimpacttwolistlisttitle = onzeimpacttwolistlisttitle.chars;
    gsap.from('[data-onzeimpacttwolistlisttitle] .line', {
      y: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'sine.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-onzeimpacttwolistlisttitle]',
      },
      onUpdate: function () {
        charsimpacttwolistlisttitle.forEach(
          (typeSplitimpacttwolistlisttitle) => {

            typeSplitimpacttwolistlisttitle.style.backgroundPosition =
              '97px -83px';
          },
        );
      },
    });

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
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="4500"
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
            <h2
              dangerouslySetInnerHTML={{
                __html: data.transitionSection.topTitle,
              }}
            />
            <h3
              dangerouslySetInnerHTML={{
                __html: data.transitionSection.bottomTitle,
              }}
            />
          </div>
          <div className="roundimage-impact"></div>
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
        <div className="gradient-purple" id="onzeimpactnonzefriet">
          <h4 className="onzeimpacttitle" data-onzeimpacttitle="">
            {data.contentSection.heading}
          </h4>
          <p
            className="onzeimpactdescription"
            data-onzeimpactdescription=""
            dangerouslySetInnerHTML={{ __html: data.contentSection.description }}
          />

          <div className="gradient-threebox gradient-threeboxonzeimpact">
            <div className="img-containerss">
              {data.imageSection.image.map((img, index) => (
                <div
                  key={img._key}
                  className="threeboxonzeimpactlist image-wrappers"
                >
                  {index === 0 && (
                    <div className="threeboxleftlogobar">
                      <img
                        src={fabelfrietsticker2}
                        width="10"
                        height="10"
                        alt="img"
                      />
                    </div>
                  )}

                  {index === 1 && (
                    <div className="threeboxleftlogobar lastbottomimg">
                      <img
                        src={fabelfrie_bottomlogo}
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
                  <h4 data-leftvideoboxsectitle="">
                    {data.cardSection.secTitle}
                  </h4>
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
                              data-onzeimpacttwolistlisttitle=""
                              dangerouslySetInnerHTML={{ __html: card.cardTitle }}
                            />

                            <p
                              data-onzeimpacttwolistlisttext=""
                              dangerouslySetInnerHTML={{
                                __html: card.cardDescription,
                              }}
                            />
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
                    data-righttextboxtitle=""
                    dangerouslySetInnerHTML={{
                      __html: data.bottomSection.secTitle,
                    }}
                  />

                  <p
                    data-secdescription=""
                    dangerouslySetInnerHTML={{
                      __html: data.bottomSection.secDescription,
                    }}
                  />
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
                    {/* <img
                      src={arrow_bluebottom}
                      alt="Bin Imagebox"
                      width="10"
                      height="10"
                      className="swingss"
                    /> */}
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
                  {/* <img
                    src={getImageUrl(data.bottomSection.sideImage.asset._ref)}
                    alt="Bin Imagebox"
                    data-speed="auto"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    width="10"
                    height="10"
                  /> */}
                  <img
                    src={bottomdustbin}
                    alt="Bin Imagebox"
                    width="10"
                    height="10"
                  />
                  <img
                    src={topdustin}
                    alt="Bin Imagebox"
                    width="10"
                    className='topdustbinimage'
                    height="10"
                  />
                  {/* <img
                    src={getImageUrl(data.bottomSection.sideImage.asset._ref)}
                    alt="Bin Imagebox"
                    data-speed="auto"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    width="10"
                    height="10"
                  /> */}
                </div>

                {/* <div className="bin-container" ref={binContainerRef}>
      <div id="recycle-bin">
        <div className="bin-lid" ref={binLidRef}></div>
        <div
          id="garbage"
          ref={garbageRef}
          style={{ opacity: 0, position: 'relative', transform: 'translateY(30px)' }}
        ></div>
      </div>
    </div> */}
              </div>
            </div>
            <div className="overlaybannehand-bottoms"></div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Onzeimpact;
