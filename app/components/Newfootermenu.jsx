import React, {useEffect, useState} from 'react';
import {client} from '../../sanityClient';
import {useLanguage} from '~/components/LanguageContext';
import gsap from 'gsap';

import '../styles/footermenupage.css';
import bannerlogo from '../assets/resizeimgs/logobanner.png';

import {getImageUrl} from '../js/imagesurl';

const Newfootermenu = () => {
  return (
    <section className="newfooter">
      <div className="newcontainer">
        <div className="footerlogo">
          <img src={bannerlogo} alt="logo" />
        </div>
        <div className="allmenulist">
          <div className="footerblock">
            <h6>Menu</h6>
            <div className="footerlistbox">
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Onze Friet</a>
                </li>
                <li>
                  <a href="">Locaties</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="">Menu</a>
                </li>
                <li>
                  <a href="">Fabel Impact</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footerblock">
            <h6>Contact</h6>
            <div className="footerlistbox">
              <ul>
                <li>
                  <a href="">020 303 1422</a>
                </li>
                <li>
                  <a href="">info@fabelfriet.nl</a>
                </li>
              </ul>
              <ul>
                <li>Runstraat 1 | 1016 GJ Amsterdam</li>
                <li>Nieuwendijk 10A | 1012 MK Amsterdam</li>
              </ul>
            </div>
          </div>

          <div className="footerblock">
            <h6>Socials</h6>
            <ul className="footersociallist">
              <li>
                <a href="">
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
              <li>
                <a href="">
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
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="32"
                    viewBox="0 0 31 32"
                    fill="none"
                  >
                    <path
                      d="M28.5084 0.5H2.49163C1.116 0.5 0 1.616 0 2.99163V29.0084C0 30.384 1.116 31.5 2.49163 31.5H28.5084C29.884 31.5 31 30.384 31 29.0084V2.99163C31 1.616 29.884 0.5 28.5084 0.5ZM28.5084 29.02C11.1561 29.0161 2.48 29.0123 2.48 29.0084C2.48388 11.6561 2.48775 2.98 2.49163 2.98C19.8439 2.98388 28.52 2.98775 28.52 2.99163C28.5161 20.3439 28.5123 29.02 28.5084 29.02ZM4.59575 12.1211H9.19537V26.9159H4.59575V12.1211ZM6.8975 10.0984C8.36613 10.0984 9.5635 8.90487 9.5635 7.43237C9.5635 7.08227 9.49454 6.7356 9.36056 6.41214C9.22658 6.08869 9.03021 5.79479 8.78265 5.54723C8.53509 5.29967 8.24119 5.10329 7.91773 4.96931C7.59428 4.83533 7.2476 4.76638 6.8975 4.76638C6.5474 4.76638 6.20072 4.83533 5.87727 4.96931C5.55381 5.10329 5.25991 5.29967 5.01235 5.54723C4.76479 5.79479 4.56842 6.08869 4.43444 6.41214C4.30046 6.7356 4.2315 7.08227 4.2315 7.43237C4.22762 8.90487 5.42112 10.0984 6.8975 10.0984ZM16.6741 19.596C16.6741 17.6663 17.0422 15.7985 19.4331 15.7985C21.7891 15.7985 21.824 18.0034 21.824 19.72V26.9159H26.4198V18.8016C26.4198 14.8181 25.5595 11.753 20.9056 11.753C18.6698 11.753 17.1701 12.9814 16.554 14.1439H16.492V12.1211H12.0784V26.9159H16.6741V19.596Z"
                      fill="#EFEBE7"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a>
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
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newfootermenu;