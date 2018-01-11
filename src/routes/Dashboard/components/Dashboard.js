import React from 'react'

import { Segment, Header, Card, Menu, Button } from 'semantic-ui-react'
import { Panel } from 'react-bootstrap'

const Dashboard = () => (
    <div className="content-container">
        <div className="dashboard">
            <div className="dashboard-left">
                <Segment.Group>
                    <Header as='h2' attached='top'>
                        USER
                    </Header>
                    <Segment attached>
                        I'm a segment
                    </Segment>
                </Segment.Group>
            </div>
            <div className="dashboard-middle">
                <Button primary size='huge'>
                    Create new event!
                </Button>
                <Card fluid>
                    <Card.Content style={{textAlign:'left'}}>
                        <Button circular floated='right' size='small' icon='write' />
                        <Card.Header>
                            Tea Party And Such
                        </Card.Header>
                        <Card.Meta>
                            Team TEA
                        </Card.Meta>
                        <Card.Description>
                            Confirmations: <strong>8</strong>
                            Cancellations: <strong>3</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>Confirm</Button>
                            <Button basic color='red'>Cancel</Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            Event 'Practice session'
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        Some info
                    </Card.Content>
                </Card>
            </div>
            <div className="dashboard-right">
                <Segment.Group>
                    <Header as='h2' attached='top'>
                        TEAMS
                    </Header>
                    <Segment attached>
                        I'm a segment
                    </Segment>
                </Segment.Group>
            </div>
        </div>
    </div>
)

export default Dashboard