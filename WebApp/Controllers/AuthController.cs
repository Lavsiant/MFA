using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [Route("login")]
        [HttpPost]
        public async Task<UserViewModel> Login([FromBody] LoginViewModel loginVM)
        {
            var user = await _authService.Login(loginVM);
            UpdateCookieToken(user.Token,user.Login);
            throw new Exception("HEDASd");
            return Mapper.Map<UserViewModel>(user);
        }

        [Route("register")]
        [HttpPost]
        public async Task<UserViewModel> Register([FromBody] RegisterViewModel registerVM)
        {
            var user = await _authService.Register(registerVM);
            UpdateCookieToken(user.Token,registerVM.Login);
            return Mapper.Map<UserViewModel>(user);

        }

        private void UpdateCookieToken(Token token, string username = null)
        {
            var response = HttpContext.Response;
            response.Cookies.Delete("token");
            response.Cookies.Delete("user");
            response.Cookies.Append("token", token.Value,new CookieOptions() { Expires = token.ExpiredDate});
            response.Cookies.Append("user", username);
        }
    }
}
