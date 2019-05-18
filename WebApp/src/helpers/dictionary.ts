export const dic = {

}

export default function get(name: string, lang: string) {
    if (lang === 'en') {
        switch (name) {
            case 'low':
                return 'Low';
            case 'verylow':
                return 'Very low'
            case 'mediun':
                return 'Medium'
            case 'high':
                return 'High'
            case 'veryHigh':
                return 'Very high'
            case 'notSelected':
                return 'Not selected'
            case 'home':
                return 'Home';
            case 'nature':
                return 'Nature'
            case 'transport':
                return 'Transport'
            case 'work':
                return 'Work'
            case 'enamored':
                return 'Enamored'
            case 'glad':
                return 'Glad'
            case 'inspired':
                return 'Inspired'
            case 'sad':
                return 'Sad'
            case 'work':
                return 'Work'
            case 'cloudy':
                return 'Cloudy'
            case 'drizzle':
                return 'Drizzle'
            case 'rain':
                return 'Rain'
            case 'sunny':
                return 'Sunny'
            case 'snow':
                return 'Snow'
            case 'thunderStorm':
                return 'ThunderStorm'
            case 'rock':
                return 'Rock'
            case 'metal':
                return 'Metal'
            case 'jazz':
                return 'Jazz'
            case 'instrumental':
                return 'Instrumental'
            case 'hipHop':
                return 'HipHop'
            case 'classic':
                return 'Classic'
            case 'blues':
                return 'Blues'

            case 'selLang':
                return 'Select language'
            case 'update':
                return 'Update'
        }
    }
    if (lang === 'ua') {
        switch (name) {
            case 'low':
                return 'Low';
            case 'verylow':
                return 'Very low'
            case 'mediun':
                return 'Medium'
            case 'high':
                return 'High'
            case 'veryHigh':
                return 'Very high'
            case 'notSelected':
                return 'Not selected'
            case 'home':
                return 'Home';
            case 'nature':
                return 'Nature'
            case 'transport':
                return 'Transport'
            case 'work':
                return 'Work'
            case 'enamored':
                return 'Enamored'
            case 'glad':
                return 'Glad'
            case 'inspired':
                return 'Inspired'
            case 'sad':
                return 'Sad'
            case 'work':
                return 'Work'
            case 'cloudy':
                return 'Cloudy'
            case 'drizzle':
                return 'Drizzle'
            case 'rain':
                return 'Rain'
            case 'sunny':
                return 'Sunny'
            case 'snow':
                return 'Snow'
            case 'thunderStorm':
                return 'ThunderStorm'
            case 'rock':
                return 'Rock'
            case 'metal':
                return 'Metal'
            case 'jazz':
                return 'Jazz'
            case 'instrumental':
                return 'Instrumental'
            case 'hipHop':
                return 'HipHop'
            case 'classic':
                return 'Classic'
            case 'blues':
                return 'Blues'
        }
    }
}