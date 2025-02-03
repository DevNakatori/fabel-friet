import React, {useEffect, useState, useRef} from 'react';
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
import writingicon from '../assets/resizeimgs/writingicon.png';
import posterimg from '../assets/resizeimgs/Fabel-3D-Preview.png';
import {getImageUrl} from '../js/imagesurl';
import SplitType from 'split-type';

import mp3song from '../assets/SoundsofAmsterdamCity.mp3';

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
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [loadings, setLoadings] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const skipbuttons = document.getElementById('skipvideobtn');
  const extraProgressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
            document.querySelector('.language-switcher').classList.add('nomorelanguage');
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
    setProgressPercentage(percentage);
    setProgressBarWidth(percentage);
    if (percentage >= 5 && !hasScrolled) {
      setHasScrolled(true);
    }
    const pathLength = extraProgressBarRef.current.getTotalLength();
    const dashOffset = pathLength - (percentage / 100) * pathLength;
    extraProgressBarRef.current.style.strokeDasharray = pathLength;
    extraProgressBarRef.current.style.strokeDashoffset = dashOffset;
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
      document.querySelector('.percentagebar').classList.add('hidden');
      document.querySelector('.audioplayer').classList.add('hidden');
      audioRef.current.pause();

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
          duration: 3,
          delay: 0,
          autoAlpha: 1,
          ease: 'expo.inOut',
          zIndex: 7,
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          duration: 3,
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

      gsap.fromTo(
        elements.rotateText,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1,
          stagger: 2,
        },
      );

      gsap.fromTo(
        elements.rotateText,
        {text: ''},
        {
          text: bannerData[0].bannerText,
          duration: bannerData[0].bannerText.length * 0.35,
          ease: 'power2.out',
          delay: 1,
          stagger: 2.5,
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
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.5,
        onComplete: () => {
          gsap.to('.banner_video', {
            duration: 1,
            delay: 0.5,
            autoAlpha: 1,
            ease: 'power4.out',
          });
          setTimeout(() => {
            setLoading(false);
          }, 1500);
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
      setTimeout(() => {
        if (!sessionStorage.getItem('pageRefreshed')) {
          sessionStorage.setItem('pageRefreshed', 'true');
         // location.reload(); 
      }
      }, 2500);
      document.body.classList.add('hiddenoverflow');
    };

    const handleVideoEnd = () => {
      video.classList.add('hidden');
      const skipbuttons = document.getElementById('skipvideobtn');
      skipbuttons.classList.add('hidden');
      document.querySelector('.progress-bar-container').classList.add('hidden');
      document.querySelector('.percentagebar').classList.add('hidden');
      document.querySelector('.audioplayer').classList.add('hidden');
      audioRef.current.pause();

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
          duration: 3,
          delay: 0,
          autoAlpha: 1,
          ease: 'expo.inOut',
          zIndex: 7,
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          duration: 3,
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

      var h1 = elements.title.querySelector('h1');
      var tl = gsap.timeline(),
        mySplitText = new SplitText(h1, {type: 'words,chars'}),
        chars = mySplitText.chars;
      tl.from(chars, {
        opacity: 0,
        y: -100,
        ease: 'back',
        duration: 3,
        stagger: 0.1,
        transformOrigin: '0% 50% -50',
        onUpdate: function () {
          chars.forEach((char) => {
            char.style.backgroundImage =
              "url('/assets/plain-gold-background-C9ahylQT.webp')";
            char.style.webkitBackgroundClip = 'text';
            char.style.webkitTextFillColor = 'transparent';
            char.style.backgroundPosition = '97px -83px';
          });
        },
      });

      const H1text = new SplitType(h1, {types: 'lines', lineClass: 'H1mask'});

      var loom = document.querySelectorAll('.H1mask');
      loom.forEach((value, i) => {
        var mask = document.createElement('div');
        mask.setAttribute('id', 'maskOut');
        value.parentNode.insertBefore(mask, value);
        mask.appendChild(value);
      });
      gsap.fromTo(
        elements.content,
        {opacity: 0},
        {
          opacity: 1,
        },
      );
      const ptext = elements.content.querySelector('p');
      const text = new SplitType(ptext, {
        types: 'lines',
        lineClass: 'lineChild',
      });

      var loom = document.querySelectorAll('.lineChild');
      loom.forEach((value, i) => {
        var mask = document.createElement('div');
        mask.setAttribute('id', 'mask');
        value.parentNode.insertBefore(mask, value);
        mask.appendChild(value);
      });

      gsap.set('.lineChild', {
        y: '200%',
        opacity: 0,
      });

      let a = gsap.to('.lineChild', {
        y: '0%',
        duration: 4,
        stagger: 0.1,
        delay: 1,
        opacity: 1,
      });
      let b = gsap.to('#mask', {
        overflow: 'visible',
        duration: 4,
        delay: 1,
      });

      gsap.fromTo(
        elements.content,
        {opacity: 0},
        {
          opacity: 1,
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

      gsap.fromTo(
        elements.rotateText,
        {opacity: 0, y: -50},
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1,
          stagger: 2,
        },
      );

      gsap.fromTo(
        elements.rotateText,
        {text: ''},
        {
          text: bannerData[0].bannerText,
          duration: bannerData[0].bannerText.length * 0.35,
          ease: 'power2.out',
          delay: 1,
          stagger: 2.5,
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
          duration: 3,
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
          duration: 3,
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

      gsap.to('#section1 .bannerlogo', {
        duration: 0.1,
        width: '0px',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#section1',
          scrub: true,
          once: false,
        },
      });

      gsap.to('.headernew nav ul.desktop-menu .bannersectinlogo', {
        duration: 1,
        x: '-50%',
        y: '0%',
        width: '80px',
        ease: 'power1.inOut',
        transformOrigin: 'center center',
        scrollTrigger: {
          trigger: '#smooth-content',
          scrub: true,
          start: '0.1% 0.1%',
          end: '1% 1%',
          once: false,
        },
      });

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
      document.body.classList.add('hiddenoverflow');
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

  useEffect(() => {
    const animateButton = (e) => {
      e.preventDefault();
      const button = e.target;
      button.classList.remove('animate');
      button.classList.add('animate');
      setTimeout(() => button.classList.remove('animate'), 400);
    };
    const bubblyButtons = document.getElementsByClassName('bubbly-button');
    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton);
    }
  }, [bannerData]);
  /* forcefully scroll top */
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (loading && isFirstLoad) {
    return (
      <>
        <div className="loadersite">
          <div className="logosvg">
            <img  src={bannerlogo} alt="logo" />
          </div>
          <div className="loader1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </>
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

        {/* <video
          id="myVideo"
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video> */}

        <div className="progress-bar-container">
          <svg
            version="1.0"
            id="ePavjzr307g1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1927 104"
            style={{enableBackground: 'new 0 0 1927 104'}}
            xmlSpace="preserve"
          >
            <style type="text/css">
              {`
            .st000{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#fff;stroke-width:5;stroke-miterlimit:0;}
            .st111{fill-rule:evenodd;clip-rule:evenodd;fill:#050c66;}
            .st222{fill-rule:evenodd;clip-rule:evenodd;fill:#fff;}
          `}
            </style>
            <path
              ref={extraProgressBarRef}
              className="st000"
              d="M0,103h861.6C861.6,46.7,907.2,1,963.5,1s101.9,45.6,101.9,101.9H1927"
            />
            <path
              className="st111"
              d="M870.5,104c0-51.4,41.6-93,93-93s93,41.6,93,93"
            />
            <path
              className="st222"
              d="M972.3,21.9l-0.3,2.3l2.4,0.3l-0.2,1.6l-2.4-0.3l-0.4,3.6c0,0.4,0,0.6,0.2,0.8c0.2,0.2,0.4,0.3,0.7,0.3
	c0.3,0,0.5,0,0.7,0c0.2-0.1,0.4-0.1,0.6-0.3l0.2,1.4c-0.3,0.2-0.6,0.3-1,0.3c-0.4,0.1-0.8,0.1-1.2,0c-0.5-0.1-1-0.2-1.3-0.4
	c-0.4-0.2-0.6-0.5-0.8-0.8c-0.2-0.4-0.2-0.8-0.2-1.4l0.5-3.9l-1.4-0.2l0.2-1.6l1.4,0.2l0.2-1.8L972.3,21.9z M957,31.5
	c0.7,0.2,1.4,0.3,2.1,0.3c0.7,0,1.3-0.2,1.8-0.4c0.5-0.3,0.9-0.6,1.1-1c0.2-0.4,0.4-0.8,0.3-1.3c0-0.5-0.2-0.9-0.6-1.3
	c-0.3-0.4-0.9-0.6-1.7-0.7l-1.6-0.2c-0.4-0.1-0.6-0.1-0.8-0.3c-0.1-0.1-0.2-0.3-0.2-0.4s0-0.3,0.1-0.4c0.1-0.1,0.2-0.2,0.4-0.3
	c0.2-0.1,0.4-0.1,0.7-0.1c0.4,0,0.8,0.1,1.1,0.2c0.4,0.2,0.7,0.4,0.9,0.8l1.2-1.3c-0.4-0.5-0.8-0.8-1.4-1c-0.6-0.2-1.2-0.3-2-0.3
	c-0.7,0-1.4,0.2-1.9,0.4c-0.5,0.3-0.9,0.6-1.1,0.9c-0.2,0.4-0.3,0.8-0.3,1.2c0,0.6,0.2,1.1,0.6,1.4c0.4,0.3,1,0.6,1.9,0.7l1.4,0.2
	c0.3,0.1,0.6,0.1,0.7,0.3c0.1,0.1,0.2,0.2,0.2,0.4c0,0.3-0.1,0.5-0.3,0.6c-0.2,0.1-0.5,0.2-0.9,0.2c-0.6,0-1.1-0.1-1.5-0.3
	c-0.4-0.2-0.8-0.5-1-0.9l-1.1,1.3C955.9,30.9,956.4,31.2,957,31.5z M940.2,34.6c-0.8,0.2-1.5,0.3-2.2,0.2c-0.7-0.1-1.2-0.4-1.7-0.9
	c-0.5-0.5-0.9-1.1-1.1-1.9c-0.3-0.8-0.3-1.5-0.2-2.2c0.1-0.7,0.4-1.2,0.9-1.7c0.5-0.5,1.1-0.8,1.8-1.1c0.7-0.2,1.4-0.3,2-0.2
	c0.6,0.1,1.1,0.4,1.6,0.8c0.4,0.4,0.8,1,1,1.6c0.1,0.2,0.1,0.4,0.2,0.6c0,0.2,0.1,0.3,0.1,0.5l-5.2,1.7c0.1,0.2,0.3,0.5,0.4,0.6
	c0.3,0.3,0.6,0.5,0.9,0.5c0.3,0.1,0.7,0,1.1-0.1c0.4-0.1,0.7-0.3,1-0.6c0.2-0.3,0.3-0.5,0.4-0.9l1.8,0.1c0,0.4-0.2,0.8-0.4,1.2
	c-0.2,0.4-0.5,0.7-0.9,1C941.1,34.2,940.7,34.4,940.2,34.6z M936.9,30.1c0,0.2,0,0.4,0,0.6l3.3-1.1c-0.2-0.4-0.4-0.7-0.7-0.9
	c-0.4-0.2-0.8-0.3-1.3-0.1c-0.4,0.1-0.7,0.3-0.9,0.6C937,29.3,936.9,29.7,936.9,30.1z M928.2,39.3c0.7,0,1.4-0.2,2.1-0.5
	c0.7-0.3,1.2-0.7,1.6-1.1c0.4-0.4,0.6-0.9,0.7-1.3c0.1-0.5,0-0.9-0.2-1.4c-0.2-0.5-0.5-0.8-1-1c-0.4-0.2-1.1-0.2-1.8,0l-1.6,0.4
	c-0.4,0.1-0.7,0.1-0.8,0.1c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.1-0.3,0-0.4c0-0.1,0.1-0.3,0.3-0.4c0.2-0.1,0.4-0.3,0.6-0.4
	c0.4-0.2,0.7-0.2,1.2-0.2c0.4,0,0.8,0.1,1.1,0.4l0.6-1.6c-0.5-0.3-1-0.4-1.7-0.4c-0.6,0-1.3,0.2-2,0.5c-0.7,0.3-1.2,0.7-1.6,1.1
	c-0.4,0.4-0.6,0.8-0.7,1.3c-0.1,0.4,0,0.8,0.2,1.2c0.2,0.5,0.6,0.9,1.1,1.1c0.5,0.2,1.2,0.2,2.1,0l1.3-0.3c0.3-0.1,0.6-0.1,0.7,0
	c0.1,0.1,0.3,0.2,0.3,0.3c0.1,0.2,0.1,0.5-0.1,0.7c-0.2,0.2-0.4,0.4-0.8,0.6c-0.5,0.2-1,0.3-1.5,0.3c-0.5,0-0.9-0.2-1.3-0.4
	l-0.6,1.6C926.9,39.2,927.5,39.3,928.2,39.3z M918.3,40.2c-0.2-0.4-0.5-0.6-0.9-0.7c-0.3-0.1-0.7,0-1,0.2c-0.3,0.2-0.5,0.5-0.7,0.8
	c-0.1,0.3-0.1,0.7,0,1.2l-1.8,0.5c-0.2-0.7-0.2-1.3,0.1-2c0.3-0.7,0.8-1.3,1.7-1.8c0.6-0.4,1.1-0.6,1.7-0.7c0.5-0.1,1-0.1,1.5,0.1
	c0.5,0.2,0.9,0.6,1.2,1.1l1.7,2.6c0.2,0.3,0.5,0.4,0.8,0.2c0.1-0.1,0.3-0.2,0.4-0.3l0.6,1.2c-0.2,0.3-0.4,0.5-0.7,0.7
	c-0.3,0.2-0.6,0.3-0.9,0.4c-0.3,0.1-0.6,0-0.9-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c0,0.1,0,0.2,0,0.3c-0.1,0.4-0.3,0.7-0.5,1.1
	c-0.2,0.3-0.5,0.6-0.9,0.8c-0.4,0.3-0.9,0.5-1.3,0.5c-0.4,0.1-0.8,0-1.1-0.1c-0.3-0.1-0.6-0.4-0.9-0.8c-0.3-0.5-0.4-1-0.3-1.5
	c0.1-0.5,0.4-1,0.9-1.5l1.9-1.9L918.3,40.2z M918,42.7l1.2-1.2l0.3,0.4c0.2,0.2,0.2,0.5,0.3,0.7c0,0.2,0,0.4-0.1,0.6
	c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.2-0.3,0.3-0.5,0.4c-0.2,0.1-0.5,0.2-0.7,0.2c-0.2,0-0.4-0.1-0.5-0.3c-0.1-0.2-0.2-0.4-0.1-0.6
	C917.6,43.1,917.8,42.9,918,42.7z M910.3,53.4c0.7-0.2,1.3-0.5,1.9-1.1c0.4-0.3,0.7-0.7,0.9-1.1c0.2-0.4,0.4-0.9,0.4-1.3
	c0.1-0.4,0-0.9-0.1-1.3l-1.7,0.6c0.1,0.3,0.1,0.7,0,1c-0.1,0.3-0.3,0.6-0.6,0.9c-0.3,0.3-0.6,0.4-1,0.5c-0.3,0.1-0.7,0-1-0.1
	c-0.2-0.1-0.4-0.2-0.6-0.4l4-3.6c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.1-0.2-0.3-0.4-0.4c-0.5-0.5-1-0.9-1.5-1.1
	c-0.6-0.2-1.2-0.2-1.8-0.1c-0.6,0.1-1.2,0.5-1.8,1c-0.6,0.5-1,1.1-1.2,1.7c-0.2,0.6-0.3,1.3-0.1,1.9c0.2,0.7,0.5,1.3,1.1,1.9
	c0.6,0.6,1.2,1,1.8,1.3C909,53.5,909.7,53.5,910.3,53.4z M907.6,50l2.6-2.3c-0.3-0.3-0.7-0.5-1.1-0.5c-0.4-0.1-0.9,0.1-1.3,0.4
	c-0.3,0.3-0.5,0.6-0.6,0.9c-0.1,0.3-0.1,0.7,0.1,1C907.4,49.7,907.5,49.9,907.6,50z M896.2,53.1l6.7,5.5c0.3,0.2,0.5,0.3,0.7,0.3
	c0.2,0,0.4-0.1,0.6-0.3c0.1-0.1,0.2-0.3,0.2-0.4c0-0.1,0.1-0.2,0.2-0.4l0.9,1c0,0.2-0.1,0.4-0.2,0.7c-0.1,0.2-0.3,0.5-0.4,0.7
	c-0.5,0.6-1,0.9-1.5,0.9c-0.5,0-1.1-0.2-1.7-0.7l-6.9-5.7L896.2,53.1z M890.7,64.5c0.4-0.7,0.8-1.2,1.3-1.5c0.5-0.4,1-0.5,1.6-0.6
	c0.6,0,1.2,0.1,1.7,0.5c0.6,0.3,1,0.8,1.3,1.3c0.3,0.5,0.4,1,0.4,1.7c0,0.6-0.3,1.2-0.6,1.9l-1,1.9l3.1,1.8l-1,1.8l-8.8-5
	L890.7,64.5z M894.7,67.2c0.3-0.6,0.4-1,0.3-1.4c-0.1-0.4-0.4-0.7-0.8-1c-0.5-0.3-0.9-0.3-1.3-0.2c-0.4,0.1-0.7,0.5-1,1l-0.9,1.6
	l2.8,1.6L894.7,67.2z M986.8,29.1c0.2,0.3,0.2,0.7,0.1,1.1l-0.1,0.3l-2.7-0.3c-0.7-0.1-1.3,0-1.7,0.3c-0.5,0.2-0.8,0.6-0.9,1.2
	c-0.1,0.4-0.1,0.8,0,1.2c0.1,0.4,0.3,0.7,0.6,0.9c0.3,0.3,0.7,0.5,1.2,0.6c0.4,0.1,0.8,0.2,1.2,0.1c0.4,0,0.8-0.1,1.1-0.3
	c0.1-0.1,0.2-0.1,0.3-0.2c0,0.1,0,0.3,0.1,0.4c0.1,0.3,0.2,0.5,0.5,0.7c0.2,0.2,0.5,0.4,0.9,0.5c0.4,0.1,0.7,0.1,1,0.1l0.5-1.2
	c-0.2,0-0.3,0-0.5-0.1c-0.4-0.1-0.5-0.3-0.4-0.7l0.9-3c0.2-0.6,0.2-1.2,0-1.6c-0.1-0.5-0.4-0.9-0.8-1.2c-0.4-0.4-0.9-0.6-1.6-0.8
	c-0.9-0.3-1.8-0.3-2.5-0.1c-0.7,0.2-1.2,0.6-1.6,1.2l1.6,1c0.3-0.4,0.5-0.6,0.9-0.7c0.3-0.1,0.7-0.1,1,0
	C986.3,28.5,986.6,28.8,986.8,29.1z M986.4,31.7l-1.6-0.2c-0.4,0-0.6,0-0.8,0c-0.2,0.1-0.3,0.2-0.4,0.5c-0.1,0.2,0,0.5,0.1,0.6
	c0.1,0.2,0.3,0.3,0.6,0.4c0.2,0.1,0.4,0.1,0.6,0.1c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.2,0.5-0.3c0.1-0.2,0.3-0.4,0.3-0.6L986.4,31.7
	z M993.5,37.9l3.3-6.9l1.7,0.8l-0.5,1.3c0.2-0.2,0.4-0.3,0.6-0.4c0.4-0.2,0.8-0.3,1.2-0.2c0.4,0,0.8,0.1,1.3,0.3
	c0.5,0.2,0.9,0.5,1.1,0.9c0.3,0.4,0.4,0.8,0.5,1.3c0,0.5-0.1,1-0.3,1.6l-2.2,4.5l-1.9-0.9l1.9-4c0.3-0.6,0.4-1.1,0.2-1.4
	c-0.1-0.3-0.4-0.6-0.7-0.8c-0.3-0.1-0.5-0.2-0.9-0.2c-0.3,0-0.6,0.1-0.9,0.3c-0.3,0.2-0.5,0.5-0.8,1l-1.8,3.7L993.5,37.9z
	 M1005.7,44.3c0.2,0.5,0.6,1,1.2,1.3c0.4,0.3,0.8,0.4,1.2,0.5c0.4,0,0.8,0,1.3-0.2c0.2-0.1,0.3-0.2,0.5-0.3l-0.7,1.3l1.6,1l6-9.3
	l-1.8-1.1l-2.5,3.9c0.1-0.4,0-0.7-0.1-1.1c-0.2-0.6-0.5-1-1.1-1.4c-0.5-0.3-1.1-0.5-1.7-0.5c-0.6,0-1.2,0.1-1.7,0.5
	c-0.6,0.3-1.1,0.9-1.5,1.6c-0.4,0.7-0.7,1.4-0.8,2C1005.4,43.2,1005.5,43.8,1005.7,44.3z M1009.2,44.9c-0.3,0-0.6-0.1-0.9-0.3
	c-0.5-0.3-0.7-0.7-0.8-1.2c0-0.5,0.1-1.1,0.6-1.8c0.4-0.7,0.9-1.1,1.4-1.2c0.5-0.2,1-0.1,1.5,0.2c0.3,0.2,0.5,0.4,0.6,0.7
	c0.1,0.3,0.1,0.6,0.1,1c-0.1,0.4-0.2,0.7-0.5,1.2c-0.3,0.4-0.6,0.8-0.9,1C1009.9,44.8,1009.5,44.9,1009.2,44.9z M1024.6,60.8
	c-0.3-0.3-0.5-0.7-0.7-1.1c-0.1-0.4-0.1-0.8,0-1.3c0.1-0.2,0.1-0.5,0.2-0.7l-1.2,1l-1.3-1.4l8-7.6l1.4,1.5l-3.4,3.2
	c0.4-0.1,0.8-0.1,1.2-0.1c0.6,0.1,1.1,0.4,1.6,0.9c0.4,0.4,0.7,0.9,0.8,1.5c0.1,0.6,0,1.2-0.2,1.8c-0.2,0.6-0.7,1.2-1.3,1.8
	c-0.6,0.6-1.2,1-1.8,1.1c-0.6,0.2-1.2,0.2-1.8,0.1C1025.5,61.5,1025,61.2,1024.6,60.8z M1025.3,59.2c0.4,0.4,0.8,0.6,1.3,0.6
	c0.5,0,1.1-0.3,1.6-0.9c0.6-0.5,0.9-1.1,1-1.6c0.1-0.5-0.1-1-0.5-1.4c-0.3-0.3-0.5-0.4-0.9-0.5c-0.3-0.1-0.7,0-1,0.1
	c-0.4,0.1-0.7,0.4-1.1,0.7c-0.4,0.3-0.6,0.7-0.8,1c-0.1,0.4-0.2,0.7-0.2,1C1024.9,58.6,1025.1,58.9,1025.3,59.2z M1029.9,71.9
	l8.5-1.9l-1.2-1.8l-4.5,1.3l-1.6,0.5l1.1-1.2l3-3.7l-1.3-2l-3.6,5.1l-1.2,1.8l-0.7,0.1c-0.4,0.1-0.7,0.1-0.9,0
	c-0.2-0.1-0.4-0.3-0.6-0.5c-0.2-0.2-0.3-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.1-0.7l-1.5,0.5c0,0.3,0.1,0.6,0.2,0.9
	c0.1,0.3,0.3,0.7,0.5,1c0.3,0.5,0.6,0.8,1,1c0.4,0.2,0.8,0.4,1.3,0.4C1028.6,72.2,1029.2,72.1,1029.9,71.9z"
            />
          </svg>
          <span className="percentagebar">
            {Math.floor(progressPercentage)}%
          </span>
        </div>

        <button
          id="skipvideobtn"
          className="skipvideo"
          onClick={handleSkipVideo}
        >
          <i className="skipicon">
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 512 512"
              version="1.1"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="skip"
                  transform="translate(0.000000, 0.000000)"
                  fill="#000000"
                >
                  <g id="add" transform="translate(128.000000, 128.000000)">
                    <path
                      d="M213.333333,-2.84217094e-14 L213.333333,256 L256,256 L256,-2.84217094e-14 L213.333333,-2.84217094e-14 Z M2.84217094e-14,-2.84217094e-14 L2.84217094e-14,256 L213.333333,128 L2.84217094e-14,-2.84217094e-14 Z M42.6666667,75.328 L130.432,128 L42.6666667,180.650667 L42.6666667,75.328 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </i>
          Skip Video
        </button>

        <div className="audioplayer">
          <audio ref={audioRef} src={mp3song} />
          <button className="audioplaypause" onClick={togglePlayPause}>
            {isPlaying ? (
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="icon"
                    fill="#fff"
                    transform="translate(42.666667, 85.333333)"
                  >
                    <path
                      d="M361.299413,341.610667 L328.014293,314.98176 C402.206933,233.906133 402.206933,109.96608 328.013013,28.8906667 L361.298133,2.26304 C447.910187,98.97536 447.908907,244.898347 361.299413,341.610667 Z M276.912853,69.77216 L243.588693,96.4309333 C283.38432,138.998613 283.38304,204.87488 243.589973,247.44256 L276.914133,274.101333 C329.118507,215.880107 329.118507,127.992107 276.912853,69.77216 Z M191.749973,1.42108547e-14 L80.8957867,87.2292267 L7.10542736e-15,87.2292267 L7.10542736e-15,257.895893 L81.0208,257.895893 L191.749973,343.35424 L191.749973,1.42108547e-14 L191.749973,1.42108547e-14 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="icon"
                    fill="#fff"
                    transform="translate(42.666667, 59.581722)"
                  >
                    <path
                      d="M47.0849493,-1.42108547e-14 L298.668,251.583611 L304.101001,257.015597 L304.101,257.016 L353.573532,306.488791 C353.573732,306.488458 353.573933,306.488124 353.574133,306.48779 L384.435257,337.348961 L384.434,337.349 L409.751616,362.666662 L379.581717,392.836561 L191.749,205.003 L191.749973,369.105851 L81.0208,283.647505 L7.10542736e-15,283.647505 L7.10542736e-15,112.980838 L80.8957867,112.980838 L91.433,104.688 L16.9150553,30.169894 L47.0849493,-1.42108547e-14 Z M361.298133,28.0146513 C429.037729,103.653701 443.797162,209.394226 405.578884,298.151284 L372.628394,265.201173 C396.498256,194.197542 381.626623,113.228555 328.013013,54.642278 L361.298133,28.0146513 Z M276.912853,95.5237713 C305.539387,127.448193 318.4688,168.293162 315.701304,208.275874 L266.464558,159.040303 C261.641821,146.125608 254.316511,133.919279 244.488548,123.156461 L243.588693,122.182545 L276.912853,95.5237713 Z M191.749973,25.7516113 L191.749,84.3256113 L158.969,51.5456113 L191.749973,25.7516113 Z"
                      id="Combined-Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            )}
          </button>
        </div>
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
            <h1 dangerouslySetInnerHTML={{__html: bannerData[0].title}} />
          </div>
          <div className="banner_content_text">
            <p
              id="text"
              dangerouslySetInnerHTML={{__html: bannerData[0].bannerContent}}
            />
          </div>
          {bannerData[0].bannerButton && (
            <a
              className="bubbly-button banner_bottombtn swipe-effect"
              href={bannerData[0].bannerButton.buttonLink || '#'}
              dangerouslySetInnerHTML={{
                __html: bannerData[0].bannerButton.buttonText,
              }}
            ></a>
          )}
          <div className="bannerrotate_text">
            <p dangerouslySetInnerHTML={{__html: bannerData[0].bannerText}} />
          </div>
        </div>
        <div className="overlaybannehand">
          <div className="overlaybannehand-bottom"></div>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
