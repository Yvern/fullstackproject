import React from 'react'

import { Button } from 'semantic-ui-react'

import EventCard from './EventCard'

const EventFeed = () => (
    <div className='event-feed'>
        <Button id='create-event-button' primary fluid size='huge'>
            Create new event!
        </Button>
        <EventCard/>
    </div>
)

export default EventFeed