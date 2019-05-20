export default interface IUser {
    login: string;
    email: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    id?: number;
    password: string;
    role?: number;
}