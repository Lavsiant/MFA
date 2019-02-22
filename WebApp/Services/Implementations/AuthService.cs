using DbRepository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;
using WebApp.ViewModels;

namespace WebApp.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IAuthRepository _authRepository;
        private readonly IIdentityRepository _identityRepository;

        public AuthService(IAuthRepository authRepository, IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
            _authRepository = authRepository;
        }

        public async Task<Token> Login(LoginViewModel vm)
        {
            var user = await _identityRepository.GetUserByLoginPassword(vm.Login, GetHash(vm.Password));
            if (user != null)
            {                
                var token = GenerateToken(user.Login, DateTime.Now);         
                await _authRepository.UpdateUserToken(user.ID, token);
                return token;
            }
            else
            {
                throw new Exception();
            }
           
        }

        public async Task<Token> Register(RegisterViewModel registerVM)
        {
            var user = new User()
            {
                Login = registerVM.Login,
                Email = registerVM.Email,
                Password = GetHash(registerVM.Password)
            };
            await _identityRepository.CreateUser(user);

            return GenerateToken(user.Login, DateTime.Now);
        }

        private Token GenerateToken(string login, DateTime dateTime)
        {
            string value = login + dateTime.ToLongDateString();
            var valueHash = GetHash(value);
            var token = new Token()
            {
                Value = valueHash,
                IssueDate = dateTime
            };
            return token;
        }

        private string GetHash(string value)
        {
            using (SHA256 hash = SHA256Managed.Create())
            {                
                return String.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));

            }
        }
    }
}
