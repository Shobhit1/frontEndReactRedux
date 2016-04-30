import { SUBMIT_QUERY_SUCCESS } from '../constants/actions'
import xhr from '../../../utils/xhr'

const submitQuerySuccessful = () => ({ type: SUBMIT_QUERY_SUCCESS })

export const submitQuery = (query) => {
  return (dispatch) => {
    xhr.post('https://localhost:4443/contactus/', query, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      responseType: 'json'
    }).then((response) => {
      dispatch(submitQuerySuccessful(response.data))
    }).catch((error) => {
      throw error
    })
  }
}
