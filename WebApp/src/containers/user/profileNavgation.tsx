import React from 'react';
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserProfile from './userProfile';
import Preferences from './questionnaire';
import Language from './languageSelect';
import { Paper } from '@material-ui/core';

interface Props{
}

interface State{
    activeIndex : number
}

class ProfileTabs extends React.PureComponent<Props,State> {

    constructor(props: any) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }
  
    handleChange = (index: number) => {
        this.setState({
            activeIndex: index
        })
    } 

    render() {
        let language = 'en'
        if (localStorage.getItem('language')) {
            language = localStorage.getItem('language')
        }
        else {
            language = 'en'
        }

        const { activeIndex } = this.state;
        const root = {
            width: '100%',
            maxWidth: '360px'
        }
        return (
            <div style={{display:'flex'}}>
                <div style={{width:'30%', float:'left'}}>
                    <List component="nav" style={root}>
                    <ListItem button onClick={()=>this.handleChange(0)}>
                        <ListItemText primary= {language=='en' ? "Profile" : 'Профіль'} />
                    </ListItem>
                    <Divider />
                    <ListItem button divider onClick={()=>this.handleChange(1)}>
                        <ListItemText primary= {language=='en' ? "Preferences" : 'Вподобання'} />
                    </ListItem>
                    <ListItem button onClick={()=>this.handleChange(2)}>
                        <ListItemText primary= {language=='en' ? "Language" : 'Мова'} />
                    </ListItem>
                    <Divider light />

                    </List>
                </div>
                <Paper style={{width:'100%', height:'-webkit-fill-available' } }>
                    { activeIndex === 0 && <div><UserProfile/></div> }
                    { activeIndex === 1 && <div><Preferences/></div> }
                    { activeIndex === 2 && <div><Language/></div> }
                 </Paper>
            </div>
        )
    }
}

export default ProfileTabs;