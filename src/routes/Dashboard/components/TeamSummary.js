import React from 'react'

import { Segment, Header } from 'semantic-ui-react'

const TeamSummary = () => (
    <Segment.Group>
        <Header as='h2' attached='top'>
            TEAM
        </Header>
        <Segment attached>
            I'm a segment
        </Segment>
    </Segment.Group>
)

export default TeamSummary