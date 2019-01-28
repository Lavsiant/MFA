import { isType } from 'typescript-fsa';
import { config } from '../helpers/config.jsx';
import IUser from '../interfaces/user.js';

export const authService = {
    login
};

function login(username: string, password: string) : Promise<IUser> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    localStorage.removeItem('user');
    return fetch(config.apiUrl + '/api/identity/authenticate', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {    
            localStorage.setItem('user', JSON.stringify(data.data));
            return data.data
        });
}

