using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Services.Models.Common
{
    public class ErrorResponseModel
    {
        public HttpStatusCode StatusCode { get; set; }

        public string ErrorMessage { get; set; }
    }
}
