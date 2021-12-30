import * as React from 'react';
import Home from "./pages/Home"
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import { ColorModeContextProvider } from './context/ColorModeContext';

library.add(fab, faCheckSquare, faCoffee)

export default function App() {

    return (<ColorModeContextProvider app={<Home />} /> )
}
