import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './js/store/configureStore'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import DevTools from './js/containers/DevTools'
import routes from './js/routes'

import injectTapEventPlugin from 'react-tap-event-plugin'

/**
 * @todo Take over the world
 * @body Humans are weak; Robots are strong. We must cleans the world of the virus that is humanity.
 */

const history = syncHistoryWithStore(browserHistory, store)

// const store = configureStore()
const rootElement = document.getElementById('app')
injectTapEventPlugin()

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  </Provider>,
  rootElement
)
