import './Destination.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PostsGrid from "../components/post/PostsGrid";
import Skeleton from "@mui/material/Skeleton";
import {makeStyles, useTheme} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tripsSection: {
            backgroundColor: theme.palette.background.default,
    },
}));

const Destination = () => {
    const themeProps = useTheme();
    console.log(themeProps)
    const [destination, setDestination] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[_type == "destination" && slug.current == "${slug}"][0]{
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
                },
               "relatedPosts": *[_type == "post" && "${slug}" in destinations[]->slug.current] | order(publishedAt desc)  {
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
            .then((data) => setDestination(data))
            .catch(console.error);
    }, [slug]);

    return typeof (destination) !== 'undefined' && destination !== null ? (
        <Box>
            <Box className="landingDestinationImage"
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5), "+themeProps.palette.background.default+"), url(" + destination?.bgImage?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <div className="d-icon" style={{width: '60%', height: '60%'}}>
                        <div className="d-icon-bg"
                             style={{backgroundImage: "url(" + destination?.icon?.asset?.url + ")"}}></div>
                        <Typography vairant="h1" component="h2" className="title" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div>{destination?.name}</div>
                        </Typography>
                    </div>

                </Grid>
            </Box>
            <span className="sections">
                <Box id="postsSection" className="section" sx={{py: 5}}>
                    <PostsGrid postsData={destination.relatedPosts} checked={true}
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
            <Box className="landingDestinationImage">
                <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="center">
                    <Skeleton height={80} width={"40%"}/>
                </Grid>
            </Box>
        </Box>);
};

export default Destination;