import {getClient} from './client'
import {getRelatedPostsForDestination} from "./postApi";

export async function getDestination(slug, preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination" && slug.current == $slug][0]{
                name,
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
             }`,
            {slug});
}

export async function getDestinationAndRelatedPosts(slug, preview) {
    return Promise.all([getDestination(slug, preview), getRelatedPostsForDestination(slug, preview)]);
}

export async function getDestinations(preview) {
    return getClient(preview)
        .fetch(`*[_type == "destination"] | order(name asc) {
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
             }`);
}