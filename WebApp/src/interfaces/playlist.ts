import {ISong} from './song'

export interface IPlaylist{
    id : number;
    name : string;
    songs : ISong[]
}