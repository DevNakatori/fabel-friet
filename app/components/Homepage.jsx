import React, {useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import '../styles/homebanner.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {TextPlugin} from 'gsap/TextPlugin';
import {ScrollSmoother} from 'gsap/ScrollSmoother';
import SplitText from 'gsap/SplitText';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Cookies from 'js-cookie';
import bannerlogo from '../assets/resizeimgs/webp/logobanner.webp';
import writingicon from '../assets/resizeimgs/webp/writingicon.webp';
import posterimg from '../assets/resizeimgs/webp/Fabel-3D-Preview.webp';
import {getImageUrl} from '../js/imagesurl';

gsap.registerPlugin(
  TextPlugin,
  ScrollSmoother,
  SplitText,
  DrawSVGPlugin,
  ScrollTrigger,
);

const HomePage = () => {
  const {language} = useLanguage();
  const [bannerData, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const [loadings, setLoadings] = useState(true);

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const skipbuttons = document.getElementById('skipvideobtn');

  useEffect(() => {
    document.body.classList.add(currentLanguage);
    return () => {
      document.body.classList.remove(currentLanguage);
    };
  }, [currentLanguage]);

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  useEffect(() => {
    /* animation start */
    // const smoother = ScrollSmoother.create({
    //     smooth: 3,
    //     normalizeScroll: false,
    //     ignoreMobileResize: true,
    //     effects: true,
    //     preventDefault: false,
    // });
    // smoother.effects('.allfiressections img', { speed: 'auto' });

    // const smoother = ScrollSmoother.create({
    //   smooth: 1,
    //   effects: true,
    //   smoothTouch: 0.1,
    //   normalizeScroll: true,
    //   ignoreMobileResize: true,
    // });

    /* animation end */

    /* data fatched */
    const fetchData_HomePage = async () => {
      const cachedData = localStorage.getItem(`homeBannerData_${language}`);
      //console.log('homeBannerData Cached Data:', cachedData);
      
      if (cachedData) {
        setBanner(JSON.parse(cachedData));
        setLoading(false);
        setIsFirstLoad(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "homebanner" && language == $lang]`,
            { lang: language }
          );
          if (data && data.length > 0) {
            setTimeout(() => {
              //scrollToSection(window.location.hash);
              window.location.reload();
            }, 1000);
            setTimeout(() => {
              //scrollToSection(window.location.hash);
              document.querySelector('.language-switcher').classList.add('nomorelanguage');
            }, 200);
            console.log(`Fetched Data for language ${language}:`, data);
    
            localStorage.setItem(`homeBannerData_${language}`, JSON.stringify(data));
            setBanner(data);
          } else {
            console.log(`No data found for language: ${language}`);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
          setIsFirstLoad(false);
        }
      }
    };
    
    fetchData_HomePage();
  }, [language]);
  /* data fatched */

  const handleTimeUpdate = (e) => {
    const video = e.target;
    const percentage = (video.currentTime / video.duration) * 100;
    setProgressBarWidth(percentage);
    if (percentage >= 50 && !hasScrolled) {
      setHasScrolled(true);
      gsap.to('.scrollmeater', {
        duration: 1,
        y: '-225px', 
        ease: 'bounce.out',
      });
    }
  };

  
  const handleSkipVideo = () => {
    const videos = document.getElementById('myVideo');
    const skipbuttons = document.getElementById('skipvideobtn');
    skipbuttons.classList.add('hidden');
    if (videos) {
      videos.pause();
      videos.currentTime = videos.duration;
      document.body.classList.remove('hiddenoverflow');
      videos.classList.add('hidden');
      skipbuttons.classList.add('hidden');
      document.querySelector('.progress-bar-container').classList.add('hidden');
      document.querySelector('.scrollmeater').classList.add('hidden');


      const video = document.getElementById('myVideo');
      const overlayMain = document.querySelector('.banner_overlaymain');
      const overlay = document.querySelector('.banner_overlay');
      const elements = {
        logo: document.querySelector('.bannerlogo'),
        title: document.querySelector('.banner_title_text'),
        content: document.querySelector('.banner_content_text'),
        button: document.querySelector('.banner_bottombtn'),
        rotateText: document.querySelector('.bannerrotate_text'),
      };

      const languageSwitchers =
        document.getElementsByClassName('language-switcher');
      if (languageSwitchers.length > 0) {
        languageSwitchers[0].style.display = 'block';
      }
      const header = document.getElementsByClassName('headernew');
      if (header.length > 0) {
        header[0].style.display = 'block';
      }
      gsap.fromTo(
        '.headernew .desktop-menu li',
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 2,
          ease: 'power2.out',
          delay: 2,
          repeat: 0,
        },
      );

      if (overlayMain) {
        gsap.to('.banner_overlaymain', {
          duration: 1,
          delay: 0,
          autoAlpha: 1,
          ease: 'expo.inOut',
          zIndex:7
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          duration: 2,
          opacity: 1,
          ease: 'power2.out',
          delay: 0.2,
        });
      }

      gsap.to('.overlaybannehand-bottom', {
        duration: 1.5,
        bottom: '0px',
        ease: 'power1.inOut',
        delay: 0.1,
        stagger: 0.1,
      });

      gsap.fromTo(
        elements.logo,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1,
          stagger: 0.2,
        },
      );

      gsap.fromTo(
        elements.title,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1.5,
          stagger: 0.3,
        },
      );

      gsap.fromTo(
        elements.content,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 2,
          stagger: 0.4,
        },
      );

      gsap.fromTo(
        elements.button,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 2.5,
          stagger: 0.5,
        },
      );

      gsap.to('.overlaybannehand-left', {
        duration: 1,
        left: '0px',
        ease: 'power1.inOut',
        delay: 3,
        stagger: 0.6,
      });

      gsap.to('.overlaybannehand-right', {
        duration: 1,
        right: '0px',
        ease: 'power1.inOut',
        delay: 3,
        stagger: 0.6,
      });

      gsap.fromTo(
        elements.rotateText,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 4,
          stagger: 0.7,
        },
      );

      gsap.fromTo(
        elements.rotateText,
        {text: ''},
        {
          text: bannerData[0].bannerText,
          duration: bannerData[0].bannerText.length * 0.05,
          ease: 'none',
          delay: 4.5,
          stagger: 0.8,
        },
      );

      gsap.to('body', {delay: 3.5, onComplete: removeClass});

      gsap.fromTo(
        '.banner_content_text p span.bold img.imgerasr_one',
        {y: '-100%'},
        {
          duration: 0.5,
          y: '0%',
          ease: 'power2.out',
          opacity: 1,
          delay: 5,
        },
      );

      gsap.fromTo(
        '.banner_content_text p span.bold img.imgerasr_two',
        {y: '-100%'},
        {
          duration: 0.5,
          y: '0%',
          ease: 'power2.out',
          opacity: 1,
          delay: 5.5,
        },
      );

      gsap.fromTo(
        '#target',
        {drawSVG: '0 0'},
        {
          drawSVG: '100% -175%',
          duration: 1,
          ease: 'none',
          repeat: 0,
          delay: 6,
        },
      );

      gsap.fromTo(
        '#target_one',
        {drawSVG: '0 0'},
        {
          drawSVG: '100% -175%',
          duration: 1,
          ease: 'none',
          repeat: 0,
          delay: 6.5,
        },
      );

      gsap.fromTo(
        '.rightsidebullets ul li',
        {opacity: 0, y: -30},
        {
          opacity: 1,
          y: 0,
          stagger: 0.5,
          duration: 1,
          ease: 'power2.out',
          delay: 5.5,
        },
      );
      
    }
  };

  /* loading animation start */
  useEffect(() => {
    if (!loading) {
      gsap.to('.loadersite', {
        duration: 0,
        opacity: 0,
        onComplete: () => {
         // document.body.classList.add('hiddenoverflow');
          gsap.to('.banner_video', {
            duration: 1,
            delay: 0,
            autoAlpha: 1,
            ease: 'expo.inOut',
          });
          setTimeout(() => {
            setLoading(false);
          }, 0);
        },
      });
    }
  }, [loading]);
  /* loading animation end */

  /* all overlay banner animation start */
  useEffect(() => {
    const video = document.getElementById('myVideo');
    const overlayMain = document.querySelector('.banner_overlaymain');
    const overlay = document.querySelector('.banner_overlay');
    const elements = {
      logo: document.querySelector('.bannerlogo'),
      title: document.querySelector('.banner_title_text'),
      content: document.querySelector('.banner_content_text'),
      button: document.querySelector('.banner_bottombtn'),
      rotateText: document.querySelector('.bannerrotate_text'),
    };

    const handlePlay = () => {
      console.log('The video has started playing.');
      document.body.classList.add('hiddenoverflow');
    };

    const handleVideoEnd = () => {
      console.log('video end');
      video.classList.add('hidden');
      const skipbuttons = document.getElementById('skipvideobtn');
      skipbuttons.classList.add('hidden');
      document.querySelector('.progress-bar-container').classList.add('hidden');
      document.querySelector('.scrollmeater').classList.add('hidden');

      const languageSwitchers =
        document.getElementsByClassName('language-switcher');
      if (languageSwitchers.length > 0) {
        languageSwitchers[0].style.display = 'block';
      }
      const header = document.getElementsByClassName('headernew');
      if (header.length > 0) {
        header[0].style.display = 'block';
      }
      gsap.fromTo(
        '.headernew .desktop-menu li',
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 2,
          ease: 'power2.out',
          delay: 2,
          repeat: 0,
        },
      );

      if (overlayMain) {
        gsap.to('.banner_overlaymain', {
          duration: 1,
          delay: 0,
          autoAlpha: 1,
          ease: 'expo.inOut',
          zIndex:7
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          duration: 2,
          opacity: 1,
          ease: 'power2.out',
          delay: 0.2,
        });
      }

      gsap.to('.overlaybannehand-bottom', {
        duration: 1.5,
        bottom: '0px',
        ease: 'power1.inOut',
        delay: 0.1,
        stagger: 0.1,
      });

      gsap.fromTo(
        elements.logo,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1,
          stagger: 0.2,
        },
      );

      gsap.fromTo(
        elements.title,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1.5,
          stagger: 0.3,
        },
      );

      gsap.fromTo(
        elements.content,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 2,
          stagger: 0.4,
        },
      );

      gsap.fromTo(
        elements.button,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 2.5,
          stagger: 0.5,
        },
      );

      gsap.to('.overlaybannehand-left', {
        duration: 1,
        left: '0px',
        ease: 'power1.inOut',
        delay: 3,
        stagger: 0.6,
      });

      gsap.to('.overlaybannehand-right', {
        duration: 1,
        right: '0px',
        ease: 'power1.inOut',
        delay: 3,
        stagger: 0.6,
      });

      gsap.fromTo(
        elements.rotateText,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 4,
          stagger: 0.7,
        },
      );

      gsap.fromTo(
        elements.rotateText,
        {text: ''},
        {
          text: bannerData[0].bannerText,
          duration: bannerData[0].bannerText.length * 0.05,
          ease: 'none',
          delay: 4.5,
          stagger: 0.8,
        },
      );

      gsap.to('body', {delay: 3.5, onComplete: removeClass});

      gsap.fromTo(
        '.banner_content_text p span.bold img.imgerasr_one',
        {y: '-100%'},
        {
          duration: 0.5,
          y: '0%',
          ease: 'power2.out',
          opacity: 1,
          delay: 5,
        },
      );

      gsap.fromTo(
        '.banner_content_text p span.bold img.imgerasr_two',
        {y: '-100%'},
        {
          duration: 0.5,
          y: '0%',
          ease: 'power2.out',
          opacity: 1,
          delay: 5.5,
        },
      );

      gsap.fromTo(
        '#target',
        {drawSVG: '0 0'},
        {
          drawSVG: '100% -175%',
          duration: 1,
          ease: 'none',
          repeat: 0,
          delay: 6,
        },
      );

      gsap.fromTo(
        '#target_one',
        {drawSVG: '0 0'},
        {
          drawSVG: '100% -175%',
          duration: 1,
          ease: 'none',
          repeat: 0,
          delay: 6.5,
        },
      );

      gsap.fromTo(
        '.rightsidebullets ul li',
        {opacity: 0, y: -30},
        {
          opacity: 1,
          y: 0,
          stagger: 0.5,
          duration: 1,
          ease: 'power2.out',
          delay: 5.5,
        },
      );

      const scrollToSection = (hash) => {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({behavior: 'smooth'});
        }
      };
  
      if (window.location.hash) {
        setTimeout(() => {
          scrollToSection(window.location.hash);
          document.body.classList.remove('hiddenoverflow');
        }, 0);
      }

    };

    if (video) {
      video.autoplay = true;
      video.addEventListener('play', handlePlay);
      video.addEventListener('ended', handleVideoEnd);
      //document.body.classList.add('hiddenoverflow');
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [bannerData]);
  /* all overlay banner animation end */

  /* remove body class */
  function removeClass() {
    document.body.classList.remove('hiddenoverflow');
  }


  // Skip video functionality
  /* remove body class */

  /* Scribble doodle animation start */
  useEffect(() => {
    const paragraph = document.getElementById('text');
    if (paragraph) {
      const words = paragraph.innerText.split(' ');

      if (words.length >= 5) {
        words[1] = `<span class="bold"><svg version="1.0" x="0px" y="0px" viewBox="0 0 260 152" style="enable-background:new 0 0 260 152;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="target" class="st0" d="M16.8,61.9c0,0,44.4-36.5,79.7-53.5c0,0-70.3,59.4-88.2,85c0,0,86.5-72.4,190.3-85c0,0-103.5,72.1-162.7,116.5c0,0,142.1-77.5,215.9-105.5c0,0-88.2,73.7-115,98.4c0,0,55.9-34.7,79.7-39.1c0,0-6,23.4-48.5,65c0,0,16.3-15.1,41.8-23.5"/></svg> ${words[1]} </span>`;
        words[4] = `<span class="bold"><svg version="1.0" x="0px" y="0px" viewBox="0 0 260 152" style="enable-background:new 0 0 260 152;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="target_one" class="st0" d="M16.8,61.9c0,0,44.4-36.5,79.7-53.5c0,0-70.3,59.4-88.2,85c0,0,86.5-72.4,190.3-85c0,0-103.5,72.1-162.7,116.5c0,0,142.1-77.5,215.9-105.5c0,0-88.2,73.7-115,98.4c0,0,55.9-34.7,79.7-39.1c0,0-6,23.4-48.5,65c0,0,16.3-15.1,41.8-23.5"/></svg> ${words[4]} </span>`;
        paragraph.innerHTML = words.join(' ');
      }
    }
  }, [bannerData]);
  /* Scribble doodle animation end */

  /* forcefully scroll top */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bannerData]);
  /* forcefully scroll top */

  if (loading && isFirstLoad) {
    return (
      <div className="loadersite">
        <div className="logosvg">
          <img src={bannerlogo} alt="logo" />
        </div>
        <div className="loader1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bannersection" id="section1">
      <div className="banner_video">
        {bannerData[0].bannerVideo && (
          <video
            id="myVideo"
            src={bannerData[0].bannerVideo}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
          />
        )}

        <div className="progress-bar-container">
          <div
              className="progress-bar"
              style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>

        <div className='scrollmeater'>
            <div className='maskimg'>
            <img
              src={getImageUrl(bannerData[0].bannerLogo.asset._ref)}
              alt={bannerData[0].bannerLogo.alt}
            />
            </div>   
        </div>

        <button id="skipvideobtn" className='skipvideo' onClick={handleSkipVideo}>
          <i className='skipicon'>
        <svg width="800px" height="800px" viewBox="0 0 512 512" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="skip" transform="translate(0.000000, 0.000000)" fill="#000000">
            <g id="add" transform="translate(128.000000, 128.000000)">
                <path d="M213.333333,-2.84217094e-14 L213.333333,256 L256,256 L256,-2.84217094e-14 L213.333333,-2.84217094e-14 Z M2.84217094e-14,-2.84217094e-14 L2.84217094e-14,256 L213.333333,128 L2.84217094e-14,-2.84217094e-14 Z M42.6666667,75.328 L130.432,128 L42.6666667,180.650667 L42.6666667,75.328 Z" id="Shape">

</path>
            </g>
        </g>
    </g>
</svg></i>
          Skip Video
        </button>
      </div>
      <div className="banner_overlaymain">
        <div className="banner_overlay">
          <div className="bannerlogo">
            <img
              src={getImageUrl(bannerData[0].bannerLogo.asset._ref)}
              alt={bannerData[0].bannerLogo.alt}
            />
          </div>
          <div className="banner_title_text">
            <h1>{bannerData[0].title}</h1>
          </div>
          <div className="banner_content_text">
            <p id="text">{bannerData[0].bannerContent}</p>
          </div>
          {bannerData[0].bannerButton && (
            <a
              className="banner_bottombtn"
              href={bannerData[0].bannerButton.buttonLink}
            >
              {bannerData[0].bannerButton.buttonText}
            </a>
          )}
          <div className="bannerrotate_text">
            <p>{bannerData[0].bannerText}</p>
          </div>
        </div>
        <div className="overlaybannehand">
          <div className="overlaybannehand-left swingshand"></div>
          <div className="overlaybannehand-right swingshand"></div>
          <div className="overlaybannehand-bottom"></div>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
