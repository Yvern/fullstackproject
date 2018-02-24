/*
 * Reducer which handles the state of the user's list of events
 */

const ADD_EVENT_SUCCESS = 'ADD_EVENT'
const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR'
const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST'

export const handleRequestAddEvent = (event) => ({
    type: ADD_EVENT_REQUEST,
    event: event
})

export const handleAddEventSuccess = (event) => ({
    type: ADD_EVENT_SUCCESS,
    event: event
})

export const handleAddEventError = (event, error) => ({
    type: ADD_EVENT_ERROR,
    event: event,
    error: error
})

const initialState = {
    pending: 0,
    pendingEvent: {},
    error: {},
    tempEvents: [],
    events: [
        {
            id: "EVENT01",
            managerID: "ngw14nuu@uea.ac.uk",
            name: "First Match",
            startDate: "GMT 00:00:00 01/01/2018",
            endDate: "GMT 00:00:00 01/01/2018",
            squad: {
                id: "SQUAD01",
                name: "Team TEA"
            },
            location: {
                name: "UEA",
                longitude: 51.020328,
                latitude: 49.030210
            },
            invitations: [
                {
                    eventID: "EVENT01",
                    email: "abcdefg@gmail.com",
                    confirmation: "PENDING"
                },
                {
                    eventID: "EVENT01",
                    email: "asdfghjkl@gmail.com",
                    confirmation: "CONFIRMED"
                },
                {
                    eventID: "EVENT01",
                    email: "roos_hissink@live.nl",
                    confirmation: "PENDING"
                },
                {
                    eventID: "EVENT01",
                    email: "rosehissink@gmail.com",
                    confirmation: "DENIED"
                }
            ]
        }
    ]
}

const eventsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_EVENT_REQUEST:
            return {
                ...state,
                pending: state.pending++,
                pendingEvent: action.event
            }
        case ADD_EVENT_SUCCESS:
            let newEvents = initialState.events.concat([action.event])
            return {
                ...state,
                pending: state.pending--,
                pendingEvent: {},
                events: newEvents
            }
        case ADD_EVENT_ERROR:
            let tempEvents = initialState.tempEvents.concat([action.event])
            return {
                ...state,
                pending: state.pending--,
                pendingEvent: {},
                tempEvents: tempEvents,
                error: action.error
            }
        default:
            return initialState
    }
}

export default eventsReducer;