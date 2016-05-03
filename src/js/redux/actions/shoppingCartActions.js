import { ADD_ITEM_CART, REMOVE_ITEM_CART, CLEAR_CART, CHECKOUT_CART } from '../constants/actions'
import { goToPage } from './routingActions'
import xhr from '../../../utils/xhr'

export const addToCart = (product) => {
  return {
    type: ADD_ITEM_CART,
    product
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}
export const viewCartAction = () => {
  return (dispatch) => {
    dispatch(goToPage('/cart'))
  }
}
export const goToHome = () => {
  return (dispatch) => {
    dispatch(goToPage('/'))
  }
}
export const clearCartActionCreater = () => {
  return (dispatch) => {
    dispatch(clearCart())
    dispatch(goToHome())
  }
}

export const checkOutAction = (data) => {
  return (dispatch) => {
    xhr.post('https://localhost:4443/orders/add', data, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      responseType: 'json'
    }).then((response) => {
      dispatch(clearCartActionCreater())
    }).catch((error) => {
      dispatch(viewCartAction())
    })
  }
}
export const removeItemFromCart = (name) => {
  return {
    type: REMOVE_ITEM_CART,
    name
  }
}
