import React from 'react';
import Container from "@mui/material/Container";
import CountryCard from "./CountryCard";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileCountryCard from "./MobileCountryCard";
import SkeletonCountryCard from "./SkeletonCountryCard";

const CountriesGrid = ({countries}) => {
    const matches = useMediaQuery('(min-width:656px)');

    return (
        matches ? (
            <Container maxWidth='lg'>
                <Grid container direction="row" justifyContent="space-between"
                      spacing={2} sx={{position: "relative"}}>
                    {
                        countries ?
                            (
                                countries.map((country, i) => (
                                    <Grid sm={6} md={4} lg={3} item key={i}><CountryCard country={country}/></Grid>

                                ))
                            ) : (
                                <React.Fragment>
                                    {
                                        [...Array(16)].map((e, i) => (
                                            <Grid sm={6} md={4} lg={3} item key={"skeleton-c-" + i}>
                                                <SkeletonCountryCard/>
                                            </Grid>
                                        ))
                                    }
                                </React.Fragment>
                            )
                    }
                </Grid>
            </Container>
        ) : (
            <Grid container direction="column" justifyContent="flex-start" alignItems="stretch"
                  sx={{position: "relative"}}>
                {countries &&
                countries.map((post, i) => (
                    <Grid item key={"mobile-country-" + i}><MobileCountryCard post={post}/></Grid>
                ))}
            </Grid>
        )
    );
};

export default CountriesGrid;