import React from 'react';
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { songService } from '../../services/songService'
import { IPlaylist } from '../../interfaces/playlist';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import Paper from '@material-ui/core/Paper';



interface Props {
}

interface State {
    activeIndex: number
    playlists: IPlaylist[]
    newPlaylist: string,
    userId: number
}

export default class Playlists extends React.PureComponent<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            activeIndex: 0,
            playlists: [],
            newPlaylist: '',
            userId: -1
        }
    }

    componentWillMount = () => {
        if (localStorage.getItem('user') && localStorage.getItem('user')!=='undefined') {
            const userId = JSON.parse(localStorage.getItem('user')).id;
            this.setState({
                userId: userId
            })
            songService.getAllPlaylists(userId).
                then(res => {
                    this.setState({
                        playlists: res.data
                    })
                })
        }
    }

    handleChange = (index: number) => {
        this.setState({
            activeIndex: index
        })
    }

    handleImputChange = (e) => {
        this.setState({
            newPlaylist: e.target.value
        })
    }

    addPlaylist = () => {
        if (this.state.userId !== -1) {
            const { newPlaylist, playlists } = this.state;
            const pl = {
                songs: [],
                id: 0,
                name: newPlaylist
            }
            playlists.push(pl)
            songService.createPlaylist(pl, this.state.userId).then(
                res => {
                    if (res.success) {
                        this.setState({
                            newPlaylist: '',
                            playlists: playlists
                        })
                    }
                }
            )

        }
    }

    deleteSong = (songId: number, playlistId: number) => {
        songService.deleteSongFromPlaylist(playlistId, songId).then(
            res => {
                if (res.success) {
                    let pppp = this.state.playlists;
                    for (let index = 0; index < pppp.length; index++) {
                        const playlist = pppp[index];
                        if (playlist.id === playlistId) {
                            pppp[index].songs = playlist.songs.filter((x) => {
                                return x.id !== songId;
                            })
                            break;
                        }
                    }
                    this.setState({
                        playlists: pppp
                    })
                    window.location.href = '/playlists'
                }
            }
        )
    }

    openDetails = (id) => {
        window.location.href = '/song/' + id
    }

    render() {

        const { activeIndex } = this.state;
        const root = {
            width: '100%',
            maxWidth: '360px'
        }
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '30%', float: 'left' }}>
                    <List component="nav" style={root}>
                        {this.state.playlists.map((playlist, index) => {
                            return (
                                <div>
                                    <ListItem button onClick={() => this.handleChange(index)}>
                                        <ListItemText primary={playlist.name} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })}

                        <Divider light />

                        <div className='field'>
                            <TextField
                                style={{ width: '90%' }}
                                label='New playlist'
                                type="text"
                                name="band"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={this.state.newPlaylist}
                                onChange={this.handleImputChange}
                            />
                            <Button onClick={this.addPlaylist}>Add new</Button>
                        </div>


                    </List>
                </div>
                <Paper style={{ width: '100%', height: '-webkit-fill-available' }}>

                    {this.state.playlists.map((playlist, index) => {
                        return (
                            <div>
                                {this.state.activeIndex === index ?
                                    <div>
                                        <div >
                                            <List >
                                                {playlist.songs && playlist.songs.length ?
                                                    playlist.songs.map(song => {
                                                        return (
                                                            <div>
                                                                <ListItem>
                                                                    <ListItemAvatar >
                                                                        <Avatar onClick={() => this.openDetails(song.id)}>
                                                                            <FolderIcon />
                                                                        </Avatar>
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={song.band + ' - ' + song.name}

                                                                    />
                                                                    <ListItemSecondaryAction>
                                                                        <IconButton onClick = {()=> { this.deleteSong(song.id, playlist.id) }} aria-label="Delete">
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </ListItemSecondaryAction>
                                                                </ListItem>
                                                            </div>
                                                        )
                                                    }) :
                                                    <p>There are no songs in this playlist yet</p>}
                                            </List>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        );
                    })}
                </Paper>
            </div>
        )
    }
}
