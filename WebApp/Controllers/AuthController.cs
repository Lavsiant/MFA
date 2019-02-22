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
        public async Task Login([FromBody] LoginViewModel loginVM)
        {
            var token = await _authService.Login(loginVM);
            UpdateCookieToken(token);
        }

        [Route("register")]
        [HttpPost]
        public async Task Register([FromBody] RegisterViewModel registerVM)
        {
            var token = await _authService.Register(registerVM);
            UpdateCookieToken(token);

        }

        private void UpdateCookieToken(Token token)
        {
            var response = HttpContext.Response;
            response.Cookies.Delete("token");
            response.Cookies.Append("token", token.Value,new CookieOptions() { Expires = token.IssueDate.AddDays(1)});
        }
    }
}
