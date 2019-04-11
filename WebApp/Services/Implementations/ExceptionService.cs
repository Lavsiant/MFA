using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;

namespace WebApp.Services.Implementations
{
    public class ExceptionService : IExceptionService
    {
        public string GetExceptionMessageText(ExceptionType exType)
        {
            switch (exType)
            {
                case ExceptionType.EmailAlreayExists:
                    return "This email is alreay exists";
                case ExceptionType.LoginAlreayExists:
                    return "This login is alreay exists";
                case ExceptionType.InvalidLoginOrPassword:
                    return "Invalid login or password";
                case ExceptionType.TokenExpired:
                    return "Token expired";
                case ExceptionType.InvalidToken:
                    return "Invalid token";
                case ExceptionType.BadRequest:
                    return "Bad request data";
                default:
                    return "Internal error";
            }
        }

        public Response GetResponseByExceptionType(ExceptionType exType)
        {
            HttpStatusCode statusCode;
            switch (exType)
            {
                case ExceptionType.InvalidToken:        
                case ExceptionType.TokenExpired:
                    statusCode = HttpStatusCode.Unauthorized;
                    break;
                case ExceptionType.LoginAlreayExists:
                case ExceptionType.EmailAlreayExists:
                case ExceptionType.InvalidLoginOrPassword:
                case ExceptionType.BadRequest:
                    statusCode = HttpStatusCode.BadRequest;
                    break;
                default:
                    statusCode = HttpStatusCode.InternalServerError;
                    break;                
            }

            return new Response()
            {
                StatusCode = statusCode,
                ErrorMessage = GetExceptionMessageText(exType),
                Success = false
            };

        }
    }
}
