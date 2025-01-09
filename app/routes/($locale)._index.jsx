import {defer} from '@shopify/remix-oxygen';
import React, {useEffect, useState, useRef} from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Image, Money} from '@shopify/hydrogen';
import {LanguageProvider} from '~/components/LanguageContext';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import 'aos/dist/aos.css';
import HomePage from '~/components/Homepage';
import Onzefriet from '~/components/Onzefriet';
import Onzelocaties from '~/components/Onzelocaties';
import Hetmenu from '~/components/Hetmenu';
import Onzeimpact from '~/components/Onzeimpact';
import Getintouch from '~/components/Getintouch';
// import ScrollNav from '~/components/ScrollNav';
import Newheader from '~/components/Newheader';
import bannerlogo from '../assets/resizeimgs/webp/logobanner.webp';
import {ScrollSmoother} from 'gsap/ScrollSmoother';
import '../styles/media.css';
import AOS from 'aos';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Cursor from '~/components/Cursor';

gsap.registerPlugin(ScrollSmoother);

gsap.registerPlugin(ScrollTrigger);
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'FabelFriet | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      // Check if the screen width is greater than or equal to 1024px (desktop)
      // const smoother = ScrollSmoother.create({
      //   smooth: 1,
      //   smoothTouch: 0.2,
      // });
      // smoother.effects("img", { speed: "auto" });
      // smoother.effects("video", { speed: "auto" });
    }

    AOS.init({
      once: true,
      duration: 1200,
      mirror: true,
      debounceDelay: 50,
      throttleDelay: 99,
    });
    // AOS.refresh();
  }, []);

  const [showHomePage, setShowHomePage] = useState(false);
  const [showOnzefriet, setShowOnzefriet] = useState(false);
  const [showOnzelocaties, setShowOnzelocaties] = useState(false);
  const [showHetmenu, setShowHetmenu] = useState(false);
  const [showOnzeimpact, setShowOnzeimpact] = useState(false);
  const [showGetintouch, setShowGetintouch] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowHomePage(true), 1); // show after 1 second
    setTimeout(() => setShowOnzefriet(true), 1); // show after 2 seconds
    setTimeout(() => setShowOnzelocaties(true), 1); // show after 3 seconds
    setTimeout(() => setShowHetmenu(true), 1); // show after 4 seconds
    setTimeout(() => setShowOnzeimpact(true), 1); // show after 5 seconds
    setTimeout(() => setShowGetintouch(true), 1); // show after 6 seconds
  }, []);

  useEffect(() => {
    const app = () => {
      let Sections = gsap.utils.toArray('section');

      Sections.forEach((section, index) => {
        section.classList.add(`panel-${index}`);
      });
      const getTotalWidth = () => {
        let width = 0;
        Sections.forEach((el) => (width += el.offsetWidth));
        return width;
      };
      let snap;
      gsap.to(Sections, {
        x: () => -getTotalWidth() + window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: '#smooth-wrapper',
          pin: false,
          start: 0,
          end: () =>
            '+=' + document.querySelector('#smooth-wrapper').scrollWidth,
          invalidateOnRefresh: false,
          onRefresh() {
            let totalWidth = getTotalWidth(),
              accumulatedWidth = 0,
              progressArray = Sections.map((el) => {
                accumulatedWidth += el.offsetWidth;
                return accumulatedWidth / totalWidth;
              });
            progressArray.unshift(0);
            snap = gsap.utils.snap(progressArray);
          },
          scrub: true,
          markers: false,
        },
      });
      gsap.to('progress', {
        value: 100,
        ease: 'none',
        scrollTrigger: {scrub: 0.3},
      });
    };
    const timer = setTimeout(() => {
      app();
    }, 0);

    //Clean up GSAP instances on component unmount
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // gsap.to('progress', {
    //   value: 100,
    //   ease: 'none',
    //   scrollTrigger: { scrub: 0.3 }
    // });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('hasReloaded')) {
      localStorage.setItem('hasReloaded', 'true');
      setTimeout(() => {
        //scrollToSection(window.location.hash);
        window.location.reload();
      }, 2500);
    }
  }, []);

  useEffect(() => {
    let portrait = window.matchMedia('(orientation: portrait)');
    portrait.addEventListener('change', function (e) {
      if (e.matches) {
        console.log('Portrait mode');
        window.location.reload();
      } else {
        console.log('Landscape');
      }
    });
  }, []);

  return (
    <div className="home">
      {/* <div id="loadersitetrans" className="loadersitetrans">
        <div className="logosvg">
          <img src={bannerlogo} alt="logo" />
        </div>
        <div className="loader1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div> */}

      <div className="mobilerotate">
        <div className="innermobile">
          <div className="phone"></div>
          <div className="message">Please rotate your device!</div>
        </div>
      </div>
      <div className="footerwithscrollbar onlymobile">
        <progress max="100" value="0"></progress>
        <div className="scroll-down">
          <p>Scroll down</p>
        </div>
      </div>
      {/* <ScrollNav /> */}
      <LanguageProvider>
        <LanguageSwitcher />
        <Newheader />
        <Cursor />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {showHomePage && <HomePage />}
            {showOnzefriet && <Onzefriet />}
            {showOnzelocaties && <Onzelocaties />}
            {showHetmenu && <Hetmenu />}
            {showOnzeimpact && <Onzeimpact />}
            {showGetintouch && <Getintouch />}
          </div>
        </div>
      </LanguageProvider>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
