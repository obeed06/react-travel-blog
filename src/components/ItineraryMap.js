import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const ItineraryMap = () => {
    return (
        <Box sx={{py: 5}}>
            <Container maxWidth="md">
                <h1 className="sectionHeader itineraryHeader">
                    Map Itinerary.
                </h1>
                <iframe
                    src="https://www.travellerspoint.com/embed/map.cfm/#/embed/955332/?tiles=default&showguide=true&triponly"
                    width="100%" height="500"/>
            </Container>
        </Box>

    );
};

export default ItineraryMap;