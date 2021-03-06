import Response from '../interfaces/response'
import { push } from 'connected-react-router'

export default async function handleRequest<TResult,TParams>(
    fetch: (params: TParams ) => 
    Promise<Response<TResult>>, dispatch: any, requestParams: TParams)
     : Promise<TResult>{

    const response : any = await fetch(requestParams);
    if(!response.success){
        switch (response.statusCode){
           case 401:
                dispatch(push('/login'));
           default:
                let x = response.ErrorMessage;
                throw new Error(response.ErrorMessage);
        }
    }
    else{
        return response.data;
    }
}


// switch(response.statusCode){
//     case 401:
//         dispatch(push('/login'));           
//     default:
//         throw new Error(response.errorMessage);   
// }