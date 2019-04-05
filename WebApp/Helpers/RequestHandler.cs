using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Models.Enums;
using WebApp.Models.Exceptions;


namespace WebApp.Helpers
{
    public static class RequestHandler
    {
        public static Response<T> ExecuteRequest<T>(Func<T> executebleFunc, Func<ExceptionType,string> getExceptionTextFunc)
        {
            try
            {
                T result = executebleFunc();
                return new Response<T>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Success = true,
                    Data = result
                };
            }
            catch(TypedException ex)
            {
                return new Response<T>()
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Success = false,
                    ErrorMessage = getExceptionTextFunc(ex.Type)
                };
            }
        }
        public static Response ExecuteRequest(Action executebleFunc)
        {
            executebleFunc();
            return new Response()
            {
                StatusCode = HttpStatusCode.OK,
                Success = true,
            };
        }

        public static async Task<Response<T>> ExecuteRequestAsync<T>(Func<Task<T>> executebleFunc)
        {
                T result = await executebleFunc();
                return new Response<T>()
                {
                    StatusCode = HttpStatusCode.OK,
                    Success = true,
                    Data = result
                };        
        }
        public static async Task<Response> ExecuteRequestAsync(Func<Task> executebleFunc)
        {
            await executebleFunc();
            return new Response()
            {
                StatusCode = HttpStatusCode.OK,
                Success = true,
                Data = result
            };
        }

    }
}
