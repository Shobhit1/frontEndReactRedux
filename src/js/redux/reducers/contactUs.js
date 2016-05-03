import { SUBMIT_QUERY_SUCCESS } from '../constants/actions'
import initialState from '../initialStates/contactUs'

const contactUs = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case SUBMIT_QUERY_SUCCESS:
      newState = Object.assign({}, state, { isQuerySubmitted: true })
      break
    default:
      newState = state
      break
  }
  return newState
}
export default contactUs
