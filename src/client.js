import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "ho3u0oh3",
    dataset: "production",
    apiVersion: '2022-03-13',
    useCdn: true,
})