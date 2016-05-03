import { CHANGE_ROUTE } from '../constants/actions'
import initialState from '../initialStates/routingState'

const navigate = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return Object.assign({}, state, { path: action.path })
    default:
      return state
  }
}
export default navigate
