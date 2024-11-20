import {json} from '@shopify/remix-oxygen';
import React, {useState, useEffect, useRef} from 'react';
import {useLoaderData} from '@remix-run/react';
import {LanguageProvider} from '~/components/LanguageContext';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import Newfooter from '~/components/Newfooter';
import gsap from 'gsap';
import Newfootermenu from '~/components/Newfootermenu';
import Qrmenuheader from '~/components/Qrmenuheader';
import Franchise from '~/components/Franchise';
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
  const handle = params.handle || 'franchise';
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

  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Qrmenuheader />
      <div className="page menumainppage franchise">
        {/* <main dangerouslySetInnerHTML={{__html: page.body}} /> */}
        {/* qr code menu header */}
        {/* qr code menu main content */}
        <Franchise/>
        {/* qr code menu footer */}
        <section className="footer">
          <Newfootermenu />
        </section>
      </div>
    </LanguageProvider>
  );
}

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
