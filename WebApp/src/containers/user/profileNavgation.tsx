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
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider onClick={()=>this.handleChange(1)}>
                        <ListItemText primary="Preferences" />
                    </ListItem>
                    <ListItem button onClick={()=>this.handleChange(2)}>
                        <ListItemText primary="Language" />
                    </ListItem>
                    <Divider light />

                    </List>
                </div>
                <div style={{width:'100%'}}>
                    { activeIndex === 0 && <div><UserProfile/></div> }
                    { activeIndex === 1 && <div><Preferences/></div> }
                    { activeIndex === 2 && <div><Language/></div> }
                 </div>
            </div>
        )
    }
}

export default ProfileTabs;