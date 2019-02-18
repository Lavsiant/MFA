"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
var userActions_1 = require("./userActions");
var INITIAL_STATE = {
    users: [],
    isLoading: false,
};
exports.userReducer = typescript_fsa_reducers_1.reducerWithInitialState(INITIAL_STATE)
    .case(userActions_1.getAllUsers.async.done, function (state, _a) {
    var users = _a.result;
    return (__assign({}, state, { users: users, isLoading: false }));
})
    .case(userActions_1.getAllUsers.async.failed, function (state, e) { return (__assign({}, state, { error: e.error, isLoading: false })); })
    .case(userActions_1.getAllUsers.async.started, function (state) { return (__assign({}, state, { isLoading: true })); });
//# sourceMappingURL=userReducer.js.map