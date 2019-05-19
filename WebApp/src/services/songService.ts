import { config } from '../helpers/config';
import IUser from '../interfaces/user/user';
import { IGenrePreference } from '../models/genres';
import { ISong } from '../interfaces/song';
import { IPlaylist } from '../interfaces/playlist';

import Response from '../interfaces/response'
import { func } from 'prop-types';

export const songService = {    
    getAllSongs,
    createSong,
    getSong,
    getUserPlaylists,
    addSongToPlaylist,
    getAllPlaylists,
    createPlaylist,
    deleteSongFromPlaylist
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

async function createPlaylist(playlist : IPlaylist, userId: number) : Promise<Response<{}>>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist)
    };
    const res = await fetch('/api/playlist/create?userId=' + userId, requestOptions);
    if(!res.ok){              
        throw new Error('Internal error');
    }    
    return res.json();
}

async function getAllPlaylists(userId : number) : Promise<Response<IPlaylist[]>>{
    const res = await fetch('/api/playlist/all?id=' + userId);
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

async function getUserPlaylists(username : string) : Promise<Response<IPlaylist[]>> {

    const res = await fetch('/api/identity/playlists?username=' + username);
    if(!res.ok){              
        throw new Error('Internal error');
    } 
    return res.json();
}


async function addSongToPlaylist(songId : number, playlistId:number) : Promise<Response<{}>> {
    const res = await fetch('/api/playlist/add-song?songId=' + songId + '&playlistId=' + playlistId);
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

async function deleteSongFromPlaylist(playlistId : number, songId: number) : Promise<Response<{}>> {
    const res = await fetch('/api/playlist/delete-song?playlistId=' + playlistId + '&songId=' + songId);
    if(!res.ok){              
        throw new Error('Internal error');
    }    

    return res.json();   
}
