using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;
using WebApp.ViewModels;

namespace WebApp.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IIdentityService _identityService;

        public AuthService(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IdentityService identityService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _identityService = identityService;
        }

        public async Task Login(LoginViewModel loginVM)
        {

        }

        public async Task<User> Register(RegisterViewModel registerVM)
        {
            var user = new User()
            {
                UserName = registerVM.Login,
                Email = registerVM.Email,
                FirstName = registerVM.FirstName,
                LastName = registerVM.LastName
            };

            var result = await _userManager.CreateAsync(user, registerVM.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
            }
            else
            {
                throw new RegisterErrorException(result.Errors);
            }

            return await _identityService.GetUser(user.UserName);
        }
    }
}
