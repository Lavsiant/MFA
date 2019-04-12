using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Models.Common
{
    public enum ExceptionType
    {
        InvalidLoginOrPassword = 0,
        LoginAlreayExists = 1,
        EmailAlreayExists = 2,
        InvalidToken = 3,
        TokenExpired = 4,
        BadRequest = 5,
    }
}
