import {json} from '@shopify/remix-oxygen';
import React, {useState, useEffect, useRef} from 'react';
import {client} from '../../sanityClient';
import {useLoaderData} from '@remix-run/react';
import gsap from 'gsap';
import Newfootermenu from '~/components/Newfootermenu';
import Fabel3DPreview from '../assets/resizeimgs/Fabel-3D-Preview.png';
/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [
    {title: `Fabel Friet | ${data?.page.title ?? ''}`},
    {name: 'description', content: data.page.seo.description},
    {
      tagName: 'link',
      rel: 'canonical',
      href: data.canonicalUrl,
    },
  ];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const canonicalUrl = request.url;
  const handle = params.handle || 'menu';
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page, canonicalUrl});
}

export default function Page() {
  /** @type {LoaderReturnData} */

  const {page} = useLoaderData();
  const [menuData, setMenuData] = useState({tabContant: {friet: []}}); // Default structure
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const query = '*[_type == "qrmenu"]';
      const datas = await client.fetch(query);
      setMenuData(datas[0] || {tabContant: {friet: []}}); // Ensure structure
      console.log('Fetched Data:', datas);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const button = document.querySelector('.okunderstood');
    const divs = document.querySelectorAll('.mainmenusection');
    const body = document.querySelectorAll('body');

    gsap.set(divs, {bottom: '-100vh'});
    gsap.set(body, {overflow: 'hidden'});

    const handleClick = () => {
      console.log('Button clicked!');
      gsap.to(divs, {bottom: 0, duration: 1});
      gsap.set(body, {overflow: 'visible'});
    };

    if (button) {
      button.addEventListener('click', handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
      }
    };
  }, []);

  // Declare tabs outside of setTimeout
  const tabs = [
    {label: 'Fries', content: friesContent(menuData)},
    {label: 'Snacks', content: snacksContent(menuData)},
    {label: 'Drinks', content: drinksContent(menuData)},
    {label: 'All', content: allContent(menuData)},
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page menumainppage">
      {/* <main dangerouslySetInnerHTML={{__html: page.body}} /> */}
      {/* qr code menu header */}
      <section className="header"></section>
      {/* qr code menu main content */}
      <section
        className="menulanding"
        style={{backgroundImage: `url(${Fabel3DPreview})`}}
      >
        <div className="landingcontainer">
          <h2>Dear customers</h2>
          <p>
            We kindly ask you to respect our neighbours by not eating your fries
            in front of their house. Instead, find a nice spot by the canal.{' '}
          </p>
          <p>Thank you for your understanding and cooperation!</p>
          <button className="okunderstood">Ok, understood</button>
        </div>
      </section>
      <section className="mainmenusection">
        <div className="topmenublock">
          <h1>Menu</h1>
          <p>
            <i className="qrinfo"></i>Klik op de informatie knop achter elk item
            om direct alle allergenen te zien
          </p>
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={activeTab === index ? 'active' : ''}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="whightimagebf">
          <div className="content">{tabs[activeTab].content}</div>

          {/* <h1>{menuData.title}</h1>
      <p>{menuData.subTitle}</p> */}

          <div className="overlaybannehand-bottomsmenu"></div>
        </div>
      </section>
      {/* qr code menu footer */}

      <section className="footer">
        <Newfootermenu />
      </section>
    </div>
  );
}

const allContent = (menuData) => {
  if (!menuData.tabContant || !menuData.tabContant.friet) {
    return <div>No menu data available.</div>;
  }

  return (
    <div className="content">
      {menuData.tabContant.friet.map((section) => (
  <section className="menu-section" key={section._key}>
    <h2>
      {section.title} <span className="info-icon"></span>
    </h2>
    <p className="firsttext">{section.subTitle}</p>
    <ul>
      {section.menu.map((menuItem) => (
        <li key={menuItem._key}>
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
))}
    </div>
  );
};

const friesContent = () => (
  <>
    <section className="menu-section">
      <h2>
        Friet | Fries <span className="info-icon"></span>
      </h2>
      <p>
        <span>Friet (medium) | Fries (medium)</span>{' '}
        <span className="price">€3,95</span>
      </p>
    </section>
    <section className="menu-section">
      <h2>
        Toppings <span className="info-icon"></span>
      </h2>
      <p className="firsttext">1. Kies je topping | Choose your topping</p>
      <ul>
        <li>
          <span>Parmezaanse kaas | Parmesan cheese </span>
          <span className="price">€1,50</span>
        </li>
        <li>
          <span>Cheddar kaas | Cheddar cheese</span>{' '}
          <span className="price">€1,50</span>
        </li>
      </ul>
    </section>
    <section className="menu-section">
      <h2>
        Sauzen | Sauces <span className="info-icon"></span>
      </h2>
      <p className="firsttext">2. Kies je saus | Choose your sauce</p>
      <ul>
        <li>
          <span>1 saus | 1 sauce</span>
          <span className="price">€0,95</span>
        </li>
        <li>
          <span>2 sauzen | 2 sauces</span> <span className="price">€1,50</span>
        </li>
        <li>
          <span>Uitjes | Chopped onions</span>{' '}
          <span className="price">€0,10</span>
        </li>
      </ul>
      <ul>
        <li>Mayonaise | Mayonnaise</li>
        <li>Zure mayo | Sour mayo</li>
        <li>Truffel mayo | Truffle mayo</li>
        <li>Pittige mayo | Spicy mayo</li>
        <li>Piccalilly mayo</li>
        <li>Vegan mayo</li>
        <li>Ketchup | Tomato ketchup</li>
        <li>Curry | Curry ketchup</li>
        <li>Pindasaus | Peanut sauce</li>
      </ul>
    </section>
    <section className="menu-section">
      <h2>
        Onze keuze | Our choice <span className="info-icon"></span>
      </h2>
      <ul>
        <li>
          <span>
            Friet Parmezaan en truffel mayonaise | Fries Parmesan and truffle
            mayonnaise{' '}
          </span>
          <span className="price">€6,40</span>
        </li>
        <li>
          <span>
            Friet speciaal (mayo, curry en ui) | Fries mayo, curry ketchup and
            onion
          </span>{' '}
          <span className="price">€5,55</span>
        </li>
        <li>
          <span>
            Friet oorlog (mayo, pindasaus en ui) | Fries mayo, peanut sauce and
            onion
          </span>{' '}
          <span className="price">€5,55</span>
        </li>
      </ul>
    </section>
  </>
);

// Snacks Tab Content
const snacksContent = () => (
  <>
    <section className="menu-section">
      <h2>
        Kroketten | CROQUETTES <span className="info-icon"></span>
      </h2>
      <p className="firsttext">
        Croquettes are a traditional Dutch snack made with a filling of savoury
        ragout, coated in breadcrumbs and deep-fried until crispy. Holtkamp, the
        renowned Amsterdam patisserie, is famous for their delicious croquettes
        made with high-quality ingredients.
      </p>
      <ul>
        <li>
          <span>Rund (Holtkamp) | Beef</span>{' '}
          <span className="price">€3,25</span>
        </li>
        <li>
          <span>Kalf (Holtkamp) | Veal</span>
          <span className="price">€3,25</span>
        </li>
        <li>
          <span>Kaas (Holtkamp) | Cheese</span>
          <span className="price">€3,25</span>
        </li>
        <li>
          <span>Garnaal (Holtkamp) | Shrimp</span>
          <span className="price">€4,25</span>
        </li>
      </ul>
      <ul className="breadextra">
        <li>
          <span>+ Brood | Bread</span> <span className="price">€0,65</span>
        </li>
        <li>
          <span>+ Saus | Sauce</span>
          <span className="price">€0,75</span>
        </li>
      </ul>
    </section>

    <section className="menu-section">
      <h2>
        Frikandel <span className="info-icon"></span>
      </h2>
      <p className="firsttext">
        A frikandel is a deep-fried sausage made from minced meat, spices, and
        seasonings.
      </p>
      <ul>
        <li>
          <span>Frikandel</span> <span className="price">€2,95</span>
        </li>
      </ul>
      <ul className="breadextra">
        <li>
          <span>+ Brood | Bread</span> <span className="price">€0,65</span>
        </li>
        <li>
          <span>+ Saus | Sauce</span>
          <span className="price">€0,75</span>
        </li>
      </ul>
    </section>
    <section className="menu-section">
      <h2>
        KAASSOUFFLÉ | CHEESE SOUFFLE <span className="info-icon"></span>
      </h2>
      <p className="firsttext">
        A cheese soufflé is a deep-fried, breaded snack that consists of a
        filling of melted Gouda cheese.
      </p>
      <ul>
        <li>
          <span>Kaassoufflé | Cheese soufflé</span>{' '}
          <span className="price">€2,95</span>
        </li>
      </ul>
      <ul className="breadextra">
        <li>
          <span>+ Brood | Bread</span> <span className="price">€0,65</span>
        </li>
        <li>
          <span>+ Saus | Sauce</span>
          <span className="price">€0,75</span>
        </li>
      </ul>
    </section>
  </>
);

// Drinks Tab Content
const drinksContent = () => (
  <>
    <section className="menu-section">
      <h2>
        Drankjes | Drinks <span className="info-icon"></span>
      </h2>
      <ul>
        <li>
          <span>Coca-Cola</span> <span className="price">€3,00</span>
        </li>
        <li>
          <span>Coca-Cola Zero</span> <span className="price">€3,00</span>
        </li>
        <li>
          <span>Fanta</span> <span className="price">€3,00</span>
        </li>
        <li>
          <span>Sprite</span> <span className="price">€3,00</span>
        </li>
        <li>
          <span>Fuze Tea Peach</span> <span className="price">€3,00</span>
        </li>
        <li>
          <span>Fuze Tea Mango</span> <span className="price">€3,00</span>
        </li>
      </ul>
    </section>
    <section className="menu-section">
      <ul>
        <li>
          <span>Water | Water</span> <span className="price">€3,00</span>
        </li>
        <li>
          <span>Bruisend water | Sparkling water</span>{' '}
          <span className="price">€3,00</span>
        </li>
      </ul>
    </section>
    <section className="menu-section">
      <ul>
        <li>
          <span>Heineken</span> <span className="price">€3,15</span>
        </li>
      </ul>
    </section>
  </>
);

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
