import {getClient} from './client'
import {getRelatedPostsForTrip} from "./postApi";

export async function getTrip(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "trip" && slug.current == $slug][0]{
                name,
                hero{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                itinerary->{
                    iframeLink,
                    placeholder{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    }
                },
                destinations[]->{
                    name,
                    slug,
                    icon{
                        asset->{
                            _id,
                            url
                        },
                    alt
                    },
                    bgImage{
                        asset->{
                            _id,
                            url
                        },
                    alt
                    }
                }
             }`,
            {slug});
}

export async function getTripAndRelatedPosts(slug, preview) {
    return Promise.all([getTrip(slug, preview), getRelatedPostsForTrip(slug, preview)]);
}

export async function getTrips(preview) {
    return getClient(preview)
        .fetch(`*[_type == "trip"] | order(tripDate desc) {
            name,
            summary,
            slug,
            thumbnail{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`);
}