import { AUTHENTICATE, CHECKING, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOG_OUT,
        TOGGLE_REGISTRATION, REGISTRATION_FAILED, STORE_REVIEW_DATA } from '../constants/actions'
import initialState from '../initialStates/login'

const login = (state, action) => {
  const currentState = state || (sessionStorage.getItem('login') && JSON.parse(sessionStorage.getItem('login'))) || initialState
  let newState
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      newState = Object.assign({}, currentState, { isAuthenticated: true, userData: action.userData, attemptFailed: false })
      break
    case LOGIN_FAILED:
      newState = Object.assign({}, currentState, { isAuthenticated: false, userData: {}, registrationMode: false, attemptFailed: true })
      break
    case LOG_OUT:
      newState = initialState
      break
    case TOGGLE_REGISTRATION:
      newState = Object.assign({}, currentState, { registrationMode: action.registration, registrationFailed: false })
      break
    case REGISTRATION_FAILED:
      newState = Object.assign({}, currentState, { registrationFailed: action.registrationFailed })
      break
    case STORE_REVIEW_DATA:
      newState = Object.assign({}, currentState, { reviewData: action.data })
      break
    default:
      newState = currentState
      break
  }
  sessionStorage.setItem('login', JSON.stringify(newState))
  return newState
}
export default login
