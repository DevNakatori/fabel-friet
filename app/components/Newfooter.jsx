import React, {useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/newfooter.css';
import bannerlogo from '../assets/resizeimgs/webp/logobanner.webp';

import {getImageUrl} from '../js/imagesurl';
gsap.registerPlugin(ScrollTrigger);

const Newfooter = () => {
  const {language} = useLanguage();
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const cachedData = localStorage.getItem(`footerData_${language}`);
      if (cachedData) {
        setFooterData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const data = await client.fetch(
            `*[_type == "footer" && language == $lang]`,
            {lang: language},
          );
          localStorage.setItem(`footerData_${language}`, JSON.stringify(data));
          setFooterData(data);
        } catch (err) {
          console.error('Error fetching footer data:', err);
          setError('Failed to load footer data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFooterData();
  }, [language]);

  const handleMenuItemClicks = (event, link) => {
    event.preventDefault();
    if (link.startsWith('#')) {
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({behavior: 'smooth'});
      }
    } else {
      window.location.href = link;
    }
  };

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  const {contact, logo, menu, socials} = footerData[0];

  return (
    <section className="newfooter" data-aos="fade"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000">
      <div className="newcontainer">
        <div className="footerlogo onlydesktop">
          <img src={bannerlogo} alt="logo" />
        </div>
        <div className="allmenulist">
          <div className="footerblock">
            <h6
              
            >
              Menu
            </h6>
            <div className="footerlistbox">
              <ul
                
              >
                {menu.map((item) => (
                  <li key={item._key}>
                    <a
                      href={item.link}
                      aria-label={item.label}
                      onClick={(event) =>
                        handleMenuItemClicks(event, item.link)
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footerblock">
            <h6
              
            >
              Contact
            </h6>
            <div className="footerlistbox">
              <ul>
                <li
                  
                >
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </li>
                <li
                  
                >
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
              </ul>

              <ul>
                {contact.address.map((addr) => (
                  <li
                    key={addr._key}
                    
                  >
                    {addr.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footerblock">
            <h6
              
            >
              Socials
            </h6>
            <ul className="footersociallist">
              {socials.facebook && (
                <li
                  
                >
                  <a href="www.whatsup.com" aria-label="socials">
                    <svg
                      fill="#EFEBE7"
                      height="800px"
                      width="800px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 308 308"
                      xmlSpace="preserve"
                    >
                      <g id="XMLID_468_">
                        <path
                          id="XMLID_469_"
                          d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
                              c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
                              c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
                              c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
                              c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
                              c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
                              c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
                              c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
                              c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
                              C233.168,179.508,230.845,178.393,227.904,176.981z"
                        />
                        <path
                          id="XMLID_470_"
                          d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
                              c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
                              c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
                              M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
                              l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
                              c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
                              C276.546,215.678,222.799,268.994,156.734,268.994z"
                        />
                      </g>
                    </svg>
                  </a>
                </li>
              )}
              {socials.facebook && (
                <li
                  
                >
                  <a href={socials.facebook} aria-label="socials">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M30.72 0.5H1.28C0.572 0.5 0 1.05412 0 1.74V30.26C0 30.9459 0.572 31.5 1.28 31.5H30.72C31.428 31.5 32 30.9459 32 30.26V1.74C32 1.05412 31.428 0.5 30.72 0.5ZM29.44 29.02H22.076V19.4953H26.236L26.86 14.8181H22.076V11.8305C22.076 10.4742 22.464 9.552 24.468 9.552H27.024V5.367C26.58 5.30888 25.064 5.181 23.296 5.181C19.608 5.181 17.084 7.36262 17.084 11.3655V14.8142H12.916V19.4914H17.088V29.02H2.56V2.98H29.44V29.02Z"
                        fill="#EFEBE7"
                      />
                    </svg>
                  </a>
                </li>
              )}
              {socials.insta && (
                <li
                  
                >
                  <a href={socials.insta} aria-label="socials">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="32"
                      viewBox="0 0 31 32"
                      fill="none"
                    >
                      <path
                        d="M15.4958 8.047C11.0948 8.047 7.54298 11.5989 7.54298 16C7.54298 20.4011 11.0948 23.953 15.4958 23.953C19.8969 23.953 23.4487 20.4011 23.4487 16C23.4487 11.5989 19.8969 8.047 15.4958 8.047ZM15.4958 21.1689C12.6497 21.1689 10.3271 18.8462 10.3271 16C10.3271 13.1538 12.6497 10.8311 15.4958 10.8311C18.342 10.8311 20.6646 13.1538 20.6646 16C20.6646 18.8462 18.342 21.1689 15.4958 21.1689ZM23.7744 5.86778C22.7468 5.86778 21.9171 6.69759 21.9171 7.72516C21.9171 8.75273 22.7468 9.58254 23.7744 9.58254C24.8019 9.58254 25.6317 8.75661 25.6317 7.72516C25.6321 7.48116 25.5842 7.23949 25.491 7.01401C25.3978 6.78852 25.261 6.58364 25.0884 6.41111C24.9159 6.23858 24.711 6.10177 24.4855 6.00854C24.2601 5.91531 24.0184 5.86747 23.7744 5.86778ZM30.9983 16C30.9983 13.8596 31.0177 11.7385 30.8975 9.60193C30.7773 7.12025 30.2111 4.91776 28.3964 3.10304C26.5779 1.28443 24.3793 0.722178 21.8977 0.601971C19.7573 0.481765 17.6362 0.501153 15.4997 0.501153C13.3593 0.501153 11.2383 0.481765 9.10176 0.601971C6.62013 0.722178 4.41768 1.28831 2.60299 3.10304C0.784418 4.92164 0.222174 7.12025 0.10197 9.60193C-0.0182344 11.7424 0.00115335 13.8634 0.00115335 16C0.00115335 18.1366 -0.0182344 20.2615 0.10197 22.3981C0.222174 24.8797 0.788296 27.0822 2.60299 28.897C4.42156 30.7156 6.62013 31.2778 9.10176 31.398C11.2422 31.5182 13.3632 31.4988 15.4997 31.4988C17.6401 31.4988 19.7611 31.5182 21.8977 31.398C24.3793 31.2778 26.5817 30.7117 28.3964 28.897C30.215 27.0784 30.7773 24.8797 30.8975 22.3981C31.0215 20.2615 30.9983 18.1404 30.9983 16ZM27.586 25.1434C27.303 25.8492 26.9617 26.3765 26.415 26.9194C25.8683 27.4661 25.3448 27.8074 24.6391 28.0904C22.5995 28.9008 17.7564 28.7186 15.4958 28.7186C13.2352 28.7186 8.38829 28.9008 6.3487 28.0943C5.64299 27.8112 5.11564 27.47 4.57278 26.9233C4.02605 26.3765 3.68482 25.853 3.40176 25.1473C2.59523 23.1038 2.77748 18.2607 2.77748 16C2.77748 13.7393 2.59523 8.89232 3.40176 6.85269C3.68482 6.14697 4.02605 5.61961 4.57278 5.07675C5.11952 4.53388 5.64299 4.18877 6.3487 3.9057C8.38829 3.09916 13.2352 3.28141 15.4958 3.28141C17.7564 3.28141 22.6034 3.09916 24.643 3.9057C25.3487 4.18877 25.876 4.53 26.4189 5.07675C26.9656 5.62349 27.3068 6.14697 27.5899 6.85269C28.3964 8.89232 28.2142 13.7393 28.2142 16C28.2142 18.2607 28.3964 23.1038 27.586 25.1434Z"
                        fill="#EFEBE7"
                      />
                    </svg>
                  </a>
                </li>
              )}
              {socials.tiktok && (
                <li
                >
                  <a href={socials.tiktok} aria-label="socials">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="26"
                      viewBox="0 0 21 26"
                      fill="none"
                    >
                      <path
                        d="M7.1 13C4.28336 13 2 15.3504 2 18.25C2 21.1496 4.28336 23.5 7.1 23.5C9.91673 23.5 12.2 21.1496 12.2 18.25V2.5C12.7666 4.25 14.92 7.75 19 7.75"
                        stroke="#EFEBE7"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="footerlogo onlymobile">
          <img src={bannerlogo} alt="logo" />
        </div>
      </div>
    </section>
  );
};

export default Newfooter;
