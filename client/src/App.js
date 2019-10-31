import React, { Fragment, useContext, useEffect } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import authContext from './context/auth/authContext'

import Header from './components/Layout/Header/Header';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Contacts from './components/Pages/Contacts';
import SignForm from './components/Pages/SignForm';

const App = () => {
  const {isAuthenticated, getUser, user, login, register} = useContext(authContext)
  
  useEffect(() => {
    if(isAuthenticated && !user){
      getUser();
    }
  }, [isAuthenticated, user])

  return (
      <Fragment>

        <Header />
        
        {/* Content goes here */}
        <div className="container">
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
              <SignForm submitHandler={login} inputsBean={['email', 'password']}/>
            </Route>

            <Route exact path='/register'>
              <SignForm submitHandler={register} inputsBean={['name' ,'email', 'password']}/>
            </Route>
          </Switch>
        </div>

      </Fragment>
  );
};

export default App;
