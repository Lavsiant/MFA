import { getAllSongs } from './../songs/songActions';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ISong } from '../../interfaces/song';

interface SongState{
    songs: any[];
}
const INITIAL_STATE: SongState = {
    songs: []
}

export const songReducer = reducerWithInitialState(INITIAL_STATE)
    .case(getAllSongs.async.done, (state,payload) => ({ 
        ...state,
        songs: payload.result
     }))
     .case(getAllSongs.async.failed, (state,e) => ({ 
        ...state,
     }))
    