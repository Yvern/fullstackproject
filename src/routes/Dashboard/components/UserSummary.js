import React from 'react'

import { Segment, Header } from 'semantic-ui-react'

const UserSummary = () => (
    <Segment.Group>
        <Header as='h2' attached='top'>
            USER
        </Header>
        <Segment attached>
            I'm a segment
        </Segment>
    </Segment.Group>
)

export default UserSummary