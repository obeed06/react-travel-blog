import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import DestinationGrid from "../components/destination/DestinationGrid";
import {getContinentsAndRegions, getCountryDestinations} from "../lib/destinationApi";
import MapChart from "../components/mapChart/MapChart";
import Grid from "@mui/material/Grid";
import HeaderAndFooter from "../components/HeaderAndFooter";
import SearchIcon from '@mui/icons-material/Search';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SkeletonHeroPostCard from "../components/post/SkeletonHeroPostCard";
import RegionDivider from "../components/destination/RegionDivider";

const Destinations = ({preview = false}) => {
    const [destinations, setDestinations] = useState(null);
    const [continents, setContinents] = useState([]);

    const [q, setQ] = useState("");
    const [continentQ, setContinentQ] = useState("");
    const [selectedContinent, setSelectedContinent] = useState("All");

    useEffect(() => {
        getContinentsAndRegions(preview)
            .then((data) => {
                setContinents(data);
            })
            .catch(console.error);
        getCountryDestinations(preview)
            .then((data) => {
                setDestinations(data);
            })
            .catch(console.error);
    }, [preview]);

    return <HeaderAndFooter>
        {
            <Box id="destinations" className="section" sx={{py: 5}}>
                <Container maxWidth='lg'>
                    <Box sx={{pt: 5}}>
                        {
                            destinations ?
                                <MapChart visitedGeos={searchDestinations(destinations, q, continentQ).map((d, i) => d.name)}/>
                                :
                                <SkeletonHeroPostCard/>

                        }
                    </Box>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={8}>
                            <FormControl fullWidth sx={{m: 1}}>
                                <OutlinedInput
                                    value={q}
                                    onChange={(e) => {setSelectedContinent("All"); setContinentQ(""); setQ(e.target.value);}}
                                    endAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                                    placeholder="Search for a destination"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box sx={{pb:5}}>
                        <RegionDivider continents={continents} setSelectedContinent={setSelectedContinent} selectedContinent={selectedContinent} setContinentQ={(q) => {setQ("");setContinentQ(q);}}/>
                    </Box>
                    <Parallax translateY={['0', '+48']}>
                        <Typography vairant="h1" component="h2" className="sectionHeader">
                            Destinations.
                        </Typography>
                    </Parallax>
                </Container>
                <DestinationGrid destinations={destinations && searchDestinations(destinations, q, continentQ)}/>
            </Box>
        }
    </HeaderAndFooter>
};

function searchDestinations(destinations, q, continentQ) {
    return destinations.filter((item) => {
        if (q)
            return ["name"].some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });

        if (continentQ)
            return ["continent.name"].some((newItem) => {
                return (
                    newItem.split('.').reduce((p,c)=>(p&&p[c])||null, item)
                        .toString()
                        .toLowerCase()
                        .indexOf(continentQ.toLowerCase()) > -1
                );
            });

        return item;
    });

}

export default Destinations;