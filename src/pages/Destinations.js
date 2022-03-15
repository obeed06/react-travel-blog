import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import DestinationGrid from "../components/destination/DestinationGrid";

const Destinations = () => {
    const [destinations, setDestinations] = useState(null)
    useEffect(() => {
        sanityClient.fetch(`*[_type == "destination"] | order(name asc) {
            name,
                slug,
                icon{
                    asset->{
                        _id,
                        url
                    },
                alt
                },
                bgImage{
                    asset->{
                        _id,
                        url
                    },
                alt
                }
             }`)
            .then((data) => setDestinations(data))
            .catch(console.error);
    }, []);

    return (
        <Box id="destinations" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Destinations.
                    </Typography>
                </Parallax>
            </Container>
            <DestinationGrid destinations={destinations} />
        </Box>
    );
};

export default Destinations;