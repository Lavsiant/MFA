"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const app_jsx_1 = require("./containers/app.jsx");
const configureStore_jsx_1 = require("./store/configureStore.jsx");
const store = configureStore_jsx_1.default();
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(app_jsx_1.default, null)), document.getElementById('content'));
//# sourceMappingURL=index.js.map