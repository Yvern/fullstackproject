/*
 * Reducer which handles the state of the user's list of events
 */

const ADD_EVENT = 'ADD_EVENT'

export const handleAddEvent = (event) => ({
    type: ADD_EVENT,
    event: event
})

const initialState = {
    events: [
        {
            id: "EVENT01",
            managerID: "ngw14nuu@uea.ac.uk",
            name: "First Match",
            startDate: "GMT 00:00:00 01/01/2018",
            endDate: "GMT 00:00:00 01/01/2018",
            squadID: "SQUAD01",
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
        case ADD_EVENT:
            let newEvents = initialState.events.concat([action.event])
            return newEvents
        default:
            return initialState
    }
}

export default eventsReducer;