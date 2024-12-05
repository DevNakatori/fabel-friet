import React, { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Fabel3DPreview from '../assets/resizeimgs/webp/Fabel-3D-Preview.webp';

gsap.registerPlugin(ScrollTrigger);

const Franchise = () => {
  const { language } = useLanguage();
  const [franchiseData, setFranchiseData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchFranchiseData = async () => {
      const cachedFranchiseData = localStorage.getItem(`franchise_${language}`);

      if (cachedFranchiseData) {
        console.log('Using cached franchise data');
        setFranchiseData(JSON.parse(cachedFranchiseData));
        setLoading(false);
      } else {
        try {
          const data = await client.fetch(
            `*[_type == "franchise" && language == $lang]`,
            { lang: language }
          );
          console.log('Fetched franchise data:', data);

          if (data && data.length > 0) {
            const franchise = data[0];
            localStorage.setItem(`franchise_${language}`, JSON.stringify(franchise));
            setFranchiseData(franchise);
          } else {
            console.warn('No franchise data found for the selected language');
            setFranchiseData({
              franchisetitle: "No Title Available",
              franchisedescription: "No description available",
            });
          }
          setLoading(false);
        } catch (err) {
          console.error('Error fetching franchise data:', err);
          setError('Failed to load franchise data');
          setLoading(false);
        }
      }
    };

    fetchFranchiseData();
  }, [language]);

  useEffect(() => {
    gsap.set(['.image-wrapperfranch'], {
      xPercent: -50,
      yPercent: -50,
    });

    const timelinefranchise = gsap.timeline({
      scrollTrigger: {
        trigger: '#img-container',
        start: 'top center',
        end: 'bottom bottom',
        scrub: 2, // Increased scrub for smoother animation
        ease: 'power3.inOut', // Smoother easing
        once: true,
        markers: false,
      },
    });

    // On scroll, spread images horizontally with rotation
    timelinefranchise
      .to('.image-wrapperfranch:first-child', {
        left: '20%',
        rotation: -5, // Tilt first image
        duration: 2,
        ease: 'power3.out',
      })
      .to(
        '.image-wrapperfranch:nth-child(2)',
        {
          left: '50%',
          duration: 2,
          ease: 'power3.out',
        },
        '<',
      )
      .to(
        '.image-wrapperfranch:last-child',
        {
          left: '80%',
          rotation: 5, // Tilt last image
          duration: 2,
          ease: 'power3.out',
        },
        '<',
      );
  });

  if (loading) {
    return <div>Loading...</div>; // Loading state feedback
  }

  if (error) {
    return <div>{error}</div>; // Error state feedback
  }
  return (
    <>
      {franchiseData ? (
        <div>
          <section
            className="menulanding"
          >
            <div className="landingcontainer">
              <h2>{franchiseData.Franchise.franchisetitle}</h2>
              {/* {franchiseData.Franchise.franchisedescription} */}
              <p dangerouslySetInnerHTML={{ __html: franchiseData.Franchise.franchisedescription }} />
            </div>
          </section>

          <div id="section2">
            <div className='wrappertest'>
              <div className='whitebgbox'>
                <div className='gradient-threebox'>
                  <div className="img-container" id="img-container">
                    <div className="image-wrapper image-wrapperfranch">
                      <div className="threeboxleftlogobar">
                        <img src="/app/assets/resizeimgs/webp/fabelfrietsticker2.webp" alt="content images nl" width="10" height="10" />
                      </div>
                      <img src="https://cdn.sanity.io/images/6tlmpa5b/production/ae4c8e73d8782f3d8de513ab7234c93475c0f871-499x622.webp" alt="content images nl" width="10" height="10" />
                    </div>

                    <div className="image-wrapper image-wrapperfranch">
                      <div className="threeboxleftlogobar lastbottomimg ">
                        <img src="/app/assets/resizeimgs/webp/fabelfriet_sticker2.webp" alt="content images nl" width="10" height="10" />
                      </div>
                      <img src="https://cdn.sanity.io/images/6tlmpa5b/production/5f4610eea4a9f3c78ee9fce9667d6972313e60d8-504x628.webp" alt="content images nl" width="10" height="10" />
                    </div>

                    <div className="image-wrapper image-wrapperfranch">
                      <img src="https://cdn.sanity.io/images/6tlmpa5b/production/641bfd6e6fbd8e4c375bc529921c32b0cfb7a8ba-454x578.webp" alt="content images nl" width="10" height="10" />
                    </div>
                  </div>
                </div>
                <div class="overlaybannehand-bottoms"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No franchise data available</div> // Fallback content in case no data
      )}
    </>
  );
};

export default Franchise;
