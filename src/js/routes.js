import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import store from './store/configureStore'

import App from './components/App'
import NotFoundView from './views/NotFoundView'
import Login from './components/pages/Login'
import productPage from './components/pages/products'
import productDetail from './components/pages/productDetail'
import ContactUs from './components/pages/contactUs'
import Search from './components/pages/Search'
import shoppingCart from './components/pages/cart'
import user from './components/pages/userInformation'

import { loadAllProducts, clearSessionStorage, loadIndividualProduct, loadReviewData } from './redux/hooks'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={productPage} onEnter={() => loadAllProducts(store)} />
    <Route path="/login" component={Login} onEnter={() => clearSessionStorage(store)}/>
    <Route path="/home" component={productPage} onEnter={() => loadAllProducts(store)} />
    <Route path="/contactus" component={ContactUs} />
    <Route path="/products/:product" component={productDetail} onEnter={() => loadIndividualProduct(store)}/>
    <Route path="/search" component={Search} />
    <Route path="/cart" component={shoppingCart} />
    <Route path="/user" component={user} onEnter={() => loadReviewData(store)}/>
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
)
