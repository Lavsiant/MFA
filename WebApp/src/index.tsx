
import * as React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import configureStore from './store/configureStore'

const store = configureStore(null);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)