import React, {useState, useEffect} from 'react';
import ImageCard from "./ImageCard";
import useWindowPosition from '../hook/useWindowPosition';
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import sanityClient from "../client.js"

const Trips = () => {
    const checked = useWindowPosition("trips")
    const [tripData, setTrip] = useState(null);
    useEffect(() => {
        sanityClient.fetch(`*[_type == "trip"]{
            name,
            summary,
            thumbnail{
                asset->{
                    _id,
                    url
                },
                alt
            }
        } | order(tripDate desc)`)
            .then((data) => setTrip(data))
            .catch(console.error);
    }, []);
    return (
        <Box className="tripsBG" id="trips" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Typography vairant="h1" component="h2" className="sectionHeader tripHeader">
                    TRIPS.
                </Typography>
            </Container>
            <Stack direction="row" spacing={2} className="trips" sx={{p: 5}}>
                {tripData && tripData.map((trip, i) => {
                    return <ImageCard key={i} trip={trip} checked={checked} timeout={i}/>

                })}
            </Stack>
        </Box>
    );
};

export default Trips;