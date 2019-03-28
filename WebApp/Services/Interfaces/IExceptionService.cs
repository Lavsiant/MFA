using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Exceptions;

namespace WebApp.Services.Interfaces
{
    public interface IExceptionService
    {
        string GetAuthExceptionMessageText(AuthExceptionType exType);                
    }
}
