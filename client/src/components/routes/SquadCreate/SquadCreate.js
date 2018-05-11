import React, { Component } from 'react';

import SquadForm from '../../Forms/SquadForm/SquadCreate';
import BreadCrumbs from '../../General/BreadCrumbs';

/*
* A component that renders the SquadForm to create a new Squad
*/
class SquadCreate extends Component {
  render() {
    let crumbPages = [
      { name: 'Dashboard', link: '/dashboard#squadfeed' },
      { name: 'Create Squad', link: '#!' }
    ];

    return (
      <div>
        <BreadCrumbs crumbPages={crumbPages} />
        <SquadForm />
      </div>
    );
  }
}

export default SquadCreate;
