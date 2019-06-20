import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { IGenrePreference } from '../models/genres';
import TypedResponse from '../interfaces/response'
import { func } from 'prop-types';


export const userService = {    
    getAllUsers: getAllUsers,
    submitPreferences,
    updateUser,
    getUserPreferences
};

function getAllUsers() : Promise<IUser[]> {
    return fetch('/api/identity/all')
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {    
         return data.data
    });
}

function getUser(id: number) : Promise<IUser> {
    return fetch(config.apiUrl + '/api/identity/user')
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {    
        return data.data
    });

}

async function submitPreferences(gp: IGenrePreference[], userId: string ) : Promise<Response> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gp)
    };

    const res = await fetch('/api/identity/preferences-update?username=' + userId, requestOptions);
    if(!res.ok){              
        throw new Error('Internal error');
    }    

    const response = res.json();

    return response;   
}

async function updateUser(user: IUser ) : Promise<TypedResponse<IUser>> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const res = await fetch('/api/identity/update',  requestOptions);
    if(!res.ok){              
        throw new Error('Internal error');
    }    

    return res.json();   
}

async function getUserPreferences(username : string) : Promise<TypedResponse<IGenrePreference[]>> {
    const res = await fetch('/api/identity/get-preferences?username=' + username);
    if(!res.ok){              
        throw new Error('Internal error');
    }   
    return res.json();
}
