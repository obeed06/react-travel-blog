import React from 'react';
import useWindowPosition from '../hook/useWindowPosition';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CountryCard from "./cards/CountryCard";
import Grid from "@mui/material/Grid";
import {Parallax} from "react-scroll-parallax";

const Countries = ({countries}) => {
    useWindowPosition("countries");
    console.log(countries)

    return (
        <Box id="countries" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Countries.
                    </Typography>
                </Parallax>
            </Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{xs: 1, md: 3}}
                  columns={{xs: 1, sm: 2, md: 8}} sx={{position: "relative"}}>
                {Array.isArray(countries) ? countries.map((country, i) => {
                    return <Grid item key={i}><CountryCard country={country}/></Grid>
                }) : ""
                }
            </Grid>
        </Box>
    );
};

export default Countries;