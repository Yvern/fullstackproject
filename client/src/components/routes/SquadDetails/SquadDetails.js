import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import M from 'materialize-css';
import moment from 'moment';

import BreadCrumbs from '../../General/BreadCrumbs';
import TextContainer from '../../General/TextContainer';
import SquadInfoBasic from './SquadInfoBasic';
import SquadMembers from './SquadMembers';
import SquadInfoEvents from './SquadInfoEvents';

class SquadDetails extends Component {
  state = { editing: false };

  componentDidMount() {
    this.props.fetchSquad(window.location.search);
  }

  componentWillUnmount() {
    this.props.clearSquad();
  }

  onEditSave() {
    this.setState({ editing: false });
    console.log('EDITED');
  }

  renderContent() {
    switch (this.props.squad) {
      case null:
        return <div>Loading</div>;
      case false:
        return (
          <div>
            Unfortunately, we could not find your squad. Please try again.
          </div>
        );
      default:
        return [
          <div key="info" className="col s12 xl6">
            <SquadInfo
              squad={this.props.squad}
              user={this.props.user}
              events={this.props.events}
            />
          </div>,
          <div key="participants" className="col s12 xl6">
            <SquadMembers squad={this.props.squad} />
          </div>
        ];
    }
  }

  render() {
    let crumbPages = [
      { name: 'Dashboard', link: '/dashboard#squadfeed' },
      { name: 'Squad Details', link: '#!' }
    ];

    return (
      <div>
        <BreadCrumbs crumbPages={crumbPages} />
        <TextContainer color="grey darken-4 white-text">
          <div className="col m3">
            <Link
              to="/dashboard#squadfeed"
              className="btn waves-effect waves-light light-blue"
            >
              <i className="material-icons left">arrow_back</i> Back
            </Link>
          </div>
          <div className="col m6">
            <h4 className="event-details-title center">
              {this.props.squad ? this.props.squad.name : ''}
            </h4>
          </div>
          <div className="col m3" />
        </TextContainer>
        <TextContainer>{this.renderContent()}</TextContainer>
      </div>
    );
  }
}

const SquadInfo = props => {
  return (
    <div className="row event-info-table-wrapper">
      <div className="col s12 m6 xl12">
        <SquadInfoBasic {...props} />
      </div>
      <div className="col s12 m6 xl12">
        <SquadInfoEvents events={props.events} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    squad: state.squadData.squad,
    user: state.squadData.user,
    events: state.squadData.events
  };
}

export default connect(mapStateToProps, actions)(SquadDetails);
