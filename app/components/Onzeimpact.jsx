import React, {useRef, useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzeimpact.css';
import {getImageUrl} from '../js/imagesurl';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Autoplay} from 'swiper/modules';
import onzie_leftvidep from '../assets/resizeimgs/webp/e4a873c11067a15b870b670abefd5396-min.webp';
import arrow_bluebottom from '../assets/resizeimgs/webp/arrow_bluebottom.webp';

import fabelfrietsticker2 from '../assets/resizeimgs/webp/fabelfrietsticker2.webp';
import fabelfrie_tsticker2 from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';
import fabelfrie_bottomlogo from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzeimpact = () => {
  const {language} = useLanguage();
  const [onzeimpact, setonzeimpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timelineimpact = gsap.timeline({
      scrollTrigger: {
        trigger: '#section5 .wrapper-impact',
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
    timelineimpact.to(
      '#section5 .roundimage-impact, #section5 .roundtext-impact',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
        //zIndex: 5,
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
          // onEnter: () => document.body.classList.add('scrolled'),
          // onEnterBack: () => document.body.classList.add('scrolled'),
        },
      },
      0, // Start this animation at the same time as the previous one
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
        scrub: 2, // Increased scrub for smoother animation
        ease: 'power3.inOut', // Smoother easing
        once: true,
      },
    });

    // On scroll, spread images horizontally with rotation
    timeline
      .to('.image-wrappers:first-child', {
        left: '20%',
        rotation: -5, // Tilt first image
        duration: 2,
        ease: 'power3.out',
      })
      .to(
        '.image-wrappers:nth-child(2)',
        {
          left: '50%',
          duration: 2,
          ease: 'power3.out',
        },
        '<',
      )
      .to(
        '.image-wrappers:last-child',
        {
          left: '80%',
          rotation: 5, // Tilt last image
          duration: 2,
          ease: 'power3.out',
        },
        '<',
      );
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

    gsap.from('[data-onzeimpactdescription] .word', {
      y: '100%',
      opacity: 1,
      duration: 0.5,
      ease: 'power1.in',
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
          typeSplitleftvideoboxsectitle.style.backgroundImage =
            "url('/assets/plain-gold-background-C9ahylQT.webp')";
          typeSplitleftvideoboxsectitle.style.webkitBackgroundClip = 'text';
          typeSplitleftvideoboxsectitle.style.webkitTextFillColor =
            'transparent';
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
          typeSplitrighttextboxtitlse.style.backgroundImage =
            "url('/assets/plain-gold-background-C9ahylQT.webp')";
          typeSplitrighttextboxtitlse.style.webkitBackgroundClip = 'text';
          typeSplitrighttextboxtitlse.style.webkitTextFillColor = 'transparent';
          typeSplitrighttextboxtitlse.style.backgroundPosition = '97px -83px';
        });
      },
    });

    let typeSplitonzeonzeimpacttwolistlisttext = new SplitType(
      '[data-onzeimpacttwolistlisttext]',
      {
        types: 'lines, words, chars',
        tagName: 'span',
      },
    );

    gsap.from('[data-onzeimpacttwolistlisttext] .line', {
      y: '100%',
      opacity: 1,
      duration: 0.5,
      ease: 'power1.in',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-onzeimpacttwolistlisttext]',
      },
    });

    let typeSplitsecdescription = new SplitType('[data-secdescription]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    gsap.from('[data-secdescription]', {
      y: '100%',
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-secdescription]',
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
      duration: 0.1,
      ease: 'circ.in',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-onzeimpacttwolistlisttitle]',
      },
      onUpdate: function () {
        charsimpacttwolistlisttitle.forEach(
          (typeSplitimpacttwolistlisttitle) => {
            typeSplitimpacttwolistlisttitle.style.backgroundImage =
              "url('/assets/plain-gold-background-C9ahylQT.webp')";
            typeSplitimpacttwolistlisttitle.style.webkitBackgroundClip = 'text';
            typeSplitimpacttwolistlisttitle.style.webkitTextFillColor =
              'transparent';
            typeSplitimpacttwolistlisttitle.style.backgroundPosition =
              '97px -83px';
          },
        );
      },
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
          <h4 className="onzeimpacttitle" data-onzeimpacttitle="">
            {data.contentSection.heading}
          </h4>
          <p className="onzeimpactdescription" data-onzeimpactdescription="">
            {data.contentSection.description}
          </p>
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
                            <h5 data-onzeimpacttwolistlisttitle="">
                              {card.cardTitle}
                            </h5>
                            <p data-onzeimpacttwolistlisttext="">
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
                  <h3 data-righttextboxtitle="">
                    {data.bottomSection.secTitle}
                  </h3>
                  <p data-secdescription="">
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
                      className="swingss"
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
