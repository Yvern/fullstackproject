/*
 *  Reducer to combine all reducers in the application.
 *
 */

const reducer = (state = { edited: false }, action) => {
    switch (action.type) {
        case 'TEST':
            return {edited: true};
        default:
            return {edited: false};
    }
}

export default reducer