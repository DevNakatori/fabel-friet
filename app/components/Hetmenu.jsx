import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ZoomSection from '~/components/ZoomSection';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';
import { getImageUrl } from '../js/imagesurl';
import images from '../js/images';
import { useMediaQuery } from '@react-hook/media-query';
import FrenchFriesRain from '~/components/FrenchFriesRain';
import alltitleAnimation from '../js/alltitleAnimation.js';
import alldescription from '../js/alldescription.js';
import allinnerlinedescriptn from '../js/allinnerlinedescriptn.js';
import blutextanimationtext from '../js/blutextanimationtext.js';
gsap.registerPlugin(ScrollTrigger, SplitText);
/* --------------------------------------------------------------------------------------------------------------------- */
const Hetmenu = () => {
  const [activeSection, setActiveSection] = useState('friet-section');
  const { language } = useLanguage();
  const [hetmenu, setHetmenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktopcanvashetmenu = useMediaQuery('(max-width: 767px)');
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchDataHetmenuData = async () => {
      const cachedData = localStorage.getItem(`hetmenuData_${language}`);
      //console.log('hetmenuData C Data:', cachedData);
      if (cachedData) {
        setHetmenu(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "hetmenu" && language == $lang]`,
            { lang: language },
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
  /* --------------------------------------------------------------------------------------------------------------------- */
  // GSAP Animations for Hetmenu
  useEffect(() => {
    if (hetmenu) {
      const timelineshetmenu = gsap.timeline({});
      timelineshetmenu.to('.fourthsection .wrappertest', {
        scrollTrigger: {
          trigger: '.fourthsection',
          start: '0% 0%',
          end: '8% 8%',
          scrub: true,
          once: false,
        },
        borderRadius: '0vw 0vw 0px 0px',
        ease: 'power1.inOut',
      });
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
          },
        },
        0,
      );
      return () => {
        if (timelineshetmenu.scrollTrigger) 
          {
        timelineshetmenu.scrollTrigger.kill();
          }
      };
    }
  }, [hetmenu]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    const isHardRefreshonzeptags = window.performance.navigation.type === 1;
    const animationDelayonzeptags = isHardRefreshonzeptags ? 300 : 300;

    const initiateAnimationsonzeptags = () => {
      const typeSplitvideoDescriptions = new SplitType('.onzeptags', {
        types: 'lines, words, chars',
        tagName: 'span',
      });

      gsap.from('.onzeptags .line', {
        opacity: 0.3,
        duration: 0.5,
        ease: 'power1.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.onzeptags',
          start: 'top center',
          scrub: true,
        },
      });
    };

    setTimeout(() => {
      initiateAnimationsonzeptags();
    }, animationDelayonzeptags);
    
    return () => {
     gsap.killTweensOf('.onzeptags .line');
   };
  }, [hetmenu]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (hetmenu) {
      const paths = document.querySelector('.line2s');
      if (paths) {
        const pathsLength = paths.getTotalLength();
        gsap.set(paths, {
          strokeDasharray: pathsLength,
          strokeDashoffset: pathsLength,
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: paths,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            markers: false,
          },
        });
      }
    }
  }, [hetmenu]);
  /* --------------------------------------------------------------------------------------------------------------------- */
  // if (window.innerWidth > 767) {
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const sections = ['friet-section', 'snacks-section', 'drinks-section'];
  //       let currentSection = 'friet-section';
  //       sections.forEach((sectionId) => {
  //         const section = document.getElementById(sectionId);
  //         if (
  //           section &&
  //           window.scrollY >= section.offsetTop - 10 &&
  //           window.scrollY < section.offsetTop + section.offsetHeight
  //         ) {
  //           currentSection = sectionId;
  //         }
  //       });
  //       setActiveSection(currentSection);
  //     };
  //     window.addEventListener('scroll', handleScroll);

  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, [hetmenu]);
  // }
  /* --------------------------------------------------------------------------------------------------------------------- */
  /* gold title start */
  useEffect(() => {
    if (hetmenu) {
      alltitleAnimation();
      alldescription();
      allinnerlinedescriptn();
      blutextanimationtext();
    }
  }, [hetmenu]);
  /* gold title start */
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
  if (!hetmenu || hetmenu.length === 0) return <div>No menu available.</div>;
  /* --------------------------------------------------------------------------------------------------------------------- */
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
      const yOffset = window.innerWidth <= 768 ? 20 : 100;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };
  /* --------------------------------------------------------------------------------------------------------------------- */
  return (
    <section className="panel fourthsection" id="section4">
      <div>
        <ZoomSection
          image={getImageUrl(transitionSection.image.asset._ref)}
          alt="Transition Section"
          h2Text={transitionSection.topTitle}
          h3Text={transitionSection.bottomTitle}
        />
        {/* --------------------------------------------------------------------------------------------------------------------- */}
        <div className="wrappertest">
          <div className="gradient-purple" id="hetmenusection">
            <h4
              className="hetmenuntitle"
              data-title=""
              data-speed="auto"
              dangerouslySetInnerHTML={{ __html: contentSection.heading }}
            />
            <p
              className="hetmenuescription"
              data-description=""
              data-speed="auto"
              dangerouslySetInnerHTML={{ __html: contentSection.description }}
            />

            <div className="whitebgbox">
              {isDesktopcanvashetmenu ? (
                <></>
              ) : (
                // <canvas
                //   className="canvasfries"
                //   ref={canvasRef}
                //   style={{position: 'absolute', top: -100, left: -50}}
                // />
                <FrenchFriesRain />
              )}

              <div
                className="menudynamic onlydesktop"
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
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
                {/* --------------------------------------------------------------------------------------------------------------------- */}
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
                              <h3>{frietCategory.subTitle}</h3>
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
                      {/* --------------------------------------------------------------------------------------------------------------------- */}
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
                      {/* --------------------------------------------------------------------------------------------------------------------- */}
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
              {/* --------------------------------------------------------------------------------------------------------------------- */}
              <div className="appcontainers">
                {/* Bottom Section */}
                <div className="whitewithvideomainbox">
                  <div className="righttextbox">
                    <h5
                      data-bluetitle=""
                      dangerouslySetInnerHTML={{
                        __html: bottomContentSection.bottomHeading,
                      }}
                    />
                    <p
                      className='onzeptags'
                      dangerouslySetInnerHTML={{
                        __html: bottomContentSection.bottomDescription,
                      }}
                    />
                  </div>
                  <div className="leftvideobox">
                    <img
                      src={getImageUrl(
                        bottomContentSection.bottomImage.asset._ref,
                      )}
                      alt="Bottom section image"
                      data-speed="auto"
                    />
                  </div>
                </div>
              </div>
              {/* --------------------------------------------------------------------------------------------------------------------- */}
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

export default Hetmenu;
