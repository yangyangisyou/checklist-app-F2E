import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css"; 
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/reducers';
import thunk from 'redux-thunk';

const logger = store => {
    return next => {
        return action => {
            console.log('[middleware] dispatching', action)
            const result =  next(action)
            console.log('[middleware] next state', store.getState())
            return result
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter> 
                        <App /> 
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
