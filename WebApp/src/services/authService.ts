import { isType } from 'typescript-fsa';
import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { RegisterUserModel } from '../interfaces/auth/registerModel';

export const authService = {
    login,
    register
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

function register(user: RegisterUserModel) : Promise<IUser>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    }
    return fetch(config.apiUrl + '/api/auth/register',requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {  
            localStorage.setItem('token', JSON.stringify(data.token));  
            return data.data
        });
}

