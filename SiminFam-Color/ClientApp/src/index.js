import './index.scss'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.register();
