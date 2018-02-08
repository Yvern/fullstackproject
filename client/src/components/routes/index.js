import React from 'react';
import Landing from '../Landing';
import Dashboard from './Dashboard/Dashboard';

//const Dashboard = () => <h2>Dashboard!</h2>;

const routes = [
  {
    name: 'Landing',
    component: Landing,
    menu: false,
    path: '/',
    exact: true
  },
  {
    name: 'Dashboard',
    component: Dashboard,
    menu: false,
    path: '/dashboard',
    exact: true
  }
];

export default routes;
