import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router
}  from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ContactProvider from './context/contact/ContactState';
import AuthProvider from './context/auth/AuthState'
import AlertProvider from './context/alert/AlertState'

ReactDOM.render(
    <AlertProvider>
        <AuthProvider>
            <ContactProvider>
                <Router>
                    <App />
                </Router>
            </ContactProvider>
        </AuthProvider>
    </AlertProvider>,
document.getElementById('root'));

serviceWorker.unregister();
