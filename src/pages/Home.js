import React from 'react';
import Welcome from "../components/Welcome";
import AboutSummary from "../components/AboutSummary";
import Trips from "../components/Trips";

import ItineraryMap from "../components/ItineraryMap";
import Box from "@mui/material/Box";

const Home = () => {
    const containerRef = React.useRef(null);

    return (
        <Box>
            <Box className="landingHome" ref={containerRef}>
                <Welcome slideContainerRef={containerRef}/>
            </Box>
            <AboutSummary/>
            <Trips />
            <ItineraryMap/>
        </Box>
    );
};

export default Home;