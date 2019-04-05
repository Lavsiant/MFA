using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Helpers.Authentication
{
    public class BasicAuthorize : AuthorizeAttribute
    {
        //protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        //{
        //    actionContext.Response = new HttpResponseMessage
        //    {
        //        StatusCode = HttpStatusCode.Forbidden,
        //        Content = new StringContent("You are unauthorized to access this resource")
        //    };
        //}
    }
}
