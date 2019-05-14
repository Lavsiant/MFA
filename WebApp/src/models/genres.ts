
 import {Preference} from './preferences';

export enum Genres {
    Rock = 1,
    Metal = 2 ,
    Instrumental =3,
    HipHop = 4,
    Jazz = 5,
    Blues = 6,
    Classic = 7
}

export interface IGenrePreference{
    genre: number;
    name: string;
    preference: Preference
}

export function getGenresPreferences() : IGenrePreference[]{
    let map: IGenrePreference[] = [];

    for(var n in Genres) {
        if (typeof Genres[n] === 'number') {
            map.push({genre: <any>Genres[n], name: n, preference: Preference.Medium});
        }
    }
    return map;
}

// export function getGenresList() : IGenrePreference[]{
//     let map: {genre : Genres, name: string}[] = [];
//     let index = 1;
//     for(var n in Genres) {
//         if (typeof Genres[n] === 'number') {
//             map.push({genre: Genres., name: n, preference: Preference.Medium});
//         }
//         index++;
//     }
//     return map;
// }