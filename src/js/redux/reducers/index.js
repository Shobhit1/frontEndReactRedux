import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import login from './login'
import routingReducer from './routingReducer'
import products from './products'
import contactUs from './contactUs'
import search from './search'
import shoppingCart from './shoppingCart'

const rootReducer = combineReducers({
  login,
  routingReducer,
  products,
  contactUs,
  search,
  shoppingCart,
  routing: routerReducer
})

export default rootReducer
