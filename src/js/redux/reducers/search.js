import { SAVE_QUERY, SEARCH_START, SEARCH_CLEAR, CHANGE_SORT_TYPE } from '../constants/actions'
import initialState from '../initialStates/search'

const search = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_QUERY:
      return Object.assign({}, state, { query: action.data })
    case SEARCH_START:
      return Object.assign({}, state, { showResults: true })
    case SEARCH_CLEAR:
      return Object.assign({}, state, { showResults: false })
    case CHANGE_SORT_TYPE:
      return Object.assign({}, state, { sortType: action.data })
    default:
      return state
  }
}
export default search
