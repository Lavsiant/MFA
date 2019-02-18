"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const header_1 = require("./header/header");
const route_1 = require("../routes/route");
class App extends React.Component {
    render() {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", null,
                React.createElement(header_1.default, null),
                React.createElement(route_1.default, null))));
    }
}
exports.default = App;
;
//# sourceMappingURL=app.js.map