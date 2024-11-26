import React, {useEffect, useState} from 'react';
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

// import InstagramFeed from './InstagramFeed';
import bannerlogo from '../assets/resizeimgs/webp/logobanner.webp';
import mainbannerbg from '../assets/resizeimgs/webp/b31aa7dc7c0527a0ec7d013d969ab561-min.webp';
import arrow_blue1 from '../assets/resizeimgs/webp/arrow_blue1.webp';

import menu_one from '../assets/resizeimgs/webp/menu1.webp';
import menu_two from '../assets/resizeimgs/webp/menu2.webp';
import menu_three from '../assets/resizeimgs/webp/menu3.webp';
import menu_four from '../assets/resizeimgs/webp/menu4.webp';
import menu_five from '../assets/resizeimgs/webp/menu5.webp';
import menu_six from '../assets/resizeimgs/webp/menu6.webp';
import menu_seven from '../assets/resizeimgs/webp/menu7.webp';
import arrow_blue from '../assets/resizeimgs/webp/arrow_blue.webp';
import fabelfrietsticker2 from '../assets/resizeimgs/webp/fabelfrietsticker2.webp';
import fabelfrie_tsticker2 from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
  const [activeSection, setActiveSection] = useState('friet-section');

  const {language} = useLanguage();
  const [hetmenu, setHetmenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [activeTab, setActiveTab] = useState(0);

  // Fetch Data from Sanity for Hetmenu
  useEffect(() => {
    const fetchDataHetmenuData = async () => {
      const cachedData = localStorage.getItem(`hetmenuData_${language}`);
      if (cachedData) {
        setHetmenu(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "hetmenu" && language == $lang]`,
            {lang: language},
          );
          localStorage.setItem(`hetmenuData_${language}`, JSON.stringify(data));
          setHetmenu(data);
        } catch (err) {
          console.error('Error fetching Hetmenu data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDataHetmenuData();
  }, [language]);

  // GSAP Animations for Hetmenu
  useEffect(() => {
    if (!hetmenu) return;

    const timelineshetmenu = gsap.timeline({
      scrollTrigger: {
        trigger: '#section4 .wrapper-hetmenu',
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

    timelineshetmenu.to(
      '#section4 .roundimage-hetmenu, #section4 .roundtext-hetmenu',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
        //zIndex: 5,
      },
    );

    timelineshetmenu.to('.fourthsection .wrappertest', {
      scrollTrigger: {
        trigger: '.fourthsection',
        start: '10% 10%',
        end: '30% 30%',
        scrub: true,
        once: true,
      },
      borderRadius: '0vw 0vw 0px 0px',
      ease: 'power1.inOut',
    });

    timelineshetmenu.to(
      '#section4 .section.hero',
      {
        scale: 1.1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    );

    timelineshetmenu.to(
      '#section4 .gradient-purple',
      {
        scale: 1,
        borderRadius: 0,
        ease: 'power3.easeIn',
        scrollTrigger: {
          trigger: '#section4 .wrappertest',
          start: 'top top-500',
          end: 'top top-200',
          // onEnter: () => document.body.classList.add('scrolled'),
          // onEnterBack: () => document.body.classList.add('scrolled'),
        },
      },
      0,
    );

    

    // gsap.fromTo(
    //   '#section4 .gradient-threebox-menu',
    //   {
    //     opacity: 0,
    //     y: 50,
    //     scale: 1,
    //   },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scale: 1,
    //     duration: 1,
    //     ease: 'power2.out',
    //     delay: 2,
    //     stagger: 0.2,
    //     scrollTrigger: {
    //       trigger: '#section4 .gradient-purple',
    //       markers: false,
    //     },
    //   },
    // );

    // gsap.to('.allfiressectionsmenu img', {
    //   y: 20,
    //   repeat: -1,
    //   yoyo: true,
    //   duration: 5,
    //   ease: 'sine.inOut',
    // });

    return () => {
      timelineshetmenu.scrollTrigger.kill();
    };
  }, [hetmenu]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hetmenu || hetmenu.length === 0) return <div>No menu available.</div>;

  const {
    contentSection,
    bottomContentSection,
    menuSection,
    transitionSection,
    logoImage,
  } = hetmenu[0];

  const handleScrollToSection = (sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = window.innerWidth <= 768 ? 20 : 10;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({top: yPosition, behavior: 'smooth'});
    }
  };

  return (
    <section className="panel fourthsection" id="section4">
      <div className="wrapper-hetmenu">
        <div className="bannersectinlogo">
          <img src={getImageUrl(logoImage.asset._ref)} alt="Banner logo" />
        </div>
        <div className="wrappermain">
          <img
            className="media"
            // src={getImageUrl(transitionSection.image.asset._ref)}
            src={mainbannerbg}
            alt="Transition Section"
            width="100" // Adjust size as needed
            height="100"
          />
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
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            {contentSection.heading}
          </h4>
          <p
            className="hetmenuescription"
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            {contentSection.description}
          </p>

          <div className="whitebgbox">
            <div className="allfiressectionsmenu">
              <img src={menu_one} alt="img" width="10" height="10" />
              <img src={menu_two} alt="img" width="10" height="10" />
              <img src={menu_three} alt="img" width="10" height="10" />
              <img src={menu_four} alt="img" width="10" height="10" />
              <img src={menu_five} alt="img" width="10" height="10" />
              <img src={menu_six} alt="img" width="10" height="10" />
              <img src={menu_seven} alt="img" width="10" height="10" />
            </div>

            <div className="menudynamic onlydesktop">
              <ul className="categotyfilter">
                <li>
                  <button
                    onClick={() => handleScrollToSection('friet-section')}
                    className={
                      activeSection === 'friet-section' ? 'active' : ''
                    }
                  >
                    Friet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection('snacks-section')}
                    className={
                      activeSection === 'snacks-section' ? 'active' : ''
                    }
                  >
                    Snacks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection('drinks-section')}
                    className={
                      activeSection === 'drinks-section' ? 'active' : ''
                    }
                  >
                    Drinks
                  </button>
                </li>
              </ul>

              <div className="innermenudynamicone">
                <div className="innermenudynamictwo">
                  <section className="menu-section">
                    {/* Display Friet */}
                    <div id="friet-section">
                      {menuSection?.friet?.length > 0 ? (
                        menuSection.friet.map((frietCategory) => (
                          <div
                            key={frietCategory._key}
                            className="friet-category"
                          >
                            <h2>{frietCategory.title}</h2>
                            <div className="menu-item">
                              {frietCategory.menu.map((frietItem) => (
                                <div key={frietItem._key}>
                                  {frietItem.recipedetails ? (
                                    <details>
                                      <summary>
                                        <p
                                          className="summerytext"
                                          dangerouslySetInnerHTML={{
                                            __html: frietItem.recipe,
                                          }}
                                        />
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: frietItem.price,
                                          }}
                                        />
                                      </summary>
                                      <p>{frietItem.recipedetails}</p>
                                    </details>
                                  ) : (
                                    <div className="menutextdetails">
                                      <p
                                        className="summerytext"
                                        dangerouslySetInnerHTML={{
                                          __html: frietItem.recipe,
                                        }}
                                      />
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: frietItem.price,
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Data not available</p>
                      )}
                    </div>

                    {/* Display Snacks */}
                    <div id="snacks-section">
                      {menuSection?.snacks?.length > 0 ? (
                        menuSection.snacks.map((snackCategory) => (
                          <div
                            key={snackCategory._key}
                            className="snack-category"
                          >
                            <h2>{snackCategory.title}</h2>
                            <div className="menu-item">
                              {snackCategory.menu.map((snackItem) => (
                                <div key={snackItem._key}>
                                  {snackItem.recipedetails ? (
                                    <details>
                                      <summary>
                                        <p
                                          className="summerytext"
                                          dangerouslySetInnerHTML={{
                                            __html: snackItem.recipe,
                                          }}
                                        />
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: snackItem.price,
                                          }}
                                        />
                                      </summary>
                                      <p>{snackItem.recipedetails}</p>
                                    </details>
                                  ) : (
                                    <div className="menutextdetails">
                                      <p
                                        className="summerytext"
                                        dangerouslySetInnerHTML={{
                                          __html: snackItem.recipe,
                                        }}
                                      />
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: snackItem.price,
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Data not available</p>
                      )}
                    </div>

                    {/* Display Drinks */}
                    <div id="drinks-section">
                      {menuSection?.drinks?.length > 0 ? (
                        menuSection.drinks.map((drinksCategory) => (
                          <div
                            key={drinksCategory._key}
                            className="drinks-category"
                          >
                            <h2>{drinksCategory.title}</h2>
                            <div className="menu-item">
                              {drinksCategory.menu.map((drinkItem) => (
                                <div key={drinkItem._key}>
                                  {drinkItem.recipedetails ? (
                                    <details>
                                      <summary>
                                        <p
                                          className="summerytext"
                                          dangerouslySetInnerHTML={{
                                            __html: drinkItem.recipe,
                                          }}
                                        />
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: drinkItem.price,
                                          }}
                                        />
                                      </summary>
                                      <p>{drinkItem.recipedetails}</p>
                                    </details>
                                  ) : (
                                    <div className="menutextdetails">
                                      <p
                                        className="summerytext"
                                        dangerouslySetInnerHTML={{
                                          __html: drinkItem.recipe,
                                        }}
                                      />
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: drinkItem.price,
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Data not available</p>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="appcontainers">
              <div className="instagramfeedimagesimain">
                <div className="instagramfeedimages">
                  <div
                    className="contaernrul"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-offset="500"
                    data-aos-duration="500"
                  >
                    {/* <InstagramFeed accessToken="IGQWRQQjBjX3EyUGgzb2dsU2Q3YTM1VDVaRnN4M0RlQmVBOTVMTDNOWGtnTzRQNy1LX1NWOWN0YlB5YTF1ZAV9uS3NIOGh4NkhoTVlMeGlpaklfOXhxdHNtV0F0T3ZAGRHVNWE13VjkwVUxqOVRSZAlYyb1g2Y051ZAHMZD" /> */}
                  </div>
                </div>
              </div>

              {/* Tab Section */}
              {/* <div
                className="tabs onlymobile"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={activeTab === index ? 'active' : ''}
                  >
                    {tab.label}
                  </button>
                ))}
              </div> */}
              {/* <div
                className="content onlymobile"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                {tabs[activeTab].content}
              </div> */}

              {/* Bottom Section */}
              <div className="whitewithvideomainbox">
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
                    {bottomContentSection.bottomHeading}
                  </h5>
                  <p
                    data-aos="fade-up"
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
                  data-aos-duration="500"
                >
                  <img
                    src={getImageUrl(
                      bottomContentSection.bottomImage.asset._ref,
                    )}
                    alt="Bottom section image"
                    data-speed="auto"
                  />
                  <div
                    className="bluearrowbottom"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    <img
                      src={arrow_blue1}
                      alt="Blue arrow"
                      data-speed="auto"
                      className="swings"
                    />
                  </div>
                  <h3
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    {bottomContentSection.bottomHeading}
                  </h3>
                  <p
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    {bottomContentSection.bottomContent}
                  </p>
                </div>
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
