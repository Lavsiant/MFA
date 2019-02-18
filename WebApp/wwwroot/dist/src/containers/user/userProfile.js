"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const userActions_1 = require("./userActions");
const redux_1 = require("redux");
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getAllUsers();
    }
    render() {
        return ("User profile");
    }
}
let mapProps = (state) => {
    return {
        users: state.users,
        error: state.error
    };
};
const mapDispatch = (dispatch) => redux_1.bindActionCreators({
    getAllUsers: userActions_1.getAllUsers.action
}, dispatch);
exports.default = react_redux_1.connect(mapProps, mapDispatch)(UserProfile);
//# sourceMappingURL=userProfile.js.map