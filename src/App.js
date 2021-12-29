import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import SinglePost from "./components/SinglePost"
import Post from "./components/Post"
import Project from "./components/Project"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)

function App() {
    return ( <Home />
        // <Router>
        //     <Routes>
        //         <Route path='/' exact element={<Home/>}/>
        //         {/*<Route path='/about' element={<About/>}/>*/}
        //         {/*<Route path='/post/:slug' element={<SinglePost/>}/>*/}
        //         {/*<Route path='/post' element={<Post/>} />*/}
        //         {/*<Route path='/project' element={<Project/>}/>*/}
        //     </Routes>
        // </Router>
    )
}

export default App;
