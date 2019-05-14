import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { IGenrePreference } from '../models/genres';
import { ISong } from '../interfaces/song';
import Response from '../interfaces/response'

export const songService = {    
    getAllSongs,
    createSong,
    getSong
};

async function getAllSongs() : Promise<Response<ISong[]>> {
    const res = await fetch('/api/song/filter');
    if(!res.ok){              
        throw new Error('Internal error');
    }    
    return res.json();

}

async function getSong(id : number) : Promise<Response<ISong>>{
    const res = await fetch('/api/song/id?id=' + id);
    if(!res.ok){              
        throw new Error('Internal error');
    }    
    return res.json();

}

async function createSong(song : ISong) : Promise<Response<number>> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    };
    const res = await fetch('/api/song/create', requestOptions);
    if(!res.ok){              
        throw new Error('Internal error');
    } 
    return res.json();
}

async function submitPreferences(gp: IGenrePreference[], userId: string ) : Promise<Response<any>> {
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

    return res.json();   
}