import React, {useRef, useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
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
import menu_one from '../assets/resizeimgs/webp/menuwebp/Fries6_FabelFriet.webp';
import menu_two from '../assets/resizeimgs/webp/menuwebp/Fries6_FabelFriet.webp';
import menu_three from '../assets/resizeimgs/webp/menuwebp/Fries2_FabelFriet.webp';
import menu_four from '../assets/resizeimgs/webp/menuwebp/Fries1_FabelFriet.webp';
import menu_five from '../assets/resizeimgs/webp/menuwebp/Fries5_FabelFriet.webp';
import menu_six from '../assets/resizeimgs/webp/menuwebp/Fries1_FabelFriet_1.webp';
import menu_seven from '../assets/resizeimgs/webp/menuwebp/Fries3_FabelFriet.webp';
//import menu_eight from '../assets/resizeimgs/webp/friewebp/Fries4_FabelFriet.webp';

import new_fries_one from '../assets/new_fries/new_1.png';
import new_fries_two from '../assets/new_fries/new_2.png';
import new_fries_three from '../assets/new_fries/new_3.png';
import new_fries_four from '../assets/new_fries/new_4.png';

import fabelfrietsticker2 from '../assets/resizeimgs/webp/fabelfrietsticker2.webp';
import fabelfrie_tsticker2 from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
  const [activeSection, setActiveSection] = useState('friet-section');

  const {language} = useLanguage();
  const [dataLoadedhetmenu, setDataLoadedhetmenu] = useState(false);
  const [hetmenu, setHetmenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from Sanity for Hetmenu
  useEffect(() => {
    const fetchDataHetmenuData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(
          `*[_type == "hetmenu" && language == $lang]`,
          {lang: language},
        );

        setHetmenu(data);
        setDataLoadedhetmenu(true);
      } catch (err) {
        console.error('Error fetching Hetmenu data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
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
        smoothTouch: 0.1,
      },
    });

    timelineshetmenu.to(
      '#section4 .roundimage-hetmenu, #section4 .roundtext-hetmenu',
      {
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      0,
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
        scale: 2.5,
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
        },
      },
      0,
    );

    return () => {
      timelineshetmenu.scrollTrigger.kill();
    };
  }, [hetmenu]);

  

  useEffect(() => {
    if (!dataLoadedhetmenu) return;
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
  }, [hetmenu]);

  const rainContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const fries = useRef([]);
  const fryImages = useRef([]);
  const numberOfFries = 40;
  const fryImageSources = [
    new_fries_one,
    new_fries_two,
    new_fries_three,
    new_fries_four,
  ];

  useEffect(() => {
    if (!dataLoadedhetmenu) return;
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
          speed: Math.random() * 1 + 0.2, // Slower speed: 0.5 to 1.5 pixels per frame
          sway: Math.random() * 50 - 25,
          image:
            fryImages.current[
              Math.floor(Math.random() * fryImages.current.length)
            ],
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
      window.removeEventListener('resize', resizeCanvas);
     // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [hetmenu]);

  useEffect(() => {
    if (!dataLoadedhetmenu) return;
    const handleScroll = () => {
      const sections = ['friet-section', 'snacks-section', 'drinks-section'];
      let currentSection = 'friet-section';
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (
          section &&
          window.scrollY >= section.offsetTop - 10 &&
          window.scrollY < section.offsetTop + section.offsetHeight
        ) {
          currentSection = sectionId;
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hetmenu]);

  useEffect(() => {
    const isHardRefreshhetmenu = window.performance.navigation.type === 1;
    const animationDelayhetmenu = isHardRefreshhetmenu ? 300 : 300;

    const initiateAnimationsonzhetmenu = () => {
      if (!dataLoadedhetmenu) return;

      let typeSplitmenutitle = new SplitType('[data-menutitle]', {
        types: 'lines, words, chars',
        tagName: 'span',
      });
      var charsmenutitle = typeSplitmenutitle.chars;
      gsap.from('[data-menutitle] .line', {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'circ.in',
        stagger: 0.3,
        scrollTrigger: {
          trigger: '[data-menutitle]',
        },
        onUpdate: function () {
          charsmenutitle.forEach((typeSplithetmenuititle) => {
            typeSplithetmenuititle.style.backgroundImage =
              "url('/assets/plain-gold-background-C9ahylQT.webp')";
            typeSplithetmenuititle.style.webkitBackgroundClip = 'text';
            typeSplithetmenuititle.style.webkitTextFillColor = 'transparent';
            typeSplithetmenuititle.style.backgroundPosition = '97px -83px';
          });
        },
      });

      const typeSplitmenudescription = new SplitType('[data-menudescription]', {
        types: 'lines, words, chars',
        tagName: 'span',
      });

      gsap.from('[data-menudescription] .line', {
        y: '100%',
        opacity: 0,
        duration: 0.45,
        ease: 'none.inOut',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-menudescription]',
          start: 'top center',
          once: false,
        },
      });

      const typeSplitmenutitleright = new SplitType(
        '[data-righttextboxtitle]',
        {
          types: 'lines, words, chars',
          tagName: 'span',
        },
      );
      var charsmenutitleright = typeSplitmenutitleright.chars;
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
          charsmenutitleright.forEach((typeSplithetmenuititleright) => {
            typeSplithetmenuititleright.style.backgroundPosition = '97px -83px';
          });
        },
      });

      const typeSplitmenudescriptionright = new SplitType(
        '[data-righttextboxdescription]',
        {
          types: 'lines, words, chars',
          tagName: 'span',
        },
      );

      gsap.from('[data-righttextboxdescription] .line', {
        opacity: 0.3,
        duration: 0.5,
        ease: 'power1.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-righttextboxdescription]',
          scrub: true,
        },
      });
    };

    setTimeout(() => {
      initiateAnimationsonzhetmenu();
    }, animationDelayhetmenu);

    // return () => {
    //   gsap.killTweensOf('[data-menutitle] .line');
    //   gsap.killTweensOf('[data-menudescription] .line');
    //   gsap.killTweensOf('[data-righttextboxtitle] .line');
    //   gsap.killTweensOf('[data-righttextboxdescription] .line');
    // };
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
      const yOffset = window.innerWidth <= 768 ? 20 : 100;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({top: yPosition, behavior: 'smooth'});
    }
  };

  return (
    <section className="panel fourthsection" id="section4">
      <div className="wrapper-hetmenu">
        <div className="wrappermain">
          <img
            className="media"
            src={getImageUrl(transitionSection.image.asset._ref)}
            alt="Transition Section"
            width="100"
            height="100"
          />
        </div>

        <div className="roundimages">
          <div className="roundtext-hetmenu">
            <h2
              dangerouslySetInnerHTML={{__html: transitionSection.topTitle}}
            />
            <h3
              dangerouslySetInnerHTML={{__html: transitionSection.bottomTitle}}
            />
          </div>
          <div className="roundimage-hetmenu"></div>
          <div className="scroll-down">
            <div className="icon-scroll"></div>
            <p>Scroll down</p>
          </div>
        </div>
      </div>

      <div className="wrappertest" ref={rainContainerRef}>
        <section className="section hero"></section>
        <div className="gradient-purple" id="hetmenusection">
          <h4
            className="hetmenuntitle"
            data-menutitle=""
            dangerouslySetInnerHTML={{__html: contentSection.heading}}
          />
          <p
            className="hetmenuescription"
            data-menudescription=""
            dangerouslySetInnerHTML={{__html: contentSection.description}}
          />

          <div className="whitebgbox">
            <canvas
              className="canvasfries"
              ref={canvasRef}
              style={{position: 'absolute', top: 0, left: 0}}
            />

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
              {/* Bottom Section */}
              <div className="whitewithvideomainbox">
                <div className="righttextbox">
                  <h5
                    data-righttextboxtitle=""
                    dangerouslySetInnerHTML={{
                      __html: bottomContentSection.bottomHeading,
                    }}
                  />
                  <p
                    data-righttextboxdescription=""
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
            <div className="hetmenufixed">
              <div className="overlaybannehand-bottoms"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hetmenu;
