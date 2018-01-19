import { connect } from 'react-redux'

import eventsReducer from '../../../modules/eventsReducer'
import { handleAddEvent } from "../../../modules/eventsReducer";

import Dashboard from '../components/Dashboard'

const mapStateToProps = (state) => ({
    events: state.events
})

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateNewEvent: (event) => {
            dispatch(handleAddEvent(event))
        }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer