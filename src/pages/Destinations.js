import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import DestinationGrid from "../components/destination/DestinationGrid";
import {getDestinations} from "../lib/destinationApi";
import MapChart from "../components/mapChart/MapChart";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import HeaderAndFooter from "../components/HeaderAndFooter";
import SearchIcon from '@mui/icons-material/Search';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const Destinations = ({preview = false}) => {
    const [destinations, setDestinations] = useState(null);
    const [destinationNames, setDestinationNames] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["name"]);


    useEffect(() => {
        getDestinations(preview)
            .then((data) => { setDestinations(data); setDestinationNames(data.map((d, i) => d.name)); })
            .catch(console.error);
    }, [preview]);

    return <HeaderAndFooter>
        {
            typeof (destinations) !== 'undefined' && destinations !== null && Array.isArray(destinations) ? (
                <Box id="destinations" className="section" sx={{py: 5}}>
                    <Container maxWidth='lg'>
                        <Box sx={{pt:5}}>
                            <MapChart visitedGeos={destinationNames} />
                        </Box>
                        <Grid container direction="row" justifyContent="center" alignItems="center" >
                            <Grid item xs={12} md={8}>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <OutlinedInput
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        endAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                                        placeholder="Search for a destination"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Parallax translateY={['0', '+48']}>
                            <Typography vairant="h1" component="h2" className="sectionHeader">
                                Destinations.
                            </Typography>
                        </Parallax>
                    </Container>
                    <DestinationGrid destinations={destinations && searchDestinations(destinations, searchParam, q)}/>
                </Box>
            )  : (
                <Box>
                    <Box >
                        <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="center">
                            <Skeleton height={80} width={"40%"}/>
                        </Grid>
                    </Box>
                </Box>)
        }

    </HeaderAndFooter>
};

function searchDestinations(destinations, searchParam, q) {
    return destinations.filter((item) => {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            );
        });
    });

}

export default Destinations;