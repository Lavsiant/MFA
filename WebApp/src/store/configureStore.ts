import { createStore, applyMiddleware, Store } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import {ApplicationState} from '../interfaces/applicationState'
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';


export default function configureStore(initialState : any) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
