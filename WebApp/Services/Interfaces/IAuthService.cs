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
        Task Login(LoginViewModel loginVM);

        Task<User> Register(RegisterViewModel registerVM);
    }
}
