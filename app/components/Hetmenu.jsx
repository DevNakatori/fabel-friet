import React, { useRef, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';
import { getImageUrl } from '../js/imagesurl';

// import InstagramFeed from './InstagramFeed';
import bannerlogo from '../assets/resizeimgs/webp/logobanner.webp';
import mainbannerbg from '../assets/resizeimgs/webp/b31aa7dc7c0527a0ec7d013d969ab561-min.webp';
import arrow_blue1 from '../assets/resizeimgs/webp/arrow_blue1.webp';

import menu_one from '../assets/resizeimgs/webp/menuwebp/Fries6_FabelFriet.webp';
import menu_two from '../assets/resizeimgs/webp/menuwebp/Fries4_FabelFriet.webp';
import menu_three from '../assets/resizeimgs/webp/menuwebp/Fries2_FabelFriet.webp';
import menu_four from '../assets/resizeimgs/webp/menuwebp/Fries1_FabelFriet.webp';
import menu_five from '../assets/resizeimgs/webp/menuwebp/Fries5_FabelFriet.webp';
import menu_six from '../assets/resizeimgs/webp/menuwebp/Fries1_FabelFriet_1.webp';
import menu_seven from '../assets/resizeimgs/webp/menuwebp/Fries3_FabelFriet.webp';
import menu_eight from '../assets/resizeimgs/webp/friewebp/Fries4_FabelFriet.webp';

// import arrow_blue from '../assets/resizeimgs/webp/arrow_blue.webp';

import fabelfrietsticker2 from '../assets/resizeimgs/webp/fabelfrietsticker2.webp';
import fabelfrie_tsticker2 from '../assets/resizeimgs/webp/fabelfriet_sticker2.webp';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
  const [activeSection, setActiveSection] = useState('friet-section');


  const { language } = useLanguage();
  const [hetmenu, setHetmenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    timelineshetmenu.to('#section4 .roundimage-hetmenu, #section4 .roundtext-hetmenu',{
        scale: 2.5,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      }, 0); 

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

    gsap.fromTo(
      '.allfiressectionsmenu img',
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 1,
        ease: 'bounce.out',
        force3D: true,
        yoyo: true,
        scrollTrigger: {
          trigger: '#section4 .wrappertest',
          start: 'top top-500',
          end: 'top top-200',
          pin: true,
          once: true,
          markers: false,
        },
        onComplete: () => {
          gsap.to('.allfiressectionsmenu img', {
            // x: 'random(-10, 10)',
            // y: 'random(-10, 10)',
            scale: 1.1, // zoom in
            stagger: 0.3,
            zIndex: 22,
            duration: 1,
            ease: 'none',
            yoyo: true,
            repeat: -1,
          });
        },
      },
    );

    return () => {
      timelineshetmenu.scrollTrigger.kill();
    };
  }, [hetmenu]);

  useEffect(() => {
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

    let typeSplitmenudescription = new SplitType('[data-menudescription]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    gsap.from('[data-menudescription] .line', {
      y: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'sine.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-menudescription]',
      },
    });

    let typeSplitmenutitleright = new SplitType('[data-righttextboxtitle]', {
      types: 'lines, words, chars',
      tagName: 'span',
    });
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

    let typeSplitmenudescriptionright = new SplitType(
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
        start: 'top center',
        scrub: true,
      },
    });

    let typeSplitmenudescriptionrightbottom = new SplitType(
      '[data-righttextboxdescriptionbotom]',
      {
        types: 'lines, words, chars',
        tagName: 'span',
      },
    );

    gsap.from('[data-righttextboxdescriptionbotom] .line', {
      opacity: 0.3,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-righttextboxdescriptionbotom]',
        start: 'top center',
        scrub: true,
      },
    });
  }, [hetmenu]);

  useEffect(() => {
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
const numberOfFries = 80;

// Define your image sources here
const fryImageSources = [menu_one, menu_two, menu_three, menu_four, menu_five, menu_six, menu_seven, menu_eight];

useEffect(() => {
  if (!rainContainerRef.current || !canvasRef.current) return;

  // Load fry images
  fryImages.current = fryImageSources.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  // Resize canvas to fit the container
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const rainContainer = rainContainerRef.current;
    if (!canvas || !rainContainer) return; // Ensure refs are valid
    canvas.width = rainContainer.offsetWidth;
    canvas.height = rainContainer.offsetHeight;
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Create fries objects
  const createFries = () => {
    fries.current = [];
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is valid
    for (let i = 0; i < numberOfFries; i++) {
      fries.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        speed: Math.random() * 1 + 0.2, // Slower speed: 0.5 to 1.5 pixels per frame
        sway: Math.random() * 50 - 25,
        image: fryImages.current[Math.floor(Math.random() * fryImages.current.length)], // Random image
      });
    }
  };

  // Render fries
  const renderFries = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fries.current.forEach((fry) => {
      fry.y += fry.speed;
      fry.x += fry.sway * 0.01; // Slight sway effect
      if (fry.y > canvas.height) {
        fry.y = -50; // Reset to the top
        fry.x = Math.random() * canvas.width; // Random horizontal position
        fry.image = fryImages.current[Math.floor(Math.random() * fryImages.current.length)]; // Change image on reset
      }
      ctx.drawImage(fry.image, fry.x, fry.y, 200, 250); // Adjust fry size here
    });

    requestAnimationFrame(renderFries);
  };

  // Trigger rain effect on scroll
  ScrollTrigger.create({
    trigger: rainContainerRef.current,
    start: "top center",
    onEnter: () => {
      createFries();
      renderFries();
    },
    onLeaveBack: () => {
      fries.current = []; // Stop rendering when leaving the section
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    },
  });

  return () => {
    window.removeEventListener("resize", resizeCanvas);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };


  }, [hetmenu]);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['friet-section', 'snacks-section', 'drinks-section'];
      let currentSection = 'friet-section';  
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 10 && window.scrollY < section.offsetTop + section.offsetHeight) {
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
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="panel fourthsection" id="section4">
      <div className="wrapper-hetmenu">
        {/* <div className="bannersectinlogo">
          <img src={getImageUrl(logoImage.asset._ref)} alt="Banner logo" data-aos="fade" data-aos-easing="linear" data-aos-duration="4500"/>
        </div> */}
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
            <h2 dangerouslySetInnerHTML={{ __html: transitionSection.topTitle }} />
            <h3 dangerouslySetInnerHTML={{ __html: transitionSection.bottomTitle }} />
          </div>
          <div className="roundimage-hetmenu"></div>
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

      <div className="wrappertest" ref={rainContainerRef}>
        
        <section className="section hero"></section>
        <div className="gradient-purple" id="hetmenusection">
          <h4 className="hetmenuntitle" data-menutitle="" dangerouslySetInnerHTML={{ __html: contentSection.heading }} />
          <p className="hetmenuescription" data-menudescription="" dangerouslySetInnerHTML={{ __html: contentSection.description }} />
         <canvas className='canvasfries'
                ref={canvasRef}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
          <div className="whitebgbox">
            <canvas className='canvasfries'
                ref={canvasRef}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            {/* <div className="allfiressectionsmenu">
              <img src={menu_one} alt="img" width="10" height="10" />
              <img src={menu_two} alt="img" width="10" height="10" />
              <img src={menu_three} alt="img" width="10" height="10" />
              <img src={menu_four} alt="img" width="10" height="10" />
              <img src={menu_five} alt="img" width="10" height="10" />
              <img src={menu_six} alt="img" width="10" height="10" />
              <img src={menu_seven} alt="img" width="10" height="10" />
              <img src={menu_eight} alt="img" width="10" height="10" />
            </div> */}
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
                <div className="righttextbox">
                  <h5 data-righttextboxtitle="" dangerouslySetInnerHTML={{ __html: bottomContentSection.bottomHeading }} />
                  <p data-righttextboxdescription="" dangerouslySetInnerHTML={{ __html: bottomContentSection.bottomDescription }} />
                </div>
                <div className="leftvideobox">
                  <img
                    src={getImageUrl(
                      bottomContentSection.bottomImage.asset._ref,
                    )}
                    alt="Bottom section image"
                    data-speed="auto"
                  />
                  {/* <div
                    className="bluearrowbottom"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                  >
                    <div className="arrowimages">
                      <svg
                        width="100"
                        height="188"
                        viewBox="0 0 100 188"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="line2s"
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
                            <stop offset="0.000290329" stopColor="#0F274D" />
                            <stop offset="0.504985" stopColor="#1F314D" />
                            <stop offset="1" stopColor="#0d1e4d" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <h3 data-righttextboxdescriptionbotom="">
                    {bottomContentSection.bottomHeading}
                  </h3>
                  <p data-righttextboxdescriptionbotom="">
                    {bottomContentSection.bottomContent}
                  </p> */}
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
