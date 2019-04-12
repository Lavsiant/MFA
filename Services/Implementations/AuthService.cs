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
using Services.Models.Common;
using Services.Interfaces;
using Services.Models.Auth;
using WebApp.Models.Auth;

namespace Services.Implementations
{ 
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IIdentityRepository _identityRepository;

        public AuthService(IAuthRepository authRepository, IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
            _authRepository = authRepository;
        }

        public async Task<User> Login(LoginModel model)
        {
            var user = await _identityRepository.GetUserByLoginPassword(model.Login, GetHash(model.Password));
            if (user != null)
            {                
                var token = GenerateToken(user.Login, DateTime.Now);         
                await _authRepository.UpdateUserToken(user.ID, token);
                user.Token = token;
                return user;
            }
            else
            {
                throw new TypedException(ExceptionType.InvalidLoginOrPassword);
            }
           
        }

        public async Task<User> Register(RegisterModel model)
        {
            var userWithCredentials = await _identityRepository.GetUserByLoginOrEmail(model.Login, model.Email);

            if (userWithCredentials != null)
            {
                if (userWithCredentials.Login.Equals(model.Login))
                {
                    throw new TypedException(ExceptionType.LoginAlreayExists);
                }
                else if (userWithCredentials.Email.Equals(model.Email))
                {
                    throw new TypedException(ExceptionType.EmailAlreayExists);
                }
            }          

            var user = new User()
            {
                Login = model.Login,
                Email = model.Email,
                Password = GetHash(model.Password)
            };
            
            var token = GenerateToken(user.Login, DateTime.Now);
            user.Token = token;
            await _identityRepository.CreateUser(user);

            return user;
        }

        public async Task<CheckTokenResult> CheckIfTokenValid(string tokenValue, string username)
        {
            var userToken = await _authRepository.GetToken(username);
            if (userToken == null || !userToken.Value.Equals(tokenValue))
            {
                return CheckTokenResult.InvalidToken;
            }

            if(DateTime.Now > userToken.ExpiredDate)
            {
                return CheckTokenResult.TokenExpired;
            }

            return CheckTokenResult.Success;
        }

        public async Task<Role> GetUserRole(string username)
        {
            return await _authRepository.GetUserRole(username);
        }

        private Token GenerateToken(string login, DateTime dateTime)
        {
            string value = dateTime.ToLongTimeString() + login;
            var valueHash = GetHash(value);
            var token = new Token()
            {
                Value = valueHash,
                ExpiredDate = dateTime.AddDays(1)
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
