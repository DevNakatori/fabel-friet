import React, {useState, useEffect, useRef} from 'react';
import {useLanguage} from '~/components/LanguageContext';
import {client} from '../../sanityClient';
import gsap from 'gsap';
import Fabel3DPreview from '../assets/resizeimgs/webp/Fabel-3D-Preview.webp';

const MenuSection = ({id, title, subTitle, menuData}) => {
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
                        <span>{menuItem.recipe}</span>
                      </summary>
                      <p>{menuItem.recipedetails}</p>
                    </details>
                  ) : (
                    <span>{menuItem.recipe}</span>
                  )}
                  {menuItem.price && (
                    <span className="price">{menuItem.price}</span>
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

const Qrmenu = () => {
  const {language} = useLanguage();
  const [menuData, setMenuData] = useState({
    tabContant: {friet: [], snacks: [], drinks: []},
  });
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);
  const tabsRef = useRef(null);

  // Fetch menu data
  useEffect(() => {
    const qrmenu = async () => {
      const cachedMenuData = localStorage.getItem(`qrmenu_${language}`);

      if (cachedMenuData) {
        console.log('Using cached menu data');
        setMenuData(JSON.parse(cachedMenuData));
      } else {
        try {
          const data = await client.fetch(
            `*[_type == "qrmenu" && language == $lang]`,
            {lang: language},
          );
          console.log('Fetched menu data:', data);
          const menu = data[0] || {
            tabContant: {friet: [], snacks: [], drinks: []},
            tabs: []
          };
          localStorage.setItem(`qrmenu_${language}`, JSON.stringify(menu));
          setMenuData(menu);
        } catch (err) {
          console.error('Error fetching menu data:', err);
          setError('Failed to load data');
        }
      }
    };

    qrmenu();
  }, [language]);

  // GSAP animation for menu section
  useEffect(() => {
    const divs = document.querySelectorAll('.mainmenusection');
    const body = document.querySelector('body');

    gsap.set(divs, {bottom: '-100vh'});
    gsap.set(divs, {display: 'block'});
    gsap.set(body, {overflow: 'hidden'});

    const handleClick = () => {
      gsap.to(divs, {bottom: 0, duration: 1});
      gsap.set(body, {overflow: 'visible'});
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

    // Cleanup the event listener when the component unmounts
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
        style={{backgroundImage: `url(${Fabel3DPreview})`}}
      >
        <div className="landingcontainer">
          <h2>{menuData.qrcustomertitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: menuData.qrcustomerdescription }} />
          <button ref={buttonRef} className="okunderstood">
            {menuData.qrcustomerTitle}
          </button>
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
                  tab.lable.toLowerCase() === 'alle'
                    ? 'fries-section'
                    : `${tab.lable.toLowerCase()}-section`;
                return (
                  <button key={tab._key} className={index === 0 ? 'active' : ''}>
                    <a
                      href={`#${sectionId}`}
                      className="menubuttonlink"
                      onClick={(e) =>
                        handleMenuItemClick(e, e.target.getAttribute('href'))
                      }
                    >
                      {tab.lable}
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
            <MenuSection
              id="fries-section"
              title="Fries"
              subTitle="Our delicious fries!"
              menuData={menuData.tabContant.friet}
            />
{tabs.map((tab, index) => (
    <MenuSection
      key={tab._key}
      id={`${tab.lable.toLowerCase()}-section`} // Dynamically set the id
      title={tab.lable} // Use the tab label dynamically
      subTitle="Description of the section"
      menuData={menuData.tabContant[tab.lable.toLowerCase()] || []} // Dynamically access the correct menu data
    />
  ))}
{tabs.map((tab, index) => (
    <MenuSection
      key={tab._key}
      id={`${tab.lable.toLowerCase()}-section`} // Dynamically set the id
      title={tab.lable} // Use the tab label dynamically
      subTitle="Description of the section"
      menuData={menuData.tabContant[tab.lable.toLowerCase()] || []} // Dynamically access the correct menu data
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
