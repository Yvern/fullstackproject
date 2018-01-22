import {
    handleRequestAddEvent,
    handleAddEventSuccess,
    handleAddEventError
} from "./eventsReducer";

import json from '../data/temp_data'
import fs from 'fs'

const writeNewEvent = (event) => {
    return function (dispatch) {
        dispatch(handleRequestAddEvent(event));
        //TODO: MAKE EVENT ID AND MANAGER ID DEPENDING ON LOGIN
        let completeEvent = {
            ...event,
            eventID: 'NEWEVENT01',
            managerID: 'ngw14nuu@uea.ac.uk'
        }

        let newEvents = {
            ...json,
            events: json.events.concat([completeEvent])
        }

        console.log(newEvents);

        Promise.resolve(json)
            .then(response => {
                console.log(json)
                Promise.resolve(fs.writeFile('../data/temp_data.json', json, 'utf8')).then(json =>
                    dispatch(handleAddEventSuccess(completeEvent))
                )
            })
    }
}

export default writeNewEvent