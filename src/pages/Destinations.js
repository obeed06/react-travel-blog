import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import DestinationGrid from "../components/destination/DestinationGrid";
import {getDestinations} from "../lib/destinationApi";
import MapChart from "../components/mapChart/MapChart";
import ReactTooltip from "react-tooltip";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const Destinations = ({preview = false}) => {
    const [destinations, setDestinations] = useState(null);
    const [destinationNames, setDestinationNames] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        getDestinations(preview)
            .then((data) => { setDestinations(data); setDestinationNames(data.map((d, i) => d.name)); })
            .catch(console.error);
    }, [preview]);

    return typeof (destinations) !== 'undefined' && destinations !== null && Array.isArray(destinations) ? (
        <Box id="destinations" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Box sx={{pt:5}}>
                    <MapChart visitedGeos={destinationNames} setTooltipContent={setContent} />
                </Box>
                <ReactTooltip>{content}</ReactTooltip>

                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Destinations.
                    </Typography>
                </Parallax>
            </Container>
            <DestinationGrid destinations={destinations}/>
        </Box>
    )  : (
        <Box>
            <Box >
                <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="center">
                    <Skeleton height={80} width={"40%"}/>
                </Grid>
            </Box>
        </Box>);
};

export default Destinations;