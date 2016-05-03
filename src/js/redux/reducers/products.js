import { PRODUCT_DATA_STORE, EACH_PRODUCT, SNACK_BAR_ACTION } from '../constants/actions'
import initialState from '../initialStates/allProducts'

const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DATA_STORE:
      return Object.assign({}, state, { productData: action.productData })
    case EACH_PRODUCT:
      sessionStorage.setItem('productName', action.productName)
      return Object.assign({}, state, { eachProduct: action.eachProduct, productName: sessionStorage.getItem('productName') })
    case SNACK_BAR_ACTION:
      return Object.assign({}, state, { snackBarDisplay: action.snackBarDisplay })
    default:
      return state
  }
}
export default products
