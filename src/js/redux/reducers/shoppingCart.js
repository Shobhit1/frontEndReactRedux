import { ADD_ITEM_CART, REMOVE_ITEM_CART, CLEAR_CART, CHECKOUT_CART } from '../constants/actions'
import initialState from '../initialStates/shoppingCart'

const login = (state, action) => {
  const currentState = state || (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))) || initialState
  let newState
  switch (action.type) {
    case ADD_ITEM_CART:
      const productsInCart = currentState.products
      // temp2Array to check if product already exists
      const temp2Array = productsInCart.filter((item) => { return item.name === action.product.name })
      // updating count
      let updateCount = productsInCart.length
      if (temp2Array.length === 0) {
        const newProductObject = Object.assign({}, action.product, { quantityOrdered: 1 })
        updateCount = productsInCart.push(newProductObject)
      }
      newState = Object.assign({}, currentState, { numberOfItems: updateCount, products: productsInCart })
      break
    case REMOVE_ITEM_CART:
      const newArray = currentState.products.filter((item) => {return item.name !== action.name})
      newState = Object.assign({}, currentState, { numberOfItems: newArray.length, products: newArray })
      break
    case CLEAR_CART:
      localStorage.clear()
      newState = initialState
      break
    default:
      newState = currentState
      break
  }
  localStorage.setItem('cart', JSON.stringify(newState))
  return newState
}
export default login
