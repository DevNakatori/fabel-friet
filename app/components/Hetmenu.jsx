import React, { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/hetmenu.css';
import { getImageUrl } from '../js/imagesurl';

import InstagramFeed from './InstagramFeed';
import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/b31aa7dc7c0527a0ec7d013d969ab561-min.png';
import arrow_blue1 from '../assets/resizeimgs/arrow_blue1.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hetmenu = () => {
  const { language } = useLanguage();
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
    
    // Other GSAP animations...

    return () => {
      timelineshetmenu.scrollTrigger.kill();
    };
  }, [hetmenu]);

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
            { lang: language },
          );
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hetmenu || hetmenu.length === 0) return <div>No menu available.</div>;

  const { contentSection, bottomContentSection, menuSection, transitionSection } =
    hetmenu[0];

  return (
    <section className="panel fourthsection" id="section4">
      <div className="wrapper-hetmenu">
        <div className="bannersectinlogo">
          <img src={bannerlogo} alt="Banner logo" />
        </div>
        <div className="wrappermain">
          <img className="media" src={mainbannerbg} alt="Main banner background" />
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
                    style={{ maxWidth: '100%', height: 'auto' }}
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
                <InstagramFeed accessToken="IGQWROSmZAyY2dYT0NCUjFfVi1yRXhlUU15anhORXp6dWRXUjVGMUdtOUtHU2thNlFKR1l4Tkh4N08xbFYwMHpGTEhSSGRGdExNWnBic293NTdUZAFUyMDNqZA2Eya01vOGdzNUNTM0ZAwWFZA2ZAEcxb1VnWHl2bk91NWcZD" />
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
                  alt="Bottom section image"
                  data-speed="auto"
                />
                <div
                  className="bluearrowbottom"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <img src={arrow_blue1} alt="Blue arrow" data-speed="auto" />
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
