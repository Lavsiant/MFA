using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Exceptions
{
    public class RegisterErrorException : Exception
    {
        public RegisterErrorException() { }

        public RegisterErrorException(IEnumerable<IdentityError> errors)
        {
            Errors = errors;
        }

        public IEnumerable<IdentityError> Errors { get; set; }
    }
}
