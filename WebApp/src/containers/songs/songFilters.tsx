import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Genres } from '../../models/genres'
import { Weather, Mood, Location } from '../../interfaces/song'
import MenuItem from '@material-ui/core/MenuItem';
import { enumService } from '../../services/enumService'

interface Props {
    filterSongs(options: any): void
}

interface State {
    name: string;
    band: string;
    genre: Genres
    weather: Weather;
    mood: Mood;
    location: Location;
    isAdmin: boolean
}

export default class SongFilter extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            band: '',
            genre: Genres.None,
            mood: Mood.Undefined,
            weather: Weather.Undefined,
            location: Location.Undefined,
            isAdmin: false
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined') {
            const role = JSON.parse(localStorage.getItem('user')).role;
            if (role === 1) {
                this.setState({
                    isAdmin: true
                })
            }
            else {
                this.setState({
                    isAdmin: false
                })
            }
        }
        else {
            this.setState({
                isAdmin: false
            })
        }
    }

    onNameChanged = e => {

        this.setState({ name: e.target.value });

        this.props.filterSongs(
            {
                name: e.target.value,
                band: this.state.band,
                genre: this.state.genre,
                mood: this.state.mood,
                weather: this.state.weather,
                location: this.state.location

            });
    }

    onBandChanged = e => {

        this.setState({ band: e.target.value });

        this.props.filterSongs(
            {
                name: this.state.name,
                band: e.target.value,
                genre: this.state.genre,
                mood: this.state.mood,
                weather: this.state.weather,
                location: this.state.location

            });
    }

    onMoodChanged = e => {
        this.setState({ mood: e.target.value });

        this.props.filterSongs(
            {
                name: this.state.name,
                band: this.state.band,
                genre: this.state.genre,
                mood: e.target.value,
                weather: this.state.weather,
                location: this.state.location

            });
    }

    onGenreChanged = e => {
        this.setState({ genre: e.target.value });

        this.props.filterSongs(
            {
                name: this.state.name,
                band: this.state.band,
                genre: e.target.value,
                mood: this.state.mood,
                weather: this.state.weather,
                location: this.state.location

            });
    }

    onLocationChanged = e => {
        this.setState({ location: e.target.value });

        this.props.filterSongs(
            {
                name: this.state.name,
                band: this.state.band,
                genre: this.state.genre,
                mood: this.state.mood,
                weather: this.state.weather,
                location: e.target.value

            });
    }

    onWeatherChanged = e => {
        this.setState({ weather: e.target.value });

        this.props.filterSongs(
            {
                name: this.state.name,
                band: this.state.band,
                genre: this.state.genre,
                mood: this.state.mood,
                weather: e.target.value,
                location: this.state.location

            });
    }

    createTabOpen = () => {
        window.location.href = "/song-create";
    }

    render() {

        let language = 'en'
        if (localStorage.getItem('language')) {
            language = localStorage.getItem('language')
        }
        else {
            language = 'en'
        }
        return (
            <div className="filter-bar" style={{ width: '100%' }}>
                <div className="filter">
                    <TextField
                        className="filter-field"
                        label={language == 'en' ? 'Name' : 'Назва'}
                        margin="normal"
                        variant="outlined"
                        onChange={this.onNameChanged}
                    />
                </div>
                <div className="filter">
                    <TextField
                        label={language == 'en' ? 'Band' : 'Група'}
                        defaultValue=""
                        className="filter-field"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onBandChanged}
                    />
                </div>
                <div className="filter">
                    <TextField
                        select
                        label={language == 'en' ? 'Genre' : 'Жанр'}
                        //className={styles.textField}
                        value={this.state.genre}
                        name='genre'
                        // SelectProps={{
                        //     MenuProps: styles
                        // }}
                        helperText='Choose genre'
                        margin="normal"
                        variant="outlined"
                        onChange={this.onGenreChanged}
                    >
                        <MenuItem value={Genres.None}> {enumService.GetGenreName(Genres.None,language)} </MenuItem>
                        <MenuItem value={Genres.Rock}> {enumService.GetGenreName(Genres.Rock,language)} </MenuItem>
                        <MenuItem value={Genres.Metal}> {enumService.GetGenreName(Genres.Metal,language)} </MenuItem>
                        <MenuItem value={Genres.Jazz}> {enumService.GetGenreName(Genres.Jazz,language)} </MenuItem>
                        <MenuItem value={Genres.Instrumental}> {enumService.GetGenreName(Genres.Instrumental,language)} </MenuItem>
                        <MenuItem value={Genres.HipHop}> {enumService.GetGenreName(Genres.HipHop,language)} </MenuItem>
                        <MenuItem value={Genres.Classic}> {enumService.GetGenreName(Genres.Classic,language)} </MenuItem>
                        <MenuItem value={Genres.Blues}> {enumService.GetGenreName(Genres.Blues,language)} </MenuItem>

                    </TextField>

                </div>

                <div className='filter'>
                    <TextField
                        select
                        label={language=='en' ? "Weather" : 'Погода'}
                        //className={styles.textField}
                        value={this.state.weather}
                        name='weather'
                        // SelectProps={{
                        //     MenuProps: styles
                        // }}
                        helperText='Choose weather'
                        margin="normal"
                        variant="outlined"
                        onChange={this.onWeatherChanged}
                    >
                        <MenuItem value={Weather.Undefined}> {enumService.GetWeatherName(Weather.Undefined,language)} </MenuItem>
                        <MenuItem value={Weather.Cloudy}> {enumService.GetWeatherName(Weather.Cloudy,language)} </MenuItem>
                        <MenuItem value={Weather.Drizzle}> {enumService.GetWeatherName(Weather.Drizzle,language)} </MenuItem>
                        <MenuItem value={Weather.Rain}> {enumService.GetWeatherName(Weather.Rain,language)} </MenuItem>
                        <MenuItem value={Weather.Snow}> {enumService.GetWeatherName(Weather.Snow,language)} </MenuItem>
                        <MenuItem value={Weather.Sunny}> {enumService.GetWeatherName(Weather.Sunny,language)} </MenuItem>
                        <MenuItem value={Weather.ThunderStorm}> {enumService.GetWeatherName(Weather.ThunderStorm,language)} </MenuItem>


                    </TextField>
                </div>

                <div className='filter'>
                    <TextField
                        select
                        label={language=='en' ? "Mood" : 'Настрій'}
                        //className={styles.textField}
                        value={this.state.mood}
                        name='mood'
                        // SelectProps={{
                        //     MenuProps: styles
                        // }}
                        helperText='Choose genre'
                        margin="normal"
                        variant="outlined"
                        onChange={this.onMoodChanged}
                    >
                        <MenuItem value={Mood.Undefined}> {enumService.GetMoodName(Mood.Undefined,language)} </MenuItem>
                        <MenuItem value={Mood.Enamored}> {enumService.GetMoodName(Mood.Enamored,language)} </MenuItem>
                        <MenuItem value={Mood.Glad}> {enumService.GetMoodName(Mood.Glad,language)} </MenuItem>
                        <MenuItem value={Mood.Inspired}> {enumService.GetMoodName(Mood.Inspired,language)} </MenuItem>
                        <MenuItem value={Mood.Sad}> {enumService.GetMoodName(Mood.Sad,language)} </MenuItem>


                    </TextField>

                </div>

                <div className='filter'>
                    <TextField
                        select
                        label={language=='en' ? "Location" : 'Локація'}
                        //className={styles.textField}
                        value={this.state.location}
                        name='location'
                        // SelectProps={{
                        //     MenuProps: styles
                        // }}
                        helperText='Choose location'
                        margin="normal"
                        variant="outlined"
                        onChange={this.onLocationChanged}
                    >
                        <MenuItem value={Location.Undefined}> {enumService.GetLocationName(Location.Undefined,language)} </MenuItem>
                        <MenuItem value={Location.Home}> {enumService.GetLocationName(Location.Home,language)}  </MenuItem>
                        <MenuItem value={Location.Nature}> {enumService.GetLocationName(Location.Nature,language)}  </MenuItem>
                        <MenuItem value={Location.Transport}> {enumService.GetLocationName(Location.Transport,language)}  </MenuItem>
                        <MenuItem value={Location.Work}> {enumService.GetLocationName(Location.Work,language)}  </MenuItem>


                    </TextField>

                </div>
                {this.state.isAdmin ?
                    <div className="filter" style={{ float: 'right', paddingTop: 16 }}>
                        <Fab size="large" color="primary" style={{ float: 'right' }} aria-label={language=='en' ? "Add" : 'Добавити'} onClick={this.createTabOpen}>
                            <AddIcon />
                        </Fab>
                    </div> : null}

            </div>
        );
    }
}