
import { Link } from 'react-router-dom';
import { getAllSongs } from './songActions'

import "isomorphic-fetch";
import { ISong, Location, Mood, Weather } from '../../interfaces/song';
import { AppDispatch } from '../../helpers/appDispatch';
import IUser from '../../interfaces/user/user';
import { Genres } from '../../models/genres';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {songService} from '../../services/songService'
import Button from '@material-ui/core/Button';
import handleRequest from '../../helpers/requestHandler';


interface Props {
    user: IUser
}

interface State {
    song: ISong;
    error: string;
}


class SongList extends React.Component<Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            song: {
                id: 0,
                name: '',
                band: '',
                genre: Genres.Rock,
                state: {
                    location: Location.Undefined,
                    mood: Mood.Undefined,
                    weather: Weather.Undefined
                }
            },
            error: ''
        };
    }

    handleSubmit = (event) => {
        if(!this.state.song.name){
            this.setState({
                ...this.state,
                error: 'Type song name please'
            })
        }
        else if(!this.state.song.band) {
            this.setState({
                ...this.state,
                error: 'Type band please'
            })
        }
        else{
            songService.createSong(this.state.song).then((res) => {
                if(res.success){
                    //to do
                    alert('good');
                }
                else{
                    this.setState({
                        ...this.state,
                        error: res.errorMessage
                    });
                }
                // window.location = config.apiUrl + "/tabs";
            }).catch((ex) => {
                this.setState({
                    ...this.state,
                    error: ex
                });
            });
           
        }               
    }

    handleGeneralChange = (e) => {
        const { name, value } = e.target;
        let { song } = this.state;
        song[name] = value;
        this.setState({ song: song });
    }

    handleStateChange = (e) => {
        const { name, value } = e.target;
        let { song } = this.state;
        song.state[name] = value
        this.setState({ song: song });
    }

    render() {
        const styles = theme => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing.unit,
                marginRight: theme.spacing.unit,
            },
            dense: {
                marginTop: 16,
            },
            menu: {
                width: 200,
            },
        });
        const { song } = this.state;

        return (
            <Paper className='tab-create' style={{ marginTop: 100, paddingBottom: 20 }} >
                <div style={{ textAlign: 'center' }}>
                    <h2>Song</h2>
                        <div className='field'>
                            <TextField
                                style={{ width: '90%' }}
                                label="Name"

                                type="text"
                                name="name"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={song.name}
                                onChange={this.handleGeneralChange}
                                required
                            />

                        </div>
                        <div className='field'>
                            <TextField
                                style={{ width: '90%' }}
                                label='Band'
                                type="text"
                                name="band"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={song.band}
                                onChange={this.handleGeneralChange}
                                required
                            />
                        </div>
                        <div className='field'>
                            <TextField
                                select
                                label='Genre'
                                //className={styles.textField}
                                style={{ width: '90%' }}
                                value={song.genre}
                                name='genre'
                                // SelectProps={{
                                //     MenuProps: styles
                                // }}
                                helperText='Choose genre'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleGeneralChange}
                            >
                                <MenuItem value={Genres.Rock}> Rock </MenuItem>
                                <MenuItem value={Genres.Metal}> Metal </MenuItem>
                                <MenuItem value={Genres.Jazz}> Jazz </MenuItem>
                                <MenuItem value={Genres.Instrumental}> Instrumental </MenuItem>
                                <MenuItem value={Genres.HipHop}> HipHop </MenuItem>
                                <MenuItem value={Genres.Classic}> Classic </MenuItem>
                                <MenuItem value={Genres.Blues}> Blues </MenuItem>

                            </TextField>

                        </div>

                        <div className='field'>
                            <TextField
                                select
                                label='Weather'
                                //className={styles.textField}
                                style={{ width: '90%' }}
                                value={song.state.weather}
                                name='weather'
                                // SelectProps={{
                                //     MenuProps: styles
                                // }}
                                helperText='Choose weather'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStateChange}
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

                        <div className='field'>
                            <TextField
                                select
                                label='Mood'
                                //className={styles.textField}
                                style={{ width: '90%' }}
                                value={song.state.mood}
                                name='mood'
                                // SelectProps={{
                                //     MenuProps: styles
                                // }}
                                helperText='Choose genre'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStateChange}
                            >
                                <MenuItem value={Mood.Undefined}> Not selected </MenuItem>
                                <MenuItem value={Mood.Enamored}> Enamored </MenuItem>
                                <MenuItem value={Mood.Glad}> Glad </MenuItem>
                                <MenuItem value={Mood.Inspired}> Inspired </MenuItem>
                                <MenuItem value={Mood.Sad}> Sad </MenuItem>


                            </TextField>

                        </div>
                        <div className='field'>
                            <TextField
                                select
                                label='Location'
                                //className={styles.textField}
                                style={{ width: '90%' }}
                                value={song.state.location}
                                name='location'
                                // SelectProps={{
                                //     MenuProps: styles
                                // }}
                                helperText='Choose location'
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleGeneralChange}
                            >
                                <MenuItem value={Location.Undefined}> Not selected </MenuItem>
                                <MenuItem value={Location.Home}> Home </MenuItem>
                                <MenuItem value={Location.Nature}> Nature </MenuItem>
                                <MenuItem value={Location.Transport}> Transport </MenuItem>
                                <MenuItem value={Location.Work}> Work </MenuItem>


                            </TextField>

                        </div>



                        <div className="form-group">
                            <Button size='large' variant="contained" type='button' onClick={this.handleSubmit} style={{ marginBottom: 20 }} color="primary"> Create </Button>
                        </div>
                        {this.state.error ? 
                        <div style={{color: 'red'}}> {this.state.error} </div> : null}
                </div>
            </Paper>
        )
    }
}

let mapProps = (state: any) => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        getAllSongs: getAllSongs.action
    },
    dispatch);



export default connect(mapProps, mapDispatch)(SongList)

