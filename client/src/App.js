import React, { Fragment, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import authContext from './context/auth/authContext'

import Header from './components/Layout/Header/Header';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Contacts from './components/Pages/Contacts';
import Login from './components/Pages/Login';

import ContactProvider from './context/contact/ContactState';
import AuthProvider from './context/auth/AuthState'

const App = () => {
  const {isAuthenticated, getUser, user} = useContext(authContext)

  useEffect(() => {
    if(isAuthenticated && !user){
      getUser();
    }
  }, [isAuthenticated, user])
  return (
    <AuthProvider>
      <ContactProvider>
        <Router>
          <Fragment>

            <Header />
            
            <div className="container">
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>

                <Route exact path='/about'>
                  <About/>
                </Route>

                <Route exact path='/contacts'>
                  <Contacts/>
                </Route>

                <Route exact path='/login'>
                  <Login/>
                </Route>
              </Switch>
            </div>

          </Fragment>
        </Router>
      </ContactProvider>
    </AuthProvider>
  );
};

export default App;
