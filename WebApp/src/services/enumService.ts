import { Weather, Location, Mood } from '../interfaces/song'
import { Preference } from '../models/preferences';
import { Genres } from '../models/genres';

export const enumService = {
    GetWeatherName,
    GetLocationName,
    GetMoodName,
    GetPreferenceName,
    GetGenreName
};

function GetGenreName(genre: Genres, lang: string) {
    if (lang == 'en') {
        switch (genre) {
            case Genres.Blues: return 'Blues';
            case Genres.Classic: return 'Classic';
            case Genres.HipHop: return 'HipHop';
            case Genres.Instrumental: return 'Instrumental';
            case Genres.Jazz: return 'Jazz';
            case Genres.Metal: return 'Metal';
            case Genres.Rock: return 'Rock';
            case Genres.None: return 'None';
        }
    }
    else {
        switch (genre) {
            case Genres.Blues: return 'Блюз';
            case Genres.Classic: return 'Кластка';
            case Genres.HipHop: return 'Хіп-хоп';
            case Genres.Instrumental: return 'Інструментальна';
            case Genres.Jazz: return 'Джаз';
            case Genres.Metal: return 'Метал';
            case Genres.Rock: return 'Рок';
            case Genres.None: return 'Не визначено';
        }
    }
}

function GetWeatherName(weather: Weather, lang: string) {
    if (lang == 'en') {
        switch (weather) {
            case Weather.Cloudy: return 'Cloudy';
            case Weather.Drizzle: return 'Drizzle';
            case Weather.Rain: return 'Rain';
            case Weather.Snow: return 'Snow';
            case Weather.Sunny: return 'Sunny';
            case Weather.ThunderStorm: return 'Thunderstorm';
            case Weather.Undefined: return 'Not selected'
        }
    }
    else {
        switch (weather) {
            case Weather.Cloudy: return 'Пасмурно';
            case Weather.Drizzle: return 'Після дощова';
            case Weather.Rain: return 'Дощ';
            case Weather.Snow: return 'Сніг';
            case Weather.Sunny: return 'Сонячно';
            case Weather.ThunderStorm: return 'Гроза';
            case Weather.Undefined: return 'Не обрано'
        }
    }
}

function GetLocationName(location: Location, lang: string) {
    if (lang == 'en') {
        switch (location) {
            case Location.Home: return 'Home';
            case Location.Nature: return 'Nature';
            case Location.Transport: return 'Transport';
            case Location.Undefined: return 'Not selected';
            case Location.Work: return 'Work';
        }
    }
    else {
        switch (location) {
            case Location.Home: return 'Дім';
            case Location.Nature: return 'Природа';
            case Location.Transport: return 'Транспорт';
            case Location.Undefined: return 'Не обрано';
            case Location.Work: return 'Праця';
        }
    }

}

function GetMoodName(mood: Mood, lang: string) {
    if (lang == 'en') {
        switch (mood) {
            case Mood.Enamored: return 'Enamored';
            case Mood.Glad: return 'Glad';
            case Mood.Inspired: return 'Inspired';
            case Mood.Sad: return 'Sad';
            case Mood.Undefined: return 'Undefined';

        }
    }
    else{
        switch (mood) {
            case Mood.Enamored: return 'Закоханість';
            case Mood.Glad: return 'Радий';
            case Mood.Inspired: return 'Натхненний';
            case Mood.Sad: return 'Сумний';
            case Mood.Undefined: return 'Не визначена';

        }
    }
}

function GetPreferenceName(preference: Preference) {
    switch (preference) {
        case Preference.VeryLow: return 'Very Low';
        case Preference.VeryHigh: return 'Very High';
        case Preference.Medium: return 'Medium';
        case Preference.Low: return 'Low';
        case Preference.High: return 'High';

    }
}

