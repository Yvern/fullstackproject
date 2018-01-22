import { connect } from 'react-redux'

import eventsReducer from '../../../modules/eventsReducer'
import { handleRequestAddEvent } from "../../../modules/eventsReducer";
import writeNewEvent from '../../../modules/jsonWrite'

import Dashboard from '../components/Dashboard'

const mapStateToProps = (state) => ({
    events: state.events
})

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateNewEvent: (event) => {
            dispatch(writeNewEvent(event))
        }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer