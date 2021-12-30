import React from 'react';
import ImageCard from "./ImageCard";
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Trips = () => {
    const checked = useWindowPosition("trips")

    return (
        <Box className="tripsBG" id="trips" sx={{py: 5}}>
            <Container maxWidth='md'>
                <h1 className="sectionHeader tripHeader">
                    TRIPS.
                </h1>
            </Container>
            <Stack direction="row" spacing={2} className="trips" sx={{p: 5}}>
                {places.map((place, i) => {
                    return <ImageCard key={i} place={place} checked={checked} timeout={i}/>

                })}
            </Stack>
        </Box>
    );
};

export default Trips;