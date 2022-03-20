import sanityClient from '@sanity/client'

export const getClient = (usePreview) => (usePreview ? previewClient : client)

const config = {
    dataset: process.env.REACT_APP_PUBLIC_SANITY_DATASET,
    projectId: process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-03-13',
}

export const client = sanityClient({
    ...config,
    useCdn: true,
})

export const  previewClient = sanityClient({
    ...config,
    useCdn: false,
})

export default client
