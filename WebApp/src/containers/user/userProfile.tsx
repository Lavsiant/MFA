import * as React from 'react';
import { connect } from 'react-redux'
import { getAllUsers } from './userActions'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';

interface Props{
    getAllUsers() : any;
}

class UserProfile extends React.Component<Props,UserState>  {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
       this.props.getAllUsers();
     
    }

    render(){
        return(
            "User profile"
        )
    }
}


let mapProps = (state : UserState) => {
    return {
        users: state.users,
        error: state.error
    }
}

const mapDispatch = (dispatch : AppDispatch) => bindActionCreators(
    {
    getAllUsers : getAllUsers.action
    },
    dispatch);
    

export default connect(mapProps, mapDispatch)(UserProfile) 
