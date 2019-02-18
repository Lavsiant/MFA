"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("./../../services/userService");
const typescript_fsa_1 = require("typescript-fsa");
const typescript_fsa_redux_thunk_1 = require("typescript-fsa-redux-thunk");
var factory = typescript_fsa_1.default();
var createAsync = typescript_fsa_redux_thunk_1.asyncFactory(factory);
exports.getAllUsers = createAsync('getAllUsers', (p, d) => __awaiter(this, void 0, void 0, function* () {
    return yield userService_1.userService.getAllUsers();
}));
//# sourceMappingURL=userActions.js.map