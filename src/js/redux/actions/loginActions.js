import { AUTHENTICATE, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOG_OUT, TOGGLE_REGISTRATION,
        REGISTRATION_FAILED, STORE_REVIEW_DATA } from '../constants/actions'
import xhr from '../../../utils/xhr'
import { goToPage } from './routingActions'
import { clearCookie } from '../../../utils/cookies'

export const loginSuccessful = (userData) => {
  return {
    type: LOGIN_SUCCESSFUL,
    userData
  }
}

export const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  }
}

export const logout = () => {
  return {
    type: LOG_OUT,
  }
}

export const logoutActionCreater = () => {
  return (dispatch) => {
    clearCookie('token')
    dispatch(logout())
    dispatch(goToPage('/'))
  }
}

export const toggleRegistrationMode = (mode) => {
  return {
    type: TOGGLE_REGISTRATION,
    registration: mode
  }
}

export const registrationFailedAction = (registrationFailed) => {
  return {
    type: REGISTRATION_FAILED,
    registrationFailed
  }
}

export const registrationFailed = (error) => {
  return (dispatch) => {
    registrationFailedAction(true)
  }
}

export const saveReviewData = (data) => {
  return {
    type: STORE_REVIEW_DATA,
    data
  }
}
export const getReviewData = (email) => {
  return (dispatch) => {
    xhr.get(`https://localhost:4443/reviews/${email}`, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Content-Encoding': 'gzip' },
      responseType: 'json'
    }).then((response) => {
      dispatch(saveReviewData(response.data))
      dispatch(goToPage('/user'))
    }).catch((error) => {
      throw error
    })
  }
}

export const addReview = (data) => {
  return (dispatch) => {
    xhr.put('https://localhost:4443/reviews/edit', data, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      responseType: 'json'
    }).then((response) => {
      dispatch(getReviewData(data.email))
      dispatch(goToPage('/user'))
    }).catch((error) => {
      throw error
    })
  }
}

export const createUser = (data) => {
  return (dispatch) => {
    xhr.post('https://localhost:4443/users/register', data, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      responseType: 'json'
    }).then((response) => {
      dispatch(toggleRegistrationMode(false))
      dispatch(goToPage('/login'))
    }).catch((error) => {
      dispatch(registrationFailed(error))
      // throw error
    })
  }
}
export const authenticate = (credentials) => {
  return (dispatch) => {
    xhr.post('/login', credentials, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      responseType: 'json'
    }).then((response) => {
      dispatch(loginSuccessful(response.data))
      dispatch(goToPage('/home'))
    }).catch((error) => {
      dispatch(loginFailed())
      dispatch(goToPage('/login'))
    })
  }
}
