
import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import Response from '../interfaces/response'
import { RegisterUserModel } from '../interfaces/auth/registerModel';
import { LoginModel } from '../interfaces/auth/loginModel';


export const authService = {
    login,
    register,
    logout,
    getCurrentUser
};

async function login(model: LoginModel) : Promise<Response<IUser>> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };

    const res = await fetch('/api/auth/login', requestOptions);
    if(!res.ok){              
        throw new Error('Internal error');
    }    
    return res.json();   
}

async function register(user: RegisterUserModel) : Promise<Response<IUser>>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    }

    const res = await fetch('/api/auth/register',requestOptions);
    if(!res.ok){
        throw new Error('Register error');
    }
    return res.json();      
}

async function logout() : Promise<void>{
    const res = await fetch('/api/auth/logout');
    if(!res.ok){
        throw new Error('Internal error');
    }        
}

async function getCurrentUser() : Promise<Response<IUser>>{
    const res = await fetch('/api/auth/current');
    if(!res.ok){
        throw new Error('Internal error');
    }     
    return res.json();  
}

