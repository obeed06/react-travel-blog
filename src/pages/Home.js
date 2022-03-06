import React, {useEffect, useState} from 'react';
import Welcome from "../components/Welcome";
import AboutSummary from "../components/AboutSummary";
import Trips from "../components/Trips";

import ItineraryMap from "../components/ItineraryMap";
import Box from "@mui/material/Box";
import sanityClient from "../client";

const Home = () => {
    const containerRef = React.useRef(null);
    const [itineraryData, setItinerary] = useState(null);
    useEffect(() => {
        sanityClient.fetch(`*[_type == 'itinerary' && name == 'all'][0]{
            iframeLink,
            placeholder{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`)
            .then((data) => setItinerary(data))
            .catch(console.error);
    }, []);
    return (
        <Box>
            <Box className="landingHome" ref={containerRef}>
                <Welcome slideContainerRef={containerRef}/>
            </Box>
            <AboutSummary/>
            <Trips />
            <ItineraryMap data={itineraryData}/>
        </Box>
    );
};

export default Home;