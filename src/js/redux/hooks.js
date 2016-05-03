import { loadAllProductsData, getIndividualProduct } from './actions/productsActions'
import { logout, getReviewData } from './actions/loginActions'
import { performSearch } from './actions/searchActions'

export const loadAllProducts = ({ dispatch }) => {
  dispatch(loadAllProductsData())
}

export const clearSessionStorage = ({ dispatch }) => {
  sessionStorage.clear()
  dispatch(logout())
}

export const loadIndividualProduct = ({ dispatch, getState }) => {
  const product = getState().routing.locationBeforeTransitions.pathname.match(/products\/(.+)/)[1]
  console.log(product)
  dispatch(getIndividualProduct(product))
}

export const loadReviewData = ({ dispatch, getState }) => {
  const email = getState().login.userData.userData.email
  dispatch(getReviewData(email))
}
