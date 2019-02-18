"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var userReducer_1 = require("../containers/user/userReducer");
exports.default = redux_1.combineReducers({
    userReducer: userReducer_1.userReducer
});
//# sourceMappingURL=rootReducer.js.map