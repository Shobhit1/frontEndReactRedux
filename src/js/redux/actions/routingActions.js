import { browserHistory } from 'react-router'
import { CHANGE_ROUTE } from '../constants/actions'

export const goToPage = (path, query = {}) => {
  browserHistory.push(path)
  return {
    type: CHANGE_ROUTE,
    path
  }
}
