import IUser from "./user";

export default interface UserState{
    user?: IUser;
    users?: IUser[];
    isLoading?: boolean;
    error?: Error;
}