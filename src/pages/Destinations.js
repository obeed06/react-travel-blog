import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import CountryCard from "../components/cards/CountryCard";

const Destinations = () => {
    const [destinations, setDestinations] = useState(null)
    useEffect(() => {
        sanityClient.fetch(`*[_type == "country"]{
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
             }  | order(name asc)`)
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
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{xs: 1, md: 3}}
                  columns={{xs: 1, sm: 2, md: 8}} sx={{position: "relative"}}>
                {Array.isArray(destinations) ? destinations.map((country, i) => {
                    return <Grid item key={i}><CountryCard country={country}/></Grid>
                }) : ""
                }
            </Grid>
        </Box>
    );
};

export default Destinations;