import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TablePaginationActions from '../../helpers/tablsePaginationActions';
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { getAllSongs } from './songActions'
import { withStyles } from '@material-ui/core/styles';
import "isomorphic-fetch";
import Paper from '@material-ui/core/Paper';
import { ISong, Mood, Weather, Location } from '../../interfaces/song';
import { AppDispatch } from '../../helpers/appDispatch';
import IUser from '../../interfaces/user/user';
import { enumService } from '../../services/enumService'
import { Genres } from '../../models/genres';
import SongFilter from './songFilters'

interface Props {
    songs: ISong[]
    user: IUser
    getAllSongs(): any
}

interface State {
    filteredSongs: any[];
    page: number;
    rowsPerPage: number;
}


class SongList extends React.Component<Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            filteredSongs: [],
            page: 0,
            rowsPerPage: 5
        };
    }

    componentDidMount() {
        this.props.getAllSongs().then(() =>
            this.setState({ filteredSongs: this.props.songs })
        );

    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: +event.target.value });
    };

    openDetails = (song: ISong) => {
        window.location.href = '/song/' + song.id
    }

    filterSongs = (filterOptions: any) => {
        let songs = this.props.songs;
        if (filterOptions.name)
            songs = songs.filter(x => x.name.toLowerCase().includes(filterOptions.name.toLowerCase()));
        if (filterOptions.band)
            songs = songs.filter(x => x.band.toLowerCase().includes(filterOptions.band.toLowerCase()));
        if (filterOptions.genre !== Genres.None)
            songs = songs.filter(x => x.genre === filterOptions.genre);
        if (filterOptions.mood !== Mood.Undefined)
            songs = songs.filter(x => x.state.mood === filterOptions.mood);
        if (filterOptions.weather !== Weather.Undefined)
            songs = songs.filter(x => x.state.weather === filterOptions.weather);
        if (filterOptions.location !== Location.Undefined)
            songs = songs.filter(x => x.state.location === filterOptions.location);

        this.setState({ filteredSongs: songs });
    }

    render() {
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.filteredSongs.length - page * rowsPerPage);

        return (
            <div className='table-wrapper'>
                <SongFilter filterSongs={this.filterSongs}></SongFilter>
                <Table className={'table'} >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: 20 }}>Name</TableCell>
                            <TableCell style={{ fontSize: 20 }} numeric>Band</TableCell>
                            <TableCell style={{ fontSize: 20 }} numeric>Genre</TableCell>
                            <TableCell style={{ fontSize: 20 }} numeric>Mood</TableCell>
                            <TableCell style={{ fontSize: 20 }} numeric>Weather</TableCell>
                            <TableCell style={{ fontSize: 20 }} numeric>Location</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.filteredSongs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(song => {
                            return (
                                <TableRow key={song.id} className="table-field" onClick={() => this.openDetails(song)} >
                                    <TableCell style={{ fontSize: 18 }} component="th" scope="row" >
                                        {song.name}
                                    </TableCell>
                                    <TableCell style={{ fontSize: 18 }} numeric>{song.band}</TableCell>
                                    <TableCell style={{ fontSize: 18 }} numeric>{enumService.GetGenreName(song.genre)}</TableCell>
                                    <TableCell style={{ fontSize: 18 }} numeric>{enumService.GetMoodName(song.state.mood)}</TableCell>
                                    <TableCell style={{ fontSize: 18 }} numeric>{enumService.GetWeatherName(song.state.weather)}</TableCell>
                                    <TableCell style={{ fontSize: 18 }} numeric>{enumService.GetLocationName(song.state.location)}</TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                            <TablePagination
                                rowsPerPageOptions={[2, 5, 10, 25]}
                                colSpan={3}
                                count={this.props.songs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        )
    }
}

let mapProps = (state: any) => {
    return {
        songs: state.songReducer.songs,
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        getAllSongs: getAllSongs.action
    },
    dispatch);



export default connect(mapProps, mapDispatch)(SongList)

