import { isType } from 'typescript-fsa';
import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { RegisterUserModel } from '../interfaces/auth/registerModel';

export const authService = {
    login,
    register
};

function login(login: string, password: string) : Promise<IUser> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    };

    return fetch(config.apiUrl + '/api/auth/login', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }        
            return response.json();          
        })
        .catch(error=> {
            return error.message;
        })
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
        });
      
}

