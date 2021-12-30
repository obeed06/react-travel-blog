import React from 'react';
import TopNavigation from "../components/TopNavigation";
import Welcome from "../components/Welcome";
import AboutSummary from "../components/AboutSummary";
import Trips from "../components/Trips";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Footer from "../components/Footer";
import ItineraryMap from "../components/ItineraryMap";
import Box from "@mui/material/Box";

const Home = (mode, onDarkModeClick) => {
    return (
        <Box>
            <span id="back-to-top-anchor"></span>
            <TopNavigation mode={mode} onDarkModeClick={onDarkModeClick}/>
            <Box className="landingHome">
                <Welcome/>
            </Box>
            <AboutSummary/>
            <Trips />
            <ItineraryMap/>
            <Footer/>
            <ScrollTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box>
    );
};

function ScrollTop(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default Home;