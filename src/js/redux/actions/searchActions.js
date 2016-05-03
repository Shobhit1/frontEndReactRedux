import { SAVE_QUERY, SEARCH_START, SEARCH_CLEAR, CHANGE_SORT_TYPE } from '../constants/actions'
import { productDataSuccessful } from './productsActions'
import xhr from '../../../utils/xhr'

export const saveQuery = (query) => ({ type: SAVE_QUERY, data: query })

export const showResults = () => ({ type: SEARCH_START })

export const clearResults = () => ({ type: SEARCH_CLEAR })

export const changeSortType = (sortType) => ({ type: CHANGE_SORT_TYPE, data: sortType })

export const performSearch = (query, sortType) => {
  return (dispatch) => {
    dispatch(saveQuery(query))
    dispatch(showResults())
    xhr.get(`https://localhost:4443/products/category/${query}${sortType}`, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Content-Encoding': 'gzip' },
      responseType: 'json',
    }).then((response) => {
      dispatch(productDataSuccessful(response.data))
    }).catch((error) => {
      throw error
    })
  }
}
