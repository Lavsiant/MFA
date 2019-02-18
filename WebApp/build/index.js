"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var app_1 = require("./containers/app");
var configureStore_1 = require("./store/configureStore");
var store = configureStore_1.default(null);
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(app_1.default, null)), document.getElementById('content'));
//# sourceMappingURL=index.js.map