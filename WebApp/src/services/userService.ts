import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';

export const userService = {    
    getAllUsers: getAllUsers
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