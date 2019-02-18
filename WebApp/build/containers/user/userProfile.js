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
var react_redux_1 = require("react-redux");
var userActions_1 = require("./userActions");
var redux_1 = require("redux");
var UserProfile = (function (_super) {
    __extends(UserProfile, _super);
    function UserProfile(props) {
        return _super.call(this, props) || this;
    }
    UserProfile.prototype.componentDidMount = function () {
        this.props.getAllUsers();
    };
    UserProfile.prototype.render = function () {
        return ("User profile");
    };
    return UserProfile;
}(React.Component));
var mapProps = function (state) {
    return {
        users: state.users,
        error: state.error
    };
};
var mapDispatch = function (dispatch) { return redux_1.bindActionCreators({
    getAllUsers: userActions_1.getAllUsers.action
}, dispatch); };
exports.default = react_redux_1.connect(mapProps, mapDispatch)(UserProfile);
//# sourceMappingURL=userProfile.js.map