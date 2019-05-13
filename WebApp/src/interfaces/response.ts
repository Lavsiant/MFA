export default interface Response<T>{
    statusCode: number;
    errorMessage: string;
    success: boolean;
    data: T
}
