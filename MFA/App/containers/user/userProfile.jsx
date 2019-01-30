import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllUsers } from './userActions.ts'


class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    componentDidMount() {
        this.props.getAllUsers(this.props.id);
     
    }

    render(){
        return(
            "User profile"
        )
    }
}


let mapProps = (state) => {
    return {
        users: state.userReducer.users,
        error: state.userReducer.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getAllUsers: bindActionCreators(getAllUsers, dispatch),
    }
}

export default connect(mapProps, mapDispatch)(UserProfile) 
