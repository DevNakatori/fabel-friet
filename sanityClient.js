import sanityClient from '@sanity/client'
export const client = sanityClient({
  projectId: '6tlmpa5b',
 // dataset: 'development',
  dataset: 'production',
  apiVersion: '2021-08-31', // use a UTC date string
 // token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})