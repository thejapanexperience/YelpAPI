import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Detail from './components/Detail';




render(
  <div className="container">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}>
        <IndexRoute component={Welcome}></IndexRoute>
        <Route path='welcome' component={Welcome}></Route>
        <Route path='searching' component={Search}></Route>
        <Route path='myfavourites' component={Favourites}></Route>
        <Route path='detail' component={Detail}></Route>
      </Route>
    </Router>
  </div>,
  document.getElementById('root')
)
