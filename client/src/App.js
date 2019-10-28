import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import Header from './components/Layout/Header/Header';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Contacts from './components/Pages/Contacts';

import ContactProvider from './context/contact/ContactState'

const App = () => {

  return (
    <ContactProvider>
      <Router>
        <Fragment>

          <Header />
          
          <div className="container">
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>

              <Route exact path='/about'>
                <About/>
              </Route>

              <Route exact path='/contacts'>
                <Contacts/>
              </Route>
            </Switch>
          </div>

        </Fragment>
      </Router>
    </ContactProvider>
  );
};

export default App;
