import { json } from '@shopify/remix-oxygen';
import React, { useState, useEffect, useRef } from 'react';
import { client } from '../../sanityClient';
import { useLoaderData } from '@remix-run/react';
import { LanguageProvider } from '~/components/LanguageContext';
import LanguageSwitcher from '~/components/LanguageSwitcher';

import gsap from 'gsap';

import Fabel3DPreview from '../assets/resizeimgs/webp/Fabel-3D-Preview.webp';
import Qrmenuheader from '~/components/Qrmenuheader';
import Qrmenu from '~/components/Qrmenu';
import Newfootermenu from '~/components/Newfootermenu';

import '../styles/media.css';

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
  const { page } = useLoaderData();
  return (
    <div className='pagemenu'>
    <LanguageProvider>
      <LanguageSwitcher />
      <Qrmenuheader />
      <Qrmenu />
      <section className="footer">
        <Newfootermenu />
      </section>
    </LanguageProvider>
    </div>
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