"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../helpers/config");
exports.authService = {
    login: login
};
function login(username, password) {
    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };
    localStorage.removeItem('user');
    return fetch(config_1.config.apiUrl + '/api/identity/authenticate', requestOptions)
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(function (data) {
        localStorage.setItem('user', JSON.stringify(data.data));
        return data.data;
    });
}
//# sourceMappingURL=authService.js.map