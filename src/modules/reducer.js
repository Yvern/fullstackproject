/*
 *  Reducer to combine all reducers in the application.
 *
 */

import { combineReducers } from 'redux'

import eventsReducer from './eventsReducer'

/**
 * Combine all reducers into a single reducer
 * @type {Reducer<any>}
 */
const reducer = combineReducers({
    events: eventsReducer
})

export default reducer