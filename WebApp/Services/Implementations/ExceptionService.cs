using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;

namespace WebApp.Services.Implementations
{
    public class ExceptionService : IExceptionService
    {
        public string GetAuthExceptionMessageText(AuthExceptionType exType)
        {
            switch (exType)
            {
                case AuthExceptionType.EmailAlreayExists:
                    return "This email is alreay exists";
                case AuthExceptionType.LoginAlreayExists:
                    return "This login is alreay exists";
                case AuthExceptionType.InvalidLoginOrPassword:
                    return "Invalid login or password";
                default:
                    return "Authentication error";
            }
        }
    }
}
