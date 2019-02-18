"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const rootReducer_jsx_1 = require("../reducers/rootReducer.jsx");
const redux_thunk_1 = require("redux-thunk");
function configureStore(initialState) {
    const store = redux_1.createStore(rootReducer_jsx_1.default, initialState, redux_1.applyMiddleware(redux_thunk_1.default));
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
exports.default = configureStore;
//# sourceMappingURL=configureStore.js.map