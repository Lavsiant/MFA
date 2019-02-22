using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.ViewModels;

namespace WebApp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Token> Login(LoginViewModel loginVM);

        Task<Token> Register(RegisterViewModel registerVM);
    }
}
