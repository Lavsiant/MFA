using System.Net;

namespace WebApp.Models
{
    public class Response<T> : Response
    {
        public T Data { get; set; }
    }

    public class Response
    {
        public HttpStatusCode statusCode { get; set; }

        public string errorMessage { get; set; }

        public bool success { get; set; }
    }
}
