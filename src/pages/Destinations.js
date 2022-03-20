import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import DestinationGrid from "../components/destination/DestinationGrid";
import {getDestinations} from "../lib/destinationApi";

const Destinations = ({preview = false}) => {
    const [destinations, setDestinations] = useState(null);
    useEffect(() => {
        getDestinations(preview)
            .then((data) => setDestinations(data))
            .catch(console.error);
    }, [preview]);
    return (
        <Box id="destinations" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Destinations.
                    </Typography>
                </Parallax>
            </Container>
            <DestinationGrid destinations={destinations}/>
        </Box>
    );
};

export default Destinations;