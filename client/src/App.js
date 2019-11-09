import React, { Fragment, useContext, useEffect } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import authContext from './context/auth/authContext'

import Header from './components/Layout/Header';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Contacts from './components/Pages/Contacts';
import SignForm from './components/Pages/SignForm';
import { AlertsList } from './components/Layout/Alerts/Alerts';

const App = () => {
  const { loadUser, auth, isAuthenticated } = useContext(authContext)
  
  useEffect(() => {
    isAuthenticated && loadUser();
  }, [isAuthenticated])

  return (
      <Fragment>

        <Header />
        {/* Content goes here */}
        <div className="container">
          <AlertsList/>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route exact path='/about'>
              <About/>
            </Route>

            <Route exact path='/contacts'>
              <Contacts />
            </Route>

            <Route exact path='/login'>
              <SignForm submitHandler={auth} inputsBean={['email', 'password']}/>
            </Route>

            <Route exact path='/register'>
              <SignForm submitHandler={auth} inputsBean={['name' ,'email', 'password']}/>
            </Route>
          </Switch>
        </div>

      </Fragment>
  );
};

export default App;