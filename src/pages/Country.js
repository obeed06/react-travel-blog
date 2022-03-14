import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PostsGrid from "../components/post/PostsGrid";
import SkeletonHeroPostCard from "../components/post/SkeletonHeroPostCard";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";

const Country = () => {
    const [country, setCountry] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[_type == "country" && slug.current == "${slug}"][0]{
                name,
                cIcon{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                cBackground{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
               "relatedPosts": *[_type == "post" && "${slug}" in countries[]->slug.current] | order(publishedAt desc)  {
                    title,
                    "authorName": author->name,
                    publishedAt,
                    countries[]->{slug},
                    "country": countries[]->name[0],
                    "category": categories[]->{
                        "colourHex": colour.hex,
                        title
                    }[0],
                    slug,
                    isFeatured,
                    mainImage{
                        asset->{
                            _id,
                            url
                        }
                    }
               }
             }`)
            .then((data) => setCountry(data))
            .catch(console.error);
    }, [slug]);

    return typeof (country) !== 'undefined' && country !== null ? (
        <Box>
            <Box className="landingTripImage"
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + country?.cBackground?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <div className="d-icon" style={{width: '60%', height: '60%'}}>
                        <div className="d-icon-bg"
                             style={{backgroundImage: "url(" + country?.cIcon?.asset?.url + ")"}}></div>
                        <Typography vairant="h1" component="h2" className="title" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div>{country?.name}</div>
                        </Typography>
                    </div>

                </Grid>
            </Box>
            <span className="sections">
                <Box id="postsSection" className="section" sx={{py: 5}}>
                    <PostsGrid postsData={country.relatedPosts} checked={true}
                               header={
                                   <Typography vairant="h1" component="h2" className="sectionHeader">
                                       Related Posts.
                                   </Typography>
                               }
                    />
                </Box>
            </span>
        </Box>
    ) : (
        <Box>
            <Box className="landingTripImage">
                <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="center">
                    <Skeleton height={80} width={"40%"}/>
                </Grid>
            </Box>
        </Box>);
};

export default Country;