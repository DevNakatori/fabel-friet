import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import {client} from '../../sanityClient';
import {LanguageProvider} from '~/components/LanguageContext';
import LanguageSwitcher from '~/components/LanguageSwitcher';
import Qrmenuheader from '~/components/Qrmenuheader';
import Newfootermenu from '~/components/Newfootermenu';
import '../styles/policy.css';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.policy.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  return json({policy});
}

export default function Policy() {
  /** @type {LoaderReturnData} */
  const {policy} = useLoaderData();

  return (
    <>
      <LanguageProvider>
        <LanguageSwitcher />
        <Qrmenuheader />
        <div className="page menumainppage">
          <div className="policy">
            {/* <br />
      <br />
      <div>
        <Link to="/policies">← Back to Policies</Link>
      </div>
      <br /> */}
            <section className="mainmenusection">
              <div className="topmenublock">
              
                <h1>{policy.title}</h1>
              </div>
            </section>
            <div className="whightimagebf">
              <div className="content">
                <div dangerouslySetInnerHTML={{__html: policy.body}} />
              </div>
            </div>
          </div>
        </div>
        <section className="footer">
          <Newfootermenu />
        </section>
      </LanguageProvider>
    </>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;

/**
 * @typedef {keyof Pick<
 *   Shop,
 *   'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
 * >} SelectedPolicies
 */

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Shop} Shop */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
