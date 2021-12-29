import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ImageCard from "./ImageCard";
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({


    subHeading: {
        fontFamily: 'Nunito',
        textAlign: 'center',
    },
}));

const Trips = () => {
    const classes = useStyles();
    const checked = true;

    return (
        <Box className="tripsBG" id="trips" sx={{py: 5}}>
            <Container maxWidth='md'>
                <h1 className="sectionHeader tripHeader">
                    TRIPS.
                </h1>

                {/*<iframe src="https://www.travellerspoint.com/embed/map.cfm/#/embed/955332/1161935/?tiles=default&showguide=true&triponly" width="100%" height="500"/>*/}
            </Container>
            <Box sx={{px: 5}}>
                <Stack direction="row" spacing={2} className="trips"  >
                    {places.map(place => {
                        return <ImageCard place={place} checked={checked}/>

                    })}
                </Stack>
            </Box>
        </Box>
    );
};

export default Trips;