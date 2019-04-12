using System.Net;

namespace WebApp.Models
{
    public class Response<T> : Response
    {
        public T Data { get; set; }
    }

    public class Response
    {
        public HttpStatusCode StatusCode { get; set; }

        public string ErrorMessage { get; set; }

        public bool Success { get; set; }
    }
}
