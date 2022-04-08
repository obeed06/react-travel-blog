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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
import {Link as Scroll} from "react-scroll";

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
                            <Grid item className="d-icon" style={{width: '60%', height: '60%'}}>
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
                            </Grid>
                            <Grid item>
                                <Scroll to="destination-content" smooth={true}>
                                    <Button variant="contained"
                                            endIcon={<ArrowDownwardIcon/>}>Explore {destination?.name}</Button>
                                </Scroll>

                            </Grid>
                        </Grid>
                    </Box>
                    <Container maxWidth='lg' id="destination-content">
                        <Stack direction="row" alignItems="center" spacing={2} className="cardXScroll"
                               sx={{pt: 1, px: 5, position: "relative", zIndex: "3"}}>
                            {getPickRegions(destination?.continent, destination?.regions)}
                            {getPickCountries(destination?.countries)}
                        </Stack>
                        <Divider/>
                    </Container>
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

function getPickRegions(continent, regions) {
    if (!continent && (!Array.isArray(regions) || regions.length === 0))
        return;
    return <>
        <Typography sx={{whiteSpace: "nowrap", textTransform: "uppercase"}}>
            Pick a region
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem/>
        {(continent) !== 'undefined' && continent !== null ? (
            <Button variant="underlined" style={{zIndex: 5}} component={Link}
                    to={"/destination/" + continent?.slug?.current}
            >{continent?.name}</Button>


        ) : (
            <></>
        )}
        {Array.isArray(regions) && regions.map(region => (
            <Button variant="underlined" style={{zIndex: 5}} component={Link}
                    to={"/destination/" + region?.slug?.current}
            >{region?.name}</Button>
        ))}
    </>
}


function getPickCountries(countries) {
    if (!Array.isArray(countries) || countries.length === 0)
        return;

    return <>
        <Typography sx={{whiteSpace: "nowrap", textTransform: "uppercase"}}>
            Pick a country
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem/>
        {Array.isArray(countries) && countries.map(country => (
            <Button variant="underlined" style={{zIndex: 5}} component={Link}
                    to={"/destination/" + country?.slug?.current}
            >{country?.name}</Button>
        ))}
    </>
}


export default Destination;