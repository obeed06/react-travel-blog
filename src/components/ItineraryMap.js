import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MapPlaceholder from "./MapPlaceholder";

const ItineraryMap = ( data ) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false)

    return (
        <Box className="section" sx={{py: 5}}>
            <Container maxWidth="lg">
                <Typography vairant="h1" component="h2" className="sectionHeader">
                    Map.
                </Typography>
                {
                    !isMapLoaded ? <MapPlaceholder data={data?.data?.placeholder} loadMap={() => {setIsMapLoaded(true);}} /> :
                        <iframe title="embedded-travel-map" src={data?.data?.iframeLink}
                        width="100%" height="500"/>
                }
            </Container>
        </Box>
    );
};

export default ItineraryMap;