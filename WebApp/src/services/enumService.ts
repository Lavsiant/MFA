import {Weather, Location, Mood} from '../interfaces/song'
import { Preference } from '../models/preferences';

export const enumService = {    
    GetWeatherName,
    GetLocationName,
    GetMoodName,
    GetPreferenceName
};

function GetWeatherName(weather : Weather){
    switch (weather){
        case Weather.Cloudy: return 'Cloudy';
        case Weather.Drizzle: return 'Drizzle';
        case Weather.Rain: return 'Rain';
        case Weather.Snow: return 'Snow';
        case Weather.Sunny: return 'Sunny';
        case Weather.ThunderStorm: return 'Thunderstorm'       ;
        case Weather.Undefined: return 'Not selected'
    }
}

function GetLocationName(location : Location){
    switch (location){
        case Location.Home: return 'Home';
        case Location.Nature: return 'Nature';
        case Location.Transport: return 'Transport';
        case Location.Undefined: return 'Not selected';
        case Location.Work: return 'Work';
    }
}

function GetMoodName(mood : Mood){
    switch (mood){
        case Mood.Enamored: return 'Enamored';
        case Mood.Glad: return 'Glad';
        case Mood.Inspired: return 'Inspired';
        case Mood.Sad: return 'Sad';
        case Mood.Undefined: return 'Undefined';

    }
}

function GetPreferenceName(preference : Preference){
    switch (preference){
        case Preference.VeryLow: return 'Very Low';
        case Preference.VeryHigh: return 'Very High';
        case Preference.Medium: return 'Medium';
        case Preference.Low: return 'Low';
        case Preference.High: return 'High';

    }
}

