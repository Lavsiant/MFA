using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace IoT.Models
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

