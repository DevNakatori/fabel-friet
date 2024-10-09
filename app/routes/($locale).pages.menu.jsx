import { json } from '@shopify/remix-oxygen';
import React, { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import Newfooter from '~/components/Newfooter';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({ data }) => {
    return [
        { title: `Fabel Friet | ${data?.page.title ?? ''}` },
        { name: 'description', content: data.page.seo.description },
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
export async function loader({ params, request, context }) {
    const canonicalUrl = request.url;
    const handle = params.handle || 'menu';
    const { page } = await context.storefront.query(PAGE_QUERY, {
        variables: {
            handle: handle,
        },
    });

    if (!page) {
        throw new Response('Not Found', { status: 404 });
    }

    return json({ page, canonicalUrl });
}

export default function Page() {
    /** @type {LoaderReturnData} */
    const { page } = useLoaderData();

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: 'Fries', content: friesContent() },
        { label: 'Snacks', content: snacksContent() },
        { label: 'Drinks', content: drinksContent() },
    ];

    return (
        <div className="page menumainppage">
            {/* <main dangerouslySetInnerHTML={{__html: page.body}} /> */}
            {/* qr code menu header */}
            <section className="header"></section>
            {/* qr code menu main content */}
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
                    <div className="overlaybannehand-bottomsmenu"></div>
                </div>
            </section>
            {/* qr code menu footer */}

            <section className="footer">
            <Newfooter />
            </section>
        </div>
    );
}

const friesContent = () => (
    <>
        <section className="menu-section">
            <h2>
                Friet | Fries <span className="info-icon"></span>
            </h2>
            <p>
                Friet (medium) | Fries (medium) <span className="price">€3,95</span>
            </p>
        </section>
        <section className="menu-section">
            <h2>
                Toppings <span className="info-icon"></span>
            </h2>
            <p className="firsttext">1. Kies je topping | Choose your topping</p>
            <ul>
                <li>
                    Parmezaanse kaas | Parmesan cheese{' '}
                    <span className="price">€1,50</span>
                </li>
                <li>
                    Cheddar kaas | Cheddar cheese <span className="price">€1,50</span>
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
                    1 saus | 1 sauce <span className="price">€0,95</span>
                </li>
                <li>
                    2 sauzen | 2 sauces <span className="price">€1,50</span>
                </li>
                <li>
                    Uitjes | Chopped onions <span className="price">€0,10</span>
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
                    Friet Parmezaan en truffel mayonaise | Fries Parmesan and truffle
                    mayonnaise <span className="price">€6,40</span>
                </li>
                <li>
                    Friet speciaal (mayo, curry en ui) | Fries mayo, curry ketchup and
                    onion <span className="price">€5,55</span>
                </li>
                <li>
                    Friet oorlog (mayo, pindasaus en ui) | Fries mayo, peanut sauce and
                    onion <span className="price">€5,55</span>
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
                Croquettes are a traditional Dutch snack made with a filling of savoury ragout, coated in breadcrumbs and deep-fried until crispy. Holtkamp, the renowned Amsterdam patisserie, is famous for their delicious croquettes made with high-quality ingredients.
            </p>
            <ul>
                <li>
                    Rund (Holtkamp) | Beef{' '}
                    <span className="price">€3,25</span>
                </li>
                <li>
                    Kalf (Holtkamp) | Veal 
                    <span className="price">€3,25</span>
                </li>
                <li>
                    Kaas (Holtkamp) | Cheese
                    <span className="price">€3,25</span>
                </li>
                <li>
                    Garnaal (Holtkamp) | Shrimp
                    <span className="price">€4,25</span>
                </li>
            </ul>
            <ul className='breadextra'>
                <li>
                    + Brood | Bread{' '}
                    <span className="price">€0,65</span>
                </li>
                <li>
                    + Saus | Sauce 
                    <span className="price">€0,75</span>
                </li>
            </ul>
        </section>

        <section className="menu-section">
            <h2>
                Frikandel <span className="info-icon"></span>
            </h2>
            <p className="firsttext">A frikandel is a deep-fried sausage made from minced meat, spices, and seasonings.</p>
            <ul>
                <li>
                    Frikandel{' '}
                    <span className="price">€2,95</span>
                </li>
            </ul>
            <ul className='breadextra'>
                <li>
                    + Brood | Bread{' '}
                    <span className="price">€0,65</span>
                </li>
                <li>
                    + Saus | Sauce 
                    <span className="price">€0,75</span>
                </li>
            </ul>
        </section>
        <section className="menu-section">
            <h2>
                KAASSOUFFLÉ | CHEESE SOUFFLE <span className="info-icon"></span>
            </h2>
            <p className="firsttext">A cheese soufflé is a deep-fried, breaded snack that consists of a filling of melted Gouda cheese.</p>
            <ul>
                <li>
                    Kaassoufflé | Cheese soufflé  <span className="price">€2,95</span>
                </li>
            </ul>
            <ul className='breadextra'>
                <li>
                    + Brood | Bread{' '}
                    <span className="price">€0,65</span>
                </li>
                <li>
                    + Saus | Sauce 
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
                    Coca-Cola{' '}
                    <span className="price">€3,00</span>
                </li>
                <li>
                    Coca-Cola Zero <span className="price">€3,00</span>
                </li>
                <li>
                    Fanta <span className="price">€3,00</span>
                </li>
                <li>
                    Sprite <span className="price">€3,00</span>
                </li>
                <li>
                    Fuze Tea Peach <span className="price">€3,00</span>
                </li>
                <li>
                    Fuze Tea Mango <span className="price">€3,00</span>
                </li>
            </ul>
        </section>
        <section className="menu-section">
            <ul>
                <li>
                    Water | Water{' '}
                    <span className="price">€3,00</span>
                </li>
                <li>
                    Bruisend water | Sparkling water <span className="price">€3,00</span>
                </li>
            </ul>
        </section>
        <section className="menu-section">
            <ul>
                <li>
                    Heineken {' '}
                    <span className="price">€3,15</span>
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
