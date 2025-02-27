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
import { getImageUrl } from '../js/imagesurl';
import images from '../js/images';
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


  const getText = () => {
    if (language === 'nl') {
      return 'blijf alsjeblieft staan'; 
    }
    return 'please stand by';
  };

  useEffect(() => {
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
            {lang: language},
          );
          if (data && data.length > 0) {
            document
              .querySelector('.language-switcher')
              .classList.add('nomorelanguage');
            //console.log(`Fetched Data for language ${language}:`, data);

            localStorage.setItem(
              `homeBannerData_${language}`,
              JSON.stringify(data),
            );
            setBanner(data);
          } else {
            //console.log(`No data found for language: ${language}`);
          }
        } catch (err) {
          //console.error('Error fetching data:', err);
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
      // setTimeout(() => {
      //   if (!sessionStorage.getItem('pageRefreshed')) {
      //     sessionStorage.setItem('pageRefreshed', 'true');
      //     // location.reload();
      //   }
      // }, 2500);
      document.body.classList.add('hiddenoverflow');
    };

    const handleVideoEnd = () => {
      video.classList.add('hidden');

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

      gsap.to('.overlaybannehand-bottomss', {
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
        duration: 0.05,
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
    const animateButtonbannerData = (e) => {
      e.preventDefault();
      const button = e.target;
      const link = button.closest('a');
      button.classList.remove('animate');
      button.classList.add('animate');
      setTimeout(() => {
        button.classList.remove('animate');
        if (link) {
          window.location.href = link.href;
        }
      }, 400);
    };
    const bubblyButtonsbanner = document.getElementsByClassName('bubbly-button');
    for (let i = 0; i < bubblyButtonsbanner.length; i++) {
      bubblyButtonsbanner[i].addEventListener('click', animateButtonbannerData);
    }
    return () => {
      for (let i = 0; i < bubblyButtonsbanner.length; i++) {
        bubblyButtonsbanner[i].removeEventListener('click', animateButtonbannerData);
      }
    };
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
            /*src="https://samplelib.com/lib/preview/mp4/sample-10s.mp4" type="video/mp4"
            /*src="https://cdn.shopify.com/s/files/1/0698/4443/5191/files/219e6b5f1c314a16810a8f0c9005ebc6.ogg" type="video/ogg"*/
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
          />
//           <video
//   id="myVideo"
//   autoPlay
//   muted
//   playsInline
//   onTimeUpdate={handleTimeUpdate}
// >
//   <source 
//     src="https://cdn.shopify.com/videos/c/o/v/219e6b5f1c314a16810a8f0c9005ebc6.mp4" 
//     type="video/mp4" 
//   />
//   <source 
//     src="https://cdn.shopify.com/s/files/1/0698/4443/5191/files/219e6b5f1c314a16810a8f0c9005ebc6.ogg" 
//     type="video/ogg" 
//   />
//   Your browser does not support the video tag.
// </video>

        )}

        <div className="progress-bar-container">
        <svg version="1.0"
    id="ePavjzr307g1"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1927 104"
    style={{ enableBackground: 'new 0 0 1927 104' }}
    xmlSpace="preserve">
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

  <path id="curve" className="st111" d="M870.5,104c0-51.4,41.6-93,93-93s93,41.6,93,93" />

  <text width="1000">
    <textPath xlinkHref="#curve" startOffset="50%">
    {getText()}
    </textPath>
  </text>
</svg>


            

          <span className="percentagebar">
            {Math.floor(progressPercentage)}%
          </span>
        </div>

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
              href={bannerData[0].bannerButton.buttonLink || '#section2'}
              dangerouslySetInnerHTML={{
                __html: bannerData[0].bannerButton.buttonText,
              }}
            ></a>
            
          )}
          <div className="bannerrotate_text">
            <p dangerouslySetInnerHTML={{__html: bannerData[0].bannerText}} />
          </div>
        </div>
        <div className="overlaybannehand overlaybannehand-bottomss">
          <img src={images.bottompotetoes} />
        </div>
      </div>
    </section>
  );
};
export default HomePage;
