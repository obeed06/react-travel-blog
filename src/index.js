import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import './App.css';
import App from './App';
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <StyledEngineProvider injectFirst >
            <App />
        </StyledEngineProvider>
    </Provider>,
    document.querySelector("#root")
);