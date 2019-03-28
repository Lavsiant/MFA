import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

export default function configureStore(initialState: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancer(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
      )
    )

  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      //     const nextRootReducer = require('../reducers')
      // store.replaceReducer(nextRootReducer)
      store.replaceReducer(rootReducer(history));
    });
  }

  return store
}

