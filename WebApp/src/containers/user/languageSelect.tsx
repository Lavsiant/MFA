import * as React from 'react';

import "isomorphic-fetch";
import { ISong, Location, Mood, Weather } from '../../interfaces/song';
import { Genres } from '../../models/genres';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import { songService } from '../../services/songService'
import Button from '@material-ui/core/Button';
import dictionary from '../../helpers/dictionary'

interface Props {

}

interface State {
    language: string
}

export default class Language extends React.Component<Props, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            language: 'en'
        }
    }

    componentDidMount() {
        if (localStorage.getItem('language')) {
            this.setState({
                language: localStorage.getItem('language')
            })
        }
        else {
            this.setState({
                language: 'en'
            })
        }
    }

    handleLangChange = (e) => {
        const { value } = e.target;
        this.setState({ language: value });
        localStorage.setItem('language', value);
    }

    handleSubmit = () => {

    }

    render() {

        return (
            <Paper className='tab-create' style={{ fontSize: 20, marginTop: 100 }} >
                <div style={{ textAlign: 'center' }}>

                    <form name="form" className='tab-create-form' onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
                        <div className='field'>
                            <TextField
                                select
                                label={dictionary('selLang', this.state.language)}
                                style={{ width: '90%' }}
                                value={this.state.language}
                                name='type'

                                margin="normal"
                                variant="outlined"
                                onChange={this.handleLangChange}
                            >
                                <MenuItem value={"en"}>English</MenuItem>
                                <MenuItem value={'ua'}>Українська</MenuItem>

                            </TextField>
                        </div>
                        <Button variant="contained" color="primary" size='large' type='submit' className="form-group" style={{ margin: 'auto' }}>{dictionary('update', this.state.language)}</Button>

                    </form>
                </div>
            </Paper>
        )
    }
}