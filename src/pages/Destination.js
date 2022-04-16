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
import Divider from "@mui/material/Divider";
import {Link as Scroll} from "react-scroll";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {deepOrange} from "@mui/material/colors";

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
                        <Tabs variant="scrollable"
                              scrollButtons="auto"
                              aria-label="related destinations links">
                            {getPickRegions(destination?.continent, destination?.regions)}
                            {getPickCountries(destination?.countries)}
                            {getPickTrips(destination?.trips)}
                        </Tabs>

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

function LinkTab(props) {
    return (
        <Tab
            component="a"
            sx={{
                borderBottom: "2px solid transparent",
                ":hover": {
                    borderBottom: "2px solid " + deepOrange["500"]
                }
            }}
            {...props}
        />
    );
}

function getPickRegions(continent, regions) {
    if (!continent && (!Array.isArray(regions) || regions.length === 0))
        return;
    return <>
        <Tab disabled sx={{textTransform: "uppercase"}} label="Pick a region" />
        <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
        {(continent) !== 'undefined' && continent !== null ? (
            <LinkTab style={{zIndex: 5}} label={continent?.name} href={"/destination/" + continent?.slug?.current} />
        ) : (
            <></>
        )}
        {Array.isArray(regions) && regions.map(region => (
            <LinkTab style={{zIndex: 5}} label={region?.name} href={"/destination/" + region?.slug?.current} />
        ))}
    </>
}

function getPickCountries(countries) {
    if (!Array.isArray(countries) || countries.length === 0)
        return;

    return <>
        <Tab disabled sx={{textTransform: "uppercase"}} label="Pick a country" />
        <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
        {Array.isArray(countries) && countries.map(country => (
            <LinkTab style={{zIndex: 5}} label={country?.name} href={"/destination/" + country?.slug?.current} />
        ))}
    </>
}

function getPickTrips(trips) {
    if (!Array.isArray(trips) || trips.length === 0)
        return;

    return <>
        <Tab disabled sx={{textTransform: "uppercase"}} label="See in trips" />
        <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
        {Array.isArray(trips) && trips.map(trip => (
            <LinkTab style={{zIndex: 5}} label={trip?.name} href={"/trip/" + trip?.slug?.current} />
        ))}
    </>
}

export default Destination;