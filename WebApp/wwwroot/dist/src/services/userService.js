"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("../helpers/config.js");
exports.userService = {
    getAllUsers: getAllUsers
};
function getAllUsers() {
    return fetch(config_js_1.config.apiUrl + '/api/identity/all')
        .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
function getUser(id) {
    return fetch(config_js_1.config.apiUrl + '/api/identity/user')
        .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(data => {
        return data.data;
    });
}
//# sourceMappingURL=userService.js.map