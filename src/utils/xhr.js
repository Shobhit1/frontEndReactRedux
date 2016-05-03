import axios from 'axios'
import getAccessToken from './cookies'
import store from '../js/store/configureStore'
import { loginFailed, registrationFailed } from '../js/redux/actions/loginActions'

const xhr = axios.create()
xhr.interceptors.request.use((config) => {
  const headers = config.headers
  const accessToken = getAccessToken() || '1234'
  if (accessToken && headers) {
    headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

xhr.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.status === 401) {
    const { dispatch } = store
    dispatch(loginFailed(error))
  } else if (error.status === 500) {
    const { dispatch } = store
    dispatch(registrationFailed(error))
  }
})

export default xhr
