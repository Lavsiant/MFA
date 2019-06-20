import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { IPlaylist } from '../../interfaces/playlist';
import ReactDOM from 'react-dom';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {songService} from '../../services/songService';


interface Props {
    songId: number;
    playlists: IPlaylist[];
    open: boolean
    onClose() : void
}

interface State {
    selectedPlaylistId: number
}

export default class PlaylistSelect extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlaylistId: -1
        }
      
    }



    handleSubmit = () => {
        if(this.state.selectedPlaylistId !== -1)
        songService.addSongToPlaylist(this.props.songId, this.state.selectedPlaylistId).then(
            res => {
                if(res.success){
                    this.props.onClose();
                }
            }
        )
    };

    handleChange = event => {
        this.setState({ selectedPlaylistId: event.target.value });
    };

    render() {
        let language = 'en'
        if (localStorage.getItem('language')) {
            language = localStorage.getItem('language')
        }
        else {
            language = 'en'
        }
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle id="simple-dialog-title">{language='en' ? 'Select playlist' : 'Оберіть плейліст'}</DialogTitle>
                <div style={{textAlign:'center'}}>
                    <FormControl>
                       {/* // <InputLabel htmlFor="age-simple">Playlist</InputLabel> */}
                        <Select
                            value={this.state.selectedPlaylistId}
                            onChange={this.handleChange}
                           style={{margin: 'auto'}}
                        >
                            <MenuItem value={-1}>
                                <em>None</em>
                            </MenuItem>
                            {this.props.playlists.map(playlist => {
                                return (
                                    <MenuItem value={playlist.id}>{playlist.name}</MenuItem>
                                );
                            })}

                        </Select>
                    </FormControl>
                </div>
                <div className="form-group" style={{textAlign: 'center'}}>
                    <Button size='large' variant="contained" type='button' onClick={this.handleSubmit} style={{ margin: 'auto' }} color="primary"> {language='en' ? 'Add song' : 'Добавити пісню'} </Button>
                </div>
            </Dialog>
        );
    }
}