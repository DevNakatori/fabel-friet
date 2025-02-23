import { defer } from '@shopify/remix-oxygen';
import React, { useEffect, useState, useRef } from 'react';
import { Await, useLoaderData, Link } from '@remix-run/react';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Image, Money } from '@shopify/hydrogen';
import { LanguageProvider } from '~/components/LanguageContext';
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
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import '../styles/media.css';
import AOS from 'aos';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Cursor from '~/components/Cursor';



import { useMediaQuery } from '@react-hook/media-query';

gsap.registerPlugin(ScrollTrigger);
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: 'FabelFriet | Home' }];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({ ...deferredData, ...criticalData });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({ context }) {
  const [{ collections }] = await Promise.all([
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
function loadDeferredData({ context }) {
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

  gsap.config({
    force3D: false, // Forces 3D transformations for better performance
    nullTargetWarn: false, // Disable warnings for null target
    autoSleep: 0,
  });

  const ismobileprogress = useMediaQuery('(max-width: 767px)');
  // useEffect(() => {
  //   const disableKeyboardEvents = (event) => {
  //     event.preventDefault();
  //   };
  //   document.addEventListener('keydown', disableKeyboardEvents);
  //   document.addEventListener('keyup', disableKeyboardEvents);
  //   return () => {
  //     document.removeEventListener('keydown', disableKeyboardEvents);
  //     document.removeEventListener('keyup', disableKeyboardEvents);
  //   };
  // }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      // Check if the screen width is greater than or equal to 1024px (desktop)
      const smoother = ScrollSmoother.create({
        //smooth: 2,
        speed: 1,
        //effects: true,
        ease: 'expo',
        smooth: 1.5,
        effects: true
      });
      //smoother.effects("img", { speed: "auto" });
      //smoother.effects("video", { speed: "auto" });

      // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      //   anchor.addEventListener('click', (e) => {
      //     e.preventDefault(); // Prevent default anchor scroll
      
      //     const targetId = anchor.getAttribute('href').substring(1); // Get target ID
      //     const targetElement = document.getElementById(targetId);
      
      //     if (targetElement) {
      //       smoother.scrollTo(targetElement, {
      //         // Optional parameters, adjust as needed
      //         speed: 1.5,
      //         easing: 'expo',
      //       });
      //     }
      //   });
      // });
    }


    setTimeout(() => {
      AOS.init({
        once: true,
        duration: 1200,
        mirror: true,
        debounceDelay: 50,
        throttleDelay: 99,
      });
    }, 0);


    AOS.refresh();
  }, []);

  // useEffect(() => {
  //   const detectLanguage = async () => {
  //       const browserLanguage = navigator.language || navigator.userLanguage;
  //       if (browserLanguage) {
  //         const langCode = browserLanguage.split('-')[0];
  //       }
  //       try {
  //         const response = await fetch('https://ipapi.co/json/');
  //         const data = await response.json();
  //         const country = data.country_code;
  //         if (country === 'IN') {
  //           document.body.classList.add('india'); 
  //         } 
  //       } catch (error) {
  //       }
  //   };
  //   detectLanguage();
  // }, []);


  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 1024) {
  //       window.location.reload();
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);


  const [showHomePage, setShowHomePage] = useState(false);
  const [showOnzefriet, setShowOnzefriet] = useState(false);
  const [showOnzelocaties, setShowOnzelocaties] = useState(false);
  const [showHetmenu, setShowHetmenu] = useState(false);
  const [showOnzeimpact, setShowOnzeimpact] = useState(false);
  const [showGetintouch, setShowGetintouch] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowHomePage(true), 0); // show after 1 second
    setTimeout(() => setShowOnzefriet(true), 0); // show after 2 seconds
    setTimeout(() => setShowOnzelocaties(true), 0); // show after 3 seconds
    setTimeout(() => setShowHetmenu(true), 0); // show after 4 seconds
    setTimeout(() => setShowOnzeimpact(true), 0); // show after 5 seconds
    setTimeout(() => setShowGetintouch(true), 0); // show after 6 seconds
  }, []);


  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    if (window.innerWidth < 767) {
      window.addEventListener('scroll', updateScrollProgress);
      return () => {
        window.removeEventListener('scroll', updateScrollProgress);
      };
    }
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   const videoss = document.querySelector('#myVideo');
    //   if (videoss) {
    //     videoss.style.opacity = '1';
    //   }
    //   gsap.fromTo(
    //     '#myVideo',
    //     { opacity: 0 },
    //     {
    //       opacity: 1,
    //     },
    //   );
    // }, 2000);

    // if (!localStorage.getItem('hasReloaded')) {
    //   localStorage.setItem('hasReloaded', 'true');
    //   setTimeout(() => {
    //     // window.location.reload();
    //     ScrollTrigger.refresh();
    //     console.log('ScrollTrigger page');
    //   }, 4500);

    //   setTimeout(() => {
    //     const videoss = document.querySelector('#myVideo');
    //     if (videoss) {
    //       videoss.style.opacity = '1';
    //     }

    //     gsap.fromTo(
    //       '#myVideo',
    //       { opacity: 0 },
    //       {
    //         opacity: 1,
    //       },
    //     );


    //   }, 3000);
    // }
  }, []);

  useEffect(() => {
    // ScrollTrigger.refresh();
    // console.log('refresh page');

  }, []);



  useEffect(() => {
    let portrait = window.matchMedia('(orientation: portrait)');
    portrait.addEventListener('change', function (e) {
      if (e.matches) {
        window.location.reload();
      } else {

      }
    });
  }, []);

  return (
    <div className="home">
      <div className="mobilerotate">
        <div className="innermobile">
          <div className="phone"></div>
          <div className="message">Please rotate your device!</div>
        </div>
      </div>
      <div className="footerwithscrollbar onlymobile">
        <div className="scroll-progress-bar">
          <progress value={scrollProgress} max="100"></progress>
        </div>
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
            {loading ? (

              <>
                {showHomePage && <HomePage />}
                {showOnzefriet && <Onzefriet />}
                {showOnzelocaties && <Onzelocaties />}
                {showHetmenu && <Hetmenu />}
                {showOnzeimpact && <Onzeimpact />}
                {showGetintouch && <Getintouch />}  
              </>



            ) : (

              <div className="loadersite">
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
              </div>
            )}
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
function FeaturedCollection({ collection }) {
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
function RecommendedProducts({ products }) {
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
