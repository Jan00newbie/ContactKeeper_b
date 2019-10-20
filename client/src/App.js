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

const App = () => {

  return (
    <Router>
      <Fragment>

        <Header />

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

      </Fragment>
    </Router>
  );
};

export default App;
