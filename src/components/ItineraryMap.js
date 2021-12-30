import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ItineraryMap = () => {
    return (
        <Box sx={{py: 5}}>
            <Container maxWidth="md">
                <Typography vairant="h1" component="h2" className="sectionHeader itineraryHeader">
                    Map.
                </Typography>
                <iframe
                    src="https://www.travellerspoint.com/embed/map.cfm/#/embed/955332/?tiles=default&showguide=true&triponly"
                    width="100%" height="500"/>
            </Container>
        </Box>

    );
};

export default ItineraryMap;