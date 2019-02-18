"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const userActions_1 = require("./userActions");
const INITIAL_STATE = {
    users: [],
    isLoading: false,
};
exports.userReducer = typescript_fsa_reducers_1.reducerWithInitialState(INITIAL_STATE)
    .case(userActions_1.getAllUsers.async.done, (state, { result: users }) => (Object.assign({}, state, { users: users, isLoading: false })))
    .case(userActions_1.getAllUsers.async.failed, (state, e) => (Object.assign({}, state, { error: e.error, isLoading: false })))
    .case(userActions_1.getAllUsers.async.started, (state) => (Object.assign({}, state, { isLoading: true })));
//# sourceMappingURL=userReducer.js.map