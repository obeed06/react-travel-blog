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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

const Destinations = ({preview = false}) => {
    const [destinations, setDestinations] = useState(null);
    const [continents, setContinents] = useState([]);

    const [q, setQ] = useState("");
    const [qType, setQType] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("All");

    const handleTabChange = (e, newValue) => {
        setSelectedRegion(newValue);
        if (newValue === "All")
            setQ("");
        else {
            setQ(newValue);
            setQType(e.target.dataset.type)
        }

    };

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
                                <MapChart
                                    visitedGeos={searchDestinations(destinations, q, qType).map((d, i) => d.name)}/>
                                :
                                <SkeletonHeroPostCard/>

                        }
                    </Box>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={8}>
                            <FormControl fullWidth sx={{m: 1}}>
                                <OutlinedInput
                                    onChange={(e) => {
                                        setSelectedRegion("All");
                                        setQType("search")
                                        setQ(e.target.value);
                                    }}
                                    endAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                                    placeholder="Search for a destination"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box sx={{pb: 5}}>
                        <Tabs
                            value={selectedRegion}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab key="all-continents" label="All" value="All"/>
                            <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
                            {
                                continents && continents.map((c, i) => <Tab data-type="continent"
                                                                            key={c?.name + "-filter"} value={c?.name}
                                                                            label={c?.name}/>)
                            }
                            <Divider sx={{mx: 1}} orientation="vertical" variant="middle" flexItem/>
                            {
                                continents && continents.flatMap((c, i) => c.regions).map((c, i) => <Tab
                                    data-type="sub-region" key={c?.name + "-filter"} value={c?.name} label={c?.name}/>)
                            }
                        </Tabs>
                        <Divider/>
                    </Box>
                    <Parallax translateY={['0', '+48']}>
                        <Typography vairant="h1" component="h2" className="sectionHeader">
                            Destinations.
                        </Typography>
                    </Parallax>
                </Container>
                <DestinationGrid destinations={destinations && searchDestinations(destinations, q, qType)}/>
            </Box>
        }
    </HeaderAndFooter>
};

function searchDestinations(destinations, q, qType) {
    if (!q)
        return destinations

    return destinations.filter((item) => {

        if (qType === "sub-region")
            return item && Array.isArray(item?.regions) && item.regions.find(el => el.name.toLowerCase() === q.toLowerCase());

        if (qType === "continent")
            return ["continent.name"].some((newItem) => {
                return (
                    newItem.split('.').reduce((p, c) => (p && p[c]) || null, item)
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });

        if (qType === "search")
            return ["name"].some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });

        return item
    });
}

export default Destinations;