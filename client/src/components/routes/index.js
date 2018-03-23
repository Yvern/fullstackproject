import Landing from '../Landing';
import Dashboard from './Dashboard/Dashboard';
import EventCreate from '../EventForm/EventCreate';
import EventDetail from './Events/EventDetail';
import EventDetails from './Events/EventDetails';

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
  },
  {
    name: 'Events',
    component: Dashboard,
    menu: true,
    path: '/events',
    exact: true
  },
  {
    name: 'New Event',
    component: EventCreate,
    menu: false,
    path: '/events/new',
    exact: false
  },
  {
    name: 'Event Response',
    component: EventDetail,
    menu: false,
    path: '/events/response',
    exact: false
  },
  {
    name: 'Event Details',
    component: EventDetails,
    menu: false,
    path: '/events/details',
    exact: false
  }
];

export default routes;
