using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Helpers;
using WebApp.Models;
using WebApp.Models.Enums;
using WebApp.Models.Exceptions;
using WebApp.Services.Implementations;
using WebApp.Services.Interfaces;
using WebApp.ViewModels;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IExceptionService _exceptionService;

        public AuthController(IAuthService authService, IExceptionService exceptionService)
        {
            _authService = authService;
            _exceptionService = exceptionService;
        }

        [Route("login")]
        [HttpPost]
        public async Task<Response<UserViewModel>> Login([FromBody] LoginViewModel loginVM)
        {            
            return await RequestHandler.ExecuteRequestAsync<UserViewModel>(async () =>
            {
                var user = await _authService.Login(loginVM);
                UpdateCookieToken(user.Token, user.Login);
                return Mapper.Map<UserViewModel>(user);
            });           
        }

        [Route("register")]
        [HttpPost]
        public async Task<Response<UserViewModel>> Register([FromBody] RegisterViewModel registerVM)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var user = await _authService.Register(registerVM);
                UpdateCookieToken(user.Token, registerVM.Login);
                return Mapper.Map<UserViewModel>(user);
            });
        }

        [Route("logout")]
        [HttpPost]
        public Response Logout()
        {
            return RequestHandler.ExecuteRequest(() =>
            {
                DeleteCookie();
            });
        }

        private void UpdateCookieToken(Token token, string username = null)
        {
            var response = HttpContext.Response;
            response.Cookies.Delete("token");
            response.Cookies.Delete("user");
            response.Cookies.Append("token", token.Value, new CookieOptions() { Expires = token.ExpiredDate });
            response.Cookies.Append("user", username);
        }

        private void DeleteCookie()
        {
            var response = HttpContext.Response;
            response.Cookies.Delete("token");
            response.Cookies.Delete("user");        
        }
    }
}
