import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../redux/reducers'
import DevTools from '../containers/DevTools'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

const enhancer = compose(
  // Middleware we want to use in development
  middleware,
  window.devToolsExtension ?
    window.devToolsExtension() :
    DevTools.instrument(),
)
const store = createStore(rootReducer, enhancer)
// Enable Webpack hot module replacement for reducers
if (module.hot) {
  module.hot.accept('../redux/reducers', () =>
    store.replaceReducer(rootReducer)
  )
}

export default store
