"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
class Header extends React.Component {
    render() {
        return (React.createElement("header", null,
            React.createElement("menu", null,
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/" }, "Home"))))));
    }
}
exports.default = Header;
;
//# sourceMappingURL=header.js.map