import { isType } from 'typescript-fsa';
import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { RegisterUserModel } from '../interfaces/auth/registerModel';

export const authService = {
    login,
    register
};

function login(username: string, password: string) : Promise<void> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    localStorage.removeItem('user');
    return fetch(config.apiUrl + '/api/identity/login', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }                 
        })
}

function register(user: RegisterUserModel) : Promise<void>{
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
        
        });
      
}

