import IUser from "../user/user";

export default interface AuthState{
    user?: IUser;
    isLoading?: boolean;
    error?: Error;
}