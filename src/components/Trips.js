import React, {useState, useEffect} from 'react';
import ImageCard from "./cards/ImageCard";
import useWindowPosition from '../hook/useWindowPosition';
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import sanityClient from "../client.js"
import {Parallax} from "react-scroll-parallax";

const Trips = () => {
    const checked = useWindowPosition("trips")
    const [tripsData, setTrips] = useState(null);
    useEffect(() => {
        sanityClient.fetch(`*[_type == "trip"] | order(tripDate desc) {
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
        }`)
            .then((data) => setTrips(data))
            .catch(console.error);
    }, []);
    return (
        <Box id="trips" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+55']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        TRIPS.
                    </Typography>
                </Parallax>
            </Container>
            <Stack direction="row" spacing={2} className="cardXScroll" sx={{pt:1, pb: 5, px: 5}}>
                {tripsData && tripsData.map((trip, i) => {
                    return <ImageCard key={i} slugPrefix="/trip/" item={trip} checked={checked}/>
                })}
            </Stack>
        </Box>
    );
};

export default Trips;