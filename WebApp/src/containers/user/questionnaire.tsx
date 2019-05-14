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

interface Props{
    submitForm(data: {id:string, gps: IGenrePreference[]}) : any;
    user: IUser;
}

interface State{
    genrePreferences : IGenrePreference[]
}

class Questionnaire extends React.Component<Props,State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            genrePreferences: getGenresPreferences()
        }

    }

    componentDidMount() {
       //this.props.submitForm();     
    }

    rateGenre = (gp: IGenrePreference, p: Preference ) =>{
        let gps = this.state.genrePreferences;
        const index = gp.genre-1;
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
        const userId = this.props.user.login;
        const gps = this.state.genrePreferences;
        this.props.submitForm({id: userId,gps});
    }

    render(){
        return(
            <Paper>
                <form onSubmit = {this.handleSubmit}>
                    <h2>Genre preferences</h2>
                    {this.state.genrePreferences.map(gp => {
                        return(
                            <div>
                                {gp.name} <br/>
                                <Button onClick={() => this.rateGenre(gp,Preference.VeryLow)}>{Preference.VeryLow.toString()}</Button>
                                <Button onClick={() => this.rateGenre(gp,Preference.Low)}>{Preference.Low.toString()}</Button>
                                <Button onClick={() => this.rateGenre(gp,Preference.Medium)}>{Preference.Medium.toString()}</Button>
                                <Button onClick={() => this.rateGenre(gp,Preference.High)}>{Preference.High.toString()}</Button>
                                <Button onClick={() => this.rateGenre(gp,Preference.VeryHigh)}>{Preference.VeryHigh.toString()}</Button>
                            </div>
                        )
                    })}
                     <Button size='large' variant="contained" type='submit' color="primary"> Submit </Button>
                </form>
            </Paper>
        )
    }
}


let mapProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch : AppDispatch) => bindActionCreators(
    {
        submitForm : submitForm.action
    },
    dispatch);
    

export default connect(mapProps,mapDispatch)(Questionnaire) 