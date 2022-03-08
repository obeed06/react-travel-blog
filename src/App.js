import * as React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Home from "./pages/Home"
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {ColorModeContextProvider} from './context/ColorModeContext';
import About from "./pages/About";
import Trip from "./pages/Trip";
import Country from "./pages/Country";
import Box from "@mui/material/Box";
import Footer from "./components/Footer";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import {ParallaxProvider} from "react-scroll-parallax";

library.add(fab, faCheckSquare, faCoffee)

const App = () => {
    return (
        <ParallaxProvider>
            <Router>
                <span id="back-to-top-anchor"></span>
                <ColorModeContextProvider app={<TopNavigation/>}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>} exact/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/trip/:slug' element={<Trip/>}/>
                    <Route path='/country/:slug' element={<Country/>}/>
                </Routes>

                <Footer/>
                <ScrollTop>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </ScrollTop>
            </Router>
        </ParallaxProvider>
    )
}

function ScrollTop(props) {
    const {children} = props;
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
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default App;