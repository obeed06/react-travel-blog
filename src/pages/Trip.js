import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Countries from "../components/Countries";
import ItineraryMap from "../components/ItineraryMap";

const Trip = () => {
    const [trip, setTrip] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"][0]{
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
                countries[]->{
                    name,
                    slug,
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
                    }
                }
             }`)
            .then((data) => setTrip(data))
            .catch(console.error);
    }, [slug]);
    console.log(trip)
    return typeof (trip) !== 'undefined' && trip !== null ? (
        <Box>
            <Box className="landingTripImage"
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + trip?.hero?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Typography vairant="h1" component="h2" className="title">
                        <div>{trip?.name}</div>
                    </Typography>
                </Grid>
            </Box>
            <Countries countries={trip?.countries}/>
            <ItineraryMap data={trip?.itinerary}/>
        </Box>
    ) : "";
};


export default Trip;