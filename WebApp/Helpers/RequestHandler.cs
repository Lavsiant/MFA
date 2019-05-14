using System;
using System.Net;
using System.Threading.Tasks;
using WebApp.Models;


namespace WebApp.Helpers
{
    public static class RequestHandler
    {
     
        
        public static Response ExecuteRequest(Action executebleFunc)
        {
            executebleFunc();
            return new Response()
            {
                statusCode = HttpStatusCode.OK,
                success = true,
            };
        }

        public static async Task<Response<T>> ExecuteRequestAsync<T>(Func<Task<T>> executebleFunc)
        {
                T result = await executebleFunc();
                return new Response<T>()
                {
                    statusCode = HttpStatusCode.OK,
                    success = true,
                    Data = result
                };        
        }
        public static async Task<Response> ExecuteRequestAsync(Func<Task> executebleFunc)
        {
            await executebleFunc();
            return new Response()
            {
                statusCode = HttpStatusCode.OK,
                success = true,
            };
        }

    }
}
