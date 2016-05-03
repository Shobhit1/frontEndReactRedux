import { PRODUCT_DATA_STORE, EACH_PRODUCT, SNACK_BAR_ACTION } from '../constants/actions'
import xhr from '../../../utils/xhr'
import { goToPage } from './routingActions'

export const productDataSuccessful = (productData) => {
  return {
    type: PRODUCT_DATA_STORE,
    productData
  }
}

export const individualProductData = (eachProduct) => {
  return {
    type: EACH_PRODUCT,
    eachProduct
  }
}

export const snackBarAction = (snackBarDisplay) => {
  return {
    type: SNACK_BAR_ACTION,
    snackBarDisplay
  }
}

export const getIndividualProduct = (productName) => {
  return (dispatch) => {
    xhr.get(`https://localhost:4443/products/${productName}`, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Content-Encoding': 'gzip' },
      responseType: 'json'
    }).then((response) => {
      dispatch(individualProductData(response.data))
      dispatch(goToPage(`/products/${productName}`))
    }).catch((error) => {
      throw error
    })
  }
}

export const loadAllProductsData = () => {
  return (dispatch) => {
    xhr.get('https://localhost:4443/products', {
      headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Content-Encoding': 'gzip' },
      responseType: 'json',
    }).then((response) => {
      dispatch(productDataSuccessful(response.data))
    }).catch((error) => {
      throw error
    })
  }
}
