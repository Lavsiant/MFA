import { history } from './../store/configureStore';
import { isType } from 'typescript-fsa';
import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { RegisterUserModel } from '../interfaces/auth/registerModel';
import { push } from 'connected-react-router'

export const authService = {
    login,
    register
};

async function login(login: string, password: string) : Promise<IUser> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    };

    const res = await fetch(config.apiUrl + '/api/auth/login', requestOptions);
    if(!res.ok){
        history.push(config.apiUrl + '/home');
        
        throw new Error('Incorrect login or password');
    }    
    return res.json();   
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

