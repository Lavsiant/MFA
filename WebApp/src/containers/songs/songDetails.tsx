import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {Genres} from '../../models/genres';
import "isomorphic-fetch";
import { FormLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {songService} from '../../services/songService';
import "isomorphic-fetch";
import { ISong } from '../../interfaces/song';
import IUser from '../../interfaces/user/user';
import {Location,Weather,Mood} from '../../interfaces/song'

interface Props{
    id : number;
    user: IUser
}

interface State{
    song : ISong
}

class SongDetails extends React.Component<Props,State> {
    constructor(props) {
        super(props);
        this.state = {
            song : {
                name: '',
                band: '',
                genre: Genres.Blues,
                state: {
                    mood: Mood.Undefined,
                    weather: Weather.Undefined,
                    location: Location.Undefined
                },
                id: -1
            }
        };
    }

    componentDidMount() {
        songService.getSong(this.props.id).
        then(res=>{
            this.setState({
                song: res.data
            })
        })
        .catch(ex=>{
            //redirect to do
        })
    }

    getTypeString = (x) => {
        switch (x) {
            case 1: return 'Acoustic Guitar';
            case 2: return 'Electric Guitar';
            case 3: return 'Classical Guitar';
        }
    }

    render() {
        let count = 1;
        let language = '';
        if(localStorage.getItem('lang')){
            language = localStorage.getItem('lang');
        }
        else{
            language = 'en';
            localStorage.setItem('lang', 'en');
        }
        return (
            <Paper className='tab-create' style={{ fontSize: 20, marginTop: 100, paddingBottom: 50 }} >
            <div style={{ textAlign: 'center', display: 'block' }}>
                <div>
                <FormLabel style={{ fontSize: 22 }}> Name </FormLabel>
                <br/>
                <TextField
                    style={{ width: '85%' }}
                    id="outlined-read-only-input"
                    value={this.state.song.name}
                    defaultValue="Hello World"
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                </div>
                <br />
                <div style={{ marginTop: 20 }}>
                    <FormLabel style={{ fontSize: 22, marginTop: 80 }}> Band </FormLabel>
                    <br/>
                    <TextField
                        style={{ width: '85%' }}
                        id="outlined-read-only-input"
                        value={this.state.song.band}
                        defaultValue="Hello World"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <br/>
                <div style={{ marginTop: 20}}>
                    <FormLabel style={{ fontSize: 22, marginTop: 80 }}>Genre</FormLabel>
                    <br/>
                    <TextField
                        style={{ width: '85%' }}
                        id="outlined-read-only-input"
                        value={Genres[this.state.song.genre]}
                        defaultValue="Hello World"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <br/>
                <div style={{ marginTop: 20, marginBottom: 30 }}>
                    <FormLabel style={{ fontSize: 22, marginTop: 80 }}> Location </FormLabel>
                    <br/>
                    <TextField
                        style={{ width: '85%' }}
                        id="outlined-read-only-input"
                        value={Location[this.state.song.state.location]}
                        defaultValue="Hello World"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div style={{ marginTop: 20, marginBottom: 30 }}>
                    <FormLabel style={{ fontSize: 22, marginTop: 80 }}> Mood </FormLabel>
                    <br/>
                    <TextField
                        style={{ width: '85%' }}
                        id="outlined-read-only-input"
                        value={Mood[this.state.song.state.mood]}
                        defaultValue="Hello World"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div style={{ marginTop: 20, marginBottom: 30 }}>
                    <FormLabel style={{ fontSize: 22, marginTop: 80 }}> Weather </FormLabel>
                    <br/>
                    <TextField
                        style={{ width: '85%' }}
                        id="outlined-read-only-input"
                        value={Weather[this.state.song.state.weather]}
                        defaultValue="Hello World"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>

               



            </div>
        </Paper>)
        }
}

let mapProps = (state: any) => {
    return {
        user: state.authReducer.user
    }
}


export default connect(mapProps)(SongDetails)