import React, { useEffect, useState, useRef } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import '../styles/newheadermenu.css';
import bannerlogo from '../assets/resizeimgs/webp/logobanner.webp';
import { useNavigate } from 'react-router-dom';

const Qrmenuheader = () => {
  const { language } = useLanguage();
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const fetchData_newheader = async () => {
      
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type == "header" && language == $lang]`,
            { lang: language },
          );
         // localStorage.setItem(`header_${language}`, JSON.stringify(data));
          setHeaderData(data);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      
    };

    fetchData_newheader();
  }, [language]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  // Close the mobile menu if clicked outside
  const handleClickOutside = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
      document.body.classList.remove('menu-open');
    }
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');  // This will take the user back to the previous page in history
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
    setMobileMenuOpen(false);
    if (link.startsWith('#')) {
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="headernew">
      <nav>
        {/* <button
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
        </button> */}


        {/* <button className="backhome bubbly-button swipe-effect" onClick={handleBackClick}>
          <span>Go Back</span>
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 423.6 377.5"
          >
            <defs>
              
            </defs>
            <path
              className="st0"
              d="M267.9,66.3H83.1l18.7-27.9c7.6-11.2,4.7-26.4-6.5-34C91.2,1.6,86.4.2,81.5.2h0c-8.1,0-15.8,3.7-20.8,10L3,82.3c-3.7,4.7-3.7,11.3,0,16l57.7,72.1c5.1,6.3,12.7,10,20.8,10h0c13.5,0,24.5-11,24.5-24.5,0-4.9-1.5-9.7-4.2-13.7l-18.7-27.9h184.8c59.4,0,107.6,48.1,107.6,107.5,0,59.4-48.1,107.6-107.5,107.6h-52.3c-13.2,0-24,10.7-24,24s10.7,24,24,24h52.3c85.9,0,155.5-69.6,155.5-155.5,0-85.9-69.6-155.5-155.5-155.5h0Z"
            />
          </svg>
        </button> */}

        <div className="logoonlymobilefirstsection">
          <img loading="lazy" src={bannerlogo} />
        </div>
        <div
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
          ref={mobileMenuRef}
        >
          <button
            className="close-menu"
            onClick={() => {
              setMobileMenuOpen(false);
              document.body.classList.remove('menu-open');
            }}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              style={{ enableBackground: 'new 0 0 18 18' }}
              aria-label="Close icon"
            >
              <g>
                <path
                  style={{ fill: '#fff' }}
                  d="M0.9,17.9c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1L16.6,0.3c0.3-0.3,0.8-0.3,1.1,0
                  c0.3,0.3,0.3,0.8,0,1.1L1.4,17.7C1.2,17.8,1,17.9,0.9,17.9z"
                />
              </g>
              <g>
                <path
                  style={{ fill: '#fff' }}
                  d="M17.1,17.9c-0.2,0-0.4-0.1-0.5-0.2L0.3,1.4C0,1.1,0,0.6,0.3,0.3s0.8-0.3,1.1,0l16.3,16.3
                  c0.3,0.3,0.3,0.8,0,1.1C17.5,17.8,17.3,17.9,17.1,17.9z"
                />
              </g>
            </svg>
          </button>
          <ul>
            {headerData[0].header.menu.map((item, index, array) => (
              <li key={item._key}>
                {index === array.length - 1 ? (
                  <a
                    href={item.link}
                    onClick={(event) => handleMenuItemClick(event, item.link)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    href={`/${item.link}`}
                    onClick={(event) => handleMenuItemClick(event, item.link)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="logosvg">
            <img loading="lazy" src={bannerlogo} alt="logo" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Qrmenuheader;
