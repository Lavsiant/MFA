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

        public RegisterErrorException(string message) : base(message)
        {

        }

    }
}
