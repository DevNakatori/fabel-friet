import React, {useEffect, useState, useRef} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import '../styles/newheadermenu.css';
import bannerlogo from '../assets/resizeimgs/logobanner.png';

const Qrmenuheader = () => {
  const {language} = useLanguage();
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Reference for the mobile menu

  useEffect(() => {
    const fetchData_newheader = async () => {
      const cachedData = localStorage.getItem(`header_${language}`);

      if (cachedData) {
        setHeaderData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "header" && language == $lang]`,
            {lang: language},
          );
          localStorage.setItem(`header_${language}`, JSON.stringify(data));
          setHeaderData(data);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData_newheader();
  }, [language]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu if clicked outside
  const handleClickOutside = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  const handleMenuItemClick = (event, link) => {
    event.preventDefault();
    setMobileMenuOpen(false); // Close the mobile menu immediately

    if (link.startsWith('#')) {
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({behavior: 'smooth'});
      }
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="headernew">
      <nav>
        <button
          className="menu-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? '' : ''}
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="25"
              viewBox="0 0 30 25"
              fill="none"
            >
              <g filter="url(#filter0_d_1222_203)">
                <line
                  x1="4"
                  y1="1"
                  x2="26"
                  y2="1"
                  stroke="#EFEBE7"
                  strokeWidth="2"
                />
                <line
                  x1="4"
                  y1="15.6666"
                  x2="26"
                  y2="15.6666"
                  stroke="#EFEBE7"
                  strokeWidth="2"
                />
                <line
                  x1="4"
                  y1="8.33337"
                  x2="26"
                  y2="8.33337"
                  stroke="#EFEBE7"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1222_203"
                  x="0"
                  y="0"
                  width="30"
                  height="24.6666"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1222_203"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1222_203"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </i>
        </button>
        <div className="logoonlymobilefirstsection">
          <img src={bannerlogo} />
        </div>
        <div
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
          ref={mobileMenuRef}
        >
          <button
            className="close-menu"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              style={{enableBackground: 'new 0 0 18 18'}}
              aria-label="Close icon"
            >
              <g>
                <path
                  style={{fill: '#fff'}}
                  d="M0.9,17.9c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1L16.6,0.3c0.3-0.3,0.8-0.3,1.1,0
                  c0.3,0.3,0.3,0.8,0,1.1L1.4,17.7C1.2,17.8,1,17.9,0.9,17.9z"
                />
              </g>
              <g>
                <path
                  style={{fill: '#fff'}}
                  d="M17.1,17.9c-0.2,0-0.4-0.1-0.5-0.2L0.3,1.4C0,1.1,0,0.6,0.3,0.3s0.8-0.3,1.1,0l16.3,16.3
                  c0.3,0.3,0.3,0.8,0,1.1C17.5,17.8,17.3,17.9,17.1,17.9z"
                />
              </g>
            </svg>
          </button>
          <ul>
            <li>
              <a href="/#section1">Home</a>
            </li>
            <li>
              <a href="/#section2">Onze Friet</a>
            </li>
            <li>
              <a href="/#section3">Locaties</a>
            </li>
            <li>
              <a href="/#section4">Menu</a>
            </li>
            <li>
              <a href="/#section5">Onze impact</a>
            </li>
            <li>
              <a href="/#section6">Contact</a>
            </li>
            <li>
              <a href="/pages/franchise">Franchise</a>
            </li>
          </ul>
          <div className="logosvg">
            <img src={bannerlogo} alt="logo" />
          </div>
        </div>
        <ul className="desktop-menu">
          {headerData[0].header.menu.map((item) => (
            <li key={item._key}>
              <a
                href={item.link}
                target="_blank"
                onClick={(event) => handleMenuItemClick(event, item.link)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Qrmenuheader;
