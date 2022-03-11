import React, {useEffect, useState} from 'react';
import AboutSummary from "../components/AboutSummary";
import Trips from "../components/Trips";
import ItineraryMap from "../components/ItineraryMap";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import WelcomeParallax from "../components/WelcomeParallax";
import FeaturedPosts from "../components/FeaturedPosts";
import RecentPosts from "../components/RecentPosts";

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
            <WelcomeParallax slideContainerRef={containerRef}/>
            <span className="sections">
                <AboutSummary/>
                <Trips />
                <ItineraryMap data={itineraryData}/>
                <FeaturedPosts />
                <RecentPosts />
            </span>
        </Box>
    );
};

export default Home;