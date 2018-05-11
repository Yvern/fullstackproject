import React, { Component } from 'react';

import EventForm from '../../Forms/EventForm/EventCreate';
import BreadCrumbs from '../../General/BreadCrumbs';

/*
* A React Component that renders the EventForm to create a new event 
*/
class EventCreate extends Component {
  render() {
    let crumbPages = [
      { name: 'Dashboard', link: '/dashboard#eventfeed' },
      { name: 'Create Event', link: '#!' }
    ];

    return (
      <div>
        <BreadCrumbs crumbPages={crumbPages} />
        <EventForm />
      </div>
    );
  }
}

export default EventCreate;
