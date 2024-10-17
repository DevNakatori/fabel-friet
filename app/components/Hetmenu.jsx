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

import InstagramFeed from './InstagramFeed';
import bannerlogo from '../assets/resizeimgs/logobanner.png';
import arrow_blue1 from '../assets/resizeimgs/arrow_blue1.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {language} = useLanguage();
  const [hetmenu, sethetmenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from Sanity for Hetmenu
  useEffect(() => {
    const fetchDatahetmenuData = async () => {
      const cachedData = localStorage.getItem(`hetmenuData_${language}`);
      if (cachedData) {
        sethetmenu(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "hetmenu" && language == $lang]`,
            {lang: language},
          );
          //console.log('Fetched hetmenu Data:', data);
          localStorage.setItem(`hetmenuData_${language}`, JSON.stringify(data));
          sethetmenu(data);
        } catch (err) {
          console.error('Error fetching Hetmenu data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDatahetmenuData();
  }, [language]);

  // GSAP Animations for Hetmenu
  useEffect(() => {
    if (!hetmenu) return;

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
      scale: 2.5,
      z: 350,
      transformOrigin: 'center center',
      ease: 'power1.inOut',
      zIndex: 5,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hetmenu || hetmenu.length === 0) return <div>No menu available.</div>;

  const {contentSection, bottomContentSection, menuSection, transitionSection} =
    hetmenu[0];

  // Define tab content inside the component to have access to menuSection
  const friesContent = (
    <section className="menu-section">
      <ul>
        {menuSection.Menu.length > 0 && (
          <li key={menuSection.Menu[0]._key}>
            <img
              src={getImageUrl(menuSection.Menu[0].image.asset._ref)}
              alt={`Menu item ${menuSection.Menu[0]._key}`}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </li>
        )}
      </ul>
    </section>
  );

  const snacksContent = (
    <section className="menu-section">
      <ul>
        {menuSection.Menu.length > 1 && (
          <li key={menuSection.Menu[1]._key}>
            <img
              src={getImageUrl(menuSection.Menu[1].image.asset._ref)}
              alt={`Menu item ${menuSection.Menu[1]._key}`}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </li>
        )}
      </ul>
    </section>
  );

  const drinksContent = (
    <section className="menu-section">
      <ul>
        {menuSection.Menu.length > 2 && (
          <li key={menuSection.Menu[2]._key}>
            <img
              src={getImageUrl(menuSection.Menu[2].image.asset._ref)}
              alt={`Menu item ${menuSection.Menu[2]._key}`}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </li>
        )}
      </ul>
    </section>
  );

  // Define tabs with their respective content
  const tabs = [
    {label: 'Fries', content: friesContent},
    {label: 'Snacks', content: snacksContent},
    {label: 'Drinks', content: drinksContent},
  ];

  return (
    <section className="panel fourthsection" id="section4">
      <div className="wrapper-hetmenu">
        <div className="bannersectinlogo">
          <img src={bannerlogo} alt="Banner logo" />
        </div>
        <div className="wrappermain">
          <img
            className="media"
            src={getImageUrl(transitionSection.image.asset._ref)}
            alt={transitionSection.image.alt}
            width="10"
            height="10"
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

          <div className="gradient-threebox-menu onlydesktop">
            <ul
              data-aos="fade-up"
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
                    <InstagramFeed accessToken="IGQWRNdWVOZAjJMQ20xd0ZAWQXZA6NGVBM2RwLURBdGtubC1Hd1IwSE1iNXBKN0NzbmNWUDdib1NCczJvQnhXNGk4RC1EdGJKWVBza3ZADU3hVdENFNXRiVkMwRGo4Sm9ieUZAJcGVteDFEc2RkZAE52TldEU2gyTjlfLW8ZD" />
                  </div>
                </div>
              </div>

              {/* Tab Section */}
              <div
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
              </div>
              <div
                className="content onlymobile"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                {tabs[activeTab].content}
              </div>

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
                    <img src={arrow_blue1} alt="Blue arrow" data-speed="auto" />
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
