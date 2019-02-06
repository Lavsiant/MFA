import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getAllUsers } from './userActions'
import UserState from '../../interfaces/user/userState';


class UserProfile extends React.Component<any,any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            
        };
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

const mapDispatch = (dispatch: any) => bindActionCreators({ getAllUsers }, dispatch);
    

export default connect(mapProps, mapDispatch)(UserProfile) 
