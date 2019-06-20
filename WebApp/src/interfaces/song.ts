import { Genres } from "../models/genres";

export  interface ISong{
    id: number;
    name: string;
    band: string;
    genre: Genres
    state: State;
    url: string;
}

export interface State{
    location: Location;
    weather: Weather;
    mood: Mood;
}

export enum Location{
    Undefined,
    Transport,
    Home,
    Work,
    Nature
}

export enum Weather{
    Undefined,
    Rain,
    Sunny,
    Snow,
    Cloudy,
    ThunderStorm,
    Drizzle
}

export enum Mood{
    Undefined,
    Sad,
    Glad,
    Inspired,
    Enamored,
}