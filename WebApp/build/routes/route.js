"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var home_1 = require("../containers/home/home");
var userProfile_1 = require("../containers/user/userProfile");
var Routing = (function (_super) {
    __extends(Routing, _super);
    function Routing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Routing.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/home", component: home_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/user", component: userProfile_1.default }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", render: function () { return (React.createElement(react_router_dom_1.Redirect, { to: "/home" })); } }))));
    };
    return Routing;
}(React.Component));
exports.default = Routing;
;
//# sourceMappingURL=route.js.map