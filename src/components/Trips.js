import React from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ImageCard from "./ImageCard";
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';
import Stack from "@mui/material/Stack";


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
                {places.map((place, index) => {
                    return <ImageCard place={place} checked={checked} timeout={index}/>

                })}
            </Stack>
        </Box>
    );
};

export default Trips;