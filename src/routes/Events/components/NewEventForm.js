import React from 'react'

import { Segment, Header, Form, Input, Label, TextArea, Button, Icon, Menu } from 'semantic-ui-react'

const NewEventForm = ({handleClose}) => (
    <div className='new-event-form' >
        <Segment>
            <Header as='h2'>Enter New Event Details
                <span style={{float: 'right'}}>
                    <Icon name='cancel'
                          color='red'
                          link
                          onClick={() => handleClose()}/>
                </span>
            </Header>
            <Form>
                <Form.Field control={Input} label='Event name' />
                <Form.Field control={Input} label='Team' />
                <Form.Group stackable widths={2}>
                    <Form.Field control={Input} label='Start time' />
                    <Form.Field control={Input} label='Start date' />
                </Form.Group>
                <Form.Group stackable widths={2}>
                    <Form.Field control={Input} label='End time' />
                    <Form.Field control={Input} label='End date' />
                </Form.Group>
                <Form.Field control={Input} label='Location '/>
                <Form.Field control={TextArea} label='Description' />
                <Button type='submit'>Create New Event</Button>
            </Form>
        </Segment>
    </div>
)

export default NewEventForm