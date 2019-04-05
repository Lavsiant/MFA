using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.Models.Enums;

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
