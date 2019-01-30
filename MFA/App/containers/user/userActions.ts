import { userService } from './../../services/userService';
import IUser from './../../interfaces/user';
import {actions} from './userActionCreators';



 export function getAllUsers() {    
    return (dispatch) => {        
            userService.getAllUsers()
           .then((users: IUser[]) => {
             console.log(users);
             dispatch(actions.getAllUsers(users));
           })
           .catch((errorText: string) => {
             console.log(errorText);
             dispatch(actions.getRequestFailed(errorText));
           });                    
    }
}