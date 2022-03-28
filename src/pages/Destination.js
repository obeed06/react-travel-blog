import './Destination.css'
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PostsGrid from "../components/post/PostsGrid";
import Skeleton from "@mui/material/Skeleton";
import {useTheme} from "@mui/styles";
import {getDestinationAndRelatedPosts} from "../lib/destinationApi";
import {useParams} from "react-router";
import HeaderAndFooter from "../components/HeaderAndFooter";

const Destination = ({preview = false}) => {
    const themeProps = useTheme();
    let {slug} = useParams();
    const [destination, setDestination] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState(null);
    useEffect(() => {
        getDestinationAndRelatedPosts(slug, preview)
            .then(([dData, rpData]) => {
                setDestination(dData);
                setRelatedPosts(rpData);
            })
            .catch(console.error);
    }, [slug, preview]);
    return <HeaderAndFooter>
        {
            typeof (destination) !== 'undefined' && destination !== null ? (
                <Box>
                    <Box className="destinationLanding"
                         style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5), " + themeProps.palette.background.default + "), url(" + destination?.bgImage?.asset?.url + ")"}}>
                        <Grid sx={{height: "100%"}} container direction="column" justifyContent="center"
                              alignItems="center">
                            <div className="d-icon" style={{width: '60%', height: '60%'}}>
                                <div className="d-icon-bg"
                                     style={{backgroundImage: "url(" + destination?.icon?.asset?.url + ")"}}></div>
                                <Typography vairant="h1" component="h1" className="d-title" style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}>
                                    {destination?.name}
                                </Typography>
                            </div>

                        </Grid>
                    </Box>
                    <span className="sections">
                <Box id="postsSection" className="section" sx={{py: 5}}>
                    <PostsGrid postsData={relatedPosts} checked={true}
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
                    <Box className="destinationLanding">
                        <Grid sx={{height: "100%"}} container direction="row" justifyContent="center"
                              alignItems="center">
                            <Skeleton height={80} width={"40%"}/>
                        </Grid>
                    </Box>
                </Box>)
        }

    </HeaderAndFooter>
};

export default Destination;