import * as React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {ColorModeContextProvider} from './context/ColorModeContext';
import About from "./pages/About";
import Trip from "./pages/Trip";
import Destination from "./pages/Destination";
import {ParallaxProvider} from "react-scroll-parallax";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import Destinations from "./pages/Destinations";
import useWindowDimensions from "./hook/useWindowDimensions";

library.add(fab, faCheckSquare, faCoffee)

const App = () => {
    useWindowDimensions();
    return (
        <ColorModeContextProvider app={
            <ParallaxProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/> exact/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/trip/:slug' element={<Trip/>}/>
                        <Route path='/destination/:slug' element={<Destination/>}/>
                        <Route path='/destinations' element={<Destinations/>}/>
                        <Route path='/posts' element={<Posts/>}/>
                        <Route path='/post/:slug' element={<Post/>}/>
                    </Routes>
                </Router>
            </ParallaxProvider>
        } />);
}

export default App;