using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Exceptions
{
    public class AuthException : Exception
    {
        public AuthException(AuthExceptionType type)
        {
            Type = type;
        }

        public AuthExceptionType Type { get; set; }
    }
}
