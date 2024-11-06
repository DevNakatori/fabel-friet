import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '~/components/LanguageContext';
import { client } from '../../sanityClient';
import gsap from 'gsap';
import Fabel3DPreview from '../assets/resizeimgs/Fabel-3D-Preview.png';

const Qrmenu = () => {
  const { language } = useLanguage();
  const [menuData, setMenuData] = useState({
    tabContant: { friet: [], snacks: [], drinks: [] },
  });
  const [activeTab, setActiveTab] = useState(0);
  const buttonRef = useRef(null);  // Refs for better element handling


  useEffect(() => {
    const qrmenu = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "qrmenu" && language == $lang]`,
          {lang: language},
        );
        console.log('Fetched ongetintouch Data:', data);
        setMenuData(data[0] || {tabContant: {friet: [], snacks: [], drinks: []}});
      } catch (err) {
        console.error('Error fetching ongetintouch data:', err);
        setError('Failed to load data');
      } finally {
        
      }
    };
    qrmenu();
  }, [language]);

  useEffect(() => {
    const divs = document.querySelectorAll('.mainmenusection');
    const body = document.querySelector('body');
    
    gsap.set(divs, { bottom: '-100vh' });
    gsap.set(divs, { display: 'block' });
    gsap.set(body, { overflow: 'hidden' });

    const handleClick = () => {
      gsap.to(divs, { bottom: 0, duration: 1 });
      gsap.set(body, { overflow: 'visible' });
      document.body.classList.add('seconsection');
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
      }
    };
  }, []);

  const tabs = [
    { label: 'All', content: allContent(menuData) },
    { label: 'Fries', content: friesContent(menuData) },
    { label: 'Snacks', content: snacksContent(menuData) },
    { label: 'Drinks', content: drinksContent(menuData) },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (index) => {
    const currentContent = document.querySelector('.content');
    const nextContent = document.querySelector(`#tab-content-${index}`);
    
    gsap.to(currentContent, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        setActiveTab(index);
        gsap.fromTo(nextContent, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      },
    });
  };

  return (
    <div className="page menumainppage">
      <section className="menulanding" style={{ backgroundImage: `url(${Fabel3DPreview})` }}>
        <div className="landingcontainer">
          <h2>Dear customers</h2>
          <p>
            We kindly ask you to respect our neighbours by not eating your fries in front of their house. 
            Instead, find a nice spot by the canal.
          </p>
          <p>Thank you for your understanding and cooperation!</p>
          <button ref={buttonRef} className="okunderstood">Ok, understood</button>
        </div>
      </section>

      <section className="mainmenusection">
        <div className="topmenublock">
          <h1>Menu</h1>
          <p><i className="qrinfo"></i>Click on the information button behind each item to view allergens</p>
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={activeTab === index ? 'active' : ''}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="whightimagebf">
          <div className="content">
            {tabs.map((tab, index) => (
              <div
                key={index}
                id={`tab-content-${index}`}
                className={`tab-content ${activeTab === index ? 'active' : ''}`}
                style={{ display: activeTab === index ? 'block' : 'none' }}
              >
                {tab.content}
              </div>
            ))}
          </div>
          <div className="overlaybannehand-bottomsmenu"></div>
        </div>
      </section>
    </div>
  );
};



const allContent = (menuData) => {
  const { friet = [], snacks = [], drinks = [] } = menuData.tabContant;
  const allSections = [...friet, ...snacks, ...drinks];
  if (allSections.length === 0) {
    return <div>No menu items available.</div>;
  }

  return (
    <div className="content">
      {allSections.map((section) => (
        <section className="menu-section" key={section._key || section.id}>
          <details className="mainmenututles">
            <summary>
              <h2>
                {section.title} <span className="info-icon"></span>
              </h2>
            </summary>
            <p className="firsttext">{section.subTitle}</p>
          </details>
          <ul>
            {section.menu.map((menuItem) => (
              <li key={menuItem._key || menuItem.id}>
                {menuItem.recipedetails ? (
                  <details>
                    <summary>
                      <span>{menuItem.recipe}</span>
                    </summary>
                    <p>{menuItem.recipedetails}</p>
                  </details>
                ) : (
                  <span>{menuItem.recipe}</span>
                )}
                {menuItem.price && <span className="price">{menuItem.price}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

const friesContent = (menuData) => {
  const { friet = [] } = menuData.tabContant;
  if (!friet.length) {
    return <div>No fries data available.</div>;
  }

  return friet.map((section) => (
    <section className="menu-section" key={section._key || section.id}>
      <details className="mainmenututles">
        <summary>
          <h2>{section.title} <span className="info-icon"></span></h2>
        </summary>
        <p className="firsttext">{section.subTitle}</p>
      </details>
      <ul>
        {section.menu.map((menuItem) => (
          <li key={menuItem._key || menuItem.id}>
            {menuItem.recipedetails ? (
              <details>
                <summary>
                  <span>{menuItem.recipe}</span>
                </summary>
                <p>{menuItem.recipedetails}</p>
              </details>
            ) : (
              <span>{menuItem.recipe}</span>
            )}
            {menuItem.price && <span className="price">{menuItem.price}</span>}
          </li>
        ))}
      </ul>
    </section>
  ));
};

const snacksContent = (menuData) => {
  const { snacks = [] } = menuData.tabContant;
  if (!snacks.length) {
    return <div>No snacks data available.</div>;
  }

  return snacks.map((section) => (
    <section className="menu-section" key={section._key || section.id}>
      <details className="mainmenututles">
        <summary>
          <h2>{section.title} <span className="info-icon"></span></h2>
        </summary>
        <p className="firsttext">{section.subTitle}</p>
      </details>
      <ul>
        {section.menu.map((menuItem) => (
          <li key={menuItem._key || menuItem.id}>
            {menuItem.recipedetails ? (
              <details>
                <summary>
                  <span>{menuItem.recipe}</span>
                </summary>
                <p>{menuItem.recipedetails}</p>
              </details>
            ) : (
              <span>{menuItem.recipe}</span>
            )}
            {menuItem.price && <span className="price">{menuItem.price}</span>}
          </li>
        ))}
      </ul>
    </section>
  ));
};

const drinksContent = (menuData) => {
  const { drinks = [] } = menuData.tabContant;
  if (!drinks.length) {
    return <div>No drinks data available.</div>;
  }

  return drinks.map((section) => (
    <section className="menu-section" key={section._key || section.id}>
      <details className="mainmenututles">
        <summary>
          <h2>{section.title} <span className="info-icon"></span></h2>
        </summary>
        <p className="firsttext">{section.subTitle}</p>
      </details>
      <ul>
        {section.menu.map((menuItem) => (
          <li key={menuItem._key || menuItem.id}>
            {menuItem.recipedetails ? (
              <details>
                <summary>
                  <span>{menuItem.recipe}</span>
                </summary>
                <p>{menuItem.recipedetails}</p>
              </details>
            ) : (
              <span>{menuItem.recipe}</span>
            )}
            {menuItem.price && <span className="price">{menuItem.price}</span>}
          </li>
        ))}
      </ul>
    </section>
  ));
};


export default Qrmenu;