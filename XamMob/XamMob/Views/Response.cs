using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace XamMob.Views
{
    public class Response<T> : Response
    {
        public T data { get; set; }
    }

    public class Response
    {
        public HttpStatusCode statusCode { get; set; }

        public string errorMessage { get; set; }

        public bool success { get; set; }
    }
}
