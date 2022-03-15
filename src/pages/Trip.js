import './Trip.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DestinationsSection from "../components/destination/DestinationsSection";
import ItineraryMap from "../components/trip/ItineraryMap";
import PostsGrid from "../components/post/PostsGrid";
import {makeStyles} from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme) => ({
    tripLanding: {
        "&::after": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

const Trip = () => {
    const classes = useStyles();
    const [trip, setTrip] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[_type == "trip" && slug.current == "${slug}"][0]{
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
                },
                "relatedPosts": *[_type == "post" && "${slug}" in trips[]->slug.current] | order(publishedAt desc)  {
                    title,
                    "authorName": author->name,
                    publishedAt,
                    destinations[]->{slug},
                    "destination": destinations[]->name[0],
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
            .then((data) => setTrip(data))
            .catch(console.error);
    }, [slug]);
    return typeof (trip) !== 'undefined' && trip !== null ? (
        <Box>
            <Box className={[classes.tripLanding, "tripLanding"]}
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + trip?.hero?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Typography vairant="h1" component="h2" className="title">
                        <div>{trip?.name}</div>
                    </Typography>
                </Grid>
            </Box>
            <span className="sections">
                <DestinationsSection destinations={trip?.destinations}/>
                <ItineraryMap data={trip?.itinerary}/>
            </span>
            <span className="sections">
                <Box id="postsSection" className="section" sx={{py: 5}}>
                    <PostsGrid postsData={trip.relatedPosts} checked={true}
                               header={
                                   <Typography vairant="h1" component="h2" className="sectionHeader">
                                       Related Posts.
                                   </Typography>
                               }
                    />
                </Box>
            </span>
        </Box>
    ) : <Box className="tripLanding">
            <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="end">
                <Skeleton sx={{mb: 5}} height={80} width={"40%"}/>
            </Grid>
        </Box>;
};

export default Trip;