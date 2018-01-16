import React from 'react'

import { Segment, Header, Card, Menu, Button } from 'semantic-ui-react'
import { Panel } from 'react-bootstrap'
import EventFeed from './EventFeed'
import UserSummary from './UserSummary'
import TeamSummary from './TeamSummary'

const Dashboard = () => (
    <div className="content-container">
        <div className="dashboard">
            <div className="dashboard-left">
                <UserSummary/>
            </div>
            <div className="dashboard-middle">
                <EventFeed/>
            </div>
            <div className="dashboard-right">
                <TeamSummary/>
            </div>
        </div>
    </div>
)

export default Dashboard