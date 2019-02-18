"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../helpers/config");
exports.authService = {
    login
};
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    localStorage.removeItem('user');
    return fetch(config_1.config.apiUrl + '/api/identity/authenticate', requestOptions)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(data => {
        localStorage.setItem('user', JSON.stringify(data.data));
        return data.data;
    });
}
//# sourceMappingURL=authService.js.map