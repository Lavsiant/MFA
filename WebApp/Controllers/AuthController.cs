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

        [Route("register")]
        [HttpPost]
        public async Task<User> Register([FromBody] RegisterViewModel registerVM)
        {
            return  await _authService.Register(registerVM);
        }
    }
}
