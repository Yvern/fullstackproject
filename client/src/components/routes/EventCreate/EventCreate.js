import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EventForm from '../../Forms/EventForm/EventCreate';
import BreadCrumbs from '../../General/BreadCrumbs';

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
