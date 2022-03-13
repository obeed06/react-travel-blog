import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Parallax} from "react-scroll-parallax";
import CountriesGrid from "./CountriesGrid";

const Countries = ({countries}) => {
    return (
        <Box id="countries" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Countries.
                    </Typography>
                </Parallax>
                <CountriesGrid countries={countries} />
            </Container>
        </Box>
    );
};

export default Countries;