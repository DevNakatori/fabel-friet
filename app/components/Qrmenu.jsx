import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '~/components/LanguageContext';
import { client } from '../../sanityClient';
import gsap from 'gsap';
import Fabel3DPreview from '../assets/resizeimgs/webp/Fabel-3D-Preview.webp';



const Qrmenu = () => {
  const { language, setLanguage } = useLanguage();
  const [menuData, setMenuData] = useState({
    tabContant: { friet: [], snacks: [], drinks: [] },
  });
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [showLanguagePopup, setShowLanguagePopup] = useState(true);
  const buttonRef = useRef(null);
  const tabsRef = useRef(null);


  const languages = [
    {code: 'en', name: 'English', flag: 'flag-icon-us'},
    {code: 'nl', name: 'Nederlands', flag: 'flag-icon-nl'},
    {code: 'de', name: 'Deutsch', flag: 'flag-icon-de'},
    // Add more languages as needed
  ];



  const MenuSection = ({ id, title, subTitle, menuData }) => {
    return (
      <div id={id}>
        {menuData.length > 0 ? (
          menuData.map((section) => (
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
                          {/* <span>{menuItem.recipe}</span> */}
                          <span>
                            {selectedLanguage === 'en' ? menuItem.english_recipe : `${menuItem.english_recipe} / ${menuItem.recipe}`}
                          </span>
                        </summary>
                        {/* <p>{menuItem.recipedetails}</p> */}
                        <p>
                          {selectedLanguage === 'en' ? menuItem.english_recipedetails : `${menuItem.english_recipedetails} / ${menuItem.recipedetails}`}
                        </p>
                      </details>
                    ) : (
                      // <span>{menuItem.recipe}</span>
                      <span>{selectedLanguage === 'en' ? menuItem.english_recipe : `${menuItem.english_recipe} / ${menuItem.recipe}`}</span>
                    )}
                    {menuItem.price && (
                      <span className="price" dangerouslySetInnerHTML={{ __html: menuItem.price }} />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  };


  // Fetch menu data based on the language
  useEffect(() => {
    const qrmenu = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "qrmenu" && language == $lang]`,
          { lang: selectedLanguage },
        );
        const menu = data[0] || {
          tabContant: { friet: [], snacks: [], drinks: [] },
          tabs: []
        };
        setMenuData(menu);
        console.log('all data', menu);
      } catch (err) {
        setError('Failed to load data');
      }
    };

    qrmenu();
  }, [selectedLanguage]);


  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    toggleLanguagePopup();
  };

  const toggleLanguagePopup = () => {
    setShowLanguagePopup(!showLanguagePopup);
  };


  // GSAP animation for menu section
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

  // Handle smooth scroll
  const handleMenuItemClick = (event, link) => {
    event.preventDefault();
    if (link.startsWith('#')) {
      const targetElement = document.querySelector(link);
      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offset = window.innerWidth <= 768 ? 100 : 10;
        window.scrollTo({
          top: targetPosition - offset,
          behavior: 'smooth',
        });
      }
    } else {
      window.location.href = link;
    }
  };

  // Handle active button class change
  const handleTabClick = (event) => {
    const menuLis = document.querySelectorAll('.tabs button');
    menuLis.forEach((btn) => btn.classList.remove('active'));
    event.target.closest('button').classList.add('active');
  };

  useEffect(() => {
    const menuLis = document.querySelectorAll('.tabs button');
    menuLis.forEach((btn) => btn.addEventListener('click', handleTabClick));
    return () => {
      menuLis.forEach((btn) =>
        btn.removeEventListener('click', handleTabClick),
      );
    };
  }, []);

  // Add scroll event listener to toggle sticky class
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        if (window.scrollY > tabsRef.current.offsetTop + 50) {
          tabsRef.current.classList.add('sticky');
        } else {
          tabsRef.current.classList.remove('sticky');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Error Handling
  if (error) {
    return <div>{error}</div>;
  }

  // Safely map over the tabs if they exist
  const tabs = menuData.tabs || [];







  return (
    <div className="page menumainppage">
      <section
        className="menulanding"
        style={{ backgroundImage: `url(${Fabel3DPreview})` }}
      >
        <div className="landingcontainer">
          <h2>{menuData.qrcustomertitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: menuData.qrcustomerdescription }} />
          <button ref={buttonRef} className="okunderstood bubbly-button swipe-effect">
            <span>{menuData.qrcustomerTitle}</span>
          </button>

          {/* Language popup */}
          {showLanguagePopup && (
            <div className="language-popup">
              <h2>select your preferred language</h2>
              <ul className="languagee-list">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="language-item"
                    style={{
                      fontWeight: selectedLanguage === lang.code ? 'bold' : 'normal',
                    }}
                  >
                      <span className={`flag-icon ${lang.flag} flag-icon-squared`}></span> {lang.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="mainmenusection">
        <div className="topmenublock">
          <h1>{menuData.title}</h1>
          <p>
            <i className="qrinfo"></i>{menuData.subTitle}
          </p>
          <div className="tabs" ref={tabsRef}>
            {/* Render the tabs only if there are tabs available */}
            {tabs.length > 0 ? (
              tabs.map((tab, index) => {
                const sectionId =
                  tab.english_lable.toLowerCase() === 'All'
                    ? 'frenchfries-section'
                    : `${tab.english_lable.toLowerCase()}-section`;
                return (
                  <button key={tab._key} className={index === 0 ? 'active' : ''}>
                    <a
                      href={`#${sectionId}`}
                      className="menubuttonlink"
                      onClick={(e) =>
                        handleMenuItemClick(e, e.target.getAttribute('href'))
                      }
                    >
                      {selectedLanguage === 'en' ? (
                        tab.english_lable
                      ) : (
                        <>
                          {tab.english_lable} / {tab.lable}
                        </>
                      )}
                    </a>
                  </button>
                );
              })
            ) : (
              <p>No tabs available</p>
            )}
          </div>
        </div>

        <div className="whightimagebf">
          <div className="content">
            {/* Dynamic Content Sections */}
            <div id="all-section"></div>

            <MenuSection
              id="frenchfries-section"
              title="Fries"
              subTitle="Our delicious fries!"
              menuData={menuData.tabContant.friet}
            />

            {tabs.map((tab, index) => (
              <MenuSection
                key={tab._key}
                id={`${tab.english_lable.toLowerCase()}-section`} // Dynamically set the id
                title={tab.english_lable} // Use the tab label dynamically
                subTitle="Description of the section"
                menuData={menuData.tabContant[tab.english_lable.toLowerCase()] || []} // Dynamically access the correct menu data
              />
            ))}
          </div>
          <div className="overlaybannehand-bottomsmenu"></div>
        </div>
      </section>
    </div>
  );
};

export default Qrmenu;
