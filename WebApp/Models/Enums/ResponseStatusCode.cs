using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Enums
{
    public enum ResponseStatusCode
    {
        Ok = 200,
        BadRequest = 400,
        Unauthorized = 401,
        InternalServerError = 500
    }
}
