import './Trips.css';
import React, {useState, useEffect} from 'react';
import TripCard from "./TripCard";
import useWindowPosition from '../../hook/useWindowPosition';
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import sanityClient from "../../client.js"
import {Parallax} from "react-scroll-parallax";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tripsSection: {
        "&::before": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

const Trips = () => {
    const classes = useStyles();
    const checked = true;//useWindowPosition("trips")
    const [tripsData, setTrips] = useState(null);
    useEffect(() => {
        sanityClient.fetch(`*[_type == "trip"] | order(tripDate desc) {
            name,
            summary,
            slug,
            thumbnail{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`)
            .then((data) => setTrips(data))
            .catch(console.error);
    }, []);
    if (!tripsData) return <div>Loading...</div>;

    // let sectionBGUrl = tripsData[0]?.thumbnail.asset.url;

    return (
        <Box id="trips" className={[classes.tripsSection, "tripsSection", "section"]} sx={{py: 5}}>
            <Box>
                <Container maxWidth='lg'>
                    <Parallax translateY={['0', '+55']}>
                        <Typography vairant="h1" component="h2" className="sectionHeader">
                            TRIPS.
                        </Typography>
                    </Parallax>
                </Container>
            </Box>
            <Stack direction="row" spacing={2} className="cardXScroll" sx={{pt:1, pb: 5, px: 5, position: "relative", zIndex: "3"}}>
                {tripsData && tripsData.map((trip, i) => {
                    return <TripCard key={i} slugPrefix="/trip/" item={trip} checked={checked}/>
                })}
            </Stack>
        </Box>
    );
};

export default Trips;