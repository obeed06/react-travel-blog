import React from 'react';
import useWindowPosition from '../hook/useWindowPosition';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CountryCard from "./CountryCard";
import Grid from "@mui/material/Grid";

const Countries = ({countries}) => {
    useWindowPosition("countries");
    console.log(countries)

    return (
        <Box id="countries" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Typography vairant="h1" component="h2" className="sectionHeader itineraryHeader">
                    Countries.
                </Typography>
            </Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 2, md: 8 }}>
                {Array.isArray(countries) ? countries.map((country, i) => {
                    return <Grid item key={i}><CountryCard country={country}/></Grid>
                }) : ""
                }
            </Grid>
        </Box>
    );
};

export default Countries;