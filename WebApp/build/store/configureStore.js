"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var rootReducer_1 = require("../reducers/rootReducer");
var redux_thunk_1 = require("redux-thunk");
function configureStore(initialState) {
    var store = redux_1.createStore(rootReducer_1.default, initialState, redux_1.applyMiddleware(redux_thunk_1.default));
    if (module.hot) {
        module.hot.accept('../reducers', function () {
            var nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
exports.default = configureStore;
//# sourceMappingURL=configureStore.js.map