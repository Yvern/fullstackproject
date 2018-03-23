import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {
  Header,
  Segment,
  Button,
  Table,
  Divider,
  Icon
} from 'semantic-ui-react';

const EventOverview = () => {
  return <div>TEST</div>;
};

export default connect(null, actions)(EventOverview);
