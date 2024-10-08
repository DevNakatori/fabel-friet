import React, {useRef, useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Autoplay} from 'swiper/modules';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';
import {getImageUrl} from '../js/imagesurl';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/b31aa7dc7c0527a0ec7d013d969ab561-min.png';

import insta_3 from '../assets/resizeimgs/insta_3.png';
import hetberoemd from '../assets/resizeimgs/hetinmiddelsberoemde.png';

import arrow_blue1 from '../assets/resizeimgs/arrow_blue1.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
  const {language} = useLanguage();
  const [hetmenu, sethetmenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timelineshetmenu = gsap.timeline({
      scrollTrigger: {
        trigger: '.wrapper-hetmenu',
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        markers: false,
      },
    });
    timelineshetmenu.to('.roundimage-hetmenu, .roundtext-hetmenu', {
      scale: 4,
      z: 350,
      transformOrigin: 'center center',
      ease: 'power1.inOut',
      zIndex: 5,
    });

    timelineshetmenu.to('.fourthsection .wrappertest', {
      scrollTrigger: {
        trigger: '.fourthsection',
        start: '20% 20%',
        end: '40% 40%',
        scrub: true,
        once: false,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelineshetmenu.to(
      '.section.hero',
      {
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );
    timelineshetmenu.to(
      '.gradient-purple',
      {
        scale: 1,
        borderRadius: 0,
        ease: 'power3.easeIn',
        scrollTrigger: {
          trigger: '.wrappertest',
          start: 'top top-500',
          end: 'top top-200',
        },
      },
      0,
    );

    gsap.fromTo(
      '#section4 .gradient-threebox-menu',
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
        delay: 2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '#section4 .gradient-purple',
          markers: false,
        },
      },
    );

    return () => {
      timelineshetmenu.scrollTrigger.kill();
    };
  }, [hetmenu]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "hetmenu" && language == $lang]`,
          {lang: language},
        );
        console.log('Fetched sethetmenu Data:', data);
        sethetmenu(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!hetmenu || hetmenu.length === 0) return <div>No menu available.</div>;

  const {contentSection, bottomContentSection, menuSection, transitionSection} =
    hetmenu[0];

  return (
    <section className="panel fourthsection" id="section4">
      <div className="wrapper-hetmenu">
        <div className="bannersectinlogo">
          <img src={bannerlogo}></img>
        </div>
        <div className="wrappermain">
          <img className="media" src={mainbannerbg} alt="Round Image" />
        </div>

        <div className="roundimages">
          <div className="roundtext-hetmenu">
            <h2>{transitionSection.topTitle}</h2>
            <h3>{transitionSection.bottomTitle}</h3>
          </div>
          <div className="roundimage-hetmenu"></div>
          <div className="scroll-down">
            <div className="icon-scroll"></div>
            <p>Scroll down</p>
          </div>
        </div>
      </div>

      <div className="wrappertest">
        <section className="section hero"></section>
        <div className="gradient-purple" id="hetmenusection">
          <h4
            className="hetmenuntitle"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            {contentSection.heading}
          </h4>
          <p
            className="hetmenuescription"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            {contentSection.description}
          </p>

          <div className="gradient-threebox-menu">
            <ul
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              {menuSection.Menu.map((item) => (
                <li key={item._key}>
                  <img
                    src={getImageUrl(item.image.asset._ref)}
                    alt={`Menu item ${item._key}`}
                    style={{maxWidth: '100%', height: 'auto'}}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="whitebgbox">
            <div className="instagramfeedimagesimain">
              <div className="instagramfeedimages">
                <div
                  className="contaernrul"
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-offset="500"
                  data-aos-duration="500"
                >
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={0}
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
                        spaceBetween: 0,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                      },
                      1024: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                      },
                    }}
                    modules={[Autoplay]}
                    className="mySwipers"
                  >
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="contaernrulitem"
                        data-aos="fade"
                        ddata-aos-easing="linear"
                        data-aos-offset="500"
                        data-aos-duration="500"
                      >
                        <img src={insta_3} alt="img" />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>

            <div className="whitewithvideomainbox">
              <div
                className="righttextbox"
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                <h5
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {bottomContentSection.bottomHeading}
                </h5>
                <p
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {bottomContentSection.bottomDescription}
                </p>
              </div>
              <div
                className="leftvideobox"
                data-aos="fade-left"
                data-aos-easing="ease-in-sine"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                <img
                  src={getImageUrl(bottomContentSection.bottomImage.asset._ref)}
                  alt="img"
                  data-speed="auto"
                />
                <div
                  className="bluearrowbottom"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <img src={arrow_blue1} alt="img" data-speed="auto" />
                </div>
                <h3
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {bottomContentSection.bottomHeading}
                </h3>
                <p
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  {bottomContentSection.bottomContent}
                </p>
              </div>
            </div>
            <div className="hetmenufixed">
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
    </section>
  );
};

export default Hetmenu;
