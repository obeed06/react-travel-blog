import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import About from "./components/About"
import SinglePost from "./components/SinglePost"
import Post from "./components/Post"
import Project from "./components/Project"

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
