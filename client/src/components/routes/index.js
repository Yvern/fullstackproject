import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import EventCreate from './EventCreate/EventCreate';
import EventResponse from './EventResponse/EventResponse';
import EventDetails from './EventDetails/EventDetails';
import SquadCreate from './SquadCreate/SquadCreate';
import SquadDetails from './SquadDetails/SquadDetails';
import AccountSettings from './AccountSettings/AccountSettings';
import AccountDeleteResults from './AccountSettings/AccountDeleteResults';

/**
 * All possible routes and the corresponding Components to render.
 */
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
    menu: true,
    path: '/dashboard',
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
    component: EventResponse,
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
  },
  {
    name: 'New Squad',
    component: SquadCreate,
    menu: false,
    path: '/squads/new',
    exact: false
  },
  {
    name: 'Squad Details',
    component: SquadDetails,
    menu: false,
    path: '/squads/details',
    exact: false
  },
  {
    name: 'Account Settings',
    component: AccountSettings,
    menu: true,
    path: '/settings',
    exact: true
  },
  {
    name: 'Delete Account Results',
    component: AccountDeleteResults,
    menu: false,
    path: '/settings/results',
    exact: false
  }
];

export default routes;
