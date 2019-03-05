using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Enums
{
    public enum CheckTokenResult
    {
        TokenExpired = 0,
        InvalidToken = 1,
        Success = 2,

    }
}
