import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import CountriesGrid from "../components/country/CountriesGrid";

const Destinations = () => {
    const [destinations, setDestinations] = useState(null)
    useEffect(() => {
        sanityClient.fetch(`*[_type == "country"] | order(name asc) {
            name,
                slug,
                cIcon{
                    asset->{
                        _id,
                        url
                    },
                alt
                },
                cBackground{
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

    if (!destinations) return <div>Loading...</div>;

    return (
        <Box id="countries" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Destinations.
                    </Typography>
                </Parallax>
            </Container>
            <CountriesGrid countries={destinations} />
        </Box>
    );
};

export default Destinations;