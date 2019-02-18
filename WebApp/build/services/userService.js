"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_js_1 = require("../helpers/config.js");
exports.userService = {
    getAllUsers: getAllUsers
};
function getAllUsers() {
    return fetch(config_js_1.config.apiUrl + '/api/identity/all')
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
function getUser(id) {
    return fetch(config_js_1.config.apiUrl + '/api/identity/user')
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(function (data) {
        return data.data;
    });
}
//# sourceMappingURL=userService.js.map