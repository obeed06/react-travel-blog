import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {makeStyles} from '@material-ui/core/styles'
import Box from "@material-ui/core/Box";
import Welcome from "../components/Welcome";
import AboutSummary from "../components/AboutSummary";
import Trips from "../components/Trips";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Footer from "../components/Footer";
import ItineraryMap from "../components/ItineraryMap";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg-hero-sand.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        opacity: 0.75,
    },
}));

const Home = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const containerRef = React.useRef(null);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <Box>
            <span id="back-to-top-anchor"></span>
            <NavBar/>
            <Box className={classes.root}>
                <Welcome/>
            </Box>
            <AboutSummary/>
            <Trips />
            <ItineraryMap/>
            <Footer/>
            {/*<PlacesToVisit/>*/}
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
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
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