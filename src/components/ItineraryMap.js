import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MapPlaceholder from "./MapPlaceholder";
import {Parallax, useParallaxController} from "react-scroll-parallax";

const ItineraryMap = (data) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const parallaxController = useParallaxController();

    const handleLoad = () => parallaxController.update();


    return (
        <Box className="section" sx={{py: 5}}>
            <Parallax translateY={['0', '+48']}>
                <Container maxWidth='lg'>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Map.
                    </Typography>
                </Container>
            </Parallax>
            <Container maxWidth="lg">
                {
                    !isMapLoaded ? <MapPlaceholder data={data?.data?.placeholder} loadMap={() => {
                            setIsMapLoaded(true);
                        }}/> :
                        <iframe title="embedded-travel-map" src={data?.data?.iframeLink} style={{position: "relative"}}
                                onLoad={handleLoad}
                                width="100%" height="500"/>
                }
            </Container>
        </Box>
    );
};

export default ItineraryMap;