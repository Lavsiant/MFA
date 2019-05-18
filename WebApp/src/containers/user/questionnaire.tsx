import * as React from 'react';
import { connect } from 'react-redux'
import { submitForm } from './userActions'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import Paper from '@material-ui/core/Paper';
import { IGenrePreference, getGenresPreferences } from '../../models/genres';
import { Preference } from '../../models/preferences';
import Button from '@material-ui/core/Button';
import IUser from '../../interfaces/user/user';
import { userService } from '../../services/userService';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

interface Props {
    submitForm(data: { id: string, gps: IGenrePreference[] }): any;
    user: IUser;
}

interface State {
    genrePreferences: IGenrePreference[]
}

class Questionnaire extends React.Component<Props, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            genrePreferences: getGenresPreferences()
        }
        if (localStorage.getItem('user')) {
            userService.getUserPreferences(JSON.parse(localStorage.getItem('user')).login).then((res) => {
                if (res.data && res.data.length > 0) {
                    const { genrePreferences } = this.state;
                    for (let i = 0; i < res.data.length; i++) {
                        genrePreferences[i].preference = res.data[i].preference;
                    }
                    this.setState({
                        genrePreferences: genrePreferences
                    })
                }
            })
        }


    }

    componentWillMount() {


    }

    rateGenre = (gp: IGenrePreference, p: Preference) => {
        let gps = this.state.genrePreferences;
        const index = gp.genre - 1;
        gps[index] = {
            genre: gp.genre,
            name: gp.name,
            preference: p
        }
        this.setState({
            genrePreferences: gps
        })
    }

    handleSubmit = () => {
        if (localStorage.getItem('user')) {
            const userId = JSON.parse(localStorage.getItem('user')).login;
            const gps = this.state.genrePreferences;
            this.props.submitForm({ id: userId, gps });
        }
        else {
            window.location = {
                ...window.location,
                href: '/login'
            }
        }
    }

    render() {
        return (
            <Paper style={{ margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}>Genre preferences</h2>
                <Paper style={{ margin: 'auto', width: '50%' }}>
                    {this.state.genrePreferences.map((gp, i) => {
                        return (
                            <div style={{ margin: 'auto', textAlign: 'center', marginTop:'20px' }}>
                                <span style={{ marginLeft: '50px' }}>{gp.name}</span> <br />
                                {gp.preference === Preference.VeryLow ? <Button style={{ background: 'rgb(160, 254, 161)' }} onClick={() => this.rateGenre(gp, Preference.VeryLow)}>VeryLow</Button>
                                    : <Button onClick={() => this.rateGenre(gp, Preference.VeryLow)}>{Preference.VeryLow.toString()}</Button>}


                                {gp.preference === Preference.Low ? <Button style={{ background: 'rgb(160, 254, 161)' }} onClick={() => this.rateGenre(gp, Preference.Low)}>Low</Button>
                                    : <Button onClick={() => this.rateGenre(gp, Preference.Low)}>{Preference.Low.toString()}</Button>}

                                {gp.preference === Preference.Medium ? <Button style={{ background: 'rgb(160, 254, 161)' }} onClick={() => this.rateGenre(gp, Preference.Medium)}>Medium</Button>
                                    : <Button onClick={() => this.rateGenre(gp, Preference.Medium)}>{Preference.Medium.toString()}</Button>}

                                {gp.preference === Preference.High ? <Button style={{ background: 'rgb(160, 254, 161)' }} onClick={() => this.rateGenre(gp, Preference.High)}>High</Button>
                                    : <Button onClick={() => this.rateGenre(gp, Preference.High)}>{Preference.High.toString()}</Button>}

                                {gp.preference === Preference.VeryHigh ? <Button style={{ background: 'rgb(160, 254, 161)' }} onClick={() => this.rateGenre(gp, Preference.VeryHigh)}>Very High</Button>
                                    : <Button onClick={() => this.rateGenre(gp, Preference.VeryHigh)}>{Preference.VeryHigh.toString()}</Button>}

                            </div>

                        )
                    })}
                    <Button size='large' style={{marginLeft: '45%'}} variant="contained" type='button' onClick={this.handleSubmit} color="primary"> Submit </Button>
                </Paper>
            </Paper>
        )
    }
}


let mapProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        submitForm: submitForm.action
    },
    dispatch);


export default connect(mapProps, mapDispatch)(Questionnaire) 