"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const home_1 = require("../containers/home/home");
const userProfile_1 = require("../containers/user/userProfile");
class Routing extends React.Component {
    render() {
        return (React.createElement("main", null,
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/home", component: home_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/user", component: userProfile_1.default }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", render: () => (React.createElement(react_router_dom_1.Redirect, { to: "/home" })) }))));
    }
}
exports.default = Routing;
;
//# sourceMappingURL=route.js.map