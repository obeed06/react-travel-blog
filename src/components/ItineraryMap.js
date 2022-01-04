import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MapPlaceholder from "./MapPlaceholder";

const ItineraryMap = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false)

    return (
        <Box sx={{py: 5}}>
            <Container maxWidth="lg">
                <Typography vairant="h1" component="h2" className="sectionHeader itineraryHeader">
                    Map.
                </Typography>
                {
                    !isMapLoaded ? <MapPlaceholder loadMap={() => {setIsMapLoaded(true);}} /> :
                        <iframe title="embedded-travel-map" src="https://www.travellerspoint.com/embed/map.cfm/#/embed/955332/?tiles=default&showguide=true&triponly"
                        width="100%" height="500"/>
                }
            </Container>
        </Box>

    );
};

export default ItineraryMap;