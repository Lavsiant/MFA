import * as React from 'react';
import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import configureStore, { history } from './store/configureStore'

const store = configureStore({});

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('content')
    )
}
render();
