export default interface Response<T>{
    StatusCode: number;
    ErrorMessage: string;
    Success: boolean;
    Data: T
}
