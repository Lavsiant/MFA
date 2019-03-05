import IUser from "../user/user";

export interface HomeState{
    users?: IUser[],
    error?: Error
}