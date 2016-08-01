import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import ToDosPage from './components/pages/ToDosPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage}/>
    <Route path="/toDos" component={ToDosPage} />
    <Route path="/toDos/:query" component={ToDosPage} />
  </Route>
);
