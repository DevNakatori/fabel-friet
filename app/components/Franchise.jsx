import React, { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { useLanguage } from '~/components/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Fabel3DPreview from '../assets/resizeimgs/Fabel-3D-Preview.png';

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
          style={{ backgroundImage: `url(${Fabel3DPreview})` }}
        >
          <div className="landingcontainer">
            <h2>{franchiseData.Franchise.franchisetitle}</h2>
            {/* {franchiseData.Franchise.franchisedescription} */}
            <p dangerouslySetInnerHTML={{ __html: franchiseData.Franchise.franchisedescription }} />
          </div>
        </section>
      </div>
      ) : (
        <div>No franchise data available</div> // Fallback content in case no data
      )}
    </>
  );
};

export default Franchise;
