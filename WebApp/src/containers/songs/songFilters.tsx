import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Genres } from '../../models/genres'
import { Weather, Mood, Location } from '../../interfaces/song'
import MenuItem from '@material-ui/core/MenuItem';

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
        if (localStorage.getItem('user')) {
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
                genre: e.target.value,
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

        let language = '';
        if (localStorage.getItem('lang')) {
            language = localStorage.getItem('lang');
        }
        else {
            language = 'en';
            localStorage.setItem('lang', 'en');
        }
        return (
            <div className="filter-bar" style={{ width: '100%' }}>
                <div className="filter">
                    <TextField
                        className="filter-field"
                        label='Name'
                        margin="normal"
                        variant="outlined"
                        onChange={this.onNameChanged}
                    />
                </div>
                <div className="filter">
                    <TextField
                        label='Band'
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
                        label='Genre'
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
                        <MenuItem value={Genres.None}> Not selected </MenuItem>
                        <MenuItem value={Genres.Rock}> Rock </MenuItem>
                        <MenuItem value={Genres.Metal}> Metal </MenuItem>
                        <MenuItem value={Genres.Jazz}> Jazz </MenuItem>
                        <MenuItem value={Genres.Instrumental}> Instrumental </MenuItem>
                        <MenuItem value={Genres.HipHop}> HipHop </MenuItem>
                        <MenuItem value={Genres.Classic}> Classic </MenuItem>
                        <MenuItem value={Genres.Blues}> Blues </MenuItem>

                    </TextField>

                </div>

                <div className='filter'>
                    <TextField
                        select
                        label='Weather'
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
                        <MenuItem value={Weather.Undefined}> Not selected </MenuItem>
                        <MenuItem value={Weather.Cloudy}> Cloudy </MenuItem>
                        <MenuItem value={Weather.Drizzle}> Drizzle </MenuItem>
                        <MenuItem value={Weather.Rain}> Rain </MenuItem>
                        <MenuItem value={Weather.Snow}> Snow </MenuItem>
                        <MenuItem value={Weather.Sunny}> Sunny </MenuItem>
                        <MenuItem value={Weather.ThunderStorm}> ThunderStorm </MenuItem>


                    </TextField>
                </div>

                <div className='filter'>
                    <TextField
                        select
                        label='Mood'
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
                        <MenuItem value={Mood.Undefined}> Not selected </MenuItem>
                        <MenuItem value={Mood.Enamored}> Enamored </MenuItem>
                        <MenuItem value={Mood.Glad}> Glad </MenuItem>
                        <MenuItem value={Mood.Inspired}> Inspired </MenuItem>
                        <MenuItem value={Mood.Sad}> Sad </MenuItem>


                    </TextField>

                </div>

                <div className='filter'>
                    <TextField
                        select
                        label='Location'
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
                        <MenuItem value={Location.Undefined}> Not selected </MenuItem>
                        <MenuItem value={Location.Home}> Home </MenuItem>
                        <MenuItem value={Location.Nature}> Nature </MenuItem>
                        <MenuItem value={Location.Transport}> Transport </MenuItem>
                        <MenuItem value={Location.Work}> Work </MenuItem>


                    </TextField>

                </div>
                {this.state.isAdmin ?
                    <div className="filter" style={{ float: 'right', paddingTop: 16 }}>
                        <Fab size="large" color="primary" style={{ float: 'right' }} aria-label="Add" onClick={this.createTabOpen}>
                            <AddIcon />
                        </Fab>
                    </div> : null}
                     
            </div>
            );
        }
}