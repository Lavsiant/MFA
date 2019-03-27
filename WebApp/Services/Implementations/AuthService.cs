﻿using DbRepository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models.Enums;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;
using WebApp.ViewModels;

namespace WebApp.Services.Implementations
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

        public async Task<User> Login(LoginViewModel vm)
        {
            var user = await _identityRepository.GetUserByLoginPassword(vm.Login, GetHash(vm.Password));
            if (user != null)
            {                
                var token = GenerateToken(user.Login, DateTime.Now);         
                await _authRepository.UpdateUserToken(user.ID, token);
                user.Token = token;
                return user;
            }
            else
            {
                throw new AuthException(AuthExceptionType.InvalidLoginOrPassword);
            }
           
        }

        public async Task<User> Register(RegisterViewModel registerVM)
        {
            var userWithCredentials = await _identityRepository.GetUserByLoginOrEmail(registerVM.Login, registerVM.Email);

            if (userWithCredentials != null)
            {
                if (userWithCredentials.Login.Equals(registerVM.Login))
                {
                    throw new AuthException(AuthExceptionType.LoginAlreayExists);
                }
                else if (userWithCredentials.Email.Equals(registerVM.Email))
                {
                    throw new AuthException(AuthExceptionType.EmailAlreayExists);
                }
            }          

            var user = new User()
            {
                Login = registerVM.Login,
                Email = registerVM.Email,
                Password = GetHash(registerVM.Password)
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
