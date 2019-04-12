using Model;
using Services.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Auth;

namespace Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> Login(LoginModel model);

        Task<User> Register(RegisterModel model);

        Task<CheckTokenResult> CheckIfTokenValid(string tokenValue,string username);

        Task<Role> GetUserRole(string username);

    }
}
